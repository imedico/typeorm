import { BaseEntity } from "../../../../src";
import { Photo } from "./Photo";
export declare class User extends BaseEntity {
    id: number;
    name: string;
    photos: Photo[];
}
