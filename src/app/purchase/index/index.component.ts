import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Purchase } from 'src/app/model/purchase';
import { PurchaseService } from '../purchase.service';

declare var $: any;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  purchases: Purchase[] = [];
  purchaseToDelete = 0;
  
  constructor(private purchaseService: PurchaseService) { }

  ngOnInit(): void {
    this.purchaseService.getAll().subscribe((data: Purchase[]) => {
      this.purchases = data;
    },
    (err: HttpErrorResponse) => {
      this.showError(err);
    });
  }

  deletePurchase() {
    this.purchaseService.delete(this.purchaseToDelete).subscribe(res => {
      this.purchases = this.purchases.filter(item => item.id !== this.purchaseToDelete);
      console.log('Purchase deleted succesfully!');
    },
    (err: HttpErrorResponse) => {
      this.showError(err);
    });
    this.closeModal();
  }

  openModal(id: number) {
    this.purchaseToDelete = id;
    $('#deleteModal').modal('show');
  }

  closeModal() {
    $('#deleteModal').modal('hide');
  }

  showError(err: HttpErrorResponse): void {
    console.log("Message: " + err.message);
    console.log(err.error);
    console.log("Status: " + err.status);
  }
}
