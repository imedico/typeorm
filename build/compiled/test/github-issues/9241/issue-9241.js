"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const Employee_1 = require("./entity/Employee");
const Photo_1 = require("./entity/Photo");
describe("github issues > #9241 Incorrect insert order when cascade inserting parent inherited relations", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["sqlite", "better-sqlite3"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should save entities properly", async () => {
        for (const connection of connections) {
            const photos = [
                { name: "Photo 1" },
                { name: "Photo 2" },
            ];
            await connection.getRepository(Photo_1.Photo).save(photos);
            const employee = {
                name: "test name",
                salary: 12345,
                userPhotos: [
                    {
                        photo: photos[0],
                        isProfilePhoto: true,
                    },
                    {
                        photo: photos[1],
                        isProfilePhoto: false,
                    },
                ],
            };
            const employeeRepository = connection.getRepository(Employee_1.Employee);
            const createdEmployee = employeeRepository.create(employee);
            await (0, chai_1.expect)(employeeRepository.save(createdEmployee)).to.eventually
                .be.fulfilled;
        }
    });
});
//# sourceMappingURL=issue-9241.js.map