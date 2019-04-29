import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FriendListItemComponent } from './friend-list-item/friend-list-item.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { AddActivityComponent } from '../activity/add-activity/add-activity.component';
//import { ActivityModule } from '../activity/activity.module';
//import { ActivityComponent } from '../activity/activity/activity.component';

const routes = [
  { path: '', component: ProfileComponent },
  { path: 'add-activity', component: AddActivityComponent},
  { 
    path: 'activity', 
    loadChildren: '../activity/activity.module#ActivityModule'
    //data: { preload: true }
},
];

@NgModule({
  declarations: [
    ActivityListComponent,
    ProfileComponent,
    FriendListItemComponent,
    AddActivityComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
  // ,exports: [
  //   RouterModule
  // ]
})
export class ProfileModule { }
