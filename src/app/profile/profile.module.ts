import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FriendListItemComponent } from './friend-list-item/friend-list-item.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { AddActivityComponent } from '../activity/add-activity/add-activity.component';

const routes = [
  { path: '', component: ProfileComponent },
  { path: 'add-activity', component: AddActivityComponent}
];

@NgModule({
  declarations: [
    ProfileComponent,
    FriendListItemComponent,
    ActivityListComponent,
    AddActivityComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
  // ,exports: [
  //   RouterModule
  // ]
})
export class ProfileModule { }
