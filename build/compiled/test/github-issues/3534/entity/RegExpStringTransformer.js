"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegExpStringTransformer = void 0;
var RegExpStringTransformer;
(function (RegExpStringTransformer) {
    function to(value) {
        return value.toString();
    }
    RegExpStringTransformer.to = to;
    function from(value) {
        const match = value.match(/^\/(.*)\/(.*)$/);
        if (match) {
            const [, pattern, flags] = match;
            return new RegExp(pattern, flags);
        }
        else {
            throw new Error(`"${value}" is not a regular expression`);
        }
    }
    RegExpStringTransformer.from = from;
})(RegExpStringTransformer = exports.RegExpStringTransformer || (exports.RegExpStringTransformer = {}));
//# sourceMappingURL=RegExpStringTransformer.js.map