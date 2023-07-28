"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const Artikel_1 = require("./entity/Artikel");
const Kollektion_1 = require("./entity/Kollektion");
describe("github issues > #71 ManyToOne relation with custom column name persistence fails", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should persist successfully entity successfully with its many-to-one relation", () => Promise.all(connections.map(async (connection) => {
        const kollektion = new Kollektion_1.Kollektion();
        kollektion.name = "kollektion #1";
        const artikel = new Artikel_1.Artikel();
        artikel.name = "artikel #1";
        artikel.nummer = "1";
        artikel.extrabarcode = "123456789";
        artikel.saison = "------";
        artikel.kollektion = kollektion;
        await connection.manager.save(artikel);
        const loadedArtikel = await connection.manager
            .createQueryBuilder(Artikel_1.Artikel, "artikel")
            .innerJoinAndSelect("artikel.kollektion", "kollektion")
            .where("artikel.id=:id", { id: 1 })
            .getOne();
        (0, chai_1.expect)(kollektion).not.to.be.null;
        (0, chai_1.expect)(loadedArtikel).not.to.be.null;
        loadedArtikel.should.be.eql({
            id: 1,
            nummer: "1",
            name: "artikel #1",
            extrabarcode: "123456789",
            saison: "------",
            kollektion: {
                id: 1,
                name: "kollektion #1",
            },
        });
    })));
});
//# sourceMappingURL=issue-71.js.map