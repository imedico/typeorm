import { Post } from "./Post";
import { Category } from "./Category";
import { Image } from "./Image";
export declare class PostCategory {
    postId: number;
    categoryId: number;
    post: Post;
    category: Category;
    image: Image;
    imageId: number;
}
