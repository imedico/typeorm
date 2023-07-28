import { BaseEntity } from "../../../../src";
import { Site } from "./Site";
export declare class Category extends BaseEntity {
    pk: number;
    title: string;
    parentCategory: Category | null;
    childCategories: Category[];
    sites: Site[];
}
