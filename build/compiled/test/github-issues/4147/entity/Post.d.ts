import { EntitySchemaOptions } from "../../../../src/entity-schema/EntitySchemaOptions";
export declare enum PostType {
    draft = "draft",
    published = "published"
}
export declare class Post {
    id: number;
    type: PostType;
}
export declare const PostSchema: EntitySchemaOptions<Post>;
