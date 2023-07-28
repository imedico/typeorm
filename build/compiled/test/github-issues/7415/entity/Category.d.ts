import { Slug } from "./Slug";
export declare class Category {
    id: Slug;
    children: Category[];
    parent: Category;
    constructor(slug: string, parent?: Category);
}
