"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../utils/test-setup");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const Record_1 = require("./entity/Record");
describe("github issues > #1314 UPDATE on json column stores string type", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"], // because only postgres supports jsonb type
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not store json type as string on update", () => Promise.all(connections.map(async (connection) => {
        let recordRepo = connection.getRepository(Record_1.Record);
        let record = new Record_1.Record();
        record.data = { foo: "bar" };
        let persistedRecord = await recordRepo.save(record);
        record.data.should.be.eql({ foo: "bar" });
        let foundRecord = await recordRepo.findOne({
            where: {
                id: persistedRecord.id,
            },
        });
        (0, chai_1.expect)(foundRecord).to.be.not.undefined;
        (0, chai_1.expect)(foundRecord.data.foo).to.eq("bar");
        // Update
        foundRecord.data = { answer: 42 };
        await recordRepo.save(foundRecord);
        foundRecord = await recordRepo.findOne({
            where: {
                id: persistedRecord.id,
            },
        });
        (0, chai_1.expect)(foundRecord).to.be.not.undefined;
        (0, chai_1.expect)(foundRecord.data).to.not.be.equal('{"answer":42}');
        (0, chai_1.expect)(foundRecord.data.answer).to.eq(42);
    })));
});
//# sourceMappingURL=issue-1314.js.map