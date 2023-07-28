"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../../utils/test-utils");
const chai_1 = require("chai");
const User_1 = require("./entity/User");
const Setting_1 = require("./entity/Setting");
describe("persistence > orphanage > disable", () => {
    // -------------------------------------------------------------------------
    // Configuration
    // -------------------------------------------------------------------------
    // connect to db
    let connections = [];
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    // -------------------------------------------------------------------------
    // Specifications
    // -------------------------------------------------------------------------
    describe("when a User is updated without all settings being loaded...", () => {
        let userRepo;
        let settingRepo;
        let userId;
        beforeEach(async function () {
            if (connections.length === 0) {
                this.skip();
            }
            await Promise.all(connections.map(async (connection) => {
                userRepo = connection.getRepository(User_1.User);
                settingRepo = connection.getRepository(Setting_1.Setting);
            }));
            const user = await userRepo.save(new User_1.User());
            user.settings = [
                new Setting_1.Setting("foo"),
                new Setting_1.Setting("bar"),
                new Setting_1.Setting("moo"),
            ];
            await userRepo.save(user);
            userId = user.id;
            const userToUpdate = (await userRepo.findOneBy({ id: userId }));
            userToUpdate.settings = [
                // untouched setting
                userToUpdate.settings[0],
                // updated setting
                { ...userToUpdate.settings[1], data: "bar_updated" },
                // skipped setting
                // new Setting("moo"),
                // new setting
                new Setting_1.Setting("cow"),
            ];
            await userRepo.save(userToUpdate);
        });
        it("should not delete setting with orphanedRowAction=disabed", async () => {
            const user = await userRepo.findOneBy({ id: userId });
            (0, chai_1.expect)(user).not.to.be.undefined;
            (0, chai_1.expect)(user.settings).to.have.lengthOf(4);
        });
        it("should not orphane any Settings", async () => {
            const itemsWithoutForeignKeys = (await settingRepo.find()).filter((p) => !p.userId);
            (0, chai_1.expect)(itemsWithoutForeignKeys).to.have.lengthOf(0);
        });
    });
});
//# sourceMappingURL=disable-orphanage.js.map