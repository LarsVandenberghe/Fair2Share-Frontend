import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { ActivityComponent } from './activity/activity.component';
import { RouterModule } from '@angular/router';
import { ProfileModule } from '../profile/profile.module';
import { SharedModule } from '../shared/shared.module';
import { ManageParticipantsComponent } from './manage-participants/manage-participants.component';

const routes = [
  { path: ':id', component: ActivityComponent },
  { path: ':id/participants', component: ManageParticipantsComponent }
];

@NgModule({
  declarations: [
    ActivityComponent,
    ManageParticipantsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class ActivityModule { }
