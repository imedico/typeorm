"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const AccessEvent_1 = require("./entity/AccessEvent");
const Employee_1 = require("./entity/Employee");
const chai_1 = require("chai");
describe("github issues > #7283 Generating Migration on ManyToOne/OneToMany + Primary enum column results in missing enum type in migration output", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        migrations: [],
        enabledDrivers: ["mysql", "mariadb", "postgres"],
        schemaCreate: false,
        dropSchema: true,
        entities: [AccessEvent_1.AccessEvent, Employee_1.Employee],
    })));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should create tables with enum primary column", () => Promise.all(connections.map(async (connection) => {
        await connection.driver.createSchemaBuilder().build();
        const queryRunner = connection.createQueryRunner();
        // ManyToOne
        const table = await queryRunner.getTable("access_event");
        const column = table.findColumnByName("employeeProvider");
        (0, chai_1.expect)(column.enum).to.deep.equal(["msGraph", "atlassian"]);
        // ManyToMany
        const table2 = await queryRunner.getTable("access_event_employees_employee");
        const column2 = table2.findColumnByName("employeeProvider");
        (0, chai_1.expect)(column2.enum).to.deep.equal(["msGraph", "atlassian"]);
        await queryRunner.release();
    })));
});
//# sourceMappingURL=issue-7283.js.map