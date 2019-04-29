import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { ActivityComponent } from './activity/activity.component';
import { RouterModule } from '@angular/router';

const routes = [
  { path: '', component: ActivityComponent }
];

@NgModule({
  declarations: [
    ActivityComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ActivityModule { }
