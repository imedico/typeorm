"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamingStrategyUnderTest = void 0;
const DefaultNamingStrategy_1 = require("../../../../src/naming-strategy/DefaultNamingStrategy");
const StringUtils_1 = require("../../../../src/util/StringUtils");
class NamingStrategyUnderTest extends DefaultNamingStrategy_1.DefaultNamingStrategy {
    constructor() {
        super(...arguments);
        this.calledJoinTableColumnName = [];
        this.calledJoinTableInverseColumnName = [];
    }
    joinTableColumnName(tableName, propertyName, columnName) {
        this.calledJoinTableColumnName.push(true);
        return (0, StringUtils_1.camelCase)(tableName +
            "_" +
            (columnName ? columnName : propertyName) +
            "_forward");
    }
    joinTableInverseColumnName(tableName, propertyName, columnName) {
        this.calledJoinTableInverseColumnName.push(true);
        return (0, StringUtils_1.camelCase)(tableName +
            "_" +
            (columnName ? columnName : propertyName) +
            "_inverse");
    }
}
exports.NamingStrategyUnderTest = NamingStrategyUnderTest;
//# sourceMappingURL=NamingStrategyUnderTest.js.map