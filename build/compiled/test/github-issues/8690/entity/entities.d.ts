export declare class User {
    id: string;
    photos: Promise<Photo[]>;
}
export declare class Photo {
    id: string;
    url: string;
    userId: string;
    user: Promise<User>;
}
