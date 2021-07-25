import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { IndexComponent } from './index/index.component';
import { SearchComponent } from './search/search.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: 'trip', redirectTo: 'trip/index', pathMatch: 'full' },
  { path: 'trip/search', component: SearchComponent },
  { path: 'trip/index', component: IndexComponent },
  { path: 'trip/view/:id', component: ViewComponent },
  { path: 'trip/edit/:id', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TripRoutingModule { }
