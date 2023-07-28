"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../utils/test-setup");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const Car_1 = require("./entity/Car");
const Record_1 = require("./entity/Record");
describe("github issues > #8747 QueryBuilder update handles Date objects wrong on a ManyToOne relationship.", () => {
    let dataSources;
    before(async () => (dataSources = await (0, test_utils_1.createTestingConnections)({
        enabledDrivers: ["mysql", "postgres", "mariadb"],
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(dataSources));
    after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
    it("should correctly update the datetime field", async () => {
        var _a, _b;
        for (const dataSource of dataSources) {
            Car_1.Car.useDataSource(dataSource);
            Record_1.Record.useDataSource(dataSource);
            const car = await Car_1.Car.create({}).save();
            const record = await Record_1.Record.create({
                timestamp: new Date(),
                car,
            }).save();
            await Car_1.Car.update({ uuid: car.uuid }, { latestRecordTimestamp: record.timestamp });
            const carReloaded = await Car_1.Car.findOne({
                where: { uuid: car.uuid },
            });
            (0, chai_1.expect)(carReloaded).to.exist;
            (0, chai_1.expect)((_a = record.timestamp) === null || _a === void 0 ? void 0 : _a.getTime()).to.be.equal((_b = carReloaded.latestRecordTimestamp) === null || _b === void 0 ? void 0 : _b.getTime());
        }
    });
});
//# sourceMappingURL=issue-8747.js.map