import { httpInterceptorProviders } from './user/http-interceptors';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserModule } from './user/user.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './user/register.component';
import { ActivityComponent } from './activity/activity/activity.component';
import { ActivityListComponent } from './profile/activity-list/activity-list.component';
import { AddActivityComponent } from './activity/add-activity/add-activity.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'add-activity', component: AddActivityComponent },
  { path: 'activity', component: ActivityComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'}
  // { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    HomeComponent,
    ActivityComponent,
    ActivityListComponent,
    AddActivityComponent
  ],
  imports: [
    BrowserModule,
    UserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
