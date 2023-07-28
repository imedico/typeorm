"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("../../../utils/test-utils");
const chai_1 = require("chai");
const MockSubscriber_1 = require("./subscribers/MockSubscriber");
const Example_1 = require("./entity/Example");
describe("entity subscriber > query data", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Example_1.Example],
        subscribers: [MockSubscriber_1.MockSubscriber],
        dropSchema: true,
        schemaCreate: true,
        enabledDrivers: ["sqlite"],
    })));
    beforeEach(() => {
        if (!connections.length)
            return;
        connections[0].subscribers[0].calledData.length = 0;
    });
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("passes query data to subscriber", async () => {
        if (!connections.length)
            return;
        const connection = connections[0];
        const subscriber = connection.subscribers[0];
        const example = new Example_1.Example();
        await connection.manager.save(example);
        example.value++;
        await connection.manager.save(example, { data: { Hello: "World" } });
        (0, chai_1.expect)(subscriber.calledData).to.be.eql([{ Hello: "World" }]);
    });
    it("cleans up the data after the save completes", async () => {
        if (!connections.length)
            return;
        const connection = connections[0];
        const subscriber = connection.subscribers[0];
        const example = new Example_1.Example();
        await connection.manager.save(example);
        example.value++;
        await connection.manager.save(example, { data: { Hello: "World" } });
        example.value++;
        await connection.manager.save(example);
        (0, chai_1.expect)(subscriber.calledData).to.be.eql([{ Hello: "World" }, {}]);
    });
});
//# sourceMappingURL=query-data.js.map