import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Purchase } from 'src/app/model/purchase';
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  purchases: Purchase[] = [];
  
  constructor(private purchaseService: PurchaseService) { }

  ngOnInit(): void {
    this.purchaseService.getAll().subscribe((data: Purchase[]) => {
      this.purchases = data;
    },
    (err: HttpErrorResponse) => {
      console.log("Message: " + err.message);
      console.log(err.error);
      console.log("Status: " + err.status);
    });
  }

}
