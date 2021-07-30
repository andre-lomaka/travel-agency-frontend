import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Purchase } from 'src/app/model/purchase';
import { PurchaseService } from '../purchase.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  
  purchase: Purchase = null;

  constructor(private route: ActivatedRoute, private purchaseService: PurchaseService) { }

  ngOnInit(): void {
    this.getPurchase();
  }

  getPurchase(): void {
    let purchaseId = Number(this.route.snapshot.paramMap.get('id'));
    this.purchaseService.getById(purchaseId).subscribe((data: Purchase) => {
      this.purchase = data;
    });
  }
}
