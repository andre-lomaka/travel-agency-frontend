import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PurchaseModule } from './purchase/purchase.module';
import { TripModule } from './trip/trip.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PurchaseModule,
    TripModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
