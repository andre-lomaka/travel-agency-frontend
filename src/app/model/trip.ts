import { Airport } from "./airport";
import { BoardBasisType } from "./board-basis-type";
import { City } from "./city";
import { Hotel } from "./hotel";

export interface Trip {
  id: number;
  departureDate: Date;
  returnDate: Date;
  adultPrice: number;
  childPrice: number;
  promoted: boolean;
  numberOfAdultBeds: number;
  numberOfChildBeds: number;
  vacancies: number;
  boardBasisType: BoardBasisType;
  fromCity: City;
  fromAirport: Airport;
  toCity: City;
  toAirport: Airport;
  toHotel: Hotel; 
}
