import { ApartmentType, Dorm, HousingType } from "@/lib/types";
import cheerio from "cheerio";
import axios from "axios";
import { all_dorms } from "@/lib/search";

export async function GET(
  request: Request,
  { params }: { params: { id: number } },
) {
  let dorm = await getDorm(params.id);
  return Response.json(dorm);
}

async function getDorm(id: number): Promise<Dorm> {
  const web_link = all_dorms[id].web_link;

  let dorm: Dorm = {
    id,
    name: "",
    summary: "",
    images: [],

    address: "",
    coordinates: [0, 0],

    web_link,

    apartment_types: [],

    facilities: [],
    parking_spots: [],
  };

  let res = await axios.get(web_link);
  if (res.status != 200) throw Error("Couldn't reach Studentenwerk Website");

  let data = res.data;
  const $ = cheerio.load(data);

  const title = $(".content>div>header>h1").text();
  let title_regex = /(?:Wohnheim )?(.*[0-9]*-?[0-9][a-z]?)(?:(?:, )(.*))?/.exec(
    title,
  );

  if (title_regex) {
    if (title_regex[1] != null) {
      dorm.name = title_regex[1];
      dorm.address = title_regex[1];
    }
    if (title_regex[2] != null) {
      dorm.name = title_regex[2];
    }
  }

  const inner_text = $(".content > div > .ce-textpic .ce-bodytext").children();

  dorm.images = $(".content > div > .ce-textpic img")
    .map(
      (i: any, element: any) =>
        "https://www.studentenwerk-goettingen.de" + element.attribs.src,
    )
    .toArray();

  let next = inner_text.first();
  dorm.summary = next.text();
  for (let i = 0; i < inner_text.length; i++) {
    if (next.text().includes("Gemeinschaftseinrichtungen")) {
      next
        .next()
        .children()
        .each((i, el) => {
          let text = $(el).text().trim().replace(/,\s*$/, "");
          dorm.facilities.push(text.charAt(0).toUpperCase() + text.slice(1));
        });
    }
    if (next.text().includes("Parkmöglichkeiten")) {
      next
        .next()
        .children()
        .each((i, el) => {
          let text = $(el).text().trim().replace(/,\s*$/, "");
          dorm.parking_spots.push(text.charAt(0).toUpperCase() + text.slice(1));
        });
    }
    next = next.next();
  }

  let apartment_types: Array<ApartmentType> = [];
  $(".content > .tabs-container")
    .find(".jqtab")
    .each((i, el) => {
      let rows = $(el).find("tr td");
      let waiting_period_str = $(rows[4]).text().replace("Monate", "");
      let waiting_period: number | [number, number] = 0;

      if (waiting_period_str.includes("-")) {
        waiting_period = [
          Number.parseInt(waiting_period_str.split("-")[0]),
          Number.parseInt(waiting_period_str.split("-")[1]),
        ];
      } else {
        waiting_period = Number.parseInt(waiting_period_str);
      }

      apartment_types[i] = {
        housing_type: HousingType.SINGLE,
        verbose_housing_type: $(rows[0]).text(),
        room_count: Number.parseInt($(rows[1]).text()),
        room_size: $(rows[0]).text(),
        rent: Number.parseInt($(rows[3]).text().replace("Euro", "")),
        waiting_period,
        furnished: $(rows[5]).text().toLowerCase().includes("vollmöbliert"),
        facilities: [],
        notices: [],
      };
    });

  dorm.apartment_types = apartment_types;

  return dorm;
}
