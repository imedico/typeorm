import { AnimalEntity } from "./Animal";
import { Content } from "./Content";
export declare class PersonEntity {
    id: number;
    pets: AnimalEntity[];
    content?: Content;
}
