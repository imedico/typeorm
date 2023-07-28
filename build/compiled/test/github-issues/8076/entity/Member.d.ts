import { BaseEntity } from "../../../../src";
import { Category } from "./Category";
export declare class Member extends BaseEntity {
    pk: number;
    title: string;
    category: Category;
}
