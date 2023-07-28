"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../../utils/test-utils");
const Student_1 = require("./entity/Student");
const Teacher_1 = require("./entity/Teacher");
const Person_1 = require("./entity/Person");
describe("table-inheritance > single-table > numeric types", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Person_1.Person, Student_1.Student, Teacher_1.Teacher],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should allow numeric types for the discriminator, including 0", () => Promise.all(connections.map(async (connection) => {
        if (connection.driver.options.type === "cockroachdb") {
            return;
        }
        // -------------------------------------------------------------------------
        // Create
        // -------------------------------------------------------------------------
        const student = new Student_1.Student();
        student.name = "Alice";
        student.faculty = "Economics";
        await connection.getRepository(Student_1.Student).save(student);
        const teacher = new Teacher_1.Teacher();
        teacher.name = "Roger";
        teacher.specialization = "Math";
        await connection.getRepository(Teacher_1.Teacher).save(teacher);
        // -------------------------------------------------------------------------
        // Select
        // -------------------------------------------------------------------------
        let persons = await connection.manager
            .createQueryBuilder(Person_1.Person, "person")
            .addOrderBy("person.id")
            .getMany();
        (0, chai_1.expect)(persons[0].id).to.be.equal(1);
        (0, chai_1.expect)(persons[0].type).to.be.equal(0);
        (0, chai_1.expect)(persons[0].name).to.be.equal("Alice");
        (0, chai_1.expect)(persons[0].faculty).to.be.equal("Economics");
        (0, chai_1.expect)(persons[1].id).to.be.equal(2);
        (0, chai_1.expect)(persons[1].type).to.be.equal(1);
        (0, chai_1.expect)(persons[1].name).to.be.equal("Roger");
        (0, chai_1.expect)(persons[1].specialization).to.be.equal("Math");
    })));
});
//# sourceMappingURL=numeric-types.js.map