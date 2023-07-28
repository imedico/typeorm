"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Person_1 = require("./entity/Person");
const Men_1 = require("./entity/Men");
const Women_1 = require("./entity/Women");
describe("github issues > #3857 Schema inheritance when STI pattern is used", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        enabledDrivers: ["postgres"],
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schema: "custom",
        schemaCreate: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("Child classes should have same schema as parent", () => Promise.all(connections.map(async (connection) => {
        const personMetadata = connection.getMetadata(Person_1.Person);
        const menMetadata = connection.getMetadata(Men_1.Men);
        const womenMetadata = connection.getMetadata(Women_1.Women);
        // @ts-ignore
        personMetadata.schema.should.be.eq("custom");
        // @ts-ignore
        menMetadata.schema.should.be.eq(personMetadata.schema);
        // @ts-ignore
        womenMetadata.schema.should.be.eq(personMetadata.schema);
    })));
});
//# sourceMappingURL=issue-3857.js.map