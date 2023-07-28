"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const src_1 = require("../../../src");
const test_utils_1 = require("../../utils/test-utils");
describe("github issues > #2096 [mysql] Database name isn't read from url", () => {
    it("should be possible to define a database by connection url for mysql", async () => {
        const config = (0, test_utils_1.getTypeOrmConfig)();
        // it is important to synchronize here, to trigger EntityMetadataValidator.validate
        // that previously threw the error where the database on the driver object was undefined
        const mysqlConfig = config.find((c) => c.name === "mysql" && !c.skip);
        if (mysqlConfig) {
            const { username, password, host, port, database } = mysqlConfig;
            const url = `mysql://${username}:${password}@${host}:${port}/${database}`;
            const dataSource = new src_1.DataSource({
                name: "#2096",
                url,
                entities: [__dirname + "/entity/*{.js,.ts}"],
                synchronize: true,
                type: "mysql",
            });
            await dataSource.initialize();
            (0, chai_1.expect)(dataSource.isInitialized).to.eq(true);
            await dataSource.destroy();
        }
    });
});
//# sourceMappingURL=issue-2096.js.map