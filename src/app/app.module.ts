import { httpInterceptorProviders } from './user/http-interceptors';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
// import { RouterModule, Routes } from '@angular/router';
import { UserModule } from './user/user.module';
import { ProfileModule } from './profile/profile.module';
import { AppRoutingModule } from './app-routing.module';
//import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
// import { ActivityListComponent } from './profile/activity-list/activity-list.component';
// import { FriendListItemComponent } from './friend-list-item/friend-list-item.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    UserModule,
    AppRoutingModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
