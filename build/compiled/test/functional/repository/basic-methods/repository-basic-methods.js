"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
require("../../../utils/test-setup");
const test_utils_1 = require("../../../utils/test-utils");
const Post_1 = require("./entity/Post");
const QueryBuilder_1 = require("../../../../src/query-builder/QueryBuilder");
const QuestionSchema_1 = tslib_1.__importDefault(require("./model-schema/QuestionSchema"));
const UserSchema_1 = tslib_1.__importDefault(require("./model-schema/UserSchema"));
const Blog_1 = require("./entity/Blog");
const Category_1 = require("./entity/Category");
const src_1 = require("../../../../src");
const ExternalIdPrimaryKeyEntity_1 = require("./entity/ExternalIdPrimaryKeyEntity");
const EmbeddedUQEntity_1 = require("./entity/EmbeddedUQEntity");
const RelationAsPrimaryKey_1 = require("./entity/RelationAsPrimaryKey");
const TwoUniqueColumns_1 = require("./entity/TwoUniqueColumns");
const OneToOneRelation_1 = require("./entity/OneToOneRelation");
describe("repository > basic methods", () => {
    const UserEntity = new src_1.EntitySchema(UserSchema_1.default);
    const QuestionEntity = new src_1.EntitySchema(QuestionSchema_1.default);
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [
            Post_1.Post,
            Blog_1.Blog,
            Category_1.Category,
            UserEntity,
            QuestionEntity,
            ExternalIdPrimaryKeyEntity_1.ExternalIdPrimaryKeyEntity,
            EmbeddedUQEntity_1.EmbeddedUQEntity,
            RelationAsPrimaryKey_1.RelationAsPrimaryKey,
            TwoUniqueColumns_1.TwoUniqueColumnsEntity,
            OneToOneRelation_1.OneToOneRelationEntity,
        ],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    describe("target", function () {
        it("should return instance of the object it manages", () => connections.forEach((connection) => {
            const postRepository = connection.getRepository(Post_1.Post);
            postRepository.target.should.be.equal(Post_1.Post);
            const userRepository = connection.getRepository("User");
            userRepository.target.should.be.equal("User");
            // todo: it's not clear what we shall return string or entity schema
            // const questionRepository = connection.getRepository<Question>("Question");
            // questionRepository.target.should.be.instanceOf(Function);
        }));
    });
    describe("hasId", function () {
        it("should return true if entity has an id", () => connections.forEach((connection) => {
            const postRepository = connection.getRepository(Post_1.Post);
            const userRepository = connection.getRepository("User");
            const postWithId = new Post_1.Post();
            postWithId.id = 1;
            postWithId.title = "Hello post";
            postRepository.hasId(postWithId).should.be.equal(true);
            const postWithZeroId = new Post_1.Post();
            postWithZeroId.id = 0;
            postWithZeroId.title = "Hello post";
            postRepository.hasId(postWithZeroId).should.be.equal(true);
            const userWithId = {
                id: 1,
                firstName: "Jonh",
                secondName: "Doe",
            };
            userRepository.hasId(userWithId).should.be.equal(true);
            const userWithZeroId = {
                id: 1,
                firstName: "Jonh",
                secondName: "Doe",
            };
            userRepository.hasId(userWithZeroId).should.be.equal(true);
        }));
        it("should return false if entity does not have an id", () => connections.forEach((connection) => {
            const postRepository = connection.getRepository(Post_1.Post);
            const userRepository = connection.getRepository("User");
            postRepository.hasId(null).should.be.equal(false);
            postRepository.hasId(undefined).should.be.equal(false);
            const postWithoutId = new Post_1.Post();
            postWithoutId.title = "Hello post";
            postRepository.hasId(postWithoutId).should.be.equal(false);
            const postWithUndefinedId = new Post_1.Post();
            postWithUndefinedId.id = undefined;
            postWithUndefinedId.title = "Hello post";
            postRepository.hasId(postWithUndefinedId).should.be.equal(false);
            const postWithNullId = new Post_1.Post();
            postWithNullId.id = null;
            postWithNullId.title = "Hello post";
            postRepository.hasId(postWithNullId).should.be.equal(false);
            const postWithEmptyId = new Post_1.Post();
            postWithEmptyId.id = "";
            postWithEmptyId.title = "Hello post";
            postRepository.hasId(postWithEmptyId).should.be.equal(false);
            const userWithoutId = {
                firstName: "Jonh",
                secondName: "Doe",
            };
            userRepository.hasId(userWithoutId).should.be.equal(false);
            const userWithNullId = {
                id: null,
                firstName: "Jonh",
                secondName: "Doe",
            };
            userRepository.hasId(userWithNullId).should.be.equal(false);
            const userWithUndefinedId = {
                id: undefined,
                firstName: "Jonh",
                secondName: "Doe",
            };
            userRepository.hasId(userWithUndefinedId).should.be.equal(false);
        }));
    });
    describe("createQueryBuilder", function () {
        it("should create a new query builder with the given alias", () => connections.forEach((connection) => {
            const postRepository = connection.getRepository(Post_1.Post);
            const postQb = postRepository.createQueryBuilder("post");
            postQb.should.be.instanceOf(QueryBuilder_1.QueryBuilder);
            postQb.alias.should.be.equal("post");
            const userRepository = connection.getRepository("User");
            const userQb = userRepository.createQueryBuilder("user");
            userQb.should.be.instanceOf(QueryBuilder_1.QueryBuilder);
            userQb.alias.should.be.equal("user");
            const questionRepository = connection.getRepository("Question");
            const questionQb = questionRepository.createQueryBuilder("question");
            questionQb.should.be.instanceOf(QueryBuilder_1.QueryBuilder);
            questionQb.alias.should.be.equal("question");
        }));
    });
    describe("create", function () {
        it("should create a new instance of the object we are working with", () => connections.forEach((connection) => {
            const repository = connection.getRepository(Post_1.Post);
            repository.create().should.be.instanceOf(Post_1.Post);
        }));
        it("should create a new empty object if entity schema is used", () => connections.forEach((connection) => {
            const repository = connection.getRepository("User");
            repository.create().should.be.eql({});
        }));
        it("should create a new empty object if entity schema with a target is used", () => connections.forEach((connection) => {
            const repository = connection.getRepository("Question");
            repository.create().should.not.be.undefined;
            repository.create().should.not.be.null;
            repository.create().type.should.be.equal("question"); // make sure this is our Question function
        }));
        it("should create an entity and copy to it all properties of the given plain object if its given", () => connections.forEach((connection) => {
            const postRepository = connection.getRepository(Post_1.Post);
            const userRepository = connection.getRepository("User");
            const questionRepository = connection.getRepository("Question");
            const plainPost = { id: 2, title: "Hello post" };
            const post = postRepository.create(plainPost);
            post.should.be.instanceOf(Post_1.Post);
            post.id.should.be.equal(2);
            post.title.should.be.equal("Hello post");
            const plainUser = {
                id: 3,
                firstName: "John",
                secondName: "Doe",
            };
            const user = userRepository.create(plainUser);
            user.id.should.be.equal(3);
            user.firstName.should.be.equal("John");
            user.secondName.should.be.equal("Doe");
            const plainQuestion = { id: 3, title: "What is better?" };
            const question = questionRepository.create(plainQuestion);
            question.id.should.be.equal(3);
            question.title.should.be.equal("What is better?");
        }));
    });
    describe("createMany", function () {
        it("should create entities and copy to them all properties of the given plain object if its given", () => connections.forEach((connection) => {
            const postRepository = connection.getRepository(Post_1.Post);
            const plainPosts = [
                { id: 2, title: "Hello post" },
                { id: 3, title: "Bye post" },
            ];
            const posts = postRepository.create(plainPosts);
            posts.length.should.be.equal(2);
            posts[0].should.be.instanceOf(Post_1.Post);
            posts[0].id.should.be.equal(2);
            posts[0].title.should.be.equal("Hello post");
            posts[1].should.be.instanceOf(Post_1.Post);
            posts[1].id.should.be.equal(3);
            posts[1].title.should.be.equal("Bye post");
        }));
    });
    describe("preload", function () {
        it("should preload entity from the given object with only id", () => Promise.all(connections.map(async (connection) => {
            const blogRepository = connection.getRepository(Blog_1.Blog);
            const categoryRepository = connection.getRepository(Category_1.Category);
            // save the category
            const category = new Category_1.Category();
            category.name = "people";
            await categoryRepository.save(category);
            // save the blog
            const blog = new Blog_1.Blog();
            blog.title = "About people";
            blog.text = "Blog about good people";
            blog.categories = [category];
            await blogRepository.save(blog);
            // and preload it
            const plainBlogWithId = { id: 1 };
            const preloadedBlog = await blogRepository.preload(plainBlogWithId);
            preloadedBlog.should.be.instanceOf(Blog_1.Blog);
            preloadedBlog.id.should.be.equal(1);
            preloadedBlog.title.should.be.equal("About people");
            preloadedBlog.text.should.be.equal("Blog about good people");
        })));
        it("should preload entity and all relations given in the object", () => Promise.all(connections.map(async (connection) => {
            const blogRepository = connection.getRepository(Blog_1.Blog);
            const categoryRepository = connection.getRepository(Category_1.Category);
            // save the category
            const category = new Category_1.Category();
            category.name = "people";
            await categoryRepository.save(category);
            // save the blog
            const blog = new Blog_1.Blog();
            blog.title = "About people";
            blog.text = "Blog about good people";
            blog.categories = [category];
            await blogRepository.save(blog);
            // and preload it
            const plainBlogWithId = { id: 1, categories: [{ id: 1 }] };
            const preloadedBlog = await blogRepository.preload(plainBlogWithId);
            preloadedBlog.should.be.instanceOf(Blog_1.Blog);
            preloadedBlog.id.should.be.equal(1);
            preloadedBlog.title.should.be.equal("About people");
            preloadedBlog.text.should.be.equal("Blog about good people");
            preloadedBlog.categories[0].id.should.be.equal(1);
            preloadedBlog.categories[0].name.should.be.equal("people");
        })));
    });
    describe("merge", function () {
        it("should merge multiple entities", () => Promise.all(connections.map(async (connection) => {
            const blogRepository = connection.getRepository(Blog_1.Blog);
            const originalEntity = new Blog_1.Blog();
            // first entity
            const blog1 = new Blog_1.Blog();
            blog1.title = "First Blog";
            // second entity
            const blog2 = new Blog_1.Blog();
            blog2.text = "text is from second blog";
            // third entity
            const category = new Category_1.Category();
            category.name = "category from third blog";
            const blog3 = new Blog_1.Blog();
            blog3.categories = [category];
            const mergedBlog = blogRepository.merge(originalEntity, blog1, blog2, blog3);
            mergedBlog.should.be.instanceOf(Blog_1.Blog);
            mergedBlog.should.be.equal(originalEntity);
            mergedBlog.should.not.be.equal(blog1);
            mergedBlog.should.not.be.equal(blog2);
            mergedBlog.should.not.be.equal(blog3);
            mergedBlog.title.should.be.equal("First Blog");
            mergedBlog.text.should.be.equal("text is from second blog");
            mergedBlog.categories[0].name.should.be.equal("category from third blog");
        })));
        it("should merge both entities and plain objects", () => Promise.all(connections.map(async (connection) => {
            const blogRepository = connection.getRepository(Blog_1.Blog);
            const originalEntity = new Blog_1.Blog();
            // first entity
            const blog1 = { title: "First Blog" };
            // second entity
            const blog2 = { text: "text is from second blog" };
            // third entity
            const blog3 = new Blog_1.Blog();
            blog3.categories = [
                { name: "category from third blog" },
            ];
            const mergedBlog = blogRepository.merge(originalEntity, blog1, blog2, blog3);
            mergedBlog.should.be.instanceOf(Blog_1.Blog);
            mergedBlog.should.be.equal(originalEntity);
            mergedBlog.should.not.be.equal(blog1);
            mergedBlog.should.not.be.equal(blog2);
            mergedBlog.should.not.be.equal(blog3);
            mergedBlog.title.should.be.equal("First Blog");
            mergedBlog.text.should.be.equal("text is from second blog");
            mergedBlog.categories[0].name.should.be.equal("category from third blog");
        })));
    });
    describe("save", function () {
        it("should update existing entity using transformers", () => Promise.all(connections
            .filter((c) => c.name === "sqlite" || c.name === "better-sqlite3")
            .map(async (connection) => {
            if (!connection ||
                connection.options.skip === true) {
                return;
            }
            const post = new Post_1.Post();
            const date = new Date("2018-01-01 01:00:00");
            post.dateAdded = date;
            post.title = "Post title";
            post.id = 1;
            const postRepository = connection.getRepository(Post_1.Post);
            await postRepository.save(post);
            const dbPost = await postRepository.findOneByOrFail({
                id: post.id,
            });
            dbPost.should.be.instanceOf(Post_1.Post);
            dbPost.dateAdded.should.be.instanceOf(Date);
            dbPost
                .dateAdded.getTime()
                .should.be.equal(date.getTime());
            dbPost.title = "New title";
            const saved = await postRepository.save(dbPost);
            saved.should.be.instanceOf(Post_1.Post);
            saved.id.should.be.equal(1);
            saved.title.should.be.equal("New title");
            saved.dateAdded.should.be.instanceof(Date);
            saved
                .dateAdded.getTime()
                .should.be.equal(date.getTime());
        })));
    });
    describe("upsert", function () {
        it("should first create then update an entity", () => Promise.all(connections.map(async (connection) => {
            if (!connection.driver.supportedUpsertTypes.length)
                return;
            const externalIdObjects = connection.getRepository(ExternalIdPrimaryKeyEntity_1.ExternalIdPrimaryKeyEntity);
            const postRepository = connection.getRepository(Post_1.Post);
            const categoryRepository = connection.getRepository(Category_1.Category);
            const relationAsPrimaryKeyRepository = connection.getRepository(RelationAsPrimaryKey_1.RelationAsPrimaryKey);
            const externalId = "external-1";
            const category = await categoryRepository.save({
                name: "Category",
            });
            // create a new post and insert it
            await postRepository.upsert({ externalId, title: "Post title initial" }, ["externalId"]);
            const initial = await postRepository.findOneByOrFail({
                externalId,
            });
            initial.title.should.be.equal("Post title initial");
            await (0, test_utils_1.sleep)(1000);
            // update post with externalId
            await postRepository.upsert({ externalId, title: "Post title updated", category }, ["externalId"]);
            const updated = await postRepository.findOneOrFail({
                where: {
                    externalId,
                },
                relations: {
                    category: true,
                },
            });
            // title should have changed
            updated.title.should.be.equal("Post title updated");
            // id should not have changed
            updated.id.should.be.equal(initial.id);
            updated.category.id.should.equal(category.id);
            updated.createdAt
                .getTime()
                .should.be.equal(initial.createdAt.getTime(), "created time should be the same");
            // upsert is a low level operation and should not force the updatedAt time to update
            // updated.updatedAt.getTime()
            //     .should.not.be.equal(
            //         initial.updatedAt.getTime(),
            //         "updated time should not be the same"
            //     );
            // unique constraint on externalId already enforces this, but test it anyways
            const count = await postRepository.findBy({ externalId });
            count.length.should.be.equal(1);
            // upserts on primary key without specifying conflict columns should upsert
            await externalIdObjects.upsert({ externalId, title: "foo" }, ["externalId"]);
            (await externalIdObjects.findOneByOrFail({
                externalId,
            })).title.should.be.equal("foo");
            await externalIdObjects.upsert({ externalId, title: "bar" }, ["externalId"]);
            (await externalIdObjects.findOneByOrFail({
                externalId,
            })).title.should.be.equal("bar");
            // upserts on unique relation should work
            await relationAsPrimaryKeyRepository.upsert({ categoryId: category.id }, ["categoryId"]);
            (await relationAsPrimaryKeyRepository.findOneOrFail({
                where: { category: { id: category.id } },
                relations: { category: true },
            })).category.id.should.equal(category.id);
        })));
        it("should bulk upsert", () => Promise.all(connections.map(async (connection) => {
            if (!connection.driver.supportedUpsertTypes.length)
                return;
            const externalIdObjects = connection.getRepository(ExternalIdPrimaryKeyEntity_1.ExternalIdPrimaryKeyEntity);
            const entitiesToInsert = Array.from({ length: 5 }, (v, i) => ({
                externalId: `external-bulk-${i + 1}`,
                title: "Initially inserted",
            }));
            await externalIdObjects.upsert(entitiesToInsert, [
                "externalId",
            ]);
            (await externalIdObjects.findBy({
                externalId: (0, src_1.Like)("external-bulk-%"),
            })).forEach((inserted, i) => {
                inserted.title.should.be.equal("Initially inserted");
            });
            const entitiesToUpdate = Array.from({ length: 5 }, (v, i) => ({
                externalId: `external-bulk-${i + 1}`,
                title: "Updated",
            }));
            await externalIdObjects.upsert(entitiesToUpdate, [
                "externalId",
            ]);
            (await externalIdObjects.findBy({
                externalId: (0, src_1.Like)("external-bulk-%"),
            })).forEach((updated, i) => {
                updated.title.should.be.equal("Updated");
            });
        })));
        it("should not overwrite unspecified properties", () => Promise.all(connections.map(async (connection) => {
            if (!connection.driver.supportedUpsertTypes.length)
                return;
            const postObjects = connection.getRepository(Post_1.Post);
            const externalId = "external-no-overwrite-unrelated";
            // update properties of embedded
            await postObjects.upsert({ externalId, title: "title", subTitle: "subtitle" }, ["externalId"]);
            await postObjects.upsert({ externalId, title: "title updated" }, ["externalId"]);
            (await postObjects.findOneByOrFail({ externalId })).subTitle.should.equal("subtitle");
            (await postObjects.findOneByOrFail({ externalId })).title.should.equal("title updated");
        })));
        it("should skip update when nothing has changed", () => Promise.all(connections.map(async (connection) => {
            if (!(connection.driver.options.type === "postgres"))
                return;
            const postObjects = connection.getRepository(Post_1.Post);
            const externalId1 = "external-skip-update-nothing-changed1";
            const externalId2 = "external-skip-update-nothing-changed2";
            const upsertOptions = {
                conflictPaths: ["externalId"],
                skipUpdateIfNoValuesChanged: true,
            };
            const insertResult = await postObjects.upsert([
                { externalId: externalId1, title: "title1" },
                { externalId: externalId2, title: "title2" },
            ], upsertOptions);
            insertResult.raw.should.have.length(2) // insert
            ;
            (await postObjects.findOneByOrFail({
                externalId: externalId1,
            })).title.should.equal("title1");
            (await postObjects.findOneByOrFail({
                externalId: externalId2,
            })).title.should.equal("title2");
            const updatedResult = await postObjects.upsert([
                {
                    externalId: externalId1,
                    title: "title updated1",
                },
                {
                    externalId: externalId2,
                    title: "title updated2",
                },
            ], upsertOptions);
            updatedResult.raw.should.have.length(2) // update
            ;
            (await postObjects.findOneByOrFail({
                externalId: externalId1,
            })).title.should.equal("title updated1");
            (await postObjects.findOneByOrFail({
                externalId: externalId2,
            })).title.should.equal("title updated2");
            const skippedUpdateResult = await postObjects.upsert([
                {
                    externalId: externalId1,
                    title: "title updated1",
                },
                {
                    externalId: externalId2,
                    title: "title updated2",
                },
            ], upsertOptions);
            skippedUpdateResult.raw.should.have.length(0); // update skipped
        })));
        it("should upsert with embedded columns", () => Promise.all(connections.map(async (connection) => {
            if (!connection.driver.supportedUpsertTypes.length)
                return;
            const externalIdObjects = connection.getRepository(ExternalIdPrimaryKeyEntity_1.ExternalIdPrimaryKeyEntity);
            const embeddedConstraintObjects = connection.getRepository(EmbeddedUQEntity_1.EmbeddedUQEntity);
            const externalId = "external-embedded";
            // update properties of embedded
            await externalIdObjects.upsert({
                externalId,
                title: "embedded",
                embedded: { foo: "foo 1" },
            }, ["externalId"]);
            (await externalIdObjects.findOneByOrFail({ externalId })).embedded.foo.should.be.equal("foo 1");
            await externalIdObjects.upsert({
                externalId,
                title: "embedded",
                embedded: { foo: "foo 2" },
            }, ["externalId"]);
            (await externalIdObjects.findOneByOrFail({ externalId })).embedded.foo.should.be.equal("foo 2");
            // upsert on embedded
            await embeddedConstraintObjects.upsert({ embedded: { id: "bar1", value: "foo 1" } }, ["embedded.id"]);
            (await embeddedConstraintObjects.findOneByOrFail({
                embedded: { id: "bar1" },
            })).embedded.value.should.be.equal("foo 1");
            await embeddedConstraintObjects.upsert({ embedded: { id: "bar1", value: "foo 2" } }, ["embedded.id"]);
            (await embeddedConstraintObjects.findOneByOrFail({
                embedded: { id: "bar1" },
            })).embedded.value.should.be.equal("foo 2");
        })));
        it("should upsert on one-to-one relation", () => Promise.all(connections.map(async (connection) => {
            if (!connection.driver.supportedUpsertTypes.length)
                return;
            const oneToOneRepository = connection.getRepository(OneToOneRelation_1.OneToOneRelationEntity);
            const categoryRepository = connection.getRepository(Category_1.Category);
            const category = await categoryRepository.save({
                name: "Category",
            });
            await oneToOneRepository.upsert({
                category,
                order: 1,
            }, ["category.id"]);
            (await oneToOneRepository.findOneByOrFail({
                category,
            })).order.should.be.equal(1);
            await oneToOneRepository.upsert({
                category,
                order: 2,
            }, ["category.id"]);
            (await oneToOneRepository.findOneByOrFail({
                category,
            })).order.should.be.equal(2);
        })));
        it("should bulk upsert with embedded columns", () => Promise.all(connections.map(async (connection) => {
            if (!connection.driver.supportedUpsertTypes.length)
                return;
            const embeddedConstraintObjects = connection.getRepository(EmbeddedUQEntity_1.EmbeddedUQEntity);
            await embeddedConstraintObjects.upsert([
                {
                    embedded: { id: "bar2", value: "value2" },
                },
                {
                    embedded: { id: "bar3", value: "value3" },
                },
            ], ["embedded.id"]);
            (await embeddedConstraintObjects.findOneByOrFail({
                embedded: { id: "bar2" },
            })).embedded.value.should.be.equal("value2");
            (await embeddedConstraintObjects.findOneByOrFail({
                embedded: { id: "bar3" },
            })).embedded.value.should.be.equal("value3");
            await embeddedConstraintObjects.upsert([
                {
                    embedded: { id: "bar2", value: "value2 2" },
                },
                {
                    embedded: { id: "bar3", value: "value3 2" },
                },
            ], ["embedded.id"]);
            (await embeddedConstraintObjects.findOneByOrFail({
                embedded: { id: "bar2" },
            })).embedded.value.should.be.equal("value2 2");
            (await embeddedConstraintObjects.findOneByOrFail({
                embedded: { id: "bar3" },
            })).embedded.value.should.be.equal("value3 2");
        })));
        it("should throw if using an unsupported driver", () => Promise.all(connections.map(async (connection) => {
            if (connection.driver.supportedUpsertTypes.length)
                return;
            const postRepository = connection.getRepository(Post_1.Post);
            const externalId = "external-2";
            await postRepository
                .upsert({ externalId, title: "Post title initial" }, [
                "externalId",
            ])
                .should.be.rejectedWith(src_1.TypeORMError);
        })));
        it("should throw if using indexPredicate with an unsupported driver", () => Promise.all(connections.map(async (connection) => {
            // does not throw for cockroachdb, just returns a result
            if (connection.driver.options.type === "cockroachdb")
                return;
            if (!connection.driver.supportedUpsertTypes.includes("on-conflict-do-update"))
                return;
            const postRepository = connection.getRepository(Post_1.Post);
            const externalId = "external-2";
            await postRepository
                .upsert({ externalId, title: "Post title initial" }, {
                conflictPaths: ["externalId"],
                indexPredicate: "dateAdded > 2020-01-01",
            })
                .should.be.rejectedWith(src_1.TypeORMError);
        })));
    });
    describe("preload also should also implement merge functionality", function () {
        it("if we preload entity from the plain object and merge preloaded object with plain object we'll have an object from the db with the replaced properties by a plain object's properties", () => Promise.all(connections.map(async (connection) => {
            const blogRepository = connection.getRepository(Blog_1.Blog);
            const categoryRepository = connection.getRepository(Category_1.Category);
            // save first category
            const firstCategory = new Category_1.Category();
            firstCategory.name = "people";
            await categoryRepository.save(firstCategory);
            // save second category
            const secondCategory = new Category_1.Category();
            secondCategory.name = "animals";
            await categoryRepository.save(secondCategory);
            // save the blog
            const blog = new Blog_1.Blog();
            blog.title = "About people";
            blog.text = "Blog about good people";
            blog.categories = [firstCategory, secondCategory];
            await blogRepository.save(blog);
            // and preload it
            const plainBlogWithId = {
                id: 1,
                title: "changed title about people",
                categories: [{ id: 1 }, { id: 2, name: "insects" }],
            };
            const preloadedBlog = await blogRepository.preload(plainBlogWithId);
            preloadedBlog.should.be.instanceOf(Blog_1.Blog);
            preloadedBlog.id.should.be.equal(1);
            preloadedBlog.title.should.be.equal("changed title about people");
            preloadedBlog.text.should.be.equal("Blog about good people");
            preloadedBlog.categories[0].id.should.be.equal(1);
            preloadedBlog.categories[0].name.should.be.equal("people");
            preloadedBlog.categories[1].id.should.be.equal(2);
            preloadedBlog.categories[1].name.should.be.equal("insects");
        })));
    });
    describe("query", function () {
        it("should execute the query natively and it should return the result", () => Promise.all(connections.map(async (connection) => {
            const repository = connection.getRepository(Blog_1.Blog);
            for (let i = 0; i < 5; i++) {
                // todo: should pass with 50 items. find the problem
                const blog = new Blog_1.Blog();
                blog.title = "hello blog";
                blog.text = "hello blog #" + i;
                blog.counter = i * 100;
                await repository.save(blog);
            }
            // such simple query should work on all platforms, isn't it? If no - make requests specifically to platforms
            const query = `SELECT MAX(${connection.driver.escape("blog")}.${connection.driver.escape("counter")}) as ${connection.driver.escape("max")} ` +
                ` FROM ${connection.driver.escape("blog")} ${connection.driver.escape("blog")}`;
            const result = await repository.query(query);
            result[0].should.not.be.undefined;
            result[0].max.should.not.be.undefined;
        })));
    });
    /*describe.skip("transaction", function() {

        it("executed queries must success", () => Promise.all(connections.map(async connection => {
            const repository = connection.getRepository(Blog);
            let blogs = await repository.find();
            blogs.should.be.eql([]);

            const blog = new Blog();
            blog.title = "hello blog title";
            blog.text = "hello blog text";
            await repository.save(blog);
            blogs.should.be.eql([]);

            blogs = await repository.find();
            blogs.length.should.be.equal(1);

            await repository.transaction(async () => {
                const promises: Promise<Blog>[] = [];
                for (let i = 0; i < 100; i++) {
                    const blog = new Blog();
                    blog.title = "hello blog";
                    blog.text = "hello blog #" + i;
                    blog.counter = i * 100;
                    promises.push(repository.save(blog));
                }
                await Promise.all(promises);

                blogs = await repository.find();
                blogs.length.should.be.equal(101);
            });

            blogs = await repository.find();
            blogs.length.should.be.equal(101);
        })));

        it("executed queries must rollback in the case if error in transaction", () => Promise.all(connections.map(async connection => {
            const repository = connection.getRepository(Blog);
            let blogs = await repository.find();
            blogs.should.be.eql([]);

            const blog = new Blog();
            blog.title = "hello blog title";
            blog.text = "hello blog text";
            await repository.save(blog);
            blogs.should.be.eql([]);

            blogs = await repository.find();
            blogs.length.should.be.equal(1);

            await repository.transaction(async () => {
                const promises: Promise<Blog>[] = [];
                for (let i = 0; i < 100; i++) {
                    const blog = new Blog();
                    blog.title = "hello blog";
                    blog.text = "hello blog #" + i;
                    blog.counter = i * 100;
                    promises.push(repository.save(blog));
                }
                await Promise.all(promises);

                blogs = await repository.find();
                blogs.length.should.be.equal(101);

                // now send the query that will crash all for us
                throw new Error("this error will cancel all persist operations");
            }).should.be.rejected;

            blogs = await repository.find();
            blogs.length.should.be.equal(1);
        })));

    });*/
});
//# sourceMappingURL=repository-basic-methods.js.map