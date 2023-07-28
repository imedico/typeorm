import { Address } from "./Address";
export declare class User {
    id?: string;
    /** can use a default but testing against mysql since they're shared drivers */
    uuid: string;
    inet4: string;
    inet6: string;
    /** testing generation */
    another_uuid_field?: string;
    addresses?: Address[];
}
