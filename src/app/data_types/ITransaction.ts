
import { IFriend } from './IFriend';
import { Time } from '@angular/common';

export interface ITransaction{
    transactionId?: number,
    name: string,
    description?: string,
    timeStamp?: Time,
    payment : number,
    profilesInTransaction? : IFriend[],
    paidBy : IFriend
}