import { User } from "./User";
import { Photo } from "./Photo";
export declare class UserPhoto {
    isProfilePhoto: boolean;
    user: User;
    userId: User["id"];
    photo: Photo;
    photoId: Photo["id"];
}
