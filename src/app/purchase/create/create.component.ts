import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form: FormGroup;
  tripId = 0;

  constructor(private purchaseService: PurchaseService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      numberOfAdults: new FormControl(''),
      numberOfChildren: new FormControl('')
    });
    this.getTrip();
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    let v = this.form.value;
    let p: any = { numberOfChildren: v.numberOfChildren, numberOfAdults: v.numberOfAdults, trip: { id: this.tripId } };
    this.purchaseService.create(p).subscribe(
      res => {
        console.log('Purchase created succesfully!');
        this.router.navigateByUrl('purchase/index');
      },
      (err: HttpErrorResponse) => {
        console.log("Message: " + err.message);
        console.log(err.error);
        console.log("Status: " + err.status);
      }
    );
  }

  getTrip(): void {
    this.tripId = Number(this.route.snapshot.paramMap.get('id'));
  }
}
