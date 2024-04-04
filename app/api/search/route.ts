import { Dorm, DormResult, HousingType } from "@/lib/types";

export async function GET() {
  return Response.json(get_all());
}

export function get_all(): Array<DormResult> {
  return [
    {
      id: 0,
      web_link:
        "https://www.studentenwerk-goettingen.de/studentisches-wohnen/unsere-wohnheime/albrecht-thaer-weg-10-14b",
      name: "Albrecht-Thaer-Weg 10-14b",
      coordinates: [51.5471859, 9.946909],
      housing_types: [HousingType.GROUP, HousingType.SINGLE],
      rent: 200,
    },
    {
      id: 1,
      web_link:
        "https://www.studentenwerk-goettingen.de/studentisches-wohnen/unsere-wohnheime/albrecht-thaer-weg-8-26",
      name: "Albrecht-Thaer-Weg 8-26",
      coordinates: [51.5471859, 9.946909],
      housing_types: [HousingType.FAMILY],
      rent: 335,
    },
    {
      id: 2,
      web_link:
        "https://www.studentenwerk-goettingen.de/studentisches-wohnen/unsere-wohnheime/albrecht-thaer-weg-16-c-d",
      name: "Albrecht-Thaer-Weg 16",
      coordinates: [51.548188, 9.949091],
      housing_types: [HousingType.GROUP],
      rent: 325,
    },
    {
      id: 3,
      web_link:
        "https://www.studentenwerk-goettingen.de/studentisches-wohnen/unsere-wohnheime/albrecht-thaer-weg-18-20c",
      name: "Albrecht-Thaer-Weg 18-20c",
      coordinates: [51.548123, 9.947093],
      housing_types: [HousingType.GROUP, HousingType.SHARED_2],
      rent: 262,
    },
    {
      id: 4,
      web_link:
        "https://www.studentenwerk-goettingen.de/studentisches-wohnen/unsere-wohnheime/studentenwerk-goettingen-wohnheim-arndtstrasse-9",
      name: "Arndtstraße 9",
      coordinates: [51.54665095, 9.932825128127721],
      housing_types: [HousingType.GROUP],
      rent: 205,
    },
    {
      id: 5,
      web_link:
        "https://www.studentenwerk-goettingen.de/studentisches-wohnen/unsere-wohnheime/christophorusweg-12",
      name: "Christophorusweg 12",
      coordinates: [51.5485977, 9.937142502450659],
      housing_types: [
        HousingType.GROUP,
        HousingType.SINGLE,
        HousingType.DOUBLE,
      ],
      rent: 221,
    },
    {
      id: 6,
      web_link:
        "https://www.studentenwerk-goettingen.de/studentisches-wohnen/unsere-wohnheime/geiststrasse-4/5",
      name: "Geiststraße 4/5",
      coordinates: [51.53402355, 9.928088849684112],
      housing_types: [HousingType.DOUBLE, HousingType.GROUP],
      rent: 297,
    },
    {
      id: 7,
      web_link:
        "https://www.studentenwerk-goettingen.de/studentisches-wohnen/unsere-wohnheime/wohnheim-gosslerstrasse-12b",
      name: "Goßlerstraße 12b",
      coordinates: [51.5414755, 9.9381651],
      housing_types: [HousingType.GROUP],
      rent: 257,
    },
    {
      id: 8,
      web_link:
        "https://www.studentenwerk-goettingen.de/studentisches-wohnen/unsere-wohnheime/gosslerstrasse-13-akademische-burse",
      name: "Goßlerstraße 13",
      coordinates: [51.54170515, 9.93737433010335],
      housing_types: [
        HousingType.GROUP,
        HousingType.SINGLE,
        HousingType.SHARED_2,
        HousingType.DOUBLE,
      ],
      rent: 154,
    },
    {
      id: 9,
      web_link:
        "https://www.studentenwerk-goettingen.de/studentisches-wohnen/unsere-wohnheime/lutterterrasse-grisebachstrasse-7",
      name: "Lutterterrasse",
      coordinates: [51.5575703, 9.9522745],
      housing_types: [HousingType.SINGLE],
      rent: 348,
    },
    {
      id: 10,
      web_link:
        "https://www.studentenwerk-goettingen.de/studentisches-wohnen/unsere-wohnheime/gutenbergstrasse-2-42-studentendorf",
      name: "Studentendorf",
      coordinates: [51.5433278, 9.9491999],
      housing_types: [
        HousingType.GROUP,
        HousingType.SINGLE,
        HousingType.DOUBLE,
      ],
      rent: 193,
    },
    {
      id: 11,
      web_link:
        "https://www.studentenwerk-goettingen.de/studentisches-wohnen/unsere-wohnheime/hermann-rein-strasse-5-13",
      name: "Hermann-Rein-Straße 5-13",
      coordinates: [51.554506, 9.937757],
      housing_types: [
        HousingType.DOUBLE,
        HousingType.SHARED_2,
        HousingType.FAMILY,
      ],
      rent: 360,
    },
    {
      id: 12,
      web_link:
        "https://www.studentenwerk-goettingen.de/studentisches-wohnen/unsere-wohnheime/johanniskirchhof-3/paulinerstrasse-9",
      name: "Johanniskirchhof 3/ Paulinerstraße 9",
      coordinates: [51.5332652, 9.933105335582308],
      housing_types: [HousingType.SINGLE, HousingType.DOUBLE],
      rent: 243,
    },
    {
      id: 13,
      web_link:
        "https://www.studentenwerk-goettingen.de/studentisches-wohnen/unsere-wohnheime/kellnerweg-8-24",
      name: "Kellnerweg 8-24",
      coordinates: [51.56076, 9.951418],
      housing_types: [HousingType.SINGLE, HousingType.SHARED_2],
      rent: 268,
    },
    {
      id: 14,
      web_link:
        "https://www.studentenwerk-goettingen.de/studentisches-wohnen/unsere-wohnheime/kreuzbergring-2",
      name: "Kreuzbergring 2",
      coordinates: [51.542318800000004, 9.932971749642508],
      housing_types: [HousingType.GROUP],
      rent: 197,
    },
    {
      id: 15,
      web_link:
        "https://www.studentenwerk-goettingen.de/studentisches-wohnen/unsere-wohnheime/kreuzbergring-4/4a",
      name: "Kreuzbergring 4/4a",
      coordinates: [51.542433, 9.9333217982612],
      housing_types: [HousingType.SHARED_3, HousingType.SHARED_4],
      rent: 194,
    },
    {
      id: 16,
      web_link:
        "https://www.studentenwerk-goettingen.de/studentisches-wohnen/unsere-wohnheime/kreuzbergring-14/16",
      name: "Kreuzbergring 14/16",
      coordinates: [51.542832399999995, 9.934658436300694],
      housing_types: [HousingType.SHARED_2],
      rent: 270,
    },
    {
      id: 17,
      web_link:
        "https://www.studentenwerk-goettingen.de/studentisches-wohnen/unsere-wohnheime/kreuzbergring-18/20",
      name: "Kreuzbergring 18/20",
      coordinates: [51.54296895, 9.935111449999997],
      housing_types: [HousingType.SINGLE, HousingType.SHARED_2],
      rent: 319,
    },
    {
      id: 18,
      web_link:
        "https://www.studentenwerk-goettingen.de/studentisches-wohnen/unsere-wohnheime/kreuzbergring-22/24",
      name: "Kreuzbergring 22/24",
      coordinates: [51.5431405, 9.93567225],
      housing_types: [HousingType.SHARED_2, HousingType.GROUP],
      rent: 218,
    },
    {
      id: 19,
      web_link:
        "https://www.studentenwerk-goettingen.de/studentisches-wohnen/unsere-wohnheime/kreuzbergring-30/32",
      name: "Kreuzbergring 30/32",
      coordinates: [51.54341735, 9.93661071914373],
      housing_types: [HousingType.SHARED_2],
      rent: 296,
    },
    {
      id: 20,
      web_link:
        "https://www.studentenwerk-goettingen.de/studentisches-wohnen/unsere-wohnheime/kreuzbergring-44/46",
      name: "Kreuzbergring 44/46",
      coordinates: [51.544530699999996, 9.941406550679059],
      housing_types: [HousingType.GROUP],
      rent: 223,
    },
    {
      id: 21,
      web_link:
        "https://www.studentenwerk-goettingen.de/studentisches-wohnen/unsere-wohnheime/kreuzbergring-56-56d",
      name: "Kreuzbergring 56-56",
      coordinates: [51.544429, 9.945196],
      housing_types: [
        HousingType.SINGLE,
        HousingType.SHARED_2,
        HousingType.GROUP,
      ],
      rent: 288,
    },
    {
      id: 22,
      web_link:
        "https://www.studentenwerk-goettingen.de/studentisches-wohnen/unsere-wohnheime/kurze-strasse-15-carl-friedrich-gaussheim",
      name: "Carl-Friedrich-Gauß-Heim",
      coordinates: [51.5305798, 9.9358869],
      housing_types: [HousingType.GROUP],
      rent: 224,
    },
    {
      id: 23,
      web_link:
        "https://www.studentenwerk-goettingen.de/studentisches-wohnen/unsere-wohnheime/robert-koch-strasse-38",
      name: "Robert-Koch-Straße 38",
      coordinates: [51.54947005, 9.93960844296578],
      housing_types: [
        HousingType.GROUP,
        HousingType.SINGLE,
        HousingType.DOUBLE,
      ],
      rent: 217,
    },
    {
      id: 24,
      web_link:
        "https://www.studentenwerk-goettingen.de/studentisches-wohnen/unsere-wohnheime/roedererstrasse-15-max-kade-haus",
      name: "Max-Kade-Haus",
      coordinates: [51.54404195, 9.94638720774241],
      housing_types: [HousingType.SINGLE],
      rent: 242,
    },
    {
      id: 25,
      web_link:
        "https://www.studentenwerk-goettingen.de/studentisches-wohnen/unsere-wohnheime/rosenbachweg-2-12-studentensiedlung",
      name: "Studentensiedlung",
      coordinates: [51.553904, 9.93751],
      housing_types: [
        HousingType.SINGLE,
        HousingType.DOUBLE,
        HousingType.SHARED_2,
      ],
      rent: 280,
    },
    {
      id: 26,
      web_link:
        "https://www.studentenwerk-goettingen.de/studentisches-wohnen/unsere-wohnheime/stumpfebiel-2/2a",
      name: "Stumpfebiel 2/2a",
      coordinates: [51.5353725, 9.933668551350607],
      housing_types: [HousingType.GROUP, HousingType.SHARED_2],
      rent: 183,
    },
    {
      id: 27,
      web_link:
        "https://www.studentenwerk-goettingen.de/studentisches-wohnen/unsere-wohnheime/theodor-heuss-strasse-13",
      name: "Theodor-Heuss-Straße 13",
      coordinates: [51.55463295, 9.935553652180264],
      housing_types: [HousingType.GROUP, HousingType.SHARED_2],
      rent: 323,
    },
    {
      id: 28,
      web_link:
        "https://www.studentenwerk-goettingen.de/studentisches-wohnen/unsere-wohnheime/zimmermannstrasse-3/5",
      name: "Zimmermannstraße 3/5",
      coordinates: [51.5534298, 9.941946026158973],
      housing_types: [HousingType.SHARED_2, HousingType.GROUP],
      rent: 248,
    },
    {
      id: 29,
      web_link:
        "https://www.studentenwerk-goettingen.de/studentisches-wohnen/unsere-wohnheime/zimmermannstrasse-14/16-am-papenberg",
      name: "Papenberg",
      coordinates: [51.5523547, 9.9485143],
      housing_types: [
        HousingType.SHARED_2,
        HousingType.SHARED_3,
        HousingType.SHARED_4,
      ],
      rent: 220,
    },
  ];
}
