import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GiftFormComponent } from './components/gift-form/gift-form.component';
import { ChildListComponent } from './components/child-list/child-list.component';
import { GiftListComponent } from './components/gift-list/gift-list.component';

@NgModule({
  declarations: [
    AppComponent,
    GiftFormComponent,
    ChildListComponent,
    GiftListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }