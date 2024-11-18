import { all_dorms } from "@/lib/search";
import { Dorm, DormResult, HousingType } from "@/lib/types";
import cheerio from "cheerio";
import axios from "axios";

export const revalidate = 3600;

export async function GET() {
  const res = await axios.get(
    "https://www.studierendenwerk-goettingen.de/studentisches-wohnen/unsere-wohnheime",
  );
  if (res.status != 200) throw Error("Couldn't reach studierendenwerk Website");
  const data = res.data;
  const $ = cheerio.load(data);

  let dorms: Array<DormResult> = [];

  let dorm_ip_requests: Array<{
    q: string;
    limit: number;
    proximity: string;
  }> = [];

  $("tbody")
    .find("tr")
    .each((id, e) => {
      let dorm: DormResult = {
        slug: "",
        web_link: "",
        name: undefined,
        coordinates: [0, 0],
        housing_types: [],
      };
      const cols = $(e).find("td");

      const name_el = $(cols[0]);
      dorm.web_link = name_el.find("a").attr("href") || "";
      dorm.slug = dorm.web_link.split("unsere-wohnheime/")[1];

      const dorm_names = (
        name_el.text().split(",")[1] || name_el.text().split(",")[0]
      )
        .split("/ ")[0]
        .split(" \t");

      dorm.name = (dorm_names[1] || dorm_names[0]).trim();

      let address = name_el
        .text()
        .split(",")[0]
        .split("/")[0]
        .split(" \t")[0]
        .trim();
      const address_re = /(.*[0-9]+)-[0-9]+/.exec(address) || [];

      address = (address_re[1] || address).trim();

      const apartments_html = $(cols[1]).html();
      dorm.housing_types =
        apartments_html
          ?.toLowerCase()
          .split("<br>")
          .map((apartment) => {
            if (apartment.includes("doppel")) {
              return HousingType.DOUBLE;
            } else if (/einzelzimmer/.exec(apartment)) {
              return HousingType.GROUP;
            } else if (/2er-/.exec(apartment)) {
              return HousingType.SHARED_2;
            } else if (/3er-/.exec(apartment)) {
              return HousingType.SHARED_3;
            } else if (/4er-/.exec(apartment)) {
              return HousingType.SHARED_4;
            } else if (apartment.includes("mit kind")) {
              return HousingType.FAMILY;
            }
            return HousingType.SINGLE;
          }) || [];

      dorm.housing_types = dorm.housing_types.filter(function (item, pos) {
        return dorm.housing_types.indexOf(item) == pos;
      });

      const existing_entry_idx = dorms.findIndex((v) => v.name == dorm.name);
      if (existing_entry_idx != -1) {
        dorm.housing_types.forEach((h) => {
          if (!dorms[existing_entry_idx].housing_types.includes(h)) {
            dorms[existing_entry_idx].housing_types.push(h);
          }
        });
      } else {
        dorms.push(dorm);

        dorm_ip_requests.push({
          q: `${address}, Göttingen, Germany`,
          limit: 1,
          proximity: "9.9363116877918,51.54150344476875",
        });
      }
    });

  const coords = await axios.post(
    `https://api.mapbox.com/search/geocode/v6/batch?access_token=${process.env.MAPBOX_API_KEY}`,
    dorm_ip_requests,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (coords.status != 200) throw Error("Couldn't reach Mapbox API");

  const batch_results: Array<{
    type: string;
    features: Array<{
      type: string;
      id: string;
      geometry: { type: string; coordinates: [number, number] };
      properties: Object;
    }>;
  }> = coords.data.batch;

  batch_results.forEach((entry, i: number) => {
    dorms[i].coordinates = entry.features[0].geometry.coordinates;
  });

  return Response.json(dorms);
}
