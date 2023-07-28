import { Tag } from "./Tag";
import { Author } from "./Author";
import { Counters } from "./Counters";
export declare class Post {
    id: number;
    title: string;
    text: string;
    tags: Tag[];
    author: Author;
    counters: Counters;
    toString(): string;
    doSomething(): number;
}
