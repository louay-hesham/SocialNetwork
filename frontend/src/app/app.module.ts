import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './services/api.service';
import { CommonService } from './services/common.service';

import { AppComponent } from './components/app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    CookieService,
    ApiService,
    CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
