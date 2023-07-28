import { Email } from "./Email";
import { Phone } from "./Phone";
export declare class User {
    id: number;
    name: string;
    emails: Email[];
    phones: Phone[];
}
