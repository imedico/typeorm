import { Photo } from "./Photo";
export declare class User {
    id: number;
    name: string;
    deletedAt: Date;
    manyPhotos: Photo[];
    manyToManyPhotos: Photo[];
}
