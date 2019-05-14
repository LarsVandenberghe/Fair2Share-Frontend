import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FriendListItemComponent } from '../profile/friend-list-item/friend-list-item.component';

@NgModule({
  declarations: [
    FriendListItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FriendListItemComponent
  ]
})
export class SharedModule { }
