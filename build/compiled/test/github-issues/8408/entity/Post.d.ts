import { Category } from "./Category";
export declare class Post {
    id: number;
    categoryId: string;
    category: Category;
    deletedAt?: Date;
}
