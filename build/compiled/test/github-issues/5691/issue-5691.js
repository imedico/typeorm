"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../utils/test-setup");
const test_utils_1 = require("../../utils/test-utils");
const Child1_1 = require("./enity/Child1");
const Child2_1 = require("./enity/Child2");
const Root_1 = require("./enity/Root");
const Shared_1 = require("./enity/Shared");
describe("github issues > #5691 RelationId is too slow", () => {
    const setupFixtures = async (connection, allChild2) => {
        const root = new Root_1.Root();
        root.allChild2 = allChild2;
        await connection.getRepository(Root_1.Root).save(root);
        const rootAllShared = [];
        for (let indexShared = 0; indexShared < allChild2.length; indexShared++) {
            const rootShared = new Shared_1.Shared();
            rootShared.root = root;
            rootAllShared.push(rootShared);
        }
        await connection.getRepository(Shared_1.Shared).save(rootAllShared);
        for (let indexChild1 = 0; indexChild1 < allChild2.length; indexChild1++) {
            const rootChild1 = new Child1_1.Child1();
            rootChild1.root = root;
            await connection.getRepository(Child1_1.Child1).save(rootChild1);
            for (const child2 of allChild2) {
                const rootChild1Child2 = new Shared_1.Shared();
                rootChild1Child2.root = root;
                rootChild1Child2.child1 = rootChild1;
                rootChild1Child2.child2 = child2;
                await connection.getRepository(Shared_1.Shared).save(rootChild1Child2);
            }
            for (const shared of rootAllShared) {
                const rootChild1Shared = new Shared_1.Shared();
                rootChild1Shared.root = root;
                rootChild1Shared.child1 = rootChild1;
                rootChild1Shared.shared = shared;
                await connection.getRepository(Shared_1.Shared).save(rootChild1Shared);
            }
        }
    };
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Root_1.Root, Child1_1.Child1, Child2_1.Child2, Shared_1.Shared],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should be as fast as separate queries", () => Promise.all(connections.map(async (connection) => {
        // skip test for oracle for now
        if (connection.driver.options.type === "oracle")
            return;
        const child21 = new Child2_1.Child2();
        const child22 = new Child2_1.Child2();
        const child23 = new Child2_1.Child2();
        const child24 = new Child2_1.Child2();
        const child25 = new Child2_1.Child2();
        await connection.getRepository(Child2_1.Child2).save(child21);
        await connection.getRepository(Child2_1.Child2).save(child22);
        await connection.getRepository(Child2_1.Child2).save(child23);
        await connection.getRepository(Child2_1.Child2).save(child24);
        await connection.getRepository(Child2_1.Child2).save(child25);
        await setupFixtures(connection, [child21, child22, child23]);
        // To understand the problem deeper add more fixtures.
        // It will take forever.
        // await setupFixtures(connection, [child22, child23, child24]),
        // await setupFixtures(connection, [child23, child24, child25]),
        // await setupFixtures(connection, [child24, child25, child21]),
        // await setupFixtures(connection, [child25, child21, child22]),
        // await setupFixtures(connection, [child21, child22, child23]),
        // await setupFixtures(connection, [child22, child23, child24]),
        // await setupFixtures(connection, [child23, child24, child25]),
        // await setupFixtures(connection, [child24, child25, child21]),
        // await setupFixtures(connection, [child25, child21, child22]),
        // const test1Start = new Date().getTime();
        // 54 rows for 1 root
        await connection.getRepository(Root_1.Root).find({
            relations: {
                allChild1: {
                    allShared: true,
                },
                allChild2: true,
            },
        });
        // 21 rows 1 root
        await connection.getRepository(Root_1.Root).find({
            relations: { allShared: true },
        });
        // const test1End = new Date().getTime();
        // const test2Start = new Date().getTime();
        // 1134 rows 1 root
        await connection.getRepository(Root_1.Root).find({
            relations: {
                allChild1: {
                    allShared: true,
                },
                allChild2: true,
                allShared: true,
            },
        });
        // const test2End = new Date().getTime();
        // TODO: this test is really weird. results can be different on different machines and we had tests failed multiple times due to this check
        // expect(test2End - test2Start).to.be.lessThan(
        //     (test1End - test1Start) * 15, // yes, even 15 times slower, because amount of data requires more time.
        //     "a single call should be not as more as 15 times slower than multi calls",
        // );
    })));
});
//# sourceMappingURL=issue-5691.js.map