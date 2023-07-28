import { Category } from "./Category";
export declare class Post {
    id: number | undefined | null | string;
    externalId?: string;
    title: string;
    subTitle: string;
    dateAdded?: Date;
    category?: Category;
    createdAt: Date;
    updatedAt: Date;
}
