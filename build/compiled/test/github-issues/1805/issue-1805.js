"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Account_1 = require("./entity/Account");
describe("github issues > #1805 bigint PK incorrectly returning as a number (expecting a string)", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: ["mysql"],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should return `bigint` column as string", () => Promise.all(connections.map(async (connection) => {
        const bigIntId = "76561198016705746";
        const account = new Account_1.Account();
        account.id = bigIntId;
        const accountRepository = await connection.getRepository(Account_1.Account);
        await accountRepository.save(account);
        const loadedAccount = await accountRepository.findOneBy({
            id: bigIntId,
        });
        loadedAccount.id.should.be.equal(bigIntId);
    })));
});
//# sourceMappingURL=issue-1805.js.map