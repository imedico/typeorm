import { Category } from "./Category";
import { Post } from "./Post";
export declare class PostCategory {
    post: Promise<Post>;
    postId: Post["id"];
    category: Promise<Category>;
    categoryId: Category["id"];
    added: Date;
}
