import { EntitySchemaOptions } from "../../../../src/entity-schema/EntitySchemaOptions";
import { Author } from "./Author";
export declare class Post {
    authorPublisherId: number;
    authorId: number;
    id: number;
    title: string;
    author: Author;
}
export declare const PostSchema: EntitySchemaOptions<Post>;
