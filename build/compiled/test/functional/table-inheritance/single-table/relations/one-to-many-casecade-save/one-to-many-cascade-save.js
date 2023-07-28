"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../../../utils/test-utils");
const chai_1 = require("chai");
const Faculty_1 = require("./entity/Faculty");
const Professor_1 = require("./entity/Professor");
const Researcher_1 = require("./entity/Researcher");
describe("table-inheritance > single-table > relations > one-to-many-cascade-save", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should work correctly with OneToMany relations", () => Promise.all(connections.map(async (connection) => {
        // -------------------------------------------------------------------------
        // Create
        // -------------------------------------------------------------------------
        const researcher = new Researcher_1.Researcher("Economics");
        await connection.getRepository(Researcher_1.Researcher).save(researcher);
        const faculty1 = new Faculty_1.Faculty();
        faculty1.name = "Economics";
        faculty1.staff = [new Professor_1.Professor("Economics 101"), researcher];
        await connection.getRepository(Faculty_1.Faculty).save(faculty1);
        const loadedFaculty = await connection
            .getRepository(Faculty_1.Faculty)
            .findOneByOrFail({ id: faculty1.id });
        (0, chai_1.expect)(loadedFaculty.staff.find((staff) => staff.type === "PROFESSOR")).to.not.be.undefined;
        (0, chai_1.expect)(loadedFaculty.staff.find((staff) => staff.type === "RESEARCHER")).to.not.be.undefined;
    })));
});
//# sourceMappingURL=one-to-many-cascade-save.js.map