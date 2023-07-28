import { EntitySchema } from "../../../../src";
import PostTag from "./PostTag";
import PostAttachment from "./PostAttachment";
export default class Post {
    postId: number;
    otherId: number;
    tags: PostTag[];
    attachments: PostAttachment[];
    constructor();
}
export declare const PostSchema: EntitySchema<Post>;
