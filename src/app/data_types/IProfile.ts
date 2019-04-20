import { IFriend } from './IFriend';

export interface IProfile{
    profileId: number;
    firstname: string;
    lastname: string;
    email: string;
    pathToImage: string;
    friends: IFriend[];
    amountOfFriendRequests: number;
}