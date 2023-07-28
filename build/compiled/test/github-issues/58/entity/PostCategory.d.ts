import { Post } from "./Post";
import { Category } from "./Category";
export declare class PostCategory {
    postId: number;
    categoryId: number;
    post: Post;
    category: Category;
    addedByAdmin: boolean;
    addedByUser: boolean;
}
