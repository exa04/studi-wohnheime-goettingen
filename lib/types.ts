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
  id: number;
  web_link: string;
  name: string | undefined;
  coordinates: [number, number];
  housing_types: Array<HousingType>;
  rent: number | [number, number];
};

export type Dorm = {
  id: number;
  name: string;
  summary: string;
  images: Array<string>;

  address: string;
  coordinates: [number, number];

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
