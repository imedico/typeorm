"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../utils/test-setup");
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
const chai_1 = require("chai");
const src_1 = require("../../../src");
describe("base entity", () => {
    it("test if DataSource calls `useDataSource` of the provided entities", async () => {
        const dataSourceOptions = (0, test_utils_1.setupTestingConnections)({
            entities: [User_1.User],
            enabledDrivers: ["sqlite"],
        });
        if (!dataSourceOptions.length)
            return;
        // reset data source just to make sure inside DataSource it's really being set
        User_1.User.useDataSource(null);
        const dataSource = new src_1.DataSource(dataSourceOptions[0]);
        await dataSource.initialize();
        await dataSource.synchronize(true);
        await User_1.User.save({ name: "Timber Saw" });
        const timber = await User_1.User.findOneByOrFail({ name: "Timber Saw" });
        (0, chai_1.expect)(timber).to.be.eql({
            id: 1,
            name: "Timber Saw",
        });
    });
    it("test if DataSource calls `useDataSource` of the provided entities in the entities directory", async () => {
        const dataSourceOptions = (0, test_utils_1.setupTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: ["sqlite"],
        });
        if (!dataSourceOptions.length)
            return;
        // reset data source just to make sure inside DataSource it's really being set
        User_1.User.useDataSource(null);
        const dataSource = (0, test_utils_1.createDataSource)(dataSourceOptions[0]);
        await dataSource.initialize();
        await dataSource.synchronize(true);
        await User_1.User.save({ name: "Timber Saw" });
        const timber = await User_1.User.findOneByOrFail({ name: "Timber Saw" });
        (0, chai_1.expect)(timber).to.be.eql({
            id: 1,
            name: "Timber Saw",
        });
    });
});
//# sourceMappingURL=base-entity.test.js.map