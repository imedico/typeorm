"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const Item_1 = require("./entity/Item");
describe("github issue > #1569 updateById generates wrong SQL with arrays inside embeddeds", () => {
    let connections = [];
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should properly updateById arrays inside embeddeds", () => Promise.all(connections.map(async (connection) => {
        const item = new Item_1.Item();
        item.someText = "some";
        const embedded = new Item_1.EmbeddedItem();
        embedded.arrayInsideEmbedded = [1, 2, 3];
        item.embedded = embedded;
        await connection.getRepository(Item_1.Item).save(item);
        await connection.getRepository(Item_1.Item).update(item.id, {
            someText: "some2",
            embedded: {
                arrayInsideEmbedded: [1, 2],
            },
        });
        const loadedItem = await connection
            .getRepository(Item_1.Item)
            .findOneBy({ id: item.id });
        (0, chai_1.expect)(loadedItem.embedded.arrayInsideEmbedded).to.eql([1, 2]);
    })));
});
//# sourceMappingURL=issue-1569.js.map