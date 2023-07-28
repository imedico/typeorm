"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const Account_1 = require("./entity/Account");
const AccountActivationToken_1 = require("./entity/AccountActivationToken");
describe("github issues > #1465 save child and parent entity", () => {
    let connections = [];
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: [
            "mysql",
            "mariadb",
            "sqlite",
            "better-sqlite3",
            "sqljs",
        ],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("account property in accountActivationToken should not be null", () => Promise.all(connections.map(async (connection) => {
        const account = new Account_1.Account();
        account.username = "test";
        account.password = "123456";
        account.accountActivationToken = new AccountActivationToken_1.AccountActivationToken("XXXXXXXXXXXXXXXXXX", new Date());
        const savedAccount = await connection.manager.save(account);
        chai_1.assert.isNotNull(savedAccount.accountActivationToken.account);
    })));
});
//# sourceMappingURL=issue-1465.js.map