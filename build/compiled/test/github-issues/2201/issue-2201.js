"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const context_1 = require("./entity/ver2/context");
const record_1 = require("./entity/ver2/record");
const user_1 = require("./entity/ver2/user");
describe("github issues > #2201 - Create a select query when using a (custom) junction table", () => {
    it("Should create only two PM columns ('order_id' and 'user_id')", async () => {
        const connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/ver1/*{.js,.ts}"],
            schemaCreate: true,
            dropSchema: true,
        });
        if (!connections.length)
            return;
        const contextMetadata = connections[0].entityMetadatas.find((metadata) => metadata.name === "RecordContext");
        const expectedColumnNames = ["record_id", "meta", "user_id"];
        const existingColumnNames = contextMetadata.columns.map((col) => col.databaseName);
        (0, chai_1.expect)(existingColumnNames.length).to.eql(expectedColumnNames.length);
        (0, chai_1.expect)(existingColumnNames).have.members(expectedColumnNames);
        await (0, test_utils_1.closeTestingConnections)(connections);
    });
    it("Should not try to update the junction table when not needed", async () => {
        const connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/ver2/*{.js,.ts}"],
            enabledDrivers: ["postgres"],
            schemaCreate: true,
            dropSchema: true,
        });
        if (!connections.length)
            return;
        user_1.User.useDataSource(connections[0]);
        record_1.Record.useDataSource(connections[0]);
        context_1.RecordContext.useDataSource(connections[0]);
        const user = user_1.User.create({ id: "user1" });
        await user.save();
        const record = record_1.Record.create({ id: "record1", status: "pending" });
        await record.save();
        const context = context_1.RecordContext.create({
            user,
            record,
            userId: user.id,
            recordId: record.id,
            meta: "meta",
        });
        await context.save();
        const query = record_1.Record.createQueryBuilder("record")
            .leftJoinAndSelect("record.contexts", "context")
            .where("record.id = :recordId", { recordId: record.id });
        const result = (await query.getOne());
        result.status = "failed";
        await result.save();
        (0, chai_1.expect)(0).to.eql(0);
        await (0, test_utils_1.closeTestingConnections)(connections);
    });
});
//# sourceMappingURL=issue-2201.js.map