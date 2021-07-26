import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TripRoutingModule } from './trip-routing.module';
import { IndexComponent } from './index/index.component';
import { SearchComponent } from './search/search.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    IndexComponent,
    SearchComponent,
    ViewComponent,
    EditComponent
  ],
  imports: [
    CommonModule,
    TripRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class TripModule { }
