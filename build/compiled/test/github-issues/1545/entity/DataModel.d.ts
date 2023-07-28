import { MainModel } from "./MainModel";
import { ValidationModel } from "./ValidationModel";
export declare class DataModel {
    validation: number;
    mainId: number;
    validations: ValidationModel;
    main: MainModel;
    active: boolean;
}
