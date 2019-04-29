import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
// import { ProfileComponent } from './profile/profile/profile.component';
// import { RegisterComponent } from './user/register/register.component';
// import { AddActivityComponent } from './activity/add-activity/add-activity.component';
// import { ActivityComponent } from './activity/activity/activity.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'profile', loadChildren: './profile/profile.module#ProfileModule'},
  // { path: 'profile', component: ProfileComponent },
  //{ path: 'register', component: RegisterComponent },
  // { path: 'add-activity', component: AddActivityComponent },
  // { path: 'activity', component: ActivityComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  //declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
