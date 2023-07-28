"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Employee_1 = require("./entity/Employee");
const Person_1 = require("./entity/Person");
describe("github issues > #184 [Postgres] Single-Inheritance not working with integer type field", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("single table inheritance should accept a Integer Type", () => Promise.all(connections.map(async (connection) => {
        // Saving via subtype repository works
        let employeeRepository = connection.getRepository(Employee_1.Employee);
        const employee = new Employee_1.Employee();
        employee.id = "1";
        employee.firstName = "umed";
        employee.lastName = "khudoiberdiev";
        employee.salary = 200000;
        employee.shared = "e";
        await employeeRepository.save(employee);
        await employeeRepository.findOneBy({ id: "1" });
        // let homesitterRepository = connection.getRepository(Homesitter);
        // const homesitter = new Homesitter();
        // homesitter.id = "2";
        // homesitter.firstName = "umed";
        // homesitter.lastName = "khudoiberdiev";
        // homesitter.numberOfKids = 5;
        // homesitter.shared = "h";
        // await homesitterRepository.persist(homesitter);
        // Saving via base type repository fails
        let personRepository = connection.getRepository(Person_1.Person);
        const employee2 = new Employee_1.Employee();
        employee2.id = "1";
        employee2.firstName = "umed";
        employee2.lastName = "khudoiberdiev";
        employee2.salary = 200000;
        employee2.shared = "e";
        await personRepository.save(employee2);
    })));
});
//# sourceMappingURL=issue-184.js.map