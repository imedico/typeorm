"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Settings_1 = require("./entity/Settings");
const chai_1 = require("chai");
describe("github issues > #3874 Using an (empty string) enum as the type of a primary key column", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Settings_1.Settings],
        enabledDrivers: ["mysql", "mariadb"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should reload entity", () => Promise.all(connections.map(async (connection) => {
        // Create initial settings row
        const newSettings = new Settings_1.Settings();
        newSettings.value = "string";
        await connection.manager.save(newSettings);
        // Attempt to read settings back
        const foundSettings = await connection.manager.findOne(Settings_1.Settings, {
            where: {
                singleton: newSettings.singleton,
            },
        });
        (0, chai_1.expect)(foundSettings).to.be.an.instanceOf(Settings_1.Settings);
        (0, chai_1.expect)(foundSettings != null ? foundSettings.value : null).to.equal("string");
    })));
});
//# sourceMappingURL=issue-3874.js.map