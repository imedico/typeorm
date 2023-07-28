"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("../../utils/test-setup");
const test_utils_1 = require("../../utils/test-utils");
const person_1 = require("./entity/person");
const note_1 = require("./entity/note");
describe("github issues > #2965 Reuse preloaded lazy relations", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        // use for manual validation
        // logging: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should resuse preloaded lazy relations", () => Promise.all(connections.map(async (connection) => {
        const repoPerson = connection.getRepository(person_1.Person);
        const repoNote = connection.getRepository(note_1.Note);
        const personA = await repoPerson.create({ name: "personA" });
        const personB = await repoPerson.create({ name: "personB" });
        await repoPerson.save([personA, personB]);
        await repoNote.insert({ label: "note1", owner: personA });
        await repoNote.insert({ label: "note2", owner: personB });
        const res1 = await repoPerson.find({
            relations: { notes: true },
        });
        const originalLoad = connection.relationLoader.load;
        let loadCalledCounter = 0;
        connection.relationLoader.load = (...args) => {
            loadCalledCounter++;
            return originalLoad.call(connection.relationLoader, ...args);
        };
        const personANotes = await res1[0].notes;
        loadCalledCounter.should.be.equal(0);
        personANotes[0].label.should.be.equal("note1");
        const res2 = await repoPerson.find({ order: { id: "asc" } });
        const personBNotes = await res2[1].notes;
        loadCalledCounter.should.be.equal(1);
        personBNotes[0].label.should.be.equal("note2");
    })));
});
//# sourceMappingURL=index.js.map