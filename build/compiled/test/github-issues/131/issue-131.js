"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const Student_1 = require("./entity/Student");
const Employee_1 = require("./entity/Employee");
describe("github issues > #131 Error with single table inheritance query without additional conditions", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not fail when querying for single table inheritance model without additional conditions", () => Promise.all(connections.map(async (connection) => {
        const employees = await connection
            .getRepository(Employee_1.Employee)
            .find();
        (0, chai_1.expect)(employees).not.to.be.undefined;
        const students = await connection.getRepository(Student_1.Student).find();
        (0, chai_1.expect)(students).not.to.be.undefined;
    })));
});
//# sourceMappingURL=issue-131.js.map