"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Animal_1 = require("./entity/Animal");
const chai_1 = require("chai");
const VersionUtils_1 = require("../../../src/util/VersionUtils");
describe('github issues > #7235 Use "INSERT...RETURNING" in MariaDB.', () => {
    const runOnSpecificVersion = (version, fn) => async () => Promise.all(connections.map(async (connection) => {
        const result = await connection.query(`SELECT VERSION() AS \`version\``);
        const dbVersion = result[0]["version"];
        if (VersionUtils_1.VersionUtils.isGreaterOrEqual(dbVersion, version)) {
            await fn(connection);
        }
    }));
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
        enabledDrivers: ["mariadb"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should allow `DELETE...RETURNING` on MariaDB >= 10.0.5", runOnSpecificVersion("10.0.5", async (connection) => {
        const animalRepository = connection.getRepository(Animal_1.Animal);
        await animalRepository
            .createQueryBuilder()
            .insert()
            .values([{ name: "Cat" }, { name: "Wolf" }])
            .execute();
        const deleteCat = await animalRepository
            .createQueryBuilder()
            .delete()
            .where({ name: "Cat" })
            .returning(["id", "name"])
            .execute();
        (0, chai_1.expect)(deleteCat.raw[0]).to.deep.equal({ id: 1, name: "Cat" });
        const deleteWolf = await animalRepository
            .createQueryBuilder()
            .delete()
            .where({ name: "Wolf" })
            .returning("name")
            .execute();
        (0, chai_1.expect)(deleteWolf.raw[0]).to.deep.equal({ name: "Wolf" });
    }));
    it("should allow `INSERT...RETURNING` on MariaDB >= 10.5.0", runOnSpecificVersion("10.5.0", async (connection) => {
        const animalRepository = connection.getRepository(Animal_1.Animal);
        const insertDogFox = await animalRepository
            .createQueryBuilder()
            .insert()
            .values([{ name: "Dog" }, { name: "Fox" }])
            .returning("name")
            .execute();
        (0, chai_1.expect)(insertDogFox.raw).to.deep.equal([
            { name: "Dog" },
            { name: "Fox" },
        ]);
        const insertUnicorn = await animalRepository
            .createQueryBuilder()
            .insert()
            .values({ name: "Unicorn" })
            .returning(["id", "name"])
            .execute();
        (0, chai_1.expect)(insertUnicorn.raw[0]).to.deep.equal({
            id: 3,
            name: "Unicorn",
        });
    }));
});
//# sourceMappingURL=issue-7235.js.map