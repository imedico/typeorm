"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamingStrategyUnderTest = void 0;
const DefaultNamingStrategy_1 = require("../../../../src/naming-strategy/DefaultNamingStrategy");
class NamingStrategyUnderTest extends DefaultNamingStrategy_1.DefaultNamingStrategy {
    eagerJoinRelationAlias(alias, propertyPath) {
        return alias + "__" + propertyPath.replace(".", "_");
    }
}
exports.NamingStrategyUnderTest = NamingStrategyUnderTest;
//# sourceMappingURL=NamingStrategyUnderTest.js.map