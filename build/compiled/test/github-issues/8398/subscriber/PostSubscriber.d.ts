import { EntitySubscriberInterface, RecoverEvent, SoftRemoveEvent, UpdateEvent } from "../../../../src";
import { Post } from "../entity/Post";
export declare class PostSubscriber implements EntitySubscriberInterface {
    listenTo(): typeof Post;
    beforeUpdate(event: UpdateEvent<Post>): void;
    afterUpdate(event: UpdateEvent<Post>): void;
    beforeSoftRemove(event: SoftRemoveEvent<Post>): void;
    afterSoftRemove(event: SoftRemoveEvent<Post>): void;
    beforeRecover(event: RecoverEvent<Post>): void;
    afterRecover(event: RecoverEvent<Post>): void;
}
