import { Continent } from "./continent";

export interface Country {
  id: number;
  name: string;
  continent: Continent;
}
