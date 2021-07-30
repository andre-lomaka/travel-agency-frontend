import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Trip } from 'src/app/model/trip';
import { TripService } from '../trip.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  trip: Trip = null;
  
  constructor(private route: ActivatedRoute, private tripService: TripService) { }

  ngOnInit(): void {
    this.getTrip();
  }

  getTrip(): void {
    let tripId = Number(this.route.snapshot.paramMap.get('id'));
    this.tripService.getById(tripId).subscribe((data: Trip) => {
      this.trip = data;
    });
  }

}
