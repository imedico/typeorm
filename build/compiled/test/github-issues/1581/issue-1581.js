"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
const Product_1 = require("./entity/Product");
const DeliverySlot_1 = require("./entity/DeliverySlot");
const Order_1 = require("./entity/Order");
const OrderItem_1 = require("./entity/OrderItem");
describe.skip("github issues > #1581 Composite key breaks OneToMany relation", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["mysql"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("throws an error because there is no object id defined", () => Promise.all(connections.map(async (connection) => {
        const user1 = new User_1.User();
        user1.email = "user1@example.com";
        await connection.manager.save(user1);
        const product1 = new Product_1.Product();
        product1.id = 1;
        product1.name = "Product 1";
        await connection.manager.save(product1);
        const product2 = new Product_1.Product();
        product2.id = 3;
        product2.name = "Product 2";
        await connection.manager.save(product2);
        const slot1 = new DeliverySlot_1.DeliverySlot();
        slot1.name = "Slot 1";
        await connection.manager.save(slot1);
        const slot2 = new DeliverySlot_1.DeliverySlot();
        slot2.name = "Slot 2";
        await connection.manager.save(slot2);
        const order1 = new Order_1.Order();
        order1.deliverySlot = slot1;
        order1.user = user1;
        order1.enabled = true;
        await connection.manager.save(order1);
        const item1 = new OrderItem_1.OrderItem();
        item1.order = order1;
        item1.product = product1;
        item1.amount = 3;
        await connection.manager.save(item1);
        await connection.manager
            .createQueryBuilder(Order_1.Order, "order")
            .leftJoinAndSelect("order.deliverySlot", "deliverySlot")
            .leftJoinAndSelect("order.user", "user")
            .leftJoinAndSelect("order.items", "items")
            .getMany();
        // const orders = await connection.manager.getRepository(RecurringOrder).find({ relations: ["items"] });
        // console.log(orders);
    })));
});
//# sourceMappingURL=issue-1581.js.map