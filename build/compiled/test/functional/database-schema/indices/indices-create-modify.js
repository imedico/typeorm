"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("reflect-metadata");
const IndexMetadata_1 = require("../../../../src/metadata/IndexMetadata");
const test_utils_1 = require("../../../utils/test-utils");
const Person_1 = require("./entity/Person");
describe("database schema > indices > reading index from entity and updating database", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should create a non unique index with 2 columns", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("person");
        await queryRunner.release();
        (0, chai_1.expect)(table.indices.length).to.be.equal(1);
        (0, chai_1.expect)(table.indices[0].name).to.be.equal("IDX_TEST");
        (0, chai_1.expect)(table.indices[0].isUnique).to.be.false;
        (0, chai_1.expect)(table.indices[0].columnNames.length).to.be.equal(2);
        (0, chai_1.expect)(table.indices[0].columnNames).to.deep.include.members([
            "firstname",
            "lastname",
        ]);
    })));
    it("should update the index to be unique", () => Promise.all(connections.map(async (connection) => {
        const entityMetadata = connection.entityMetadatas.find((x) => x.name === "Person");
        const indexMetadata = entityMetadata.indices.find((x) => x.name === "IDX_TEST");
        indexMetadata.isUnique = true;
        await connection.synchronize(false);
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("person");
        await queryRunner.release();
        // CockroachDB stores unique indices as UNIQUE constraints
        if (connection.driver.options.type === "cockroachdb") {
            (0, chai_1.expect)(table.uniques.length).to.be.equal(1);
            (0, chai_1.expect)(table.uniques[0].name).to.be.equal("IDX_TEST");
            (0, chai_1.expect)(table.uniques[0].columnNames.length).to.be.equal(2);
            (0, chai_1.expect)(table.uniques[0].columnNames).to.deep.include.members(["firstname", "firstname"]);
        }
        else {
            (0, chai_1.expect)(table.indices.length).to.be.equal(1);
            (0, chai_1.expect)(table.indices[0].name).to.be.equal("IDX_TEST");
            (0, chai_1.expect)(table.indices[0].isUnique).to.be.true;
            (0, chai_1.expect)(table.indices[0].columnNames.length).to.be.equal(2);
            (0, chai_1.expect)(table.indices[0].columnNames).to.deep.include.members(["firstname", "firstname"]);
        }
    })));
    it("should update the index swapping the 2 columns", () => Promise.all(connections.map(async (connection) => {
        const entityMetadata = connection.entityMetadatas.find((x) => x.name === "Person");
        entityMetadata.indices = [
            new IndexMetadata_1.IndexMetadata({
                entityMetadata: entityMetadata,
                args: {
                    target: Person_1.Person,
                    name: "IDX_TEST",
                    columns: ["lastname", "firstname"],
                    unique: false,
                    synchronize: true,
                },
            }),
        ];
        entityMetadata.indices.forEach((index) => index.build(connection.namingStrategy));
        await connection.synchronize(false);
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("person");
        await queryRunner.release();
        (0, chai_1.expect)(table.indices.length).to.be.equal(1);
        (0, chai_1.expect)(table.indices[0].name).to.be.equal("IDX_TEST");
        (0, chai_1.expect)(table.indices[0].isUnique).to.be.false;
        (0, chai_1.expect)(table.indices[0].columnNames.length).to.be.equal(2);
        (0, chai_1.expect)(table.indices[0].columnNames).to.deep.include.members([
            "firstname",
            "lastname",
        ]);
    })));
});
//# sourceMappingURL=indices-create-modify.js.map