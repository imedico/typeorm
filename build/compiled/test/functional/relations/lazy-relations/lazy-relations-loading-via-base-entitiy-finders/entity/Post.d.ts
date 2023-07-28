import { Category } from "./Category";
import { BaseEntity } from "../../../../../../src";
export declare class Post extends BaseEntity {
    id: number;
    title: string;
    category: Promise<Category>;
}
