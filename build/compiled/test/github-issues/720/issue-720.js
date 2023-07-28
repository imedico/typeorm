"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Participant_1 = require("./entity/Participant");
const chai_1 = require("chai");
const Message_1 = require("./entity/Message");
const Translation_1 = require("./entity/Translation");
const Locale_1 = require("./entity/Locale");
describe("github issues > #720 `.save()` not updating composite key with Postgres", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not insert new entity when entity already exist with same primary keys", () => Promise.all(connections.map(async (connection) => {
        const participants = [];
        participants[0] = new Participant_1.Participant();
        participants[0].order_id = 1;
        participants[0].distance = "one";
        participants[0].price = "100$";
        participants[1] = new Participant_1.Participant();
        participants[1].order_id = 1;
        participants[1].distance = "two";
        participants[1].price = "200$";
        participants[2] = new Participant_1.Participant();
        participants[2].order_id = 1;
        participants[2].distance = "three";
        participants[2].price = "300$";
        await connection.manager.save(participants);
        const count1 = await connection.manager.count(Participant_1.Participant);
        (0, chai_1.expect)(count1).to.be.equal(3);
        const updatedParticipants = [];
        updatedParticipants[0] = new Participant_1.Participant();
        updatedParticipants[0].order_id = 1;
        updatedParticipants[0].distance = "one";
        updatedParticipants[0].price = "150$";
        updatedParticipants[1] = new Participant_1.Participant();
        updatedParticipants[1].order_id = 1;
        updatedParticipants[1].distance = "two";
        updatedParticipants[1].price = "250$";
        await connection.manager.save(updatedParticipants);
        const count2 = await connection.manager.count(Participant_1.Participant);
        (0, chai_1.expect)(count2).to.be.equal(3);
        const loadedParticipant1 = await connection.manager.findOneBy(Participant_1.Participant, { order_id: 1, distance: "one" });
        (0, chai_1.expect)(loadedParticipant1.order_id).to.be.equal(1);
        (0, chai_1.expect)(loadedParticipant1.distance).to.be.equal("one");
        (0, chai_1.expect)(loadedParticipant1.price).to.be.equal("150$");
        const loadedParticipant2 = await connection.manager.findOneBy(Participant_1.Participant, { order_id: 1, distance: "two" });
        (0, chai_1.expect)(loadedParticipant2.order_id).to.be.equal(1);
        (0, chai_1.expect)(loadedParticipant2.distance).to.be.equal("two");
        (0, chai_1.expect)(loadedParticipant2.price).to.be.equal("250$");
    })));
    it("reproducing second comment issue", () => Promise.all(connections.map(async (connection) => {
        const message = new Message_1.Message();
        await connection.manager.save(message);
        const locale = new Locale_1.Locale();
        locale.code = "US";
        locale.englishName = "USA";
        locale.name = message;
        await connection.manager.save(locale);
        const translation = new Translation_1.Translation();
        translation.message = message;
        translation.locale = locale;
        translation.text = "Some Text";
        await connection.manager.save(translation);
        // change its text and save again
        translation.text = "Changed Text";
        await connection.manager.save(translation);
        const foundTranslation = await connection.manager
            .getRepository(Translation_1.Translation)
            .findOneBy({
            locale: {
                code: "US",
            },
            message: {
                id: "1",
            },
        });
        (0, chai_1.expect)(foundTranslation).to.be.eql({
            localeCode: "US",
            messageId: "1",
            text: "Changed Text",
        });
    })));
});
//# sourceMappingURL=issue-720.js.map