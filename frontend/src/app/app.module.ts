import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MyDatePickerModule } from 'mydatepicker';

import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './services/api.service';
import { CommonService } from './services/common.service';

import { AppComponent } from './components/app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { EditProfileComponent } from './components/home/edit-profile/edit-profile.component';
import { RequestsComponent } from './components/home/requests/requests.component';
import { FriendsComponent } from './components/home/friends/friends.component';
import { SearchComponent } from './components/home/search/search.component';
import { PeopleComponent } from './components/home/search/people/people.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    EditProfileComponent,
    RequestsComponent,
    FriendsComponent,
    SearchComponent,
    PeopleComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MyDatePickerModule
  ],
  providers: [
    CookieService,
    ApiService,
    CommonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
