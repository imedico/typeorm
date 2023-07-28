"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
require("reflect-metadata");
const DataSource_1 = require("../../../../src/data-source/DataSource");
const test_utils_1 = require("../../../utils/test-utils");
const Category_1 = require("./entity/Category");
const CategoryMetadata_1 = require("./entity/CategoryMetadata");
const Post_1 = require("./entity/Post");
describe("persistence > custom-column-names", function () {
    // -------------------------------------------------------------------------
    // Configuration
    // -------------------------------------------------------------------------
    // connect to db
    let dataSource;
    before(async () => {
        const options = (0, test_utils_1.setupSingleTestingConnection)("mysql", {
            entities: [Post_1.Post, Category_1.Category, CategoryMetadata_1.CategoryMetadata],
        });
        if (!options)
            return;
        dataSource = new DataSource_1.DataSource(options);
    });
    after(() => dataSource.close());
    // clean up database before each test
    function reloadDatabase() {
        if (!dataSource)
            return;
        return dataSource.synchronize(true).catch((e) => {
            throw e;
        });
    }
    let postRepository;
    let categoryRepository;
    let metadataRepository;
    before(function () {
        if (!dataSource)
            return;
        postRepository = dataSource.getRepository(Post_1.Post);
        categoryRepository = dataSource.getRepository(Category_1.Category);
        metadataRepository = dataSource.getRepository(CategoryMetadata_1.CategoryMetadata);
    });
    // -------------------------------------------------------------------------
    // Specifications
    // -------------------------------------------------------------------------
    describe("attach exist entity to exist entity with many-to-one relation", function () {
        if (!dataSource)
            return;
        let newPost, newCategory, loadedPost;
        before(reloadDatabase);
        // save a new category
        before(function () {
            newCategory = categoryRepository.create();
            newCategory.name = "Animals";
            return categoryRepository.save(newCategory);
        });
        // save a new post
        before(function () {
            newPost = postRepository.create();
            newPost.title = "All about animals";
            return postRepository.save(newPost);
        });
        // attach category to post and save it
        before(function () {
            newPost.category = newCategory;
            return postRepository.save(newPost);
        });
        // load a post
        before(function () {
            return postRepository
                .findOne({
                where: {
                    id: 1,
                },
                join: {
                    alias: "post",
                    leftJoinAndSelect: { category: "post.category" },
                },
            })
                .then((post) => (loadedPost = post));
        });
        it("should contain attached category", function () {
            (0, chai_1.expect)(loadedPost).not.to.be.undefined;
            (0, chai_1.expect)(loadedPost.category).not.to.be.undefined;
            (0, chai_1.expect)(loadedPost.categoryId).not.to.be.undefined;
        });
    });
    describe("attach new entity to exist entity with many-to-one relation", function () {
        if (!dataSource)
            return;
        let newPost, newCategory, loadedPost;
        before(reloadDatabase);
        // save a new category
        before(function () {
            newCategory = categoryRepository.create();
            newCategory.name = "Animals";
            return categoryRepository.save(newCategory);
        });
        // save a new post and attach category
        before(function () {
            newPost = postRepository.create();
            newPost.title = "All about animals";
            newPost.category = newCategory;
            return postRepository.save(newPost);
        });
        // load a post
        before(function () {
            return postRepository
                .findOne({
                where: {
                    id: 1,
                },
                join: {
                    alias: "post",
                    leftJoinAndSelect: { category: "post.category" },
                },
            })
                .then((post) => (loadedPost = post));
        });
        it("should contain attached category", function () {
            (0, chai_1.expect)(loadedPost).not.to.be.undefined;
            (0, chai_1.expect)(loadedPost.category).not.to.be.undefined;
            (0, chai_1.expect)(loadedPost.categoryId).not.to.be.undefined;
        });
    });
    describe("attach new entity to new entity with many-to-one relation", function () {
        if (!dataSource)
            return;
        let newPost, newCategory, loadedPost;
        before(reloadDatabase);
        // save a new category, post and attach category to post
        before(function () {
            newCategory = categoryRepository.create();
            newCategory.name = "Animals";
            newPost = postRepository.create();
            newPost.title = "All about animals";
            newPost.category = newCategory;
            return postRepository.save(newPost);
        });
        // load a post
        before(function () {
            return postRepository
                .findOne({
                where: {
                    id: 1,
                },
                join: {
                    alias: "post",
                    leftJoinAndSelect: { category: "post.category" },
                },
            })
                .then((post) => (loadedPost = post));
        });
        it("should contain attached category", function () {
            (0, chai_1.expect)(loadedPost).not.to.be.undefined;
            (0, chai_1.expect)(loadedPost.category).not.to.be.undefined;
            (0, chai_1.expect)(loadedPost.categoryId).not.to.be.undefined;
        });
    });
    describe("attach exist entity to exist entity with one-to-one relation", function () {
        if (!dataSource)
            return;
        let newPost, newCategory, newMetadata, loadedPost;
        before(reloadDatabase);
        // save a new post
        before(function () {
            newPost = postRepository.create();
            newPost.title = "All about animals";
            return postRepository.save(newPost);
        });
        // save a new category
        before(function () {
            newCategory = categoryRepository.create();
            newCategory.name = "Animals";
            return categoryRepository.save(newCategory);
        });
        // save a new metadata
        before(function () {
            newMetadata = metadataRepository.create();
            newMetadata.keyword = "animals";
            return metadataRepository.save(newMetadata);
        });
        // attach metadata to category and category to post and save it
        before(function () {
            newCategory.metadata = newMetadata;
            newPost.category = newCategory;
            return postRepository.save(newPost);
        });
        // load a post
        before(function () {
            return postRepository
                .findOne({
                where: {
                    id: 1,
                },
                join: {
                    alias: "post",
                    leftJoinAndSelect: {
                        category: "post.category",
                        metadata: "category.metadata",
                    },
                },
            })
                .then((post) => (loadedPost = post));
        });
        it("should contain attached category and metadata in the category", function () {
            (0, chai_1.expect)(loadedPost).not.to.be.undefined;
            (0, chai_1.expect)(loadedPost.category).not.to.be.undefined;
            (0, chai_1.expect)(loadedPost.categoryId).not.to.be.undefined;
            (0, chai_1.expect)(loadedPost.category.metadata).not.to.be.undefined;
            (0, chai_1.expect)(loadedPost.category.metadataId).not.to.be.undefined;
        });
    });
    describe("attach new entity to exist entity with one-to-one relation", function () {
        if (!dataSource)
            return;
        let newPost, newCategory, newMetadata, loadedPost;
        before(reloadDatabase);
        // save a new post
        before(function () {
            newPost = postRepository.create();
            newPost.title = "All about animals";
            return postRepository.save(newPost);
        });
        // save a new category and new metadata
        before(function () {
            newMetadata = metadataRepository.create();
            newMetadata.keyword = "animals";
            newCategory = categoryRepository.create();
            newCategory.name = "Animals";
            newCategory.metadata = newMetadata;
            return categoryRepository.save(newCategory);
        });
        // attach metadata to category and category to post and save it
        before(function () {
            newPost.category = newCategory;
            return postRepository.save(newPost);
        });
        // load a post
        before(function () {
            return postRepository
                .findOne({
                where: {
                    id: 1,
                },
                join: {
                    alias: "post",
                    leftJoinAndSelect: {
                        category: "post.category",
                        metadata: "category.metadata",
                    },
                },
            })
                .then((post) => (loadedPost = post));
        });
        it("should contain attached category and metadata in the category", function () {
            (0, chai_1.expect)(loadedPost).not.to.be.undefined;
            (0, chai_1.expect)(loadedPost.category).not.to.be.undefined;
            (0, chai_1.expect)(loadedPost.categoryId).not.to.be.undefined;
            (0, chai_1.expect)(loadedPost.category.metadata).not.to.be.undefined;
            (0, chai_1.expect)(loadedPost.category.metadataId).not.to.be.undefined;
        });
    });
});
//# sourceMappingURL=persistence-custom-column-names.js.map