"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
describe("github issues > #2904 Type DeepPartial issue when used with generics", () => {
    it("DeepPartial should correctly handle generics", () => {
        function commentFactory(entity) {
            entity.createdAt = new Date();
            entity.savedBy = "SomeUSer";
        }
        commentFactory({});
    });
});
//# sourceMappingURL=issue-2904.js.map