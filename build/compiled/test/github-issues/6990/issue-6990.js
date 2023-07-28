"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const foo_1 = require("./entity/foo");
const chai_1 = require("chai");
describe("github issues > #6990 synchronize drops array columns in postgres if a length is set", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        subscribers: [__dirname + "/subscriber/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should not drop varchar array column on synchronize using postgres driver", () => Promise.all(connections.map(async function (connection) {
        const foo = new foo_1.Foo();
        foo.id = 1;
        foo.varchararray = ["able", "baker", "charlie"];
        await connection.manager.save(foo);
        await connection.synchronize();
        const loadedFoo = await connection.manager.findOne(foo_1.Foo, {
            where: {
                id: 1,
            },
        });
        (0, chai_1.expect)(loadedFoo).to.be.not.empty;
        (0, chai_1.expect)(loadedFoo.varchararray).to.deep.eq([
            "able",
            "baker",
            "charlie",
        ]);
    })));
});
//# sourceMappingURL=issue-6990.js.map