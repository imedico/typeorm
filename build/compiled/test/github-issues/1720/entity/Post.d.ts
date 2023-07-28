import { Category } from "./Category";
export declare class Post {
    id: number;
    title: string;
    get categories(): Category[];
    set categories(arr: Category[]);
    private _categories;
}
