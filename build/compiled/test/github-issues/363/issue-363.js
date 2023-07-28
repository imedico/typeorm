"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const Car_1 = require("./entity/Car");
const Fruit_1 = require("./entity/Fruit");
describe("github issues > #363 Can't save 2 unrelated entity types in a single persist call", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("entityManager should allow you to save unrelated entities with one persist call", () => Promise.all(connections.map(async (connection) => {
        const car = new Car_1.Car();
        car.name = "Ferrari";
        const fruit = new Fruit_1.Fruit();
        fruit.name = "Banana";
        const [savedCar, savedFruit] = await connection.manager.save([
            car,
            fruit,
        ]);
        (0, chai_1.expect)(savedFruit).to.have.property("name", "Banana");
        (0, chai_1.expect)(savedFruit).to.be.instanceof(Fruit_1.Fruit);
        (0, chai_1.expect)(savedCar).to.have.property("name", "Ferrari");
        (0, chai_1.expect)(savedCar).to.be.instanceof(Car_1.Car);
        const cars = await connection.manager.find(Car_1.Car);
        // before the changes in this PR, all the tests before this one actually passed
        (0, chai_1.expect)(cars).to.length(1);
        (0, chai_1.expect)(cars[0]).to.have.property("name", "Ferrari");
        const fruits = await connection.manager.find(Fruit_1.Fruit);
        (0, chai_1.expect)(fruits).to.length(1);
        (0, chai_1.expect)(fruits[0]).to.have.property("name", "Banana");
    })));
    it("entityManager should allow you to delete unrelated entities with one remove call", () => Promise.all(connections.map(async (connection) => {
        const fruit = new Fruit_1.Fruit();
        fruit.name = "Banana";
        const fruit2 = new Fruit_1.Fruit();
        fruit2.name = "Apple";
        const [savedFruit] = await connection.manager.save([
            fruit,
            fruit2,
        ]);
        const car = new Car_1.Car();
        car.name = "Ferrari";
        const savedCar = await connection.manager.save(car);
        await connection.manager.remove([savedCar, savedFruit]);
        const cars = await connection.manager.find(Car_1.Car);
        (0, chai_1.expect)(cars).to.length(0);
        const fruits = await connection.manager.find(Fruit_1.Fruit);
        (0, chai_1.expect)(fruits).to.length(1);
        (0, chai_1.expect)(fruits[0]).to.have.property("name", "Apple");
    })));
});
//# sourceMappingURL=issue-363.js.map