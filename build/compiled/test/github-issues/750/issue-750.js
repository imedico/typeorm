"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const IndexMetadata_1 = require("../../../src/metadata/IndexMetadata");
const chai_1 = require("chai");
describe("github issues > #750 Need option for Mysql's full text search", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: ["mysql"],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly create SPATIAL and FULLTEXT indices", () => Promise.all(connections.map(async (connection) => {
        const queryRunner = connection.createQueryRunner();
        let table = await queryRunner.getTable("post");
        table.indices.length.should.be.equal(2);
        const spatialIndex = table.indices.find((index) => !!index.isSpatial);
        spatialIndex.should.be.exist;
        const fulltextIndex = table.indices.find((index) => !!index.isFulltext);
        fulltextIndex.should.be.exist;
        const metadata = connection.getMetadata(Post_1.Post);
        const polygonColumn = metadata.findColumnWithPropertyName("polygon");
        const indexMetadata = new IndexMetadata_1.IndexMetadata({
            entityMetadata: metadata,
            columns: [polygonColumn],
            args: {
                target: Post_1.Post,
                spatial: true,
            },
        });
        indexMetadata.build(connection.namingStrategy);
        metadata.indices.push(indexMetadata);
        const fulltextIndexMetadata = metadata.indices.find((index) => index.isFulltext);
        fulltextIndexMetadata.isFulltext = false;
        await connection.synchronize();
        table = await queryRunner.getTable("post");
        table.indices.length.should.be.equal(3);
        const spatialIndices = table.indices.filter((index) => !!index.isSpatial);
        spatialIndices.length.should.be.equal(2);
        const fulltextIndex2 = table.indices.find((index) => !!index.isFulltext);
        (0, chai_1.expect)(fulltextIndex2).to.be.undefined;
        await queryRunner.release();
    })));
});
//# sourceMappingURL=issue-750.js.map