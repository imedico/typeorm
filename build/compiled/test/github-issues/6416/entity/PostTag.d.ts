import { EntitySchema } from "../../../../src";
import Post from "./Post";
export default class PostTag {
    postId: number;
    tagId: number;
    tagOtherId: string;
    tagPostId: string;
    post: Post;
    constructor();
}
export declare const PostTagSchema: EntitySchema<PostTag>;
