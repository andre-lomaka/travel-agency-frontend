import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: 'purchase', redirectTo: 'purchase/index', pathMatch: 'full' },
  { path: 'purchase/index', component: IndexComponent },
  { path: 'purchase/edit/:idp/:idt', component: EditComponent },
  { path: 'purchase/create/:idt', component: EditComponent },
  { path: 'purchase/view/:id', component: ViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
