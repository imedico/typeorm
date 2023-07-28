export declare class Category {
    id: number;
    uid: string;
    name: string;
    parentUid?: string | null;
    parentCategory?: Category | null;
    childCategories: Category[];
}
