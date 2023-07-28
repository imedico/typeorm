import { BaseEntity } from "../../../../src";
import { Category } from "./Category";
export declare class Post extends BaseEntity {
    id: number;
    externalId?: string;
    title: string;
    text: string;
    categories: Category[];
}
