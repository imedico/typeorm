"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const src_1 = require("../../../src");
require("../../utils/test-setup");
const test_utils_1 = require("../../utils/test-utils");
const item_entity_1 = require("./entity/item.entity");
const thing_entity_1 = require("./entity/thing.entity");
describe("github issues > #8681 DeepPartial simplification breaks the .create() and .save() method in certain cases.", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should .save() and .create() complex deep partial entities", () => Promise.all(connections.map(async (connection) => {
        const myThing = {
            items: [{ id: 1 }, { id: 2 }],
        };
        const thing = connection.manager.create(thing_entity_1.Thing, myThing);
        await connection.getRepository(thing_entity_1.Thing).save(myThing);
        const items = connection.manager.create(item_entity_1.Item, myThing.items);
        if (myThing.items)
            await connection.getRepository(item_entity_1.Item).save(myThing.items);
        const dbItems = await connection.manager.find(item_entity_1.Item);
        (0, chai_1.expect)(dbItems).to.have.length(2);
        return { thing, items };
    })));
    it("should .save() and .create() complex deep partial entities using a generic repository", () => Promise.all(connections.map(async (connection) => {
        class AbstractService {
            constructor(target) {
                this.repository = new src_1.Repository(target, connection.manager);
            }
            create(data) {
                const entity = this.repository.create(data);
                return this.repository.save(entity);
            }
        }
        const thingService = new AbstractService(thing_entity_1.Thing);
        const myThing = { id: 1 };
        const thing = await thingService.create(myThing);
        const thingRepository = connection.getRepository(thing_entity_1.Thing);
        const dbItems = await thingRepository.find();
        (0, chai_1.expect)(dbItems).to.have.length(1);
        return { thing };
    })));
});
//# sourceMappingURL=issue-8681.js.map