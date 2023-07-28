import { ObjectId } from "../../../../src";
export declare class Page {
    number: number;
}
export declare class Chapter {
    title: string;
    pages: Page[];
}
export declare class Book {
    id: ObjectId;
    title: string;
    chapters: Chapter[];
}
