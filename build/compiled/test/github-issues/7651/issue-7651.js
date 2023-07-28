"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const order_1 = require("./entity/order");
const order_test_entity_1 = require("./entity/order-test.entity");
describe("github issues > #7651 Enum that contains functions is not accordingly translated to SQL", () => {
    describe("entity", () => {
        let connections;
        before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            schemaCreate: true,
            dropSchema: true,
            enabledDrivers: ["postgres"],
        })));
        beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
        after(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("should correctly save and retrieve enum fields when declaration merging technique is used and enum contains functions", () => Promise.all(connections.map(async (connection) => {
            // GIVEN
            const orderEntity = new order_test_entity_1.OrderTestEntity();
            orderEntity.id = 1;
            orderEntity.order = order_1.Order.from("_2"); // example of function call on enum to retrieve enum from string
            const orderEntityRepository = connection.getRepository(order_test_entity_1.OrderTestEntity);
            await orderEntityRepository.save(orderEntity);
            // WHEN
            const loadedOrderEntity = await orderEntityRepository.findOneBy({ id: 1 });
            // THEN
            loadedOrderEntity.order.should.be.eq(order_1.Order.SECOND);
        })));
        it("should correctly save and retrieve enum array", () => Promise.all(connections.map(async (connection) => {
            // GIVEN
            const orderEntity = new order_test_entity_1.OrderTestEntity();
            orderEntity.id = 1;
            orderEntity.orders = [order_1.Order.from("_2"), order_1.Order.THIRD];
            const orderEntityRepository = connection.getRepository(order_test_entity_1.OrderTestEntity);
            await orderEntityRepository.save(orderEntity);
            // WHEN
            const loadedOrderEntity = await orderEntityRepository.findOneBy({ id: 1 });
            // THEN
            loadedOrderEntity.orders.should.be.eql([
                order_1.Order.SECOND,
                order_1.Order.THIRD,
            ]);
        })));
    });
    describe("schema", () => {
        let connections;
        before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            schemaCreate: false,
            dropSchema: true,
            enabledDrivers: ["postgres"],
            migrations: [],
        })));
        after(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("should contain SQL for enum type without function", () => Promise.all(connections.map(async (connection) => {
            const sqlInMemory = await connection.driver
                .createSchemaBuilder()
                .log();
            sqlInMemory.upQueries.length.should.be.greaterThan(0);
            sqlInMemory.upQueries.forEach((query) => {
                // there should be no function string in query when our ENUM TYPE is provided
                query.query.should.not.contain("function");
            });
        })));
    });
});
//# sourceMappingURL=issue-7651.js.map