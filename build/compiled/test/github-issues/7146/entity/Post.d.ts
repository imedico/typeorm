import { Category } from "./Category";
export declare class Post {
    id: number;
    lazyManyToOne: Promise<Category | null>;
    eagerManyToOne: Category | null;
    lazyOneToOneOwner: Promise<Category | null>;
    eagerOneToOneOwner: Category | null;
    lazyOneToOne: Promise<Category | null>;
    eagerOneToOne: Category | null;
}
