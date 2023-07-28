"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("../../utils/test-setup");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const Post_1 = require("./entity/Post");
const PostReview_1 = require("./entity/PostReview");
describe("github issues > #2588 - createQueryBuilder always does left joins on relations", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("Should allow joins with conditions", () => Promise.all(connections.map(async (connection) => {
        const postRepo = connection.getRepository(Post_1.Post);
        const postReviewRepo = connection.getRepository(PostReview_1.PostReview);
        let post = new Post_1.Post();
        post.title = "My blog post";
        post = await postRepo.save(post);
        let reviews = [];
        for (let i = 1; i <= 5; i++) {
            let review = new PostReview_1.PostReview();
            review.comment = `I give it a ${i}`;
            review.rating = i;
            review.post = post;
            reviews.push(await postReviewRepo.save(review));
        }
        // Load the post
        let postFromDb = await postRepo.findOneBy({ id: post.id });
        (0, chai_1.expect)(postFromDb).to.exist;
        (0, chai_1.expect)(postFromDb.reviews).lengthOf(5);
        const joinCondition = `${connection.driver.escape("post_review")}.${connection.driver.escape("postId")} = ${connection.driver.escape("post")}.${connection.driver.escape("id")} AND ${connection.driver.escape("post_review")}.${connection.driver.escape("rating")} >= 3`;
        postFromDb = await postRepo
            .createQueryBuilder("post")
            .where(`post.id = :postId`, { postId: post.id })
            .leftJoinAndSelect("post.reviews", "post_review", joinCondition)
            .getOne();
        (0, chai_1.expect)(postFromDb).to.exist;
        (0, chai_1.expect)(postFromDb.reviews).lengthOf(3);
    })));
});
//# sourceMappingURL=issue-2588.js.map