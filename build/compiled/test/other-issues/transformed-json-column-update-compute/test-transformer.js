"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testTransformer = void 0;
exports.testTransformer = {
    to(data) {
        if ("secretProperty" in data) {
            data.secretProperty = `secret-${data.secretProperty}`;
        }
        return data;
    },
    from(data) {
        if ("secretProperty" in data) {
            data.secretProperty = data.secretProperty.split("-")[1];
        }
        return data;
    },
};
//# sourceMappingURL=test-transformer.js.map