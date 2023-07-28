import { EntitySubscriberInterface, UpdateEvent } from "../../../../src";
import { Post } from "../entity/Post";
export declare class PostSubscriber implements EntitySubscriberInterface {
    listenTo(): string | Function;
    beforeUpdate(event: UpdateEvent<Post>): void | Promise<Post>;
    afterUpdate(event: UpdateEvent<Post>): void | Promise<Post>;
}
