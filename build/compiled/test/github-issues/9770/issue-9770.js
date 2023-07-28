"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
//import { DataSource, TableColumn } from "../../../src"
const test_utils_1 = require("../../utils/test-utils");
const Foo_1 = require("./entity/Foo");
const Bar_1 = require("./entity/Bar");
describe("github issues > #9770 check for referencing foreign keys when altering a table using sqlite", () => {
    let dataSources;
    before(async () => {
        dataSources = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            migrations: [__dirname + "/migration/*{.js,.ts}"],
            enabledDrivers: ["sqlite", "better-sqlite3"],
            schemaCreate: true,
            dropSchema: true,
            logging: true,
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(dataSources));
    after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
    it("shouldn't loose dependant table data", () => Promise.all(dataSources.map(async (dataSource) => {
        const manager = dataSource.manager;
        // Insert records in the tables
        const foo = new Foo_1.Foo();
        foo.data = "foo";
        await manager.save(foo);
        const foundFoo = await manager.findOne(Foo_1.Foo, {
            where: {
                id: 1,
            },
        });
        (0, chai_1.expect)(foundFoo).not.to.be.null;
        if (!foundFoo)
            return;
        const bar = new Bar_1.Bar();
        bar.foo = foundFoo;
        bar.data = "bar";
        await manager.save(bar);
        const foundBar = await manager.findOne(Bar_1.Bar, {
            where: {
                foo: {
                    id: foundFoo.id,
                },
            },
        });
        (0, chai_1.expect)(foundBar).not.to.be.null;
        // check current state (migrations pending and entries in db)
        const migrations = await dataSource.showMigrations();
        migrations.should.be.equal(true);
        const queryRunner = dataSource.createQueryRunner();
        let barRecords = await queryRunner.query(`SELECT * FROM "bar"`);
        (0, chai_1.expect)(barRecords).to.have.lengthOf.above(0);
        // run migrations which contains a table drop
        await dataSource.runMigrations();
        // check post migration (no more pending migration and data still in db)
        const migrations2 = await dataSource.showMigrations();
        migrations2.should.be.equal(false);
        // check if data still exists in dependant table
        barRecords = await queryRunner.query(`SELECT * FROM "bar"`);
        (0, chai_1.expect)(barRecords).to.have.lengthOf.above(0);
        // revert changes
        await queryRunner.executeMemoryDownSql();
        await queryRunner.release();
    })));
});
//# sourceMappingURL=issue-9770.js.map