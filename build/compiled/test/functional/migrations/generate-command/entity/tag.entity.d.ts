import { BaseEntity } from "../../../../../src/repository/BaseEntity";
import { Post } from "./post.entity";
export declare class Tag extends BaseEntity {
    id: number;
    name: string;
    posts: Post | null;
}
