import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ActivityListComponent } from './activity-list/activity-list.component';
import { AddActivityComponent } from '../activity/add-activity/add-activity.component';
import { FriendRequestsComponent } from './friend-requests/friend-requests.component';
import { AddFriendComponent } from './add-friend/add-friend.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { SharedModule } from '../shared/shared.module';

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
  { path: 'edit-profile', component: EditProfileComponent }
];

@NgModule({
  declarations: [
    ActivityListComponent,
    ProfileComponent,
    AddActivityComponent,
    FriendRequestsComponent,
    AddFriendComponent,
    EditProfileComponent,
    UploadImageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfileModule { }
