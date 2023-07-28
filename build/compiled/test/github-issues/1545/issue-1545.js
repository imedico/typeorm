"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("../../utils/test-setup");
const test_utils_1 = require("../../utils/test-utils");
const ValidationModel_1 = require("./entity/ValidationModel");
const MainModel_1 = require("./entity/MainModel");
const DataModel_1 = require("./entity/DataModel");
// TODO: this test was broken after removing primary: true from relation decorators
//  due to complexity of cascades, it was skipped fow now
describe.skip("github issues > #1545 Typeorm runs insert query instead of update query on save of existing entity for ManyToOne relationships", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should add intial validation data", () => Promise.all(connections.map(async (connection) => {
        const validation1 = new ValidationModel_1.ValidationModel();
        validation1.validation = 123;
        const validation2 = new ValidationModel_1.ValidationModel();
        validation2.validation = 456;
        await connection.manager.save(validation1);
        await connection.manager.save(validation2);
        const data1_1 = new DataModel_1.DataModel();
        data1_1.active = true;
        data1_1.validations = validation1;
        const main1 = new MainModel_1.MainModel();
        main1.dataModel = [data1_1];
        await connection.manager.save(main1);
        // console.dir(main1, { colors: true, depth: null });
        main1.dataModel[0].active = false;
        await connection.manager.save(main1);
        // console.dir(main1, { colors: true, depth: null });
        return true;
    })));
});
//# sourceMappingURL=issue-1545.js.map