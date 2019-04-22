import { IFriend } from './IFriend';
import { IActivity } from './IActivity';

export interface IProfile{
    profileId: number;
    firstname: string;
    lastname: string;
    email: string;
    pathToImage: string;
    friends: IFriend[];
    activities: IActivity[];
    amountOfFriendRequests: number;

}