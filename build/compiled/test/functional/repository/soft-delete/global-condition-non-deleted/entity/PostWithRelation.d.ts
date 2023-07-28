import { CategoryWithRelation } from "./CategoryWithRelation";
export declare class PostWithRelation {
    id: number;
    title: string;
    category: CategoryWithRelation;
    deletedAt: Date;
}
