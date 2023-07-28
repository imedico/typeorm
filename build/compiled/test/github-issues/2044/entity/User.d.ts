import { Photo } from "./Photo";
export declare class User {
    private _id;
    get id(): string;
    set id(value: string);
    age: number;
    photos: Photo[];
}
