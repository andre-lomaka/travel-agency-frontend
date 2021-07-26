import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { City } from 'src/app/model/city';
import { Trip } from 'src/app/model/trip';
import { TripService } from '../trip.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  cities: City[] = [];
  form: FormGroup;

  constructor(private tripService: TripService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      departureDate: new FormControl(''),
      returnDate: new FormControl(''),
      cityDeparture: new FormControl(''),
      cityStay: new FormControl(''),
      adultPrice: new FormControl(''),
      childPrice: new FormControl(''),
      nAdultBeds: new FormControl(''),
      nChildBeds: new FormControl(''),
      vacancies: new FormControl('')
    });
    this.tripService.getAllCities().subscribe((data: City[]) => {
      this.cities = data;
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
      this.form.controls['cityStay'].setValue(data.toCity.id);
      this.form.controls['adultPrice'].setValue(data.adultPrice);
      this.form.controls['childPrice'].setValue(data.childPrice);
      this.form.controls['nAdultBeds'].setValue(data.numberOfAdultBeds);
      this.form.controls['nChildBeds'].setValue(data.numberOfChildBeds);
      this.form.controls['vacancies'].setValue(data.vacancies);
    },
    (err: HttpErrorResponse) => {
      console.log("Message: " + err.message);
      console.log(err.error);
      console.log("Status: " + err.status);
    });
  }

  submit() {
    let v = this.form.value;
  }

}
