import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  form: FormGroup;
  tripId = 0;
  purchaseId = 0;
  create = true;
  back = 'trip';
  title = 'Create New';

  constructor(private purchaseService: PurchaseService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      numberOfAdults: new FormControl(0),
      numberOfChildren: new FormControl(0)
    });
    this.tripId = Number(this.route.snapshot.paramMap.get('idt'));
    if (this.route.snapshot.url[1].path === 'edit') {
      this.create = false;
      this.back = 'purchase';
      this.title = 'Edit';
      this.purchaseId = Number(this.route.snapshot.paramMap.get('idp'));
    }
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    let v = this.form.value;
    let p: any = { numberOfChildren: v.numberOfChildren, numberOfAdults: v.numberOfAdults, trip: { id: this.tripId } };
    if (this.create) {
      this.purchaseService.create(p).subscribe(
        res => {
          console.log('Purchase created succesfully!');
          this.router.navigateByUrl('trip/index');
        },
        (err: HttpErrorResponse) => {
          this.showError(err);
        }
      );
    } else {
      this.purchaseService.update(this.purchaseId, p).subscribe(
        res => {
          console.log('Purchase updated succesfully!');
          this.router.navigateByUrl('purchase/index');
        },
        (err: HttpErrorResponse) => {
          this.showError(err);
        }
      );
    }
  }

  showError(err: HttpErrorResponse): void {
    console.log("Message: " + err.message);
    console.log(err.error);
    console.log("Status: " + err.status);
  }
}
