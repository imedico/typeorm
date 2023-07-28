import { Post } from "./Post";
import { BaseEntity } from "../../../../../../src";
export declare class Category extends BaseEntity {
    id: number;
    name: string;
    posts: Promise<Post[]>;
}
