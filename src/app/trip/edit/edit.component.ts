import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Airport } from 'src/app/model/airport';
import { City } from 'src/app/model/city';
import { Hotel } from 'src/app/model/hotel';
import { Trip } from 'src/app/model/trip';
import { TripService } from '../trip.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  cities: City[] = [];
  hotelsAll: Hotel[] = [];
  hotels: Hotel[] = [];
  airportsAll: Airport[] = [];
  airportFroms: Airport[] = [];
  airportTos: Airport[] = [];
  form: FormGroup;

  constructor(private tripService: TripService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      departureDate: new FormControl(''),
      returnDate: new FormControl(''),
      cityDeparture: new FormControl(''),
      airportDeparture: new FormControl(''),
      cityStay: new FormControl(''),
      airportArrival: new FormControl(''),
      hotelStay: new FormControl(''),
      adultPrice: new FormControl(''),
      childPrice: new FormControl(''),
      nAdultBeds: new FormControl(''),
      nChildBeds: new FormControl(''),
      vacancies: new FormControl(''),
      boardBasisType: new FormControl(''),
      promoted: new FormControl('')
    });
    this.getCityData();
  }

  getCityData(): void {
    this.tripService.getAllCities().subscribe((data: City[]) => {
      this.cities = data;
    },
    (err: HttpErrorResponse) => {
      console.log("Message: " + err.message);
      console.log(err.error);
      console.log("Status: " + err.status);
    },
    () => {
      this.getHotelData();
    });
  }

  getHotelData(): void {
    this.tripService.getAllHotels().subscribe((data: Hotel[]) => {
      this.hotelsAll = data;
    },
    (err: HttpErrorResponse) => {
      console.log("Message: " + err.message);
      console.log(err.error);
      console.log("Status: " + err.status);
    },
    () => {
      this.getAirportData();
    });
  }

  getAirportData(): void {
    this.tripService.getAllAirports().subscribe((data: Airport[]) => {
      this.airportsAll = data;
    },
    (err: HttpErrorResponse) => {
      console.log("Message: " + err.message);
      console.log(err.error);
      console.log("Status: " + err.status);
    },
    () => {
      this.getTripData();
    });
  }

  getTripData(): void {
    let tripId = Number(this.route.snapshot.paramMap.get('id'));
    this.tripService.getById(tripId).subscribe((data: Trip) => {
      this.form.controls['departureDate'].setValue(data.departureDate);
      this.form.controls['returnDate'].setValue(data.returnDate);
      this.form.controls['cityDeparture'].setValue(data.fromCity.id);
      this.filterAirportsByCity(data.fromCity.id, this.airportFroms);
      if (this.airportFroms.length) this.form.controls['airportDeparture'].setValue(data.fromAirport.id);
      else this.form.controls['airportDeparture'].setValue('');
      this.form.controls['cityStay'].setValue(data.toCity.id);
      this.filterHotelsByCity(data.toCity.id);
      this.filterAirportsByCity(data.toCity.id, this.airportTos);
      if (this.airportTos.length) this.form.controls['airportArrival'].setValue(data.toAirport.id);
      else this.form.controls['airportArrival'].setValue('');
      if (this.hotels.length) this.form.controls['hotelStay'].setValue(data.toHotel.id);
      else this.form.controls['hotelStay'].setValue('');
      this.form.controls['adultPrice'].setValue(data.adultPrice);
      this.form.controls['childPrice'].setValue(data.childPrice);
      this.form.controls['nAdultBeds'].setValue(data.numberOfAdultBeds);
      this.form.controls['nChildBeds'].setValue(data.numberOfChildBeds);
      this.form.controls['vacancies'].setValue(data.vacancies);
      this.form.controls['boardBasisType'].setValue(data.boardBasisType.typeString);
      this.form.controls['promoted'].setValue(data.promoted);
    },
    (err: HttpErrorResponse) => {
      console.log("Message: " + err.message);
      console.log(err.error);
      console.log("Status: " + err.status);
    },
    () => {
      this.form.get('cityStay').valueChanges.subscribe(val => {
        if (val) {
          const id = Number(val);
          this.filterHotelsByCity(id);
          if (this.hotels.length) this.form.controls['hotelStay'].setValue(this.hotels[0].id);
          else {
            this.form.controls['hotelStay'].setValue('');
            this.hotels = []; 
          }
          this.filterAirportsByCity(id, this.airportTos);
          if (this.airportTos.length) this.form.controls['airportArrival'].setValue(this.airportTos[0].id);
          else {
            this.form.controls['airportArrival'].setValue('');
            this.airportTos = [];
          }
        } else {
          this.form.controls['hotelStay'].setValue('');
          this.hotels = [];
          this.form.controls['airportArrival'].setValue('');
          this.airportTos = [];
        }
      });
      this.form.get('cityDeparture').valueChanges.subscribe(val => {
        if (val) {
          const id = Number(val);
          this.filterAirportsByCity(id, this.airportFroms);
          if (this.airportFroms.length) this.form.controls['airportDeparture'].setValue(this.airportFroms[0].id);
          else {
            this.form.controls['airportDeparture'].setValue('');
            this.airportFroms = [];
          }
        } else {
          this.form.controls['airportDeparture'].setValue('');
          this.airportFroms = [];
        }
      });
    });
  }

  filterHotelsByCity(cityId: number): void {
    this.hotels = this.hotelsAll.filter(obj => { return obj.city.id === cityId; } );
  }

  filterAirportsByCity(cityId: number, airports: Airport[]): void {
    airports.length = 0;
    airports.push.apply(airports, this.airportsAll.filter(obj => { return obj.city.id === cityId; } ));
  }

  submit() {
    let v = this.form.value;
  }

}
