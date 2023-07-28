"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../../utils/test-utils");
const Animal_1 = require("./entity/Animal");
describe("database schema > custom constraint names > foreign key", () => {
    let dataSources;
    before(async () => (dataSources = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(dataSources));
    after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
    it("should set custom constraint names", () => Promise.all(dataSources.map(async (dataSource) => {
        let metadata = dataSource.getMetadata(Animal_1.Animal);
        // check ManyToMany constraints
        const joinTable = metadata.ownRelations[0];
        const mtmFk1 = joinTable.foreignKeys.find((fk) => fk.name === "fk_animal_category_categoryId");
        const mtmFk2 = joinTable.foreignKeys.find((fk) => fk.name === "fk_animal_category_animalId");
        (0, chai_1.expect)(mtmFk1).to.exist;
        (0, chai_1.expect)(mtmFk2).to.exist;
        // check ManyToOne constraint
        const mtoFk = metadata.foreignKeys.find((fk) => fk.name === "fk_animal_breedId");
        (0, chai_1.expect)(mtoFk).to.exist;
        // check OneToOne constraint
        const otoFk = metadata.foreignKeys.find((fk) => fk.name === "fk_animal_nameId");
        (0, chai_1.expect)(otoFk).to.exist;
    })));
    it("should load constraints with custom names", () => Promise.all(dataSources.map(async (dataSource) => {
        const queryRunner = dataSource.createQueryRunner();
        const table = await queryRunner.getTable("animal");
        const joinTable = await queryRunner.getTable("animal_category");
        await queryRunner.release();
        // check ManyToMany constraints
        const mtmFk1 = joinTable.foreignKeys.find((fk) => fk.name === "fk_animal_category_categoryId");
        const mtmFk2 = joinTable.foreignKeys.find((fk) => fk.name === "fk_animal_category_animalId");
        (0, chai_1.expect)(mtmFk1).to.exist;
        (0, chai_1.expect)(mtmFk2).to.exist;
        // check ManyToOne constraint
        const mtoFk = table.foreignKeys.find((fk) => fk.name === "fk_animal_breedId");
        (0, chai_1.expect)(mtoFk).to.exist;
        // check OneToOne constraint
        const otoFk = table.foreignKeys.find((fk) => fk.name === "fk_animal_nameId");
        (0, chai_1.expect)(otoFk).to.exist;
    })));
    it("should not change constraint names when table renamed", () => Promise.all(dataSources.map(async (dataSource) => {
        const queryRunner = dataSource.createQueryRunner();
        await queryRunner.renameTable("animal", "animal_renamed");
        await queryRunner.renameTable("animal_category", "animal_category_renamed");
        const table = await queryRunner.getTable("animal_renamed");
        const joinTable = await queryRunner.getTable("animal_category_renamed");
        await queryRunner.release();
        // check ManyToMany constraints
        const mtmFk1 = joinTable.foreignKeys.find((fk) => fk.name === "fk_animal_category_categoryId");
        const mtmFk2 = joinTable.foreignKeys.find((fk) => fk.name === "fk_animal_category_animalId");
        (0, chai_1.expect)(mtmFk1).to.exist;
        (0, chai_1.expect)(mtmFk2).to.exist;
        // check ManyToOne constraint
        const mtoFk = table.foreignKeys.find((fk) => fk.name === "fk_animal_breedId");
        (0, chai_1.expect)(mtoFk).to.exist;
        // check OneToOne constraint
        const otoFk = table.foreignKeys.find((fk) => fk.name === "fk_animal_nameId");
        (0, chai_1.expect)(otoFk).to.exist;
    })));
    it("should not change constraint names when column renamed", () => Promise.all(dataSources.map(async (dataSource) => {
        // in SqlServer we can't change column that is used in FK.
        if (dataSource.driver.options.type === "mssql")
            return;
        const queryRunner = dataSource.createQueryRunner();
        let table = await queryRunner.getTable("animal");
        const breedIdColumn = table.findColumnByName("breedId");
        const changedBreedIdColumn = breedIdColumn.clone();
        changedBreedIdColumn.name = "breedId_renamed";
        const nameIdColumn = table.findColumnByName("nameId");
        const changedNameIdColumn = nameIdColumn.clone();
        changedNameIdColumn.name = "nameId_renamed";
        await queryRunner.changeColumns(table, [
            {
                oldColumn: breedIdColumn,
                newColumn: changedBreedIdColumn,
            },
            {
                oldColumn: nameIdColumn,
                newColumn: changedNameIdColumn,
            },
        ]);
        let joinTable = await queryRunner.getTable("animal_category");
        const categoryIdColumn = joinTable.findColumnByName("categoryId");
        const changedCategoryIdColumn = categoryIdColumn.clone();
        changedCategoryIdColumn.name = "categoryId_renamed";
        const animalIdColumn = joinTable.findColumnByName("animalId");
        const changedAnimalIdColumn = animalIdColumn.clone();
        changedAnimalIdColumn.name = "animalId_renamed";
        await queryRunner.changeColumns(joinTable, [
            {
                oldColumn: categoryIdColumn,
                newColumn: changedCategoryIdColumn,
            },
            {
                oldColumn: animalIdColumn,
                newColumn: changedAnimalIdColumn,
            },
        ]);
        table = await queryRunner.getTable("animal");
        joinTable = await queryRunner.getTable("animal_category");
        await queryRunner.release();
        // check ManyToMany constraints
        const mtmFk1 = joinTable.foreignKeys.find((fk) => fk.name === "fk_animal_category_categoryId");
        const mtmFk2 = joinTable.foreignKeys.find((fk) => fk.name === "fk_animal_category_animalId");
        (0, chai_1.expect)(mtmFk1).to.exist;
        (0, chai_1.expect)(mtmFk2).to.exist;
        // check ManyToOne constraint
        const mtoFk = table.foreignKeys.find((fk) => fk.name === "fk_animal_breedId");
        (0, chai_1.expect)(mtoFk).to.exist;
        // check OneToOne constraint
        const otoFk = table.foreignKeys.find((fk) => fk.name === "fk_animal_nameId");
        (0, chai_1.expect)(otoFk).to.exist;
    })));
});
//# sourceMappingURL=foreign-key.js.map