import { Tag } from "./Tag";
import { Category } from "./Category";
import { HeroImage } from "./HeroImage";
export declare class Post {
    id: string;
    title: string;
    description: string;
    rating: number;
    version: string;
    heroImage: HeroImage;
    category: Category;
    tags: Tag[];
}
