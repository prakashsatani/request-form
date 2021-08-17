import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './views/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RequestComponent } from './views/request/request.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
@NgModule({
  declarations: [AppComponent, LoginComponent, RequestComponent],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule, NgMultiSelectDropDownModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
