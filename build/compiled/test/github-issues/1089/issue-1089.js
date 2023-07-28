"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Group_1 = require("./entity/Group");
describe("github issues > #1089 UUID in ClosureEntity", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: false,
        dropSchema: true,
    })));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly work with primary UUID column", () => Promise.all(connections.map(async (connection) => {
        await connection.synchronize();
        const queryRunner = connection.createQueryRunner();
        const table = await queryRunner.getTable("group");
        await queryRunner.release();
        table.should.exist;
        const groupRepository = connection.getTreeRepository(Group_1.Group);
        const a1 = new Group_1.Group();
        a1.name = "a1";
        await groupRepository.save(a1);
        const a11 = new Group_1.Group();
        a11.name = "a11";
        a11.parent = a1;
        await groupRepository.save(a11);
        const a12 = new Group_1.Group();
        a12.name = "a12";
        a12.parent = a1;
        await groupRepository.save(a12);
        const rootGroups = await groupRepository.findRoots();
        rootGroups.length.should.be.equal(1);
        const a11Parent = await groupRepository.findAncestors(a11);
        a11Parent.length.should.be.equal(2);
        const a1Children = await groupRepository.findDescendants(a1);
        a1Children.length.should.be.equal(3);
    })));
});
//# sourceMappingURL=issue-1089.js.map