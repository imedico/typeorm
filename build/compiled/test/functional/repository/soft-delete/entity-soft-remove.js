"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../utils/test-utils");
const Post_1 = require("./entity/Post");
const PostWithoutDeleteDate_1 = require("./entity/PostWithoutDeleteDate");
const MissingDeleteDateColumnError_1 = require("../../../../src/error/MissingDeleteDateColumnError");
describe("entity > soft-remove", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should perform soft removal and recovery correctly", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        // save a new posts
        const newPost1 = postRepository.create({
            id: 1,
            name: "post#1",
        });
        const newPost2 = postRepository.create({
            id: 2,
            name: "post#2",
        });
        await postRepository.save(newPost1);
        await postRepository.save(newPost2);
        // soft-remove one
        await postRepository.softRemove(newPost1);
        // load to check
        const loadedPosts = await postRepository.find({
            withDeleted: true,
        });
        // assert
        loadedPosts.length.should.be.equal(2);
        const loadedPost1 = loadedPosts.find((p) => p.id === 1);
        (0, chai_1.expect)(loadedPost1).to.exist;
        (0, chai_1.expect)(loadedPost1.deletedAt).to.be.instanceof(Date);
        (0, chai_1.expect)(loadedPost1.name).to.equals("post#1");
        const loadedPost2 = loadedPosts.find((p) => p.id === 2);
        (0, chai_1.expect)(loadedPost2).to.exist;
        (0, chai_1.expect)(loadedPost2.deletedAt).to.equals(null);
        (0, chai_1.expect)(loadedPost2.name).to.equals("post#2");
        // recover one
        await postRepository.recover(loadedPost1);
        // load to check
        const recoveredPosts = await postRepository.find({
            withDeleted: true,
        });
        // assert
        recoveredPosts.length.should.be.equal(2);
        const recoveredPost1 = recoveredPosts.find((p) => p.id === 1);
        (0, chai_1.expect)(recoveredPost1).to.exist;
        (0, chai_1.expect)(recoveredPost1.deletedAt).to.equals(null);
        (0, chai_1.expect)(recoveredPost1.name).to.equals("post#1");
        const recoveredPost2 = recoveredPosts.find((p) => p.id === 2);
        (0, chai_1.expect)(recoveredPost2).to.exist;
        (0, chai_1.expect)(recoveredPost2.deletedAt).to.equals(null);
        (0, chai_1.expect)(recoveredPost2.name).to.equals("post#2");
    })));
    it("should throw error when delete date column is missing", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(PostWithoutDeleteDate_1.PostWithoutDeleteDate);
        // save a new posts
        const newPost1 = postRepository.create({
            id: 1,
            name: "post#1",
        });
        await postRepository.save(newPost1);
        let error1;
        try {
            // soft-remove one
            await postRepository.softRemove(newPost1);
        }
        catch (err) {
            error1 = err;
        }
        (0, chai_1.expect)(error1).to.be.an.instanceof(MissingDeleteDateColumnError_1.MissingDeleteDateColumnError);
        let error2;
        try {
            // recover one
            await postRepository.recover(newPost1);
        }
        catch (err) {
            error2 = err;
        }
        (0, chai_1.expect)(error2).to.be.an.instanceof(MissingDeleteDateColumnError_1.MissingDeleteDateColumnError);
    })));
});
//# sourceMappingURL=entity-soft-remove.js.map