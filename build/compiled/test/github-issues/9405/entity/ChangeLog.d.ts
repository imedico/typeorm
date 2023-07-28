import { Change } from "./Change";
import { Log } from "./Log";
export declare abstract class ChangeLog<T> extends Log {
    changes: Change<T>[];
}
