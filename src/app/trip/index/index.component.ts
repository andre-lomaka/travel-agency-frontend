import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trip } from 'src/app/model/trip';
import { TripService } from '../trip.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  trips: Trip[] = [];
  tripsLoaded = false;

  constructor(private route: ActivatedRoute, private tripService: TripService) { }

  ngOnInit(): void {
    this.tripService.getByCriteria(this.route.snapshot.queryParams).subscribe((data: Trip[]) => {
      this.trips = data;
      this.tripsLoaded = true;
    },
    (err: HttpErrorResponse) => {
      console.log("Message: " + err.message);
      console.log(err.error);
      console.log("Status: " + err.status);
    }
  )}

}
