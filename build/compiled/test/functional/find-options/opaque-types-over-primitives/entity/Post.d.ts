export type WithType<T> = T & {
    type: "Post";
};
export declare class Post {
    id: number & {
        type: "Post";
    };
    title: string & {
        type: "Post";
    };
    isEdited: boolean & {
        type: "Post";
    };
}
