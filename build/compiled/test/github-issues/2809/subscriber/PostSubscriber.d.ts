import { Post } from "../entity/Post";
import { EntitySubscriberInterface, UpdateEvent, InsertEvent } from "../../../../src";
export declare class PostSubscriber implements EntitySubscriberInterface<Post> {
    listenTo(): typeof Post;
    afterUpdate(event: UpdateEvent<Post>): void;
    afterInsert(event: InsertEvent<Post>): void;
}
