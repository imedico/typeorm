import { EntitySchema } from "../../../../src";
import Post from "./Post";
export default class PostAttachment {
    postPostId: number;
    postOtherId: number;
    attachmentId: number;
    post: Post;
    constructor();
}
export declare const PostAttachmentSchema: EntitySchema<PostAttachment>;
