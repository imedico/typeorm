import { Post } from "../entity/Post";
import { EntitySubscriberInterface, InsertEvent } from "../../../../src";
/**
 * Subscriber which checks the validity of the entity passed to beforeInsert().
 * Tests the fix for issue #5734 in which we saw an empty array leak into
 * beforeInsert().
 */
export declare class ValidEntityCheckSubscriber implements EntitySubscriberInterface<Post> {
    listenTo(): typeof Post;
    beforeInsert(event: InsertEvent<Post>): void;
}
