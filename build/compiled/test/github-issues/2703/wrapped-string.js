"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrappedStringTransformer = exports.WrappedString = void 0;
class WrappedString {
    constructor(value) {
        this.value = value;
    }
}
exports.WrappedString = WrappedString;
exports.wrappedStringTransformer = {
    from(value) {
        return new WrappedString(value);
    },
    to(value) {
        return value.value;
    },
};
//# sourceMappingURL=wrapped-string.js.map