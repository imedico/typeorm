import { Product } from "./Product";
export declare class Category {
    id: number;
    name: string;
    parentCategory: Category;
    childCategories: Category[];
    product: Product;
}
