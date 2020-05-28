export interface Location {
  lat: number;
  lng: number;
  _id: string;
}

export interface Poi {
  _id: string;
  AIRO_ID : number;
  Roll_No : string;
  Off_Name: string;
  Add_1: string;
  Add_2: string;
  Add_3: string;
  Add_4: string;
  County: string;
  Ethos: string;
  Island: string;
  DEIS: string;
  Gaeltacht: string;
  M_13_14: number;
  F_13_14: number;
  T_13_14: number;
  xcoord: number;
  ycoord: number;
  location: Location;
  Region: string;
  userUpdated: string;
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  level: string;
  _id: string;
}

export interface RawPoi {
  _id: string;
  AIRO_ID : number;
  Roll_No : string;
  Off_Name: string;
  Add_1: string;
  Add_2: string;
  Add_3: string;
  Add_4: string;
  County: string;
  Ethos: string;
  Island: string;
  DEIS: string;
  Gaeltacht: string;
  M_13_14: number;
  F_13_14: number;
  T_13_14: number;
  xcoord: number;
  ycoord: number;
  location: Location;
  Region: string;
  userUpdated: string;
}

