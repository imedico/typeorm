"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../utils/test-setup");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
describe("github issues > #9063 Support postgres column with varchar datatype and uuid_generate_v4() default", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("it should be able to set special keyword as column name for simple-enum types", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("post");
        const generatedUuid1 = table.findColumnByName("generatedUuid1");
        const generatedUuid2 = table.findColumnByName("generatedUuid2");
        const generatedUuid3 = table.findColumnByName("generatedUuid3");
        const nonGeneratedUuid1 = table.findColumnByName("nonGeneratedUuid1");
        const nonGeneratedUuid2 = table.findColumnByName("nonGeneratedUuid2");
        (0, chai_1.expect)(generatedUuid1.isGenerated).to.be.true;
        (0, chai_1.expect)(generatedUuid1.type).to.equal("uuid");
        (0, chai_1.expect)(generatedUuid1.default).to.be.undefined;
        (0, chai_1.expect)(generatedUuid2.isGenerated).to.be.true;
        (0, chai_1.expect)(generatedUuid2.type).to.equal("uuid");
        (0, chai_1.expect)(generatedUuid2.default).to.be.undefined;
        (0, chai_1.expect)(generatedUuid3.isGenerated).to.be.true;
        (0, chai_1.expect)(generatedUuid3.type).to.equal("uuid");
        (0, chai_1.expect)(generatedUuid3.default).to.be.undefined;
        (0, chai_1.expect)(nonGeneratedUuid1.isGenerated).to.be.false;
        (0, chai_1.expect)(nonGeneratedUuid1.type).to.equal("character varying");
        (0, chai_1.expect)(nonGeneratedUuid1.default).to.equal("uuid_generate_v4()");
        (0, chai_1.expect)(nonGeneratedUuid2.isGenerated).to.be.false;
        (0, chai_1.expect)(nonGeneratedUuid2.type).to.equal("character varying");
        (0, chai_1.expect)(nonGeneratedUuid2.default).to.equal("gen_random_uuid()");
        await queryRunner.release();
    })));
});
//# sourceMappingURL=issue-9063.js.map