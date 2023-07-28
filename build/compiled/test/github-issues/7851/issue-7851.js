"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const user_1 = require("./entity/user");
const message_1 = require("./entity/message");
describe("github issues > #7851 Updating (using save method) a ManyToOne relation sets the object.relation_id to null", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            enabledDrivers: ["mysql"],
            entities: [user_1.User, message_1.Message],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should update the message.user_id to the new value", () => Promise.all(connections.map(async (connection) => {
        const userRepository = connection.getRepository(user_1.User);
        const messageRepository = connection.getRepository(message_1.Message);
        const user1ID = Buffer.from([
            135, 114, 221, 160, 230, 218, 17, 234, 175, 15, 4, 237, 51,
            12, 208, 0,
        ]);
        const user2ID = Buffer.from([
            50, 114, 221, 160, 230, 218, 17, 234, 175, 15, 4, 237, 51,
            12, 208, 0,
        ]);
        const messageID = Buffer.from([
            64, 114, 221, 160, 230, 218, 17, 234, 175, 15, 4, 237, 51,
            12, 208, 0,
        ]);
        // Inserting users, works fine
        const user1 = {
            id: user1ID,
        };
        const user2 = {
            id: user2ID,
        };
        await userRepository.save([user1, user2]);
        // Inserting message : works fine
        const message = {
            id: messageID,
            sender: user1,
        };
        await messageRepository.save(message);
        // Updating message.sender
        message.sender = user2;
        await messageRepository.save(message);
        const savedMessage = await messageRepository
            .createQueryBuilder("Message")
            .leftJoinAndMapOne("Message.sender", "Message.sender", "sender")
            .where("Message.id = :id", { id: messageID })
            .getOneOrFail();
        (0, chai_1.expect)(savedMessage.sender).to.be.instanceOf(user_1.User);
        (0, chai_1.expect)(savedMessage.sender.id).to.be.eql(user2ID);
    })));
});
//# sourceMappingURL=issue-7851.js.map