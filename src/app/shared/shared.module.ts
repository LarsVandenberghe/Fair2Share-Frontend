import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendListItemComponent } from '../profile/friend-list-item/friend-list-item.component';
import { MoneyFormatPipe } from './money-format.pipe';

@NgModule({
  declarations: [
    FriendListItemComponent,
    MoneyFormatPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FriendListItemComponent,
    MoneyFormatPipe
  ]
})
export class SharedModule { }
