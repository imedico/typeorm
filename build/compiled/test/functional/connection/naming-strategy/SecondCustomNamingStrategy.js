"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecondCustomNamingStrategy = void 0;
const DefaultNamingStrategy_1 = require("../../../../src/naming-strategy/DefaultNamingStrategy");
class SecondCustomNamingStrategy extends DefaultNamingStrategy_1.DefaultNamingStrategy {
    tableName(className, customName) {
        return customName ? customName.toLowerCase() : className.toLowerCase();
    }
}
exports.SecondCustomNamingStrategy = SecondCustomNamingStrategy;
//# sourceMappingURL=SecondCustomNamingStrategy.js.map