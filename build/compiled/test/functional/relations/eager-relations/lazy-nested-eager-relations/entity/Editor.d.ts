import { User } from "./User";
import { Post } from "./Post";
export declare class Editor {
    id: number;
    user: User;
    post: Promise<Post>;
}
