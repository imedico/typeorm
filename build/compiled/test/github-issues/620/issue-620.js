"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Cat_1 = require("./entity/Cat");
const Dog_1 = require("./entity/Dog");
describe("github issues > #620 Feature Request: Flexibility in Foreign Key names", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should work as expected", () => Promise.all(connections.map(async (connection) => {
        const dog = new Dog_1.Dog();
        dog.DogID = "Simba";
        await connection.manager.save(dog);
        const cat = new Cat_1.Cat();
        cat.dog = dog;
        await connection.manager.save(cat);
        const loadedCat = await connection.manager
            .createQueryBuilder(Cat_1.Cat, "cat")
            .leftJoinAndSelect("cat.dog", "dog")
            .getOne();
        loadedCat.id.should.be.equal(1);
        loadedCat.dog.DogID.should.be.equal("Simba");
    })));
});
//# sourceMappingURL=issue-620.js.map