import { ActionDetails } from "./ActionDetails";
import { Address } from "./Address";
import { Person } from "./Person";
export declare class ActionLog {
    id: number;
    date: Date;
    action: string;
    person: Person;
    addresses: Address[];
    actionDetails: ActionDetails;
}
