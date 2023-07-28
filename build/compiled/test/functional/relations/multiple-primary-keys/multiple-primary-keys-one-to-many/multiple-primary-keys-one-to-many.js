"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("reflect-metadata");
const test_utils_1 = require("../../../../utils/test-utils");
const User_1 = require("./entity/User");
const Setting_1 = require("./entity/Setting");
/**
 *  Using OneToMany relation with composed primary key should not error and work correctly
 */
describe("relations > multiple-primary-keys > one-to-many", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [User_1.User, Setting_1.Setting],
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
    it("should correctly insert relation items", () => Promise.all(connections.map(async (connection) => {
        const userEntity = await insertSimpleTestData(connection);
        const persistedSettings = await connection
            .getRepository(Setting_1.Setting)
            .find();
        (0, chai_1.expect)(persistedSettings).not.to.be.undefined;
        (0, chai_1.expect)(persistedSettings.length).to.equal(2);
        (0, chai_1.expect)(persistedSettings[0].assetId).to.equal(userEntity.id);
        (0, chai_1.expect)(persistedSettings[1].assetId).to.equal(userEntity.id);
    })));
    it("should correctly load relation items", () => Promise.all(connections.map(async (connection) => {
        await insertSimpleTestData(connection);
        const [user] = await connection.getRepository(User_1.User).find({
            relations: { settings: true },
            // relationLoadStrategy: "join"
        });
        (0, chai_1.expect)(user).not.to.be.undefined;
        (0, chai_1.expect)(user.settings).to.be.an("array");
        (0, chai_1.expect)(user.settings.length).to.equal(2);
    })));
    it("should correctly update relation items", () => Promise.all(connections.map(async (connection) => {
        await insertSimpleTestData(connection);
        const userRepo = connection.getRepository(User_1.User);
        await userRepo.save([
            {
                id: 1,
                settings: [
                    { id: 1, name: "A", value: "foobar" },
                    { id: 1, name: "B", value: "testvalue" },
                ],
            },
        ]);
        const [user] = await connection
            .getRepository(User_1.User)
            .find({ relations: { settings: true } });
        // check the saved items have correctly updated value
        (0, chai_1.expect)(user).not.to.be.undefined;
        (0, chai_1.expect)(user.settings).to.be.an("array");
        (0, chai_1.expect)(user.settings.length).to.equal(2);
        user.settings.forEach((setting) => {
            if (setting.name === "A")
                (0, chai_1.expect)(setting.value).to.equal("foobar");
            else
                (0, chai_1.expect)(setting.value).to.equal("testvalue");
        });
        // make sure only 2 entries are in db, initial ones should have been updated
        const settings = await connection.getRepository(Setting_1.Setting).find();
        (0, chai_1.expect)(settings).to.be.an("array");
        (0, chai_1.expect)(settings.length).to.equal(2);
    })));
    it("should correctly delete relation items", () => Promise.all(connections.map(async (connection) => {
        await insertSimpleTestData(connection);
        const userRepo = connection.getRepository(User_1.User);
        await userRepo.save({
            id: 1,
            settings: [],
        });
        const [user] = await connection.getRepository(User_1.User).find({
            relations: { settings: true },
        });
        // check that no relational items are found
        (0, chai_1.expect)(user).not.to.be.null;
        (0, chai_1.expect)(user.settings).to.be.an("array");
        (0, chai_1.expect)(user.settings.length).to.equal(0);
        // check there are no orphane relational items
        const settings = await connection.getRepository(Setting_1.Setting).find();
        (0, chai_1.expect)(settings).to.be.an("array");
        (0, chai_1.expect)(settings.length).to.equal(0);
    })));
});
//# sourceMappingURL=multiple-primary-keys-one-to-many.js.map