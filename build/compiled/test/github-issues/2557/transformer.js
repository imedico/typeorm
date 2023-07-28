"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformer = exports.WrappedNumber = void 0;
class WrappedNumber {
    constructor(wrapped) {
        this.wrapped = wrapped;
    }
    getWrapped() {
        return this.wrapped;
    }
}
exports.WrappedNumber = WrappedNumber;
exports.transformer = {
    lastValue: undefined,
    from(val) {
        return new WrappedNumber(val);
    },
    to(w) {
        exports.transformer.lastValue = w;
        return w.getWrapped();
    },
};
//# sourceMappingURL=transformer.js.map