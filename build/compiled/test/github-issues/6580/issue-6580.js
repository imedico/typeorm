"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
describe("github issues > #6580 DeepPartial does not handle `any` and `{[k: string]}`", () => {
    function attemptDeepPartial(entityLike) { }
    it("DeepPartial should correctly handle any", () => {
        attemptDeepPartial({
            any: {
                foo: "bar",
            },
        });
    });
    it("DeepPartial should correctly handle {[k: string]: any}", () => {
        attemptDeepPartial({
            object: {
                foo: "bar",
            },
        });
    });
});
//# sourceMappingURL=issue-6580.js.map