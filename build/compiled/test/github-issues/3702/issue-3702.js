"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const LetterBox_1 = require("./entity/LetterBox");
// Another related path: test/functional/spatial
describe("github issues > #3702 MySQL Spatial Type Support : GeomFromText function is not supported", () => {
    describe("when legacySpatialSupport: true", () => {
        let connections;
        before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: ["mysql"],
            dropSchema: true,
            schemaCreate: true,
            driverSpecific: {
            // it's default
            // legacySpatialSupport: true,
            },
        })));
        after(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("should use GeomFromText", () => Promise.all(connections.map(async (connection) => {
            let queryBuilder = connection.createQueryBuilder().insert();
            queryBuilder
                .into(LetterBox_1.LetterBox)
                .values({ coord: "POINT(20 30)" });
            const sql = queryBuilder.getSql();
            (0, chai_1.expect)(sql).includes("GeomFromText");
            (0, chai_1.expect)(sql).not.includes("ST_GeomFromText");
            await queryBuilder.execute();
        })));
        it("should provide SRID", () => Promise.all(connections.map(async (connection) => {
            let queryBuilder = connection.createQueryBuilder().insert();
            queryBuilder
                .into(LetterBox_1.LetterBox)
                .values({ coord: "POINT(25 100)" });
            const sql = queryBuilder.getSql();
            (0, chai_1.expect)(sql).includes("4326");
            await queryBuilder.execute();
        })));
        it("should use AsText", () => Promise.all(connections.map(async (connection) => {
            const repository = connection.getRepository(LetterBox_1.LetterBox);
            let queryBuilder = repository
                .createQueryBuilder("letterBox")
                .select(["letterBox"]);
            const sql = queryBuilder.getSql();
            (0, chai_1.expect)(sql).includes("AsText");
            (0, chai_1.expect)(sql).not.includes("ST_AsText");
            await queryBuilder.getMany();
        })));
    });
    describe("when legacySpatialSupport: false", () => {
        let connections;
        before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: ["mysql"],
            dropSchema: true,
            schemaCreate: true,
            driverSpecific: {
                legacySpatialSupport: false,
            },
        })));
        after(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("should use ST_GeomFromText", () => Promise.all(connections.map(async (connection) => {
            let queryBuilder = connection.createQueryBuilder().insert();
            queryBuilder
                .into(LetterBox_1.LetterBox)
                .values({ coord: "POINT(20 30)" });
            const sql = queryBuilder.getSql();
            (0, chai_1.expect)(sql).includes("ST_GeomFromText");
            await queryBuilder.execute();
        })));
        it("should provide SRID", () => Promise.all(connections.map(async (connection) => {
            let queryBuilder = connection.createQueryBuilder().insert();
            queryBuilder
                .into(LetterBox_1.LetterBox)
                .values({ coord: "POINT(25 100)" });
            const sql = queryBuilder.getSql();
            (0, chai_1.expect)(sql).includes("4326");
            await queryBuilder.execute();
        })));
        it("should use ST_AsText", () => Promise.all(connections.map(async (connection) => {
            const repository = connection.getRepository(LetterBox_1.LetterBox);
            let queryBuilder = repository
                .createQueryBuilder("letterBox")
                .select(["letterBox"]);
            const sql = queryBuilder.getSql();
            (0, chai_1.expect)(sql).includes("ST_AsText");
            await queryBuilder.getMany();
        })));
    });
});
//# sourceMappingURL=issue-3702.js.map