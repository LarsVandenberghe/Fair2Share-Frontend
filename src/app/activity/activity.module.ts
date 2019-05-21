import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { ActivityComponent } from './activity/activity.component';
import { RouterModule } from '@angular/router';
import { ProfileModule } from '../profile/profile.module';
import { SharedModule } from '../shared/shared.module';
import { ManageParticipantsComponent } from './manage-participants/manage-participants.component';
import { TransactionTableComponent } from './transaction-table/transaction-table.component';
import { SummaryTableComponent } from './summary-table/summary-table.component';
import { AddTransactionComponent } from './add-transaction/add-transaction.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes = [
  { path: ':id', component: ActivityComponent },
  { path: ':id/participants', component: ManageParticipantsComponent },
  { path: ':id/add-transaction', component: AddTransactionComponent }
];

@NgModule({
  declarations: [
    ActivityComponent,
    ManageParticipantsComponent,
    TransactionTableComponent,
    SummaryTableComponent,
    AddTransactionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ActivityModule { }
