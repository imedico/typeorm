"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const EnumArrayEntity_1 = require("./entity/EnumArrayEntity");
describe("database schema > simple enum arrays", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: ["postgres"],
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly create default values", () => Promise.all(connections.map(async (connection) => {
        const enumEntityRepository = connection.getRepository(EnumArrayEntity_1.EnumArrayEntity);
        const enumEntity = new EnumArrayEntity_1.EnumArrayEntity();
        enumEntity.id = 1;
        await enumEntityRepository.save(enumEntity);
        const loadedEnumEntity = await enumEntityRepository.findOneBy({
            id: 1,
        });
        loadedEnumEntity.numericEnums.should.be.eql([
            EnumArrayEntity_1.NumericEnum.GHOST,
            EnumArrayEntity_1.NumericEnum.ADMIN,
        ]);
        loadedEnumEntity.stringEnums.should.be.eql([]);
        loadedEnumEntity.stringNumericEnums.should.be.eql([
            EnumArrayEntity_1.StringNumericEnum.THREE,
            EnumArrayEntity_1.StringNumericEnum.ONE,
        ]);
        loadedEnumEntity.heterogeneousEnums.should.be.eql([
            EnumArrayEntity_1.HeterogeneousEnum.YES,
        ]);
        loadedEnumEntity.arrayDefinedStringEnums.should.be.eql([
            "admin",
        ]);
        loadedEnumEntity.arrayDefinedNumericEnums.should.be.eql([
            11, 13,
        ]);
    })));
    it("should correctly save and retrieve", () => Promise.all(connections.map(async (connection) => {
        const enumEntityRepository = connection.getRepository(EnumArrayEntity_1.EnumArrayEntity);
        const enumEntity = new EnumArrayEntity_1.EnumArrayEntity();
        enumEntity.id = 1;
        enumEntity.numericEnums = [
            EnumArrayEntity_1.NumericEnum.GHOST,
            EnumArrayEntity_1.NumericEnum.EDITOR,
        ];
        enumEntity.stringEnums = [EnumArrayEntity_1.StringEnum.MODERATOR];
        enumEntity.stringNumericEnums = [EnumArrayEntity_1.StringNumericEnum.FOUR];
        enumEntity.heterogeneousEnums = [EnumArrayEntity_1.HeterogeneousEnum.NO];
        enumEntity.arrayDefinedStringEnums = ["editor"];
        enumEntity.arrayDefinedNumericEnums = [12, 13];
        await enumEntityRepository.save(enumEntity);
        const loadedEnumEntity = await enumEntityRepository.findOneBy({
            id: 1,
        });
        loadedEnumEntity.numericEnums.should.be.eql([
            EnumArrayEntity_1.NumericEnum.GHOST,
            EnumArrayEntity_1.NumericEnum.EDITOR,
        ]);
        loadedEnumEntity.stringEnums.should.be.eql([
            EnumArrayEntity_1.StringEnum.MODERATOR,
        ]);
        loadedEnumEntity.stringNumericEnums.should.be.eql([
            EnumArrayEntity_1.StringNumericEnum.FOUR,
        ]);
        loadedEnumEntity.heterogeneousEnums.should.be.eql([
            EnumArrayEntity_1.HeterogeneousEnum.NO,
        ]);
        loadedEnumEntity.arrayDefinedStringEnums.should.be.eql([
            "editor",
        ]);
        loadedEnumEntity.arrayDefinedNumericEnums.should.be.eql([
            12, 13,
        ]);
    })));
});
//# sourceMappingURL=enums-array.js.map