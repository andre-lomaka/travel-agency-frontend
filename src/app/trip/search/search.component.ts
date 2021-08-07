import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BoardBasisType } from 'src/app/model/board-basis-type';
import { City } from 'src/app/model/city';
import { TripService } from '../trip.service';

declare var $: any;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  cities: City[] = [];

  fromCity = false;
  toCity = false;
  bbt = false;
  fieldsSelected = false;

  constructor(private tripService: TripService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    $("select[multiple='multiple']").bsMultiSelect();
    $("#searchCriteria").change(() => {
      this.fromCity = false;
      this.toCity = false;
      this.bbt = false;
      this.fieldsSelected = false;
      $("#searchCriteria option:selected").toArray().map(item => {
        this.fieldsSelected = true;
        switch (item.value) {
          case 'fromCity':
            this.fromCity = true;
            break;
          case 'toCity':
            this.toCity = true;
            break;
          case 'bbt':
            this.bbt = true;
            break;
        }
      });
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
        let bbSelected = Number(paramMap.get('bbt'));
        if (bbSelected)
          qp.queryParams.bbt = bbSelected;
        this.router.navigate(['/trip/index'], qp);
      }
    });
  }

}
