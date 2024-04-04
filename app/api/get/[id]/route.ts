import { Dorm, HousingType } from "@/lib/types";
import cheerio from "cheerio";
import axios from "axios";
import { get_all } from "../../search/route";

export async function GET(
  request: Request,
  { params }: { params: { id: number } },
) {
  let dorm = await getDorm(params.id);
  return Response.json(dorm);
}

async function getDorm(id: number): Promise<Dorm> {
  const web_link = get_all()[id].web_link;

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

  dorm.summary = inner_text.first().text();

  dorm.images = $(".content > div > .ce-textpic img")
    .map(
      (i: any, element: any) =>
        "https://www.studentenwerk-goettingen.de" + element.attribs.src,
    )
    .toArray();

  return dorm;
}
