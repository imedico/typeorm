import { EntitySubscriberInterface } from "../../../../src";
import { RecoverEvent } from "../../../../src/subscriber/event/RecoverEvent";
import { SoftRemoveEvent } from "../../../../src/subscriber/event/SoftRemoveEvent";
import { Post } from "../entity/Post";
export declare class PostSubscriber implements EntitySubscriberInterface<Post> {
    listenTo(): typeof Post;
    afterSoftRemove(event: SoftRemoveEvent<Post>): void;
    afterRecover(event: RecoverEvent<Post>): void;
}
