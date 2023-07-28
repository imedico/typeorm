import { EntitySchema } from "../../../../src";
import { User } from "./UserEntity";
export type Team = {
    id: number;
    users: User[];
};
export declare const TeamEntity: EntitySchema<Team>;
