"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Author_1 = require("./entity/Author");
const Photo_1 = require("./entity/Photo");
const PhotoMetadata_1 = require("./entity/PhotoMetadata");
const chai_1 = require("chai");
describe("github issue > #1416 Wrong behavior when fetching an entity that has a relation with its own eager relations", () => {
    let connections = [];
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["mysql"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should load eager relations of an entity's relations recursively", () => Promise.all(connections.map(async (connection) => {
        const metadata = new PhotoMetadata_1.PhotoMetadata();
        metadata.height = 640;
        metadata.width = 480;
        metadata.compressed = true;
        metadata.comment = "cybershoot";
        metadata.orientation = "portait";
        await connection.manager.save(metadata);
        const photo = new Photo_1.Photo();
        photo.name = "Me and Bears";
        photo.description = "I am near polar bears";
        photo.filename = "photo-with-bears.jpg";
        photo.isPublished = true;
        photo.metadata = metadata;
        await connection.manager.save(photo);
        let photoAuthor = new Author_1.Author();
        photoAuthor.name = "John Doe";
        photoAuthor.photos = [photo];
        await connection.manager.save(photoAuthor);
        const author = (await connection.manager.findOne(Author_1.Author, {
            where: {
                name: photoAuthor.name,
            },
            relations: { photos: true },
        }));
        (0, chai_1.expect)(author).not.to.be.null;
        (0, chai_1.expect)(author.photos[0]).not.to.be.undefined;
        (0, chai_1.expect)(author.photos[0]).to.eql(photo);
        (0, chai_1.expect)(author.photos[0].metadata).not.to.be.undefined;
        (0, chai_1.expect)(author.photos[0].metadata).to.eql(metadata);
    })));
});
//# sourceMappingURL=issue-1416.js.map