"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const Order_1 = require("./entity/Order");
const OrderCustomer_1 = require("./entity/OrderCustomer");
const OrderRepository_1 = require("./repository/OrderRepository");
const Broker_1 = require("./entity/Broker");
const BrokerRepository_1 = require("./repository/BrokerRepository");
describe("github issues > #3246 Saving an entity with a 1:1 cascading insert does not return id if entity has nullable many:one relationship", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Order_1.Order, OrderCustomer_1.OrderCustomer, Broker_1.Broker],
        enabledDrivers: ["postgres"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should insert and return the order with id", () => Promise.all(connections.map(async (connection) => {
        let company = new Broker_1.Broker();
        company.name = "Acme Inc.";
        let order = new Order_1.Order();
        order.orderReferenceNumber = "abcd";
        const orderCustomer = new OrderCustomer_1.OrderCustomer();
        orderCustomer.name = "Dave";
        order.orderCustomer = orderCustomer;
        const myCompanyRepository = connection.manager.getCustomRepository(BrokerRepository_1.BrokerRepository);
        const createdCompany = await myCompanyRepository.createBroker(company);
        const myOrderRepository = connection.manager.getCustomRepository(OrderRepository_1.OrderRepository);
        order.company = createdCompany;
        const result = await myOrderRepository.createOrder(order);
        (0, chai_1.expect)(result.id).not.to.be.null;
    })));
});
//# sourceMappingURL=issue-3246.js.map