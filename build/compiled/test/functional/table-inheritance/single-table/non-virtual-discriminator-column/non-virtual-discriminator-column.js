"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../../utils/test-utils");
const Student_1 = require("./entity/Student");
const Employee_1 = require("./entity/Employee");
const Other_1 = require("./entity/Other");
const Person_1 = require("./entity/Person");
describe("table-inheritance > single-table > non-virtual-discriminator-column", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should return non virtual discriminator column as well", () => Promise.all(connections.map(async (connection) => {
        // -------------------------------------------------------------------------
        // Create
        // -------------------------------------------------------------------------
        const student = new Student_1.Student();
        student.name = "Alice";
        student.faculty = "Economics";
        await connection.getRepository(Student_1.Student).save(student);
        const employee = new Employee_1.Employee();
        employee.name = "Roger";
        employee.salary = 1000;
        await connection.getRepository(Employee_1.Employee).save(employee);
        if (!(connection.driver.options.type === "oracle")) {
            // In Oracle, empty string is a `null` so this isn't exactly possible there.
            const other = new Other_1.Other();
            other.name = "Empty";
            other.mood = "Happy";
            await connection.getRepository(Other_1.Other).save(other);
        }
        // -------------------------------------------------------------------------
        // Select
        // -------------------------------------------------------------------------
        let persons = await connection.manager
            .createQueryBuilder(Person_1.Person, "person")
            .addOrderBy("person.id")
            .getMany();
        persons[0].id.should.be.equal(1);
        persons[0].type.should.be.equal("student-type");
        persons[0].name.should.be.equal("Alice");
        persons[0].faculty.should.be.equal("Economics");
        persons[1].id.should.be.equal(2);
        persons[1].type.should.be.equal("employee-type");
        persons[1].name.should.be.equal("Roger");
        persons[1].salary.should.be.equal(1000);
        if (!(connection.driver.options.type === "oracle")) {
            // In Oracle, empty string is a `null` so this isn't exactly possible there.
            persons[2].id.should.be.equal(3);
            persons[2].type.should.be.equal("");
            persons[2].name.should.be.equal("Empty");
            persons[2].mood.should.be.equal("Happy");
        }
    })));
});
//# sourceMappingURL=non-virtual-discriminator-column.js.map