"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const ShortTableName_1 = require("./entity/ShortTableName");
const ReallyReallyVeryVeryVeryLongTableName_1 = require("./entity/ReallyReallyVeryVeryVeryLongTableName");
const QueryFailedError_1 = require("../../../src/error/QueryFailedError");
/**
 * @see https://www.postgresql.org/docs/current/sql-syntax-lexical.html#SQL-SYNTAX-IDENTIFIERS
 * "The system uses no more than NAMEDATALEN-1 bytes of an identifier; longer names can be
 * written in commands, but they will be truncated. By default, NAMEDATALEN is 64 so the
 * maximum identifier length is 63 bytes. If this limit is problematic, it can be raised
 * by changing the NAMEDATALEN constant in src/include/pg_config_manual.h."
 */
describe("github issues > #7106 shorten sequence names (for RDBMS with a limit) when they are longer than 63 characters", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should be able to work with long sequence name with short table name", () => Promise.all(connections.map(async (connection) => {
        const short = new ShortTableName_1.ShortTableName();
        short.Name = "Dharawal";
        short.Value = 2500;
        await connection.getRepository(ShortTableName_1.ShortTableName).save(short);
        return (0, chai_1.expect)(connection.synchronize()).to.not.be.rejectedWith(QueryFailedError_1.QueryFailedError);
    })));
    it("should be able to work with long sequence name with long table name", () => Promise.all(connections.map(async (connection) => {
        const long = new ReallyReallyVeryVeryVeryLongTableName_1.ReallyReallyVeryVeryVeryLongTableName();
        long.Name = "Eora";
        await connection
            .getRepository(ReallyReallyVeryVeryVeryLongTableName_1.ReallyReallyVeryVeryVeryLongTableName)
            .save(long);
        return (0, chai_1.expect)(connection.synchronize()).to.not.be.rejectedWith(QueryFailedError_1.QueryFailedError);
    })));
});
//# sourceMappingURL=issue-7106.js.map