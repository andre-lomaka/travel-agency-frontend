import { City } from "./city";

export interface Hotel {
  id: number;
  numberOfStars: number;
  name: string;
  description: string;
  city: City;
}
