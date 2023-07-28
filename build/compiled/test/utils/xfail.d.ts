import { TestFunction } from "mocha";
type XFailFunction = {
    it: TestFunction;
    unless: (condition: boolean | (() => boolean)) => {
        it: TestFunction;
    };
};
declare const xfail: XFailFunction;
export { xfail };
