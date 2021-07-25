import { Trip } from "../model/trip";

export interface Purchase {
  id: number;
  numberOfAdults: number;
  numberOfChildren: number;
  price: number;
  createdAt: Date;
  trip: Trip;
}
