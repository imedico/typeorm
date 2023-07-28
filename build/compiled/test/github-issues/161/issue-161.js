"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Ticket_1 = require("./entity/Ticket");
const Request_1 = require("./entity/Request");
const chai_1 = require("chai");
describe("github issues > #161 joinAndSelect can't find entity from inverse side of relation", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should persist successfully", () => Promise.all(connections.map(async (connection) => {
        const request = new Request_1.Request();
        request.owner = "Umed";
        request.type = "ticket";
        request.success = false;
        const ticket = new Ticket_1.Ticket();
        ticket.name = "ticket #1";
        ticket.request = request;
        await connection.manager.save(ticket);
        const loadedTicketWithRequest = await connection.manager.findOne(Ticket_1.Ticket, {
            where: {
                id: 1,
            },
            join: {
                alias: "ticket",
                innerJoinAndSelect: {
                    request: "ticket.request",
                },
            },
        });
        (0, chai_1.expect)(loadedTicketWithRequest).not.to.be.null;
        loadedTicketWithRequest.should.be.eql({
            id: 1,
            name: "ticket #1",
            request: {
                id: 1,
                owner: "Umed",
                type: "ticket",
                success: false,
            },
        });
        const loadedRequestWithTicket = await connection.manager.findOne(Request_1.Request, {
            where: {
                id: 1,
            },
            join: {
                alias: "request",
                innerJoinAndSelect: {
                    ticket: "request.ticket",
                },
            },
        });
        loadedRequestWithTicket.should.be.eql({
            id: 1,
            owner: "Umed",
            type: "ticket",
            success: false,
            ticket: {
                id: 1,
                name: "ticket #1",
            },
        });
    })));
    it("should return joined relation successfully", () => Promise.all(connections.map(async (connection) => {
        const authRequest = new Request_1.Request();
        authRequest.owner = "somebody";
        authRequest.type = "authenticate";
        authRequest.success = true;
        await connection.manager.save(authRequest);
        const request = new Request_1.Request();
        request.owner = "somebody";
        request.type = "ticket";
        request.success = true;
        const ticket = new Ticket_1.Ticket();
        ticket.name = "USD PAYMENT";
        ticket.request = request;
        request.ticket = ticket;
        await connection.manager.save(ticket);
        const loadedRequest = await connection.manager.findOne(Request_1.Request, {
            where: {
                id: 2,
            },
            join: {
                alias: "request",
                innerJoinAndSelect: { ticket: "request.ticket" },
            },
        });
        (0, chai_1.expect)(loadedRequest).not.to.be.null;
        loadedRequest.should.be.eql({
            id: 2,
            owner: "somebody",
            type: "ticket",
            success: true,
            ticket: {
                id: 1,
                name: "USD PAYMENT",
            },
        });
    })));
});
//# sourceMappingURL=issue-161.js.map