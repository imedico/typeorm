"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const Category_1 = require("./entity/Category");
const Post_1 = require("./entity/Post");
describe("persistence > delete orphans", () => {
    // -------------------------------------------------------------------------
    // Configuration
    // -------------------------------------------------------------------------
    // connect to db
    let connections = [];
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    // -------------------------------------------------------------------------
    // Specifications
    // -------------------------------------------------------------------------
    describe("when a Post is removed from a Category", () => {
        let categoryRepository;
        let postRepository;
        let categoryId;
        beforeEach(async function () {
            if (connections.length === 0) {
                this.skip();
            }
            await Promise.all(connections.map(async (connection) => {
                categoryRepository = connection.getRepository(Category_1.Category);
                postRepository = connection.getRepository(Post_1.Post);
            }));
            const categoryToInsert = await categoryRepository.save(new Category_1.Category());
            categoryToInsert.posts = [new Post_1.Post(), new Post_1.Post()];
            await categoryRepository.save(categoryToInsert);
            categoryId = categoryToInsert.id;
            const categoryToUpdate = (await categoryRepository.findOneBy({
                id: categoryId,
            }));
            categoryToUpdate.posts = categoryToInsert.posts.filter((p) => p.id === 1); // Keep the first post
            await categoryRepository.save(categoryToUpdate);
        });
        it("should retain a Post on the Category", async () => {
            const category = await categoryRepository.findOneBy({
                id: categoryId,
            });
            (0, chai_1.expect)(category).not.to.be.null;
            (0, chai_1.expect)(category.posts).to.have.lengthOf(1);
            (0, chai_1.expect)(category.posts[0].id).to.equal(1);
        });
        it("should mark orphaned Post as soft-deleted", async () => {
            const postCount = await postRepository.count();
            (0, chai_1.expect)(postCount).to.equal(1);
            const postCountIncludeDeleted = await postRepository.count({
                withDeleted: true,
            });
            (0, chai_1.expect)(postCountIncludeDeleted).to.equal(2);
        });
        it("should retain foreign keys on remaining Posts", async () => {
            const postsWithoutForeignKeys = (await postRepository.find()).filter((p) => !p.categoryId);
            (0, chai_1.expect)(postsWithoutForeignKeys).to.have.lengthOf(0);
        });
    });
});
//# sourceMappingURL=delete-orphans.js.map