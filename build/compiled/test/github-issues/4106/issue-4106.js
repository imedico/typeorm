"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("../../utils/test-utils");
const Human_1 = require("./entity/Human");
const Animal_1 = require("./entity/Animal");
const GenderEnum_1 = require("./entity/GenderEnum");
const EntityManager_1 = require("../../../src/entity-manager/EntityManager");
const chai_1 = require("chai");
describe("github issues > #4106 Specify enum type name in postgres", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Human_1.Human, Animal_1.Animal],
        dropSchema: true,
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    async function prepareData(connection) {
        const human = new Human_1.Human();
        human.id = 1;
        human.name = "Jane Doe";
        human.gender = GenderEnum_1.Gender.female;
        await connection.manager.save(human);
        const animal = new Animal_1.Animal();
        animal.id = 1;
        animal.name = "Miko";
        animal.specie = "Turtle";
        animal.gender = GenderEnum_1.Gender.male;
        await connection.manager.save(animal);
    }
    it("should create an enum with the name specified in column options -> enumName", () => Promise.all(connections.map(async (connection) => {
        const em = new EntityManager_1.EntityManager(connection);
        const types = await em.query(`SELECT typowner, n.nspname as "schema",
                    pg_catalog.format_type(t.oid, NULL) AS "name",
                    pg_catalog.obj_description(t.oid, 'pg_type') as "description"
                    FROM pg_catalog.pg_type t
                        LEFT JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
                    WHERE (t.typrelid = 0 OR (SELECT c.relkind = 'c' FROM pg_catalog.pg_class c WHERE c.oid = t.typrelid))
                        AND NOT EXISTS(SELECT 1 FROM pg_catalog.pg_type el WHERE el.oid = t.typelem AND el.typarray = t.oid)
                        AND pg_catalog.pg_type_is_visible(t.oid)
                        AND n.nspname = 'public'
                    ORDER BY 1, 2;`);
        // Enum name must be exactly the same as stated
        // Quoted here since the name contains mixed case
        (0, chai_1.expect)(types.some((type) => type.name === `"genderEnum"`))
            .to.be.true;
    })));
    it("should insert data with the correct enum", () => Promise.all(connections.map(async (connection) => {
        await prepareData(connection);
        const em = new EntityManager_1.EntityManager(connection);
        const humanTable = await em.query(`SELECT column_name as "columnName", data_type as "dataType", udt_name as "udtName" FROM information_schema.columns
                    WHERE table_schema = 'public' AND table_name = 'human'
                    ORDER BY ordinal_position;`);
        const animalTable = await em.query(`SELECT column_name as "columnName", data_type as "dataType", udt_name as "udtName" FROM information_schema.columns
                    WHERE table_schema = 'public' AND table_name = 'animal'
                    ORDER BY ordinal_position;`);
        (0, chai_1.expect)(humanTable[2].dataType).to.equal("USER-DEFINED");
        (0, chai_1.expect)(humanTable[2].udtName).to.equal("genderEnum");
        (0, chai_1.expect)(animalTable[2].dataType).to.equal("USER-DEFINED");
        (0, chai_1.expect)(animalTable[2].udtName).to.equal("genderEnum");
        const HumanRepository = connection.manager.getRepository(Human_1.Human);
        const AnimalRepository = connection.manager.getRepository(Animal_1.Animal);
        const human = await HumanRepository.find();
        const animal = await AnimalRepository.find();
        (0, chai_1.expect)(human[0].gender).to.equal("female");
        (0, chai_1.expect)(animal[0].gender).to.equal("male");
    })));
});
//# sourceMappingURL=issue-4106.js.map