import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GiftFormComponent } from './components/gift-form/gift-form.component';

const routes: Routes = [
  { path: 'gift-form', component: GiftFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }