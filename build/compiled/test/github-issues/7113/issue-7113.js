"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../utils/test-setup");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const Configuration_1 = require("./entity/Configuration");
describe("github issues > #7113 Soft deleted docs still being pulled in Mongodb", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
        enabledDrivers: ["mongodb"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not pull soft deleted docs with find", () => Promise.all(connections.map(async (connection) => {
        const repository = connection.getMongoRepository(Configuration_1.Configuration);
        const configuration = new Configuration_1.Configuration();
        await repository.save(configuration);
        await repository.softRemove(configuration);
        const withoutDeleted = await repository.find();
        (0, chai_1.expect)(withoutDeleted.length).to.be.eq(0);
        const withDeleted = await repository.find({ withDeleted: true });
        (0, chai_1.expect)(withDeleted.length).to.be.eq(1);
        const withOtherOption = await repository.find({
            order: { _id: "ASC" },
        });
        (0, chai_1.expect)(withOtherOption.length).to.be.eq(0);
    })));
    it("should not pull soft deleted docs with findAndCount", () => Promise.all(connections.map(async (connection) => {
        const repository = connection.getMongoRepository(Configuration_1.Configuration);
        const configuration = new Configuration_1.Configuration();
        await repository.save(configuration);
        await repository.softRemove(configuration);
        const withoutDeletedAndCount = await repository.findAndCount();
        (0, chai_1.expect)(withoutDeletedAndCount[0].length).to.be.eq(0);
        const withDeletedAndCount = await repository.findAndCount({
            withDeleted: true,
        });
        (0, chai_1.expect)(withDeletedAndCount[0].length).to.be.eq(1);
        const withOtherOptionAndCount = await repository.findAndCount({
            order: { _id: "ASC" },
        });
        (0, chai_1.expect)(withOtherOptionAndCount[0].length).to.be.eq(0);
    })));
    it("should not pull soft deleted docs with findOne", () => Promise.all(connections.map(async (connection) => {
        const repository = connection.getMongoRepository(Configuration_1.Configuration);
        const configuration = new Configuration_1.Configuration();
        await repository.save(configuration);
        await repository.softRemove(configuration);
        const withoutDeletedOne = await repository.findOne({
            where: { _id: configuration._id },
        });
        (0, chai_1.expect)(withoutDeletedOne).to.be.null;
        const withDeletedOne = await repository.findOne({
            where: { _id: configuration._id },
            withDeleted: true,
        });
        (0, chai_1.expect)(withDeletedOne).not.to.be.null;
        const withOtherOptionOne = await repository.findOne({
            where: { _id: configuration._id },
            cache: true,
        });
        (0, chai_1.expect)(withOtherOptionOne).to.be.null;
    })));
});
//# sourceMappingURL=issue-7113.js.map