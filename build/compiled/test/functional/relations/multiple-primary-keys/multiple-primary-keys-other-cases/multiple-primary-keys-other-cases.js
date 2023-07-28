"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../../utils/test-utils");
const User_1 = require("./entity/User");
const EventMember_1 = require("./entity/EventMember");
const Event_1 = require("./entity/Event");
const Person_1 = require("./entity/Person");
describe("relations > multiple-primary-keys > other-cases", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should load related entity when entity uses relation ids as primary id", () => Promise.all(connections.map(async (connection) => {
        const user1 = new User_1.User();
        user1.name = "Alice";
        await connection.manager.save(user1);
        const user2 = new User_1.User();
        user2.name = "Bob";
        await connection.manager.save(user2);
        const user3 = new User_1.User();
        user3.name = "Clara";
        await connection.manager.save(user3);
        const person1 = new Person_1.Person();
        person1.fullName = "Alice A";
        person1.user = user1;
        await connection.manager.save(person1);
        const person2 = new Person_1.Person();
        person2.fullName = "Bob B";
        person2.user = user2;
        await connection.manager.save(person2);
        const event1 = new Event_1.Event();
        event1.name = "Event #1";
        event1.author = person1;
        await connection.manager.save(event1);
        const event2 = new Event_1.Event();
        event2.name = "Event #2";
        event2.author = person2;
        await connection.manager.save(event2);
        const eventMember1 = new EventMember_1.EventMember();
        eventMember1.user = user1;
        eventMember1.event = event1;
        await connection.manager.save(eventMember1);
        const eventMember2 = new EventMember_1.EventMember();
        eventMember2.user = user2;
        eventMember2.event = event1;
        await connection.manager.save(eventMember2);
        const eventMember3 = new EventMember_1.EventMember();
        eventMember3.user = user1;
        eventMember3.event = event2;
        await connection.manager.save(eventMember3);
        const eventMember4 = new EventMember_1.EventMember();
        eventMember4.user = user3;
        eventMember4.event = event2;
        await connection.manager.save(eventMember4);
        const loadedEvents = await connection.manager
            .createQueryBuilder(Event_1.Event, "event")
            .leftJoinAndSelect("event.author", "author")
            .leftJoinAndSelect("author.user", "authorUser")
            .leftJoinAndSelect("event.members", "members")
            .leftJoinAndSelect("members.user", "user")
            .orderBy("event.id, user.id")
            .getMany();
        (0, chai_1.expect)(loadedEvents[0].author).to.not.be.undefined;
        (0, chai_1.expect)(loadedEvents[0].author.fullName).to.be.equal("Alice A");
        (0, chai_1.expect)(loadedEvents[0].author.user).to.not.be.undefined;
        (0, chai_1.expect)(loadedEvents[0].author.user.id).to.be.equal(1);
        (0, chai_1.expect)(loadedEvents[0].members).to.not.be.eql([]);
        (0, chai_1.expect)(loadedEvents[0].members[0].user.id).to.be.equal(1);
        (0, chai_1.expect)(loadedEvents[0].members[0].user.name).to.be.equal("Alice");
        (0, chai_1.expect)(loadedEvents[0].members[1].user.id).to.be.equal(2);
        (0, chai_1.expect)(loadedEvents[0].members[1].user.name).to.be.equal("Bob");
        (0, chai_1.expect)(loadedEvents[1].author).to.not.be.undefined;
        (0, chai_1.expect)(loadedEvents[1].author.fullName).to.be.equal("Bob B");
        (0, chai_1.expect)(loadedEvents[1].author.user).to.not.be.undefined;
        (0, chai_1.expect)(loadedEvents[1].author.user.id).to.be.equal(2);
        (0, chai_1.expect)(loadedEvents[1].members).to.not.be.eql([]);
        (0, chai_1.expect)(loadedEvents[1].members[0].user.id).to.be.equal(1);
        (0, chai_1.expect)(loadedEvents[1].members[0].user.name).to.be.equal("Alice");
        (0, chai_1.expect)(loadedEvents[1].members[1].user.id).to.be.equal(3);
        (0, chai_1.expect)(loadedEvents[1].members[1].user.name).to.be.equal("Clara");
        const loadedUsers = await connection.manager
            .createQueryBuilder(User_1.User, "user")
            .leftJoinAndSelect("user.members", "members")
            .leftJoinAndSelect("members.event", "event")
            .orderBy("user.id, event.id")
            .getMany();
        (0, chai_1.expect)(loadedUsers[0].members).to.not.be.eql([]);
        (0, chai_1.expect)(loadedUsers[0].members[0].event.id).to.be.equal(1);
        (0, chai_1.expect)(loadedUsers[0].members[0].event.name).to.be.equal("Event #1");
        (0, chai_1.expect)(loadedUsers[0].members[1].event.id).to.be.equal(2);
        (0, chai_1.expect)(loadedUsers[0].members[1].event.name).to.be.equal("Event #2");
        (0, chai_1.expect)(loadedUsers[1].members).to.not.be.eql([]);
        (0, chai_1.expect)(loadedUsers[1].members[0].event.id).to.be.equal(1);
        (0, chai_1.expect)(loadedUsers[1].members[0].event.name).to.be.equal("Event #1");
        (0, chai_1.expect)(loadedUsers[2].members).to.not.be.eql([]);
        (0, chai_1.expect)(loadedUsers[2].members[0].event.id).to.be.equal(2);
        (0, chai_1.expect)(loadedUsers[2].members[0].event.name).to.be.equal("Event #2");
    })));
});
//# sourceMappingURL=multiple-primary-keys-other-cases.js.map