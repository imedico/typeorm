"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const User_1 = require("./entity/User");
const Setting_1 = require("./entity/Setting");
const SettingSubscriber_1 = require("./entity/SettingSubscriber");
/**
 *  Using OneToMany relation with composed primary key should not error and work correctly
 */
describe("github issues > #8221", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [User_1.User, Setting_1.Setting],
        subscribers: [SettingSubscriber_1.SettingSubscriber],
        schemaCreate: true,
        dropSchema: true,
    })));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    function insertSimpleTestData(connection) {
        const userRepo = connection.getRepository(User_1.User);
        // const settingRepo = connection.getRepository(Setting);
        const user = new User_1.User(1, "FooGuy");
        const settingA = new Setting_1.Setting(1, "A", "foo");
        const settingB = new Setting_1.Setting(1, "B", "bar");
        user.settings = [settingA, settingB];
        return userRepo.save(user);
    }
    // important: must not use Promise.all! parallel execution against different drivers would mess up the counter within the SettingSubscriber!
    it("afterLoad entity modifier must not make relation key matching fail", async () => {
        for (const connection of connections) {
            const userRepo = connection.getRepository(User_1.User);
            const subscriber = connection.subscribers.find((s) => s instanceof SettingSubscriber_1.SettingSubscriber);
            if (!subscriber)
                throw new Error(`Subscriber not found`);
            subscriber.reset();
            await insertSimpleTestData(connection);
            subscriber.reset();
            await userRepo.save([
                {
                    id: 1,
                    settings: [
                        { assertId: 1, name: "A", value: "foobar" },
                        { assertId: 1, name: "B", value: "testvalue" },
                    ],
                },
            ]);
            // we use a subscriber to count generated Subjects based on how often beforeInsert/beforeRemove/beforeUpdate has been called.
            // the save query should only update settings, so only beforeUpdate should have been called.
            // if beforeInsert/beforeUpdate has been called, this would indicate that key matching has failed.
            // the resulting state would be the same, but settings entities would be deleted and inserted instead.
            (0, chai_1.expect)(subscriber.counter.deletes).to.equal(0);
            (0, chai_1.expect)(subscriber.counter.inserts).to.equal(0);
            (0, chai_1.expect)(subscriber.counter.updates).to.equal(2);
        }
    });
});
//# sourceMappingURL=issue-8221.js.map