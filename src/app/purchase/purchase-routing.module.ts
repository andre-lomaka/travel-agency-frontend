import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  { path: 'purchase', redirectTo: 'purchase/index', pathMatch: 'full' },
  { path: 'purchase/index', component: IndexComponent },
  { path: 'purchase/:id', component: CreateComponent },
  { path: 'purchase/create', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
