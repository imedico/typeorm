"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const src_1 = require("../../../src");
const test_utils_1 = require("../../utils/test-utils");
const assert_1 = require("assert");
const chai_1 = require("chai");
describe("github issues > #6115 Down migration for enums with defaults are wrong", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        enabledDrivers: ["postgres"],
        entities: [__dirname + "/entity/v1/*{.js,.ts}"],
        dropSchema: true,
        schemaCreate: true,
    })));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should change schema when enum definition changes", () => Promise.all(connections.map(async (_connection) => {
        const options = (0, test_utils_1.setupSingleTestingConnection)(_connection.options.type, {
            name: `${_connection.name}-v2`,
            entities: [__dirname + "/entity/v2/*{.js,.ts}"],
            dropSchema: false,
            schemaCreate: false,
        });
        if (!options) {
            (0, assert_1.fail)();
            return;
        }
        const dataSource = new src_1.DataSource(options);
        await dataSource.initialize();
        const queryRunner = dataSource.createQueryRunner();
        const sqlInMemory = await dataSource.driver
            .createSchemaBuilder()
            .log();
        const upQueries = sqlInMemory.upQueries.map((query) => query.query);
        const downQueries = sqlInMemory.downQueries.map((query) => query.query);
        // update entity
        for (const query of upQueries) {
            await dataSource.query(query);
        }
        let table = await queryRunner.getTable("metric");
        let defaultOperator = table.findColumnByName("defaultOperator");
        (0, chai_1.expect)(defaultOperator.enum).to.deep.equal([
            "lessthan",
            "lessequal",
            "equal",
            "notequal",
            "greaterequal",
            "greaterthan",
        ]);
        (0, chai_1.expect)(defaultOperator.default).to.equal(`'equal'`);
        let defaultOperator2 = table.findColumnByName("defaultOperator2");
        (0, chai_1.expect)(defaultOperator2.default).to.equal(`'equal'`);
        let defaultOperator3 = table.findColumnByName("defaultOperator3");
        (0, chai_1.expect)(defaultOperator3.default).to.be.undefined;
        let defaultOperator4 = table.findColumnByName("defaultOperator4");
        (0, chai_1.expect)(defaultOperator4.default).to.equal(`'greaterthan'`);
        // revert update
        for (const query of downQueries.reverse()) {
            await dataSource.query(query);
        }
        table = await queryRunner.getTable("metric");
        defaultOperator = table.findColumnByName("defaultOperator");
        (0, chai_1.expect)(defaultOperator.enum).to.deep.equal([
            "lt",
            "le",
            "eq",
            "ne",
            "ge",
            "gt",
        ]);
        (0, chai_1.expect)(defaultOperator.default).to.equal(`'eq'`);
        defaultOperator2 = table.findColumnByName("defaultOperator2");
        (0, chai_1.expect)(defaultOperator2.default).to.be.undefined;
        defaultOperator3 = table.findColumnByName("defaultOperator3");
        (0, chai_1.expect)(defaultOperator3.default).to.equal(`'eq'`);
        defaultOperator4 = table.findColumnByName("defaultOperator4");
        (0, chai_1.expect)(defaultOperator4.default).to.equal(`'eq'`);
        await queryRunner.release();
        await dataSource.close();
    })));
});
//# sourceMappingURL=issue-6115.js.map