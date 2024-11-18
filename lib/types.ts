export enum HousingType {
  GROUP = "Gruppenwohnung",
  SINGLE = "Einzelappartment",
  SHARED_2 = "2er-Gruppen-WG",
  SHARED_3 = "3er-Gruppen-WG",
  SHARED_4 = "4er-Gruppen-WG",
  DOUBLE = "Doppelappartment",
  FAMILY = "Familienwohnung",
}

export type DormResult = {
  slug: string;
  web_link: string;
  name: string | undefined;
  coordinates: [number, number];
  housing_types: Array<HousingType>;
};

export type Dorm = {
  slug: string;
  name: string;
  summary: string;
  images: Array<string>;

  address: string;

  web_link: string;

  apartment_types: Array<Apartment>;

  facilities: Array<string>;
  parking_spots: Array<string>;
};

export type Apartment = {
  housing_type: HousingType;
  verbose_housing_type: string;
  room_count: number;
  room_size: string;
  rent: number | [number, number];
  waiting_period: number | [number, number];
  furnished: boolean;
  facilities: Array<string>;
  notices: string;
  application: Application;
};

export enum Application {
  SINGLE,
  GROUP,
  NONE,
}
