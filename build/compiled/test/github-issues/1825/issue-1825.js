"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const thing_1 = require("./entity/thing");
const chai_1 = require("chai");
describe("github issues > #1825 Invalid field values being loaded with long camelCased embedded field names.", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["mysql", "postgres", "mariadb"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should load valid values in embedded with long field names", () => Promise.all(connections.map(async (connection) => {
        const thingRepository = connection.getRepository(thing_1.Thing);
        const thing = new thing_1.Thing();
        const embeddedThing = new thing_1.EmbeddedInThing();
        embeddedThing.someSeriouslyLongFieldNameFirst = 1;
        embeddedThing.someSeriouslyLongFieldNameSecond = 2;
        thing.embeddedThing = embeddedThing;
        await thingRepository.save(thing);
        const loadedThing = await thingRepository.findOneBy({
            id: thing.id,
        });
        (0, chai_1.expect)(loadedThing).to.eql(thing);
    })));
});
//# sourceMappingURL=issue-1825.js.map