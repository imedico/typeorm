import { Comment } from "./Comment";
export declare class Post {
    id: number;
    title: string;
    postType: string;
    comments?: Comment[];
}
export declare class TargetPost extends Post {
    postType: string;
}
