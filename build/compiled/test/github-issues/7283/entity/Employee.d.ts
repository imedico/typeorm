import { BaseEntity } from "../../../../src";
import { AccessEvent } from "./AccessEvent";
declare enum Providers {
    MS_GRAPH = "msGraph",
    ATLASSIAN = "atlassian"
}
export declare class Employee extends BaseEntity {
    provider: Providers;
    accessEvents: AccessEvent[];
}
export {};
