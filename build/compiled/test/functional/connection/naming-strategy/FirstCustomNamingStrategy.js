"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirstCustomNamingStrategy = void 0;
const DefaultNamingStrategy_1 = require("../../../../src/naming-strategy/DefaultNamingStrategy");
class FirstCustomNamingStrategy extends DefaultNamingStrategy_1.DefaultNamingStrategy {
    tableName(className, customName) {
        return customName ? customName.toUpperCase() : className.toUpperCase();
    }
}
exports.FirstCustomNamingStrategy = FirstCustomNamingStrategy;
//# sourceMappingURL=FirstCustomNamingStrategy.js.map