"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../utils/test-utils");
const Post_1 = require("./entity/Post");
describe("columns > update and insert control", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Post_1.Post],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should respect column update and insert properties", () => Promise.all(connections.map(async (connection) => {
        if (connection.driver.options.type === "spanner") {
            return;
        }
        const postRepository = connection.getRepository(Post_1.Post);
        // create and save a post first
        const post = new Post_1.Post();
        post.title = "About columns";
        post.text = "Some text about columns";
        post.authorFirstName = "Umed";
        post.authorMiddleName = "B";
        post.authorLastName = "Good";
        await postRepository.save(post);
        // check if all columns are as expected
        let loadedPost = await postRepository.findOneBy({ id: post.id });
        (0, chai_1.expect)(loadedPost.title).to.be.equal("About columns");
        (0, chai_1.expect)(loadedPost.text).to.be.equal("Some text about columns");
        (0, chai_1.expect)(loadedPost.authorFirstName).to.be.equal("Umed");
        (0, chai_1.expect)(loadedPost.authorMiddleName).to.be.equal("Default"); // insert blocked
        (0, chai_1.expect)(loadedPost.authorLastName).to.be.equal("Default"); // insert blocked
        // then update all its properties and save again
        post.title = "About columns1";
        post.text = "Some text about columns1";
        post.authorFirstName = "Umed1";
        post.authorMiddleName = "B1";
        post.authorLastName = "Good1";
        await postRepository.save(post);
        // check if all columns are as expected
        loadedPost = await postRepository.findOneBy({ id: post.id });
        (0, chai_1.expect)(loadedPost.title).to.be.equal("About columns1");
        (0, chai_1.expect)(loadedPost.text).to.be.equal("Some text about columns1");
        (0, chai_1.expect)(loadedPost.authorFirstName).to.be.equal("Umed"); // update blocked
        (0, chai_1.expect)(loadedPost.authorMiddleName).to.be.equal("B1");
        (0, chai_1.expect)(loadedPost.authorLastName).to.be.equal("Default"); // update blocked
    })));
});
//# sourceMappingURL=columns-update-insert.js.map