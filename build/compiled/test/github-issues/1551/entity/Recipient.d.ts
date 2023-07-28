import { Message } from "./Message";
import { User } from "./User";
export interface RecipientConstructor {
    user?: User;
    message?: Message;
    receivedAt?: number;
    readAt?: number;
}
export declare class Recipient {
    constructor({ user, message, receivedAt, readAt, }?: RecipientConstructor);
    userId: number;
    messageId: number;
    user: User;
    message: Message;
    receivedAt: number;
    readAt: number;
}
