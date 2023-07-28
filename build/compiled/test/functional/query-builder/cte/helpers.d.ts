import { Connection } from "../../../../src";
import { CteCapabilities } from "../../../../src/driver/types/CteCapabilities";
export declare function filterByCteCapabilities(capability: keyof CteCapabilities, equalsTo?: boolean): (conn: Connection) => boolean;
