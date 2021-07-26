import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { City } from 'src/app/model/city';
import { TripService } from '../trip.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  cities: City[] = [];

  constructor(private tripService: TripService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.tripService.getAllCities().subscribe((data: City[]) => {
      this.cities = data;
    },
    (err: HttpErrorResponse) => {
      console.log("Message: " + err.message);
      console.log(err.error);
      console.log("Status: " + err.status);
    },
    () => {
      const paramMap = this.route.snapshot.queryParamMap;
      if (paramMap.keys.length > 0) {
        let city = paramMap.get('fromCity');
        let citySelected = this.cities.filter(obj => { return obj.name === city; });
        let qp: any = { queryParams: {} };
        if (citySelected.length === 1)
          qp.queryParams.fromCity = citySelected[0].id;
        city = paramMap.get('toCity');
        citySelected = this.cities.filter(obj => { return obj.name === city; });
        if (citySelected.length === 1)
          qp.queryParams.toCity = citySelected[0].id;
        this.router.navigate(['/trip/index'], qp);
      }
    });
  }

}
