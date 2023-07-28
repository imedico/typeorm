"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const LegacyOracleNamingStrategy_1 = require("../../../../../src/naming-strategy/LegacyOracleNamingStrategy");
const RandomGenerator_1 = require("../../../../../src/util/RandomGenerator");
describe("LegacyOracleNamingStrategy > column shortening", () => {
    it("should truncate column names to the limit", () => {
        const legacyOracleNamingStrategy = new LegacyOracleNamingStrategy_1.LegacyOracleNamingStrategy("truncate");
        (0, chai_1.expect)(legacyOracleNamingStrategy.columnName("shortName", "", [])).to.equal("shortName");
        (0, chai_1.expect)(legacyOracleNamingStrategy.columnName("veryVeryVeryLongLongLongLongName", "", [])).to.equal("veryVeryVeryLongLongLongLongNa");
        (0, chai_1.expect)(legacyOracleNamingStrategy.columnName(RandomGenerator_1.RandomGenerator.sha1("seed1"), "", []).length).to.lessThanOrEqual(legacyOracleNamingStrategy.IDENTIFIER_MAX_SIZE);
    });
    it("should change column names to hashes within the limit", () => {
        const legacyOracleNamingStrategy = new LegacyOracleNamingStrategy_1.LegacyOracleNamingStrategy("hash");
        const columnName = "veryVeryVeryLongLongLongLongName" + RandomGenerator_1.RandomGenerator.sha1("seed2");
        const hashedColumnName = legacyOracleNamingStrategy.columnName(columnName, "", []);
        (0, chai_1.expect)(hashedColumnName.length).to.lessThanOrEqual(legacyOracleNamingStrategy.IDENTIFIER_MAX_SIZE);
        (0, chai_1.expect)(hashedColumnName)
            .to.be.a("string")
            .and.satisfy((name) => name.startsWith(legacyOracleNamingStrategy.DEFAULT_COLUMN_PREFIX));
    });
});
//# sourceMappingURL=column-shortening.js.map