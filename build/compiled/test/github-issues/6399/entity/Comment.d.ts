import { Post } from "./Post";
export declare class Comment {
    id: number;
    text: string;
    postId: number;
    post?: Post;
}
