"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const SimpleEnumEntity_1 = require("./entity/SimpleEnumEntity");
describe("database schema > simple-enums", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: [
                "mysql",
                "mariadb",
                "postgres",
                "sqlite",
                "better-sqlite3",
                "mssql",
            ],
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly use default values", () => Promise.all(connections.map(async (connection) => {
        const enumEntityRepository = connection.getRepository(SimpleEnumEntity_1.SimpleEnumEntity);
        const enumEntity = new SimpleEnumEntity_1.SimpleEnumEntity();
        enumEntity.id = 1;
        enumEntity.enumWithoutdefault = SimpleEnumEntity_1.StringEnum.EDITOR;
        await enumEntityRepository.save(enumEntity);
        const loadedEnumEntity = await enumEntityRepository.findOneBy({
            id: 1,
        });
        loadedEnumEntity.numericEnum.should.be.eq(SimpleEnumEntity_1.NumericEnum.MODERATOR);
        loadedEnumEntity.stringEnum.should.be.eq(SimpleEnumEntity_1.StringEnum.GHOST);
        loadedEnumEntity.stringNumericEnum.should.be.eq(SimpleEnumEntity_1.StringNumericEnum.FOUR);
        loadedEnumEntity.heterogeneousEnum.should.be.eq(SimpleEnumEntity_1.HeterogeneousEnum.NO);
        loadedEnumEntity.arrayDefinedStringEnum.should.be.eq("ghost");
        loadedEnumEntity.arrayDefinedNumericEnum.should.be.eq(12);
    })));
    it("should correctly save and retrieve", () => Promise.all(connections.map(async (connection) => {
        const enumEntityRepository = connection.getRepository(SimpleEnumEntity_1.SimpleEnumEntity);
        const enumEntity = new SimpleEnumEntity_1.SimpleEnumEntity();
        enumEntity.id = 1;
        enumEntity.numericEnum = SimpleEnumEntity_1.NumericEnum.EDITOR;
        enumEntity.stringEnum = SimpleEnumEntity_1.StringEnum.ADMIN;
        enumEntity.stringNumericEnum = SimpleEnumEntity_1.StringNumericEnum.TWO;
        enumEntity.heterogeneousEnum = SimpleEnumEntity_1.HeterogeneousEnum.YES;
        enumEntity.arrayDefinedStringEnum = "editor";
        enumEntity.arrayDefinedNumericEnum = 13;
        enumEntity.enumWithoutdefault = SimpleEnumEntity_1.StringEnum.ADMIN;
        await enumEntityRepository.save(enumEntity);
        const loadedEnumEntity = await enumEntityRepository.findOneBy({
            id: 1,
        });
        loadedEnumEntity.numericEnum.should.be.eq(SimpleEnumEntity_1.NumericEnum.EDITOR);
        loadedEnumEntity.stringEnum.should.be.eq(SimpleEnumEntity_1.StringEnum.ADMIN);
        loadedEnumEntity.stringNumericEnum.should.be.eq(SimpleEnumEntity_1.StringNumericEnum.TWO);
        loadedEnumEntity.heterogeneousEnum.should.be.eq(SimpleEnumEntity_1.HeterogeneousEnum.YES);
        loadedEnumEntity.arrayDefinedStringEnum.should.be.eq("editor");
        loadedEnumEntity.arrayDefinedNumericEnum.should.be.eq(13);
    })));
});
//# sourceMappingURL=enums.js.map