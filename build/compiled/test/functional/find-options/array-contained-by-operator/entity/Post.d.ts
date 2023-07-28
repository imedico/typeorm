export type PostCategory = {
    name: string;
};
export declare enum PostStatus {
    draft = "draft",
    published = "published",
    unknown = "unknown"
}
export declare class Post {
    id: number;
    title: string;
    authors: string[];
    statuses: PostStatus[];
}
