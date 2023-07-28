"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const EmailChanged_1 = require("./entity/EmailChanged");
const Change_1 = require("./entity/Change");
const Log_1 = require("./entity/Log");
describe("github issues > #9405 Incorrect subject sorting with multi-inheritance entities", () => {
    let dataSources;
    before(async () => (dataSources = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(dataSources));
    after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
    it("should correctly sort entities with multi-inheritances", () => Promise.all(dataSources.map(async (dataSource) => {
        const emailChanged = new EmailChanged_1.EmailChanged();
        const change = new Change_1.Change();
        change.propertyName = "Example";
        emailChanged.changes = [change];
        await dataSource.getRepository(Log_1.Log).save(emailChanged);
    })));
});
//# sourceMappingURL=issue-9405.js.map