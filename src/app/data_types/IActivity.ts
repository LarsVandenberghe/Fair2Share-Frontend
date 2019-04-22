import { IFriend } from './IFriend';

export interface IActivity{
    activityId: number;
    name: string;
    description:string;
    currencyType: number;
    participants: IFriend[];
    //transactions:
}