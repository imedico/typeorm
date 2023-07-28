export type PostCategory = {
    name: string;
};
export declare class Post {
    id: number;
    title: string;
    authors: string[];
    category: PostCategory;
    categories: PostCategory[];
}
