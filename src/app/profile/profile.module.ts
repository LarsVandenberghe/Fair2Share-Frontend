import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FriendListItemComponent } from './friend-list-item/friend-list-item.component';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { AddActivityComponent } from '../activity/add-activity/add-activity.component';
import { FriendRequestsComponent } from './friend-requests/friend-requests.component';
import { AddFriendComponent } from './add-friend/add-friend.component';

const routes = [
  { path: '', component: ProfileComponent },
  { path: 'add-activity', component: AddActivityComponent},
  { 
    path: 'activity', 
    loadChildren: '../activity/activity.module#ActivityModule',
    data: { preload: true }
  },
  { path: 'friend-requests', component: FriendRequestsComponent },
  { path: 'send-friend-request', component: AddFriendComponent },
];

@NgModule({
  declarations: [
    ActivityListComponent,
    ProfileComponent,
    FriendListItemComponent,
    AddActivityComponent,
    FriendRequestsComponent,
    AddFriendComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfileModule { }
