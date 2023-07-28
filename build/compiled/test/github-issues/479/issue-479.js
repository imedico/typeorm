"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const Car_1 = require("./entity/Car");
describe("github issues > #479 orWhere breaks skip / take", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("where expression of the skip/take should not break original where query", () => Promise.all(connections.map(async (connection) => {
        const car1 = new Car_1.Car();
        car1.name = "Test1";
        const car2 = new Car_1.Car();
        car2.name = "Test2";
        const car3 = new Car_1.Car();
        car3.name = "Test3";
        const car4 = new Car_1.Car();
        car4.name = "BMW";
        const car5 = new Car_1.Car();
        car5.name = "Mercedes";
        const car6 = new Car_1.Car();
        car6.name = "Porshe";
        await connection
            .getRepository(Car_1.Car)
            .save([car1, car2, car3, car4, car5, car6]);
        const cars = await connection
            .getRepository(Car_1.Car)
            .createQueryBuilder("car")
            .where("car.name LIKE :filter1", { filter1: "Test%" })
            .orWhere("car.name LIKE :filter2", { filter2: "BM%" })
            .orderBy("car.id")
            .skip(0)
            .take(1)
            .getMany();
        (0, chai_1.expect)(cars.length).to.be.equal(1);
    })));
});
//# sourceMappingURL=issue-479.js.map