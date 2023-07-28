"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Message_1 = require("./entity/Message");
const Recipient_1 = require("./entity/Recipient");
const User_1 = require("./entity/User");
const Chat_1 = require("./entity/Chat");
describe("github issues > #1551 complex example of cascades + multiple primary keys = persistence order", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        __dirname,
        enabledDrivers: ["mysql"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("throws an error because there is no object id defined", () => Promise.all(connections.map(async (connection) => {
        const user1 = new User_1.User({
            username: "ethan",
            password: "$2a$08$NO9tkFLCoSqX1c5wk3s7z.JfxaVMKA.m7zUDdDwEquo4rvzimQeJm",
            name: "Ethan Gonzalez",
            picture: "https://randomuser.me/api/portraits/thumb/men/1.jpg",
            phone: "+391234567890",
        });
        await connection.manager.save(user1);
        const user5 = new User_1.User({
            username: "ray",
            password: "$2a$08$6.mbXqsDX82ZZ7q5d8Osb..JrGSsNp4R3IKj7mxgF6YGT0OmMw242",
            name: "Ray Edwards",
            picture: "https://randomuser.me/api/portraits/thumb/men/3.jpg",
            phone: "+391234567894",
        });
        await connection.manager.save(user5);
        await connection.manager.save(new Chat_1.Chat({
            allTimeMembers: [user1, user5],
            listingMembers: [user1, user5],
            messages: [
                new Message_1.Message({
                    sender: user1,
                    content: "I should buy a boat",
                    type: Message_1.MessageType.TEXT,
                    holders: [user1, user5],
                    recipients: [
                        new Recipient_1.Recipient({
                            user: user5,
                        }),
                    ],
                }),
                new Message_1.Message({
                    sender: user1,
                    content: "You still there?",
                    type: Message_1.MessageType.TEXT,
                    holders: [user1, user5],
                    recipients: [
                        new Recipient_1.Recipient({
                            user: user5,
                        }),
                    ],
                }),
            ],
        }));
        const messages = await connection.manager.find(Message_1.Message);
        messages[0].recipients.length.should.be.equal(1);
        messages[1].recipients.length.should.be.equal(1);
        const recipients = await connection.manager.find(Recipient_1.Recipient);
        recipients.length.should.be.equal(2);
    })));
    // cascade remove are not supported
    it.skip("throws a \"update or delete on table 'message' violates foreign key constraint on table 'recipient'\" error on delete", () => Promise.all(connections.map(async (connection) => {
        const user1 = new User_1.User({
            username: "ethan",
            password: "$2a$08$NO9tkFLCoSqX1c5wk3s7z.JfxaVMKA.m7zUDdDwEquo4rvzimQeJm",
            name: "Ethan Gonzalez",
            picture: "https://randomuser.me/api/portraits/thumb/men/1.jpg",
            phone: "+391234567890",
        });
        await connection.manager.save(user1);
        const user5 = new User_1.User({
            username: "ray",
            password: "$2a$08$6.mbXqsDX82ZZ7q5d8Osb..JrGSsNp4R3IKj7mxgF6YGT0OmMw242",
            name: "Ray Edwards",
            picture: "https://randomuser.me/api/portraits/thumb/men/3.jpg",
            phone: "+391234567894",
        });
        await connection.manager.save(user5);
        await connection.manager.save(new Chat_1.Chat({
            allTimeMembers: [user1, user5],
            listingMembers: [user1, user5],
            messages: [
                new Message_1.Message({
                    sender: user1,
                    content: "I should buy a boat",
                    type: Message_1.MessageType.TEXT,
                    holders: [user1, user5],
                    recipients: [
                        new Recipient_1.Recipient({
                            user: user5,
                        }),
                    ],
                }),
                new Message_1.Message({
                    sender: user1,
                    content: "You still there?",
                    type: Message_1.MessageType.TEXT,
                    holders: [user1, user5],
                    recipients: [
                        new Recipient_1.Recipient({
                            user: user5,
                        }),
                    ],
                }),
            ],
        }));
        const message = await connection
            .createQueryBuilder(Message_1.Message, "message")
            .getOne();
        if (message) {
            await connection.getRepository(Message_1.Message).remove(message);
        }
        else {
            throw new Error("Cannot get message");
        }
        const messages = await connection.manager.find(Message_1.Message);
        messages.length.should.be.equal(0);
        const recipients = await connection.manager.find(Recipient_1.Recipient);
        recipients.length.should.be.equal(0);
    })));
    // cascade remove are not supported
    it.skip("throws a \"null value in column 'userId' violates not-null constraint\" error on delete", () => Promise.all(connections.map(async (connection) => {
        const user1 = new User_1.User({
            username: "ethan",
            password: "$2a$08$NO9tkFLCoSqX1c5wk3s7z.JfxaVMKA.m7zUDdDwEquo4rvzimQeJm",
            name: "Ethan Gonzalez",
            picture: "https://randomuser.me/api/portraits/thumb/men/1.jpg",
            phone: "+391234567890",
        });
        await connection.manager.save(user1);
        const user5 = new User_1.User({
            username: "ray",
            password: "$2a$08$6.mbXqsDX82ZZ7q5d8Osb..JrGSsNp4R3IKj7mxgF6YGT0OmMw242",
            name: "Ray Edwards",
            picture: "https://randomuser.me/api/portraits/thumb/men/3.jpg",
            phone: "+391234567894",
        });
        await connection.manager.save(user5);
        await connection.manager.save(new Chat_1.Chat({
            allTimeMembers: [user1, user5],
            listingMembers: [user1, user5],
            messages: [
                new Message_1.Message({
                    sender: user1,
                    content: "I should buy a boat",
                    type: Message_1.MessageType.TEXT,
                    holders: [user1, user5],
                    recipients: [
                        new Recipient_1.Recipient({
                            user: user5,
                        }),
                    ],
                }),
                new Message_1.Message({
                    sender: user1,
                    content: "You still there?",
                    type: Message_1.MessageType.TEXT,
                    holders: [user1, user5],
                    recipients: [
                        new Recipient_1.Recipient({
                            user: user5,
                        }),
                    ],
                }),
            ],
        }));
        await connection
            .getRepository(Message_1.Message)
            .remove(await connection.manager.find(Message_1.Message));
        const messages = await connection.manager.find(Message_1.Message);
        messages.length.should.be.equal(0);
        const recipients = await connection.manager.find(Recipient_1.Recipient);
        recipients.length.should.be.equal(0);
    })));
    // cascade remove are not supported
    it.skip('throws a "Subject Recipient must have an identifier to perform operation" internal error on delete', () => Promise.all(connections.map(async (connection) => {
        const user1 = new User_1.User({
            username: "ethan",
            password: "$2a$08$NO9tkFLCoSqX1c5wk3s7z.JfxaVMKA.m7zUDdDwEquo4rvzimQeJm",
            name: "Ethan Gonzalez",
            picture: "https://randomuser.me/api/portraits/thumb/men/1.jpg",
            phone: "+391234567890",
        });
        await connection.manager.save(user1);
        const user5 = new User_1.User({
            username: "ray",
            password: "$2a$08$6.mbXqsDX82ZZ7q5d8Osb..JrGSsNp4R3IKj7mxgF6YGT0OmMw242",
            name: "Ray Edwards",
            picture: "https://randomuser.me/api/portraits/thumb/men/3.jpg",
            phone: "+391234567894",
        });
        await connection.manager.save(user5);
        await connection.manager.save(new Chat_1.Chat({
            allTimeMembers: [user1, user5],
            listingMembers: [user1, user5],
            messages: [
                new Message_1.Message({
                    sender: user1,
                    content: "I should buy a boat",
                    type: Message_1.MessageType.TEXT,
                    holders: [user1, user5],
                    recipients: [
                        new Recipient_1.Recipient({
                            user: user5,
                        }),
                    ],
                }),
                new Message_1.Message({
                    sender: user1,
                    content: "You still there?",
                    type: Message_1.MessageType.TEXT,
                    holders: [user1, user5],
                    recipients: [
                        new Recipient_1.Recipient({
                            user: user5,
                        }),
                    ],
                }),
            ],
        }));
        let recipients = await connection.manager.find(Recipient_1.Recipient);
        for (let recipient of recipients) {
            await connection.getRepository(Recipient_1.Recipient).remove(recipient);
        }
        recipients = await connection.manager.find(Recipient_1.Recipient);
        recipients.length.should.be.equal(0);
    })));
});
//# sourceMappingURL=issue-1551.js.map