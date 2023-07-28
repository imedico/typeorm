"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const src_1 = require("../../../src");
const test_utils_1 = require("../../utils/test-utils");
const Product_1 = require("./entity/Product");
const Ticket_1 = require("./entity/Ticket");
const TicketProduct_1 = require("./entity/TicketProduct");
describe("github issues > #2298 - Repository filtering not considering related columns as filter", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should work perfectly", () => Promise.all(connections.map(async (connection) => {
        const product1 = new Product_1.Product();
        await connection.manager.save(product1);
        const product2 = new Product_1.Product();
        await connection.manager.save(product2);
        const ticket1 = new Ticket_1.Ticket();
        ticket1.shopId = "myshopId1";
        ticket1.chainId = "myChainId1";
        await connection.manager.save(ticket1);
        const ticket2 = new Ticket_1.Ticket();
        ticket2.shopId = "myshopId1";
        ticket2.chainId = "myChainId2";
        await connection.manager.save(ticket2);
        const ticketProduct1 = new TicketProduct_1.TicketProduct();
        ticketProduct1.product = product1;
        ticketProduct1.ticket = ticket1;
        await connection.manager.save(ticketProduct1);
        const ticketProduct2 = new TicketProduct_1.TicketProduct();
        ticketProduct2.product = product1;
        ticketProduct2.ticket = ticket1;
        await connection.manager.save(ticketProduct2);
        const ticketProduct3 = new TicketProduct_1.TicketProduct();
        ticketProduct3.product = product2;
        ticketProduct3.ticket = ticket2;
        await connection.manager.save(ticketProduct3);
        const ticketProduct4 = new TicketProduct_1.TicketProduct();
        ticketProduct4.product = product2;
        ticketProduct4.ticket = ticket2;
        await connection.manager.save(ticketProduct4);
        const loadedTicket = await connection.manager.find(Ticket_1.Ticket, {
            where: {
                shopId: "myshopId1",
                chainId: (0, src_1.In)(["myChainId1", "myChainId2"]),
                ticketItems: {
                    product: {
                        id: (0, src_1.In)([2, 3]),
                    },
                },
            },
            relations: {
                ticketItems: {
                    product: true,
                },
            },
            order: {
                ticketItems: {
                    id: "asc",
                },
            },
        });
        loadedTicket.should.be.eql([
            {
                id: 2,
                shopId: "myshopId1",
                chainId: "myChainId2",
                ticketItems: [
                    {
                        id: 3,
                        product: {
                            id: 2,
                        },
                    },
                    {
                        id: 4,
                        product: {
                            id: 2,
                        },
                    },
                ],
            },
        ]);
    })));
});
//# sourceMappingURL=issue-2298.js.map