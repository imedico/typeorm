"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NamingStrategyUnderTest = void 0;
const DefaultNamingStrategy_1 = require("../../../../src/naming-strategy/DefaultNamingStrategy");
class NamingStrategyUnderTest extends DefaultNamingStrategy_1.DefaultNamingStrategy {
    foreignKeyName(tableOrName, columnNames, referencedTablePath, referencedColumnNames) {
        tableOrName =
            typeof tableOrName === "string" ? tableOrName : tableOrName.name;
        return columnNames.reduce((name, column) => `${name}_${column}`, `fk_${tableOrName}_${referencedTablePath}`);
    }
}
exports.NamingStrategyUnderTest = NamingStrategyUnderTest;
//# sourceMappingURL=NamingStrategyUnderTest.js.map