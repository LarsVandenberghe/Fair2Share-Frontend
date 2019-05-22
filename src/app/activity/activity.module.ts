import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { ActivityComponent } from './activity/activity.component';
import { TransactionTableComponent } from './transaction-table/transaction-table.component';
import { SummaryTableComponent } from './summary-table/summary-table.component';
import { TransactionComponent } from './activity/transaction/transaction.component';
import { ManageParticipantsComponent } from './activity/manage-participants/manage-participants.component';
import { ManageTParticipantsComponent } from './activity/transaction/manage-tparticipants/manage-tparticipants.component';
import { EditTransactionComponent } from './activity/transaction/edit-transaction/edit-transaction.component';
import { EditActivityComponent } from './activity/edit-activity/edit-activity.component';
import { AddTransactionComponent } from './activity/add-transaction/add-transaction.component';

const routes = [
  { path: ':id', component: ActivityComponent },
  { path: ':id/edit', component: EditActivityComponent },
  { path: ':id/participants', component: ManageParticipantsComponent },
  { path: ':id/add-transaction', component: AddTransactionComponent },
  { path: ':id/transaction/:transaction-id', component: TransactionComponent },
  { path: ':id/transaction/:transaction-id/edit', component: EditTransactionComponent }
];

@NgModule({
  declarations: [
    ActivityComponent,
    TransactionTableComponent,
    SummaryTableComponent,
    AddTransactionComponent,
    TransactionComponent,
    ManageParticipantsComponent,
    ManageTParticipantsComponent,
    EditTransactionComponent,
    EditActivityComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ActivityModule { }
