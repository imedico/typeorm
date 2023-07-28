import { BaseEntity } from "../../../../src";
import { Category } from "./Category";
export declare class Site extends BaseEntity {
    pk: number;
    createdAt: Date;
    title: string;
    parentCategory: Category;
}
