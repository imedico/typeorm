"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Car_1 = require("./entity/Car");
describe("github issues > #521 Attributes in UPDATE in QB arent getting replaced", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should replace parameters", () => Promise.all(connections.map(async (connection) => {
        const qb = connection
            .getRepository(Car_1.Car)
            .createQueryBuilder("car");
        const [query, parameters] = qb
            .update({
            name: "Honda",
        })
            .where("name = :name", {
            name: "Toyota",
        })
            .getQueryAndParameters();
        query.should.not.be.undefined;
        query.should.not.be.eql("");
        return parameters.length.should.eql(2);
    })));
});
//# sourceMappingURL=issue-521.js.map