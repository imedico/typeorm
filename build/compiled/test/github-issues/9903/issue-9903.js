"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../utils/test-setup");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const User_1 = require("./entity/User");
describe("github issues > #9903 json data type", () => {
    let connections;
    afterEach(() => (0, test_utils_1.closeTestingConnections)(connections));
    describe("json supported type for mariadb", () => {
        const expectedJsonString = JSON.stringify({
            firstName: "Quality",
            lastName: "Tester",
        });
        const newUser = {
            jsonData: expectedJsonString,
        };
        const badJsonUser = {
            jsonData: `'''faux---'''`,
        };
        before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            schemaCreate: true,
            dropSchema: true,
            enabledDrivers: ["mariadb"],
        })));
        beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
        it("should create table with json constraint", () => Promise.all(connections.map(async (connection) => {
            const userRepository = connection.getRepository(User_1.User);
            await userRepository.save(newUser);
            const savedUser = await userRepository.findOneOrFail({
                where: { id: newUser.id },
            });
            (0, chai_1.expect)(savedUser).to.not.be.null;
            (0, chai_1.expect)(savedUser.jsonData).to.equal(expectedJsonString);
            // trying to save bad json
            // here when executing the save the value is passed to JSON.stringify(),
            // this will ensure its json valid in mariadb so this won't break the constraint
            try {
                await userRepository.save(badJsonUser);
            }
            catch (err) {
                chai_1.expect.fail(null, null, "Should have not thrown an error");
            }
            try {
                await userRepository.query("INSERT INTO user values (?, ?)", [3, badJsonUser.jsonData]);
                chai_1.expect.fail(null, null, "Should have thrown an error");
            }
            catch (err) {
                (0, chai_1.expect)(err).not.to.be.undefined;
                (0, chai_1.expect)(err.sqlMessage).not.to.be.undefined;
                (0, chai_1.expect)(err.sqlMessage).to.equal("CONSTRAINT `user.jsonData` failed for `test`.`user`");
            }
        })));
    });
});
//# sourceMappingURL=issue-9903.js.map