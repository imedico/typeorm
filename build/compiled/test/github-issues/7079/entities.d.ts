export declare class User {
    id: number;
    name: string;
    posts: Post[];
}
export declare class PublishInfo {
    date: Date;
}
export declare class Post {
    id: number;
    text: string;
    blog: PublishInfo;
    newsletter: PublishInfo;
    user: User;
}
