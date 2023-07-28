"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const user_1 = require("./entity/user");
const usersObject_1 = require("./entity/usersObject");
describe("github issues > #7852 saving a ManyToMany relation tries to insert (DEFAULT, entity2.id) instead of (entity1.id, entity2.id), when id is Buffer", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            enabledDrivers: ["mysql"],
            entities: [user_1.User, usersObject_1.UsersObject],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should insert (entity1.id, entity2.id)", () => Promise.all(connections.map(async (connection) => {
        const userRepository = connection.getRepository(user_1.User);
        const usersObjectRepository = connection.getRepository(usersObject_1.UsersObject);
        // Save one user
        const userId = Buffer.from([
            135, 114, 221, 160, 230, 218, 17, 234, 175, 15, 4, 237, 51,
            12, 208, 0,
        ]);
        const userEntity = new user_1.User();
        userEntity.id = userId;
        userEntity.objects = [];
        await userRepository.save(userEntity);
        // Save on object
        const ObjectId = 1;
        const objectEntity = new usersObject_1.UsersObject();
        objectEntity.id = ObjectId;
        await usersObjectRepository.save(objectEntity);
        // Updating using save method
        userEntity.objects = [objectEntity];
        await userRepository.save(userEntity);
        const savedUser = await userRepository
            .createQueryBuilder("User")
            .leftJoinAndMapMany("User.objects", "User.objects", "objects")
            .getOneOrFail();
        (0, chai_1.expect)(savedUser.objects.length).to.be.eql(1);
        (0, chai_1.expect)(savedUser.objects[0]).to.be.instanceOf(usersObject_1.UsersObject);
        (0, chai_1.expect)(savedUser.objects[0].id).to.be.eql(ObjectId);
    })));
});
//# sourceMappingURL=issue-7852.js.map