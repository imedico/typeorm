"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const entities_1 = require("./entity/entities");
describe("github issues > #8690 Relations do not render primary key column values correctly when transformers present", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should load relations correctly when primary columns have transformers", () => Promise.all(connections.map(async (connection) => {
        const userRepository = connection.getRepository(entities_1.User);
        const photoRepository = connection.getRepository(entities_1.Photo);
        const user = userRepository.create({ id: `"1"` });
        await userRepository.save(user);
        const photo = photoRepository.create({
            id: `"42"`,
            url: "example.com/photo1",
            userId: user.id,
        });
        await photoRepository.save(photo);
        const userPhotos = await user.photos;
        (0, chai_1.expect)(userPhotos.length === 1);
        (0, chai_1.expect)(userPhotos[0].id === photo.id);
        (0, chai_1.expect)(userPhotos[0].userId === user.id);
    })));
});
//# sourceMappingURL=issue-8690.js.map