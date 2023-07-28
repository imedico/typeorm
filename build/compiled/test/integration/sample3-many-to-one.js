"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const DataSource_1 = require("../../src/data-source/DataSource");
const PostDetails_1 = require("../../sample/sample3-many-to-one/entity/PostDetails");
const Post_1 = require("../../sample/sample3-many-to-one/entity/Post");
const PostCategory_1 = require("../../sample/sample3-many-to-one/entity/PostCategory");
const PostAuthor_1 = require("../../sample/sample3-many-to-one/entity/PostAuthor");
const PostMetadata_1 = require("../../sample/sample3-many-to-one/entity/PostMetadata");
const PostImage_1 = require("../../sample/sample3-many-to-one/entity/PostImage");
const PostInformation_1 = require("../../sample/sample3-many-to-one/entity/PostInformation");
const test_utils_1 = require("../utils/test-utils");
describe("many-to-one", function () {
    // -------------------------------------------------------------------------
    // Configuration
    // -------------------------------------------------------------------------
    // connect to db
    let dataSource;
    before(async function () {
        const options = (0, test_utils_1.setupSingleTestingConnection)("mysql", {
            entities: [
                Post_1.Post,
                PostDetails_1.PostDetails,
                PostCategory_1.PostCategory,
                PostMetadata_1.PostMetadata,
                PostImage_1.PostImage,
                PostInformation_1.PostInformation,
                PostAuthor_1.PostAuthor,
            ],
        });
        if (!options)
            return;
        dataSource = new DataSource_1.DataSource(options);
        await dataSource.initialize();
    });
    after(() => dataSource.destroy());
    // clean up database before each test
    function reloadDatabase() {
        if (!dataSource)
            return;
        return dataSource.synchronize(true);
    }
    let postRepository, postDetailsRepository, postCategoryRepository, postImageRepository, postMetadataRepository;
    before(function () {
        if (!dataSource)
            return;
        postRepository = dataSource.getRepository(Post_1.Post);
        postDetailsRepository = dataSource.getRepository(PostDetails_1.PostDetails);
        postCategoryRepository = dataSource.getRepository(PostCategory_1.PostCategory);
        postImageRepository = dataSource.getRepository(PostImage_1.PostImage);
        postMetadataRepository = dataSource.getRepository(PostMetadata_1.PostMetadata);
    });
    // -------------------------------------------------------------------------
    // Specifications
    // -------------------------------------------------------------------------
    describe("insert post and details (has inverse relation + full cascade options)", function () {
        if (!dataSource)
            return;
        let newPost, details, savedPost;
        before(reloadDatabase);
        before(function () {
            details = new PostDetails_1.PostDetails();
            details.authorName = "Umed";
            details.comment = "this is post";
            details.metadata = "post,posting,postman";
            newPost = new Post_1.Post();
            newPost.text = "Hello post";
            newPost.title = "this is post title";
            newPost.details = details;
            return postRepository
                .save(newPost)
                .then((post) => (savedPost = post));
        });
        it("should return the same post instance after its created", function () {
            savedPost.should.be.equal(newPost);
        });
        it("should return the same post details instance after its created", function () {
            savedPost.details.should.be.equal(newPost.details);
        });
        it("should have a new generated id after post is created", function () {
            (0, chai_1.expect)(savedPost.id).not.to.be.undefined;
            (0, chai_1.expect)(savedPost.details.id).not.to.be.undefined;
        });
        it("should have inserted post in the database", function () {
            if (!dataSource)
                return;
            const expectedPost = new Post_1.Post();
            expectedPost.id = savedPost.id;
            expectedPost.text = savedPost.text;
            expectedPost.title = savedPost.title;
            return postRepository
                .findOneBy({
                id: savedPost.id,
            })
                .should.eventually.eql(expectedPost);
        });
        it("should have inserted post details in the database", function () {
            if (!dataSource)
                return;
            const expectedDetails = new PostDetails_1.PostDetails();
            expectedDetails.id = savedPost.details.id;
            expectedDetails.authorName = savedPost.details.authorName;
            expectedDetails.comment = savedPost.details.comment;
            expectedDetails.metadata = savedPost.details.metadata;
            return postDetailsRepository
                .findOneBy({
                id: savedPost.details.id,
            })
                .should.eventually.eql(expectedDetails);
        });
        it("should load post and its details if left join used", function () {
            if (!dataSource)
                return;
            const expectedPost = new Post_1.Post();
            expectedPost.id = savedPost.id;
            expectedPost.text = savedPost.text;
            expectedPost.title = savedPost.title;
            expectedPost.details = new PostDetails_1.PostDetails();
            expectedPost.details.id = savedPost.details.id;
            expectedPost.details.authorName = savedPost.details.authorName;
            expectedPost.details.comment = savedPost.details.comment;
            expectedPost.details.metadata = savedPost.details.metadata;
            return postRepository
                .createQueryBuilder("post")
                .leftJoinAndSelect("post.details", "details")
                .where("post.id=:id")
                .setParameter("id", savedPost.id)
                .getOne()
                .should.eventually.eql(expectedPost);
        });
        it("should load details and its post if left join used (from reverse side)", function () {
            if (!dataSource)
                return;
            const expectedDetails = new PostDetails_1.PostDetails();
            expectedDetails.id = savedPost.details.id;
            expectedDetails.authorName = savedPost.details.authorName;
            expectedDetails.comment = savedPost.details.comment;
            expectedDetails.metadata = savedPost.details.metadata;
            const expectedPost = new Post_1.Post();
            expectedPost.id = savedPost.id;
            expectedPost.text = savedPost.text;
            expectedPost.title = savedPost.title;
            expectedDetails.posts = [];
            expectedDetails.posts.push(expectedPost);
            return postDetailsRepository
                .createQueryBuilder("details")
                .leftJoinAndSelect("details.posts", "posts")
                .where("details.id=:id")
                .setParameter("id", savedPost.id)
                .getOne()
                .should.eventually.eql(expectedDetails);
        });
        it("should load saved post without details if left joins are not specified", function () {
            if (!dataSource)
                return;
            const expectedPost = new Post_1.Post();
            expectedPost.id = savedPost.id;
            expectedPost.text = savedPost.text;
            expectedPost.title = savedPost.title;
            return postRepository
                .createQueryBuilder("post")
                .where("post.id=:id", { id: savedPost.id })
                .getOne()
                .should.eventually.eql(expectedPost);
        });
        it("should load saved post without details if left joins are not specified", function () {
            if (!dataSource)
                return;
            const expectedDetails = new PostDetails_1.PostDetails();
            expectedDetails.id = savedPost.details.id;
            expectedDetails.authorName = savedPost.details.authorName;
            expectedDetails.comment = savedPost.details.comment;
            expectedDetails.metadata = savedPost.details.metadata;
            return postDetailsRepository
                .createQueryBuilder("details")
                .where("details.id=:id", { id: savedPost.id })
                .getOne()
                .should.eventually.eql(expectedDetails);
        });
    });
    describe("insert post and category (one-side relation)", function () {
        if (!dataSource)
            return;
        let newPost, category, savedPost;
        before(reloadDatabase);
        before(function () {
            category = new PostCategory_1.PostCategory();
            category.name = "technology";
            newPost = new Post_1.Post();
            newPost.text = "Hello post";
            newPost.title = "this is post title";
            newPost.category = category;
            return postRepository
                .save(newPost)
                .then((post) => (savedPost = post));
        });
        it("should return the same post instance after its created", function () {
            savedPost.should.be.equal(newPost);
        });
        it("should return the same post category instance after its created", function () {
            savedPost.category.should.be.equal(newPost.category);
        });
        it("should have a new generated id after post is created", function () {
            (0, chai_1.expect)(savedPost.id).not.to.be.undefined;
            (0, chai_1.expect)(savedPost.category.id).not.to.be.undefined;
        });
        it("should have inserted post in the database", function () {
            if (!dataSource)
                return;
            const expectedPost = new Post_1.Post();
            expectedPost.id = savedPost.id;
            expectedPost.text = savedPost.text;
            expectedPost.title = savedPost.title;
            return postRepository
                .findOneBy({
                id: savedPost.id,
            })
                .should.eventually.eql(expectedPost);
        });
        it("should have inserted category in the database", function () {
            if (!dataSource)
                return;
            const expectedPost = new PostCategory_1.PostCategory();
            expectedPost.id = savedPost.category.id;
            expectedPost.name = "technology";
            return postCategoryRepository
                .findOneBy({
                id: savedPost.category.id,
            })
                .should.eventually.eql(expectedPost);
        });
        it("should load post and its category if left join used", function () {
            if (!dataSource)
                return;
            const expectedPost = new Post_1.Post();
            expectedPost.id = savedPost.id;
            expectedPost.title = savedPost.title;
            expectedPost.text = savedPost.text;
            expectedPost.category = new PostCategory_1.PostCategory();
            expectedPost.category.id = savedPost.category.id;
            expectedPost.category.name = savedPost.category.name;
            return postRepository
                .createQueryBuilder("post")
                .leftJoinAndSelect("post.category", "category")
                .where("post.id=:id", { id: savedPost.id })
                .getOne()
                .should.eventually.eql(expectedPost);
        });
        it("should load details and its post if left join used (from reverse side)", function () {
            // later need to specify with what exception we reject it
            /*return postCategoryRepository
                .createQueryBuilder("category")
                .leftJoinAndSelect("category.post", "post")
                .where("category.id=:id", { id: savedPost.id })
                .getSingleResult()
                .should.be.rejectedWith(Error);*/
            // not working, find fix
        });
    });
    describe("cascade updates should not be executed when cascadeUpdate option is not set", function () {
        if (!dataSource)
            return;
        let newPost, details;
        before(reloadDatabase);
        before(function () {
            details = new PostDetails_1.PostDetails();
            details.authorName = "Umed";
            details.comment = "this is post";
            details.metadata = "post,posting,postman";
            newPost = new Post_1.Post();
            newPost.text = "Hello post";
            newPost.title = "this is post title";
            newPost.details = details;
            return postRepository.save(newPost);
        });
        it("should ignore updates in the model and do not update the db when entity is updated", function () {
            newPost.details.comment = "i am updated comment";
            return postRepository
                .save(newPost)
                .then((updatedPost) => {
                updatedPost.details.comment.should.be.equal("i am updated comment");
                return postRepository
                    .createQueryBuilder("post")
                    .leftJoinAndSelect("post.details", "details")
                    .where("post.id=:id")
                    .setParameter("id", updatedPost.id)
                    .getOne();
            })
                .then((updatedPostReloaded) => {
                updatedPostReloaded.details.comment.should.be.equal("this is post");
            });
        }); // todo: also check that updates throw exception in strict cascades mode
    });
    describe("cascade remove should not be executed when cascadeRemove option is not set", function () {
        if (!dataSource)
            return;
        let newPost, details;
        before(reloadDatabase);
        before(function () {
            details = new PostDetails_1.PostDetails();
            details.authorName = "Umed";
            details.comment = "this is post";
            details.metadata = "post,posting,postman";
            newPost = new Post_1.Post();
            newPost.text = "Hello post";
            newPost.title = "this is post title";
            newPost.details = details;
            return postRepository.save(newPost);
        });
        it("should ignore updates in the model and do not update the db when entity is updated", function () {
            delete newPost.details;
            return postRepository
                .save(newPost)
                .then((updatedPost) => {
                return postRepository
                    .createQueryBuilder("post")
                    .leftJoinAndSelect("post.details", "details")
                    .where("post.id=:id")
                    .setParameter("id", updatedPost.id)
                    .getOne();
            })
                .then((updatedPostReloaded) => {
                updatedPostReloaded.details.comment.should.be.equal("this is post");
            });
        });
    });
    describe("cascade updates should be executed when cascadeUpdate option is set", function () {
        if (!dataSource)
            return;
        let newPost, newImage;
        before(reloadDatabase);
        it("should update a relation successfully when updated", function () {
            newImage = new PostImage_1.PostImage();
            newImage.url = "logo.png";
            newPost = new Post_1.Post();
            newPost.text = "Hello post";
            newPost.title = "this is post title";
            return postImageRepository
                .save(newImage)
                .then((image) => {
                newPost.image = image;
                return postRepository.save(newPost);
            })
                .then((post) => {
                newPost = post;
                return postRepository
                    .createQueryBuilder("post")
                    .leftJoinAndSelect("post.image", "image")
                    .where("post.id=:id")
                    .setParameter("id", post.id)
                    .getOne();
            })
                .then((loadedPost) => {
                loadedPost.image.url = "new-logo.png";
                return postRepository.save(loadedPost);
            })
                .then(() => {
                return postRepository
                    .createQueryBuilder("post")
                    .leftJoinAndSelect("post.image", "image")
                    .where("post.id=:id")
                    .setParameter("id", newPost.id)
                    .getOne();
            })
                .then((reloadedPost) => {
                reloadedPost.image.url.should.be.equal("new-logo.png");
            });
        });
    });
    describe("cascade remove should be executed when cascadeRemove option is set", function () {
        if (!dataSource)
            return;
        let newPost, newMetadata;
        before(reloadDatabase);
        it("should remove a relation entity successfully when removed", function () {
            newMetadata = new PostMetadata_1.PostMetadata();
            newMetadata.description = "this is post metadata";
            newPost = new Post_1.Post();
            newPost.text = "Hello post";
            newPost.title = "this is post title";
            return postMetadataRepository
                .save(newMetadata)
                .then((metadata) => {
                newPost.metadata = metadata;
                return postRepository.save(newPost);
            })
                .then((post) => {
                newPost = post;
                return postRepository
                    .createQueryBuilder("post")
                    .leftJoinAndSelect("post.metadata", "metadata")
                    .where("post.id=:id")
                    .setParameter("id", post.id)
                    .getOne();
            })
                .then((loadedPost) => {
                loadedPost.metadata = null;
                return postRepository.save(loadedPost);
            })
                .then(() => {
                return postRepository
                    .createQueryBuilder("post")
                    .leftJoinAndSelect("post.metadata", "metadata")
                    .where("post.id=:id")
                    .setParameter("id", newPost.id)
                    .getOne();
            })
                .then((reloadedPost) => {
                (0, chai_1.expect)(reloadedPost.metadata).to.be.null;
            });
        });
    });
    describe("insert post details from reverse side", function () {
        if (!dataSource)
            return;
        let newPost, details, savedDetails;
        before(reloadDatabase);
        before(function () {
            newPost = new Post_1.Post();
            newPost.text = "Hello post";
            newPost.title = "this is post title";
            details = new PostDetails_1.PostDetails();
            details.comment = "post details comment";
            details.posts = [];
            details.posts.push(newPost);
            return postDetailsRepository
                .save(details)
                .then((details) => (savedDetails = details));
        });
        it("should return the same post instance after its created", function () {
            savedDetails.posts[0].should.be.equal(newPost);
        });
        it("should return the same post details instance after its created", function () {
            savedDetails.should.be.equal(details);
        });
        it("should have a new generated id after post is created", function () {
            (0, chai_1.expect)(savedDetails.id).not.to.be.undefined;
            (0, chai_1.expect)(details.id).not.to.be.undefined;
        });
        it("should have inserted post in the database", function () {
            const expectedPost = new Post_1.Post();
            expectedPost.id = newPost.id;
            expectedPost.text = newPost.text;
            expectedPost.title = newPost.title;
            return postRepository
                .findOneBy({
                id: savedDetails.id,
            })
                .should.eventually.eql(expectedPost);
        });
        it("should have inserted details in the database", function () {
            const expectedDetails = new PostDetails_1.PostDetails();
            expectedDetails.id = details.id;
            expectedDetails.comment = details.comment;
            expectedDetails.metadata = null;
            expectedDetails.authorName = null;
            return postDetailsRepository
                .findOneBy({
                id: details.id,
            })
                .should.eventually.eql(expectedDetails);
        });
        it("should load post and its details if left join used", function () {
            const expectedDetails = new PostDetails_1.PostDetails();
            expectedDetails.id = savedDetails.id;
            expectedDetails.comment = savedDetails.comment;
            expectedDetails.metadata = null;
            expectedDetails.authorName = null;
            expectedDetails.posts = [];
            expectedDetails.posts.push(new Post_1.Post());
            expectedDetails.posts[0].id = newPost.id;
            expectedDetails.posts[0].text = newPost.text;
            expectedDetails.posts[0].title = newPost.title;
            return postDetailsRepository
                .createQueryBuilder("details")
                .leftJoinAndSelect("details.posts", "posts")
                .where("details.id=:id", { id: savedDetails.id })
                .getOne()
                .should.eventually.eql(expectedDetails);
        });
    });
});
//# sourceMappingURL=sample3-many-to-one.js.map