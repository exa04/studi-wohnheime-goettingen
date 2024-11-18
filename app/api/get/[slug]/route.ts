import { Apartment, Application, Dorm, HousingType } from "@/lib/types";
import cheerio from "cheerio";
import axios from "axios";
import { all_dorms } from "@/lib/search";

export async function GET(
  request: Request,
  { params }: { params: { slug: string } },
) {
  let dorm = await getDorm(params.slug);
  return Response.json(dorm);
}

async function getDorm(slug: string): Promise<Dorm> {
  const web_link = `https://www.studierendenwerk-goettingen.de/studentisches-wohnen/unsere-wohnheime/${slug}`;

  let dorm: Dorm = {
    slug,
    name: "",
    summary: "",
    images: [],

    address: "",

    web_link,

    apartment_types: [],

    facilities: [],
    parking_spots: [],
  };

  let res = await axios.get(web_link);
  if (res.status != 200) throw Error("Couldn't reach studierendenwerk Website");

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
        "https://www.studierendenwerk-goettingen.de" + element.attribs.src,
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

  let apartment_types: Array<Apartment> = [];
  $(".content > .tabs-container")
    .find(".jqtab")
    .each((i, el) => {
      let rows = $(el).find("tr td");
      let waiting_period_str = $(rows[4]).text().replace("Monate", "");
      let waiting_period: number | [number, number] = 0;
      let housing_type = HousingType.SINGLE;

      let lc_housing_type = $(rows[0]).text().toLowerCase();
      if (lc_housing_type.includes("doppel")) {
        housing_type = HousingType.DOUBLE;
      } else if (/einzelzimmer/.exec(lc_housing_type)) {
        housing_type = HousingType.GROUP;
      } else if (/2er-/.exec(lc_housing_type)) {
        housing_type = HousingType.SHARED_2;
      } else if (/3er-/.exec(lc_housing_type)) {
        housing_type = HousingType.SHARED_3;
      } else if (/4er-/.exec(lc_housing_type)) {
        housing_type = HousingType.SHARED_4;
      } else if (lc_housing_type.includes("mit kind")) {
        housing_type = HousingType.FAMILY;
      }

      const verbose_housing_type_re = /(.*)\(.*\)/.exec(
        $(rows[0]).text().trim(),
      );

      let verbose_housing_type = verbose_housing_type_re
        ? verbose_housing_type_re[1]
        : $(rows[0]).text().trim();

      if (waiting_period_str.includes("-")) {
        waiting_period = [
          Number.parseInt(waiting_period_str.split("-")[0]),
          Number.parseInt(waiting_period_str.split("-")[1]),
        ];
      } else {
        waiting_period = Number.parseInt(waiting_period_str);
      }

      apartment_types[i] = {
        housing_type,
        verbose_housing_type,
        room_count: Number.parseInt($(rows[1]).text()),
        room_size: $(rows[2]).text().trim(),
        rent: Number.parseInt($(rows[3]).text().replace("Euro", "")),
        waiting_period,
        furnished: $(rows[5]).text().toLowerCase().includes("vollmöbliert"),
        facilities: $(rows[6])
          .text()
          .split(",")
          .map((x) => x.trim()),
        notices: $(rows[7]).text().trim(),
        application: $(rows[8]).text().toLowerCase().includes("einzelbewerbung")
          ? Application.SINGLE
          : $(rows[8]).text().toLowerCase().includes("gemeinsame")
            ? Application.GROUP
            : Application.NONE,
      };
    });

  dorm.apartment_types = apartment_types;

  return dorm;
}
