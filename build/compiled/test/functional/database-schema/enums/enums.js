"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const EnumEntity_1 = require("./entity/EnumEntity");
describe("database schema > enums", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: ["postgres", "mysql", "mariadb", "cockroachdb"],
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly use default values", () => Promise.all(connections.map(async (connection) => {
        const enumEntityRepository = connection.getRepository(EnumEntity_1.EnumEntity);
        const enumEntity = new EnumEntity_1.EnumEntity();
        enumEntity.id = 1;
        enumEntity.enumWithoutdefault = EnumEntity_1.StringEnum.EDITOR;
        await enumEntityRepository.save(enumEntity);
        const loadedEnumEntity = await enumEntityRepository.findOneBy({
            id: 1,
        });
        loadedEnumEntity.numericEnum.should.be.eq(EnumEntity_1.NumericEnum.MODERATOR);
        loadedEnumEntity.stringEnum.should.be.eq(EnumEntity_1.StringEnum.GHOST);
        loadedEnumEntity.stringNumericEnum.should.be.eq(EnumEntity_1.StringNumericEnum.FOUR);
        loadedEnumEntity.heterogeneousEnum.should.be.eq(EnumEntity_1.HeterogeneousEnum.NO);
        loadedEnumEntity.arrayDefinedStringEnum.should.be.eq("ghost");
        loadedEnumEntity.arrayDefinedNumericEnum.should.be.eq(12);
    })));
    it("should correctly save and retrieve", () => Promise.all(connections.map(async (connection) => {
        const enumEntityRepository = connection.getRepository(EnumEntity_1.EnumEntity);
        const enumEntity = new EnumEntity_1.EnumEntity();
        enumEntity.id = 1;
        enumEntity.numericEnum = EnumEntity_1.NumericEnum.EDITOR;
        enumEntity.stringEnum = EnumEntity_1.StringEnum.ADMIN;
        enumEntity.stringNumericEnum = EnumEntity_1.StringNumericEnum.TWO;
        enumEntity.heterogeneousEnum = EnumEntity_1.HeterogeneousEnum.YES;
        enumEntity.arrayDefinedStringEnum = "editor";
        enumEntity.arrayDefinedNumericEnum = 13;
        enumEntity.enumWithoutdefault = EnumEntity_1.StringEnum.ADMIN;
        await enumEntityRepository.save(enumEntity);
        const loadedEnumEntity = await enumEntityRepository.findOneBy({
            id: 1,
        });
        loadedEnumEntity.numericEnum.should.be.eq(EnumEntity_1.NumericEnum.EDITOR);
        loadedEnumEntity.stringEnum.should.be.eq(EnumEntity_1.StringEnum.ADMIN);
        loadedEnumEntity.stringNumericEnum.should.be.eq(EnumEntity_1.StringNumericEnum.TWO);
        loadedEnumEntity.heterogeneousEnum.should.be.eq(EnumEntity_1.HeterogeneousEnum.YES);
        loadedEnumEntity.arrayDefinedStringEnum.should.be.eq("editor");
        loadedEnumEntity.arrayDefinedNumericEnum.should.be.eq(13);
    })));
    it("should not generate queries when no model changes", () => Promise.all(connections.map(async (connection) => {
        await connection.driver.createSchemaBuilder().build();
        const sqlInMemory = await connection.driver
            .createSchemaBuilder()
            .log();
        sqlInMemory.upQueries.length.should.be.equal(0);
        sqlInMemory.downQueries.length.should.be.equal(0);
    })));
});
//# sourceMappingURL=enums.js.map