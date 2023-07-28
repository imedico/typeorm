"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../utils/test-setup");
const chai_1 = require("chai");
const Record_1 = require("./entity/Record");
const test_utils_1 = require("../../utils/test-utils");
const RecordData_1 = require("./entity/RecordData");
describe("github issues > #204 jsonb array is not persisted correctly", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Record_1.Record],
        enabledDrivers: ["postgres"], // because only postgres supports jsonb type
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should persist json and jsonb arrays correctly", () => Promise.all(connections.map(async (connection) => {
        const record = new Record_1.Record();
        record.datas = [
            new RecordData_1.RecordData("hello1", "hello2", "hello3", "hello4", true, false),
            new RecordData_1.RecordData("hi1", "hi2", "hi3", "hi4", false, true),
            new RecordData_1.RecordData("bye1", "bye2", "bye3", "bye4", false, false),
        ];
        record.configs = [
            {
                id: 1,
                option1: "1",
                option2: "1",
                option3: "1",
                isActive: true,
                extra: { data1: "one", data2: "two" },
            },
            {
                id: 2,
                option1: "2",
                option2: "2",
                option3: "2",
                isActive: false,
                extra: { data1: "one", data2: "two" },
            },
            {
                id: 3,
                option1: "3",
                option2: "3",
                option3: "3",
                isActive: true,
                extra: { data1: "one", data2: "two" },
            },
        ];
        await connection.manager.save(record);
        const foundRecord = await connection.manager.findOneBy(Record_1.Record, {
            id: record.id,
        });
        (0, chai_1.expect)(foundRecord).to.be.not.undefined;
        foundRecord.datas.should.be.eql([
            new RecordData_1.RecordData("hello1", "hello2", "hello3", "hello4", true, false),
            new RecordData_1.RecordData("hi1", "hi2", "hi3", "hi4", false, true),
            new RecordData_1.RecordData("bye1", "bye2", "bye3", "bye4", false, false),
        ]);
        foundRecord.configs.should.be.eql([
            {
                id: 1,
                option1: "1",
                option2: "1",
                option3: "1",
                isActive: true,
                extra: { data1: "one", data2: "two" },
            },
            {
                id: 2,
                option1: "2",
                option2: "2",
                option3: "2",
                isActive: false,
                extra: { data1: "one", data2: "two" },
            },
            {
                id: 3,
                option1: "3",
                option2: "3",
                option3: "3",
                isActive: true,
                extra: { data1: "one", data2: "two" },
            },
        ]);
    })));
});
//# sourceMappingURL=issue-204.js.map