import { Address } from "./Address";
import { Company } from "./Company";
import { Passport } from "./Passport";
export declare class Person {
    id: number;
    name: string;
    company: Company;
    addresses: Address[];
    passport: Passport;
}
