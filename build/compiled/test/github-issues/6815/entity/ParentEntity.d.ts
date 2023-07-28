import { ChildEntity } from "./ChildEntity";
export declare class ParentEntity {
    id: string;
    child: ChildEntity | null;
    childId: string | null;
}
