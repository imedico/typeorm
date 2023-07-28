"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("../../../utils/test-setup");
const test_utils_1 = require("../../../utils/test-utils");
const User_1 = require("./entity/User");
const Category_1 = require("./entity/Category");
const Post_1 = require("./entity/Post");
const Photo_1 = require("./entity/Photo");
const Counters_1 = require("./entity/Counters");
const EntityPropertyNotFoundError_1 = require("../../../../src/error/EntityPropertyNotFoundError");
describe("repository > find options > relations", () => {
    // -------------------------------------------------------------------------
    // Configuration
    // -------------------------------------------------------------------------
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    // -------------------------------------------------------------------------
    // Setup
    // -------------------------------------------------------------------------
    beforeEach(() => Promise.all(connections.map(async (connection) => {
        const postUser = new User_1.User();
        postUser.name = "Timber";
        await connection.manager.save(postUser);
        const postCountersUser = new User_1.User();
        postCountersUser.name = "Post Counters Timber";
        await connection.manager.save(postCountersUser);
        const photoCountersUser = new User_1.User();
        photoCountersUser.name = "Photo Counters Timber";
        await connection.manager.save(photoCountersUser);
        const photoUser = new User_1.User();
        photoUser.name = "Photo Timber";
        await connection.manager.save(photoUser);
        const category1 = new Category_1.Category();
        category1.name = "category1";
        await connection.manager.save(category1);
        const category2 = new Category_1.Category();
        category2.name = "category2";
        await connection.manager.save(category2);
        const photo1 = new Photo_1.Photo();
        photo1.filename = "photo1.jpg";
        photo1.counters = new Counters_1.Counters();
        photo1.counters.stars = 2;
        photo1.counters.commentCount = 19;
        photo1.counters.author = photoCountersUser;
        photo1.user = photoUser;
        await connection.manager.save(photo1);
        const photo2 = new Photo_1.Photo();
        photo2.filename = "photo2.jpg";
        photo2.counters = new Counters_1.Counters();
        photo2.counters.stars = 3;
        photo2.counters.commentCount = 20;
        await connection.manager.save(photo2);
        const photo3 = new Photo_1.Photo();
        photo3.filename = "photo3.jpg";
        photo3.counters = new Counters_1.Counters();
        photo3.counters.stars = 4;
        photo3.counters.commentCount = 21;
        await connection.manager.save(photo3);
        const postCounters = new Counters_1.Counters();
        postCounters.commentCount = 1;
        postCounters.author = postCountersUser;
        postCounters.stars = 101;
        const post = new Post_1.Post();
        post.title = "About Timber";
        post.counters = postCounters;
        post.user = postUser;
        post.categories = [category1, category2];
        post.photos = [photo1, photo2, photo3];
        await connection.manager.save(post);
    })));
    // -------------------------------------------------------------------------
    // Specifications
    // -------------------------------------------------------------------------
    it("should not any relations if they are not specified", () => Promise.all(connections.map(async (connection) => {
        const loadedPost = await connection
            .getRepository(Post_1.Post)
            .findOne({
            where: {
                id: 1,
            },
        });
        loadedPost.should.be.eql({
            id: 1,
            title: "About Timber",
            counters: {
                commentCount: 1,
                stars: 101,
            },
        });
    })));
    it("should load specified relations case 1", () => Promise.all(connections.map(async (connection) => {
        const loadedPost = await connection
            .getRepository(Post_1.Post)
            .findOne({
            where: {
                id: 1,
            },
            relations: {
                photos: true,
            },
        });
        loadedPost.id.should.be.equal(1);
        loadedPost.title.should.be.equal("About Timber");
        loadedPost.counters.commentCount.should.be.equal(1);
        loadedPost.counters.stars.should.be.equal(101);
        loadedPost.photos.should.deep.include({
            id: 1,
            filename: "photo1.jpg",
            counters: {
                stars: 2,
                commentCount: 19,
            },
        });
        loadedPost.photos.should.deep.include({
            id: 2,
            filename: "photo2.jpg",
            counters: {
                stars: 3,
                commentCount: 20,
            },
        });
        loadedPost.photos.should.deep.include({
            id: 3,
            filename: "photo3.jpg",
            counters: {
                stars: 4,
                commentCount: 21,
            },
        });
    })));
    it("should load specified relations case 2", () => Promise.all(connections.map(async (connection) => {
        const loadedPost = await connection
            .getRepository(Post_1.Post)
            .findOne({
            where: {
                id: 1,
            },
            relations: {
                photos: true,
                user: true,
                categories: true,
            },
        });
        loadedPost.id.should.be.equal(1);
        loadedPost.title.should.be.equal("About Timber");
        loadedPost.counters.commentCount.should.be.equal(1);
        loadedPost.counters.stars.should.be.equal(101);
        loadedPost.photos.should.deep.include({
            id: 1,
            filename: "photo1.jpg",
            counters: {
                stars: 2,
                commentCount: 19,
            },
        });
        loadedPost.photos.should.deep.include({
            id: 2,
            filename: "photo2.jpg",
            counters: {
                stars: 3,
                commentCount: 20,
            },
        });
        loadedPost.photos.should.deep.include({
            id: 3,
            filename: "photo3.jpg",
            counters: {
                stars: 4,
                commentCount: 21,
            },
        });
        loadedPost.user.should.be.eql({
            id: 1,
            name: "Timber",
        });
        loadedPost.categories.should.deep.include({
            id: 1,
            name: "category1",
        });
        loadedPost.categories.should.deep.include({
            id: 2,
            name: "category2",
        });
    })));
    it("should load specified relations and their sub-relations case 1", () => Promise.all(connections.map(async (connection) => {
        const loadedPost = await connection
            .getRepository(Post_1.Post)
            .findOne({
            where: {
                id: 1,
            },
            relations: {
                photos: {
                    user: true,
                },
                user: true,
                categories: true,
            },
        });
        loadedPost.id.should.be.equal(1);
        loadedPost.title.should.be.equal("About Timber");
        loadedPost.counters.commentCount.should.be.equal(1);
        loadedPost.counters.stars.should.be.equal(101);
        loadedPost.photos.should.deep.include({
            id: 1,
            filename: "photo1.jpg",
            counters: {
                stars: 2,
                commentCount: 19,
            },
            user: {
                id: 4,
                name: "Photo Timber",
            },
        });
        loadedPost.photos.should.deep.include({
            id: 2,
            filename: "photo2.jpg",
            counters: {
                stars: 3,
                commentCount: 20,
            },
            user: null,
        });
        loadedPost.photos.should.deep.include({
            id: 3,
            filename: "photo3.jpg",
            counters: {
                stars: 4,
                commentCount: 21,
            },
            user: null,
        });
        loadedPost.user.should.be.eql({
            id: 1,
            name: "Timber",
        });
        loadedPost.categories.should.deep.include({
            id: 1,
            name: "category1",
        });
        loadedPost.categories.should.deep.include({
            id: 2,
            name: "category2",
        });
    })));
    it("should load specified relations and their sub-relations case 2", () => Promise.all(connections.map(async (connection) => {
        const loadedPost = await connection
            .getRepository(Post_1.Post)
            .findOne({
            where: {
                id: 1,
            },
            relations: {
                photos: {
                    user: true,
                },
                user: true,
                counters: {
                    author: true,
                },
            },
        });
        loadedPost.id.should.be.equal(1);
        loadedPost.title.should.be.equal("About Timber");
        loadedPost.counters.commentCount.should.be.equal(1);
        loadedPost.counters.stars.should.be.equal(101);
        loadedPost.photos.should.deep.include({
            id: 1,
            filename: "photo1.jpg",
            counters: {
                stars: 2,
                commentCount: 19,
            },
            user: {
                id: 4,
                name: "Photo Timber",
            },
        });
        loadedPost.photos.should.deep.include({
            id: 2,
            filename: "photo2.jpg",
            counters: {
                stars: 3,
                commentCount: 20,
            },
            user: null,
        });
        loadedPost.photos.should.deep.include({
            id: 3,
            filename: "photo3.jpg",
            counters: {
                stars: 4,
                commentCount: 21,
            },
            user: null,
        });
        loadedPost.user.should.be.eql({
            id: 1,
            name: "Timber",
        });
        loadedPost.counters.author.should.be.eql({
            id: 2,
            name: "Post Counters Timber",
        });
    })));
    it("should load specified relations and their sub-relations case 3", () => Promise.all(connections.map(async (connection) => {
        const loadedPost = await connection
            .getRepository(Post_1.Post)
            .findOne({
            where: {
                id: 1,
            },
            relations: {
                photos: {
                    user: true,
                    counters: {
                        author: true,
                    },
                },
                user: true,
                counters: {
                    author: true,
                },
            },
        });
        loadedPost.id.should.be.equal(1);
        loadedPost.title.should.be.equal("About Timber");
        loadedPost.counters.commentCount.should.be.equal(1);
        loadedPost.counters.stars.should.be.equal(101);
        loadedPost.photos.should.deep.include({
            id: 1,
            filename: "photo1.jpg",
            counters: {
                stars: 2,
                commentCount: 19,
                author: {
                    id: 3,
                    name: "Photo Counters Timber",
                },
            },
            user: {
                id: 4,
                name: "Photo Timber",
            },
        });
        loadedPost.photos.should.deep.include({
            id: 2,
            filename: "photo2.jpg",
            counters: {
                stars: 3,
                commentCount: 20,
                author: null,
            },
            user: null,
        });
        loadedPost.photos.should.deep.include({
            id: 3,
            filename: "photo3.jpg",
            counters: {
                stars: 4,
                commentCount: 21,
                author: null,
            },
            user: null,
        });
        loadedPost.user.should.be.eql({
            id: 1,
            name: "Timber",
        });
        loadedPost.counters.author.should.be.eql({
            id: 2,
            name: "Post Counters Timber",
        });
    })));
    it("should throw error if specified relations were not found case 1", () => Promise.all(connections.map(async (connection) => {
        await connection
            .getRepository(Post_1.Post)
            .findOne({
            where: {
                id: 1,
            },
            relations: {
                // @ts-expect-error
                photos2: true,
            },
        })
            .should.eventually.be.rejectedWith(EntityPropertyNotFoundError_1.EntityPropertyNotFoundError);
    })));
    it("should throw error if specified relations were not found case 2", () => Promise.all(connections.map(async (connection) => {
        await connection
            .getRepository(Post_1.Post)
            .findOne({
            where: {
                id: 1,
            },
            relations: {
                photos: true,
                counters: {
                    // @ts-expect-error
                    author2: true,
                },
            },
        })
            .should.eventually.be.rejectedWith(EntityPropertyNotFoundError_1.EntityPropertyNotFoundError);
    })));
    it("should throw error if specified relations were not found case 3", () => Promise.all(connections.map(async (connection) => {
        await connection
            .getRepository(Post_1.Post)
            .findOne({
            where: {
                id: 1,
            },
            relations: {
                photos: true,
                // @ts-expect-error
                counters2: {
                    author: true,
                },
            },
        })
            .should.eventually.be.rejectedWith(EntityPropertyNotFoundError_1.EntityPropertyNotFoundError);
    })));
    it("should throw error if specified relations were not found case 4", () => Promise.all(connections.map(async (connection) => {
        await connection
            .getRepository(Post_1.Post)
            .findOne({
            where: {
                id: 1,
            },
            relations: {
                photos: {
                    user: {
                        // @ts-expect-error
                        haha: true,
                    },
                },
            },
        })
            .should.eventually.be.rejectedWith(EntityPropertyNotFoundError_1.EntityPropertyNotFoundError);
    })));
    it("should throw error if specified relations were not found case 5", () => Promise.all(connections.map(async (connection) => {
        await connection
            .getRepository(Post_1.Post)
            .findOne({
            where: {
                id: 1,
            },
            relations: {
                // @ts-expect-error
                questions: true,
            },
        })
            .should.eventually.be.rejectedWith(EntityPropertyNotFoundError_1.EntityPropertyNotFoundError);
    })));
    it("should throw error if specified relations were not found case 6", () => Promise.all(connections.map(async (connection) => {
        await connection
            .getRepository(Post_1.Post)
            .findOne({
            where: {
                id: 1,
            },
            relations: {
                // @ts-expect-error
                questions: {
                    haha: true,
                },
            },
        })
            .should.eventually.be.rejectedWith(EntityPropertyNotFoundError_1.EntityPropertyNotFoundError);
    })));
});
//# sourceMappingURL=repository-find-options-relations.js.map