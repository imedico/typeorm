import { BaseEntity } from "../../../../src";
export declare class Post extends BaseEntity {
    id: number;
    title: string;
    author: string | null;
}
