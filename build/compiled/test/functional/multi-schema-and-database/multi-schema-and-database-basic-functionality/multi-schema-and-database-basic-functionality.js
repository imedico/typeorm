"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const chai_1 = require("chai");
const Post_1 = require("./entity/Post");
const User_1 = require("./entity/User");
const Category_1 = require("./entity/Category");
const Person_1 = require("./entity/Person");
const Question_1 = require("./entity/Question");
const Answer_1 = require("./entity/Answer");
const DriverUtils_1 = require("../../../../src/driver/DriverUtils");
describe("multi-schema-and-database > basic-functionality", () => {
    describe("custom-table-schema", () => {
        let connections;
        before(async () => {
            connections = await (0, test_utils_1.createTestingConnections)({
                entities: [Post_1.Post, User_1.User, Category_1.Category],
                enabledDrivers: ["mssql", "postgres"],
                schema: "custom",
            });
        });
        beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
        after(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("should set the table database / schema", () => Promise.all(connections.map(async (connection) => {
            const queryRunner = connection.createQueryRunner();
            const table = (await queryRunner.getTable("post"));
            await queryRunner.release();
            (0, chai_1.expect)(table.database).to.not.be.undefined;
            (0, chai_1.expect)(table.schema).to.be.equal("custom");
        })));
        it("should correctly get the table primary keys when custom table schema used", () => Promise.all(connections.map(async (connection) => {
            var _a;
            const queryRunner = connection.createQueryRunner();
            const table = (await queryRunner.getTable("post"));
            await queryRunner.release();
            (0, chai_1.expect)(table.primaryColumns).to.have.length(1);
            (0, chai_1.expect)((_a = table.findColumnByName("id")) === null || _a === void 0 ? void 0 : _a.isGenerated).to.be.true;
        })));
        it("should correctly create tables when custom table schema used", () => Promise.all(connections.map(async (connection) => {
            const queryRunner = connection.createQueryRunner();
            const table = await queryRunner.getTable("post");
            await queryRunner.release();
            const post = new Post_1.Post();
            post.name = "Post #1";
            await connection.getRepository(Post_1.Post).save(post);
            const sql = connection
                .createQueryBuilder(Post_1.Post, "post")
                .where("post.id = :id", { id: 1 })
                .getSql();
            if (connection.driver.options.type === "postgres")
                sql.should.be.equal(`SELECT "post"."id" AS "post_id", "post"."name" AS "post_name" FROM "custom"."post" "post" WHERE "post"."id" = $1`);
            if (connection.driver.options.type === "mssql")
                sql.should.be.equal(`SELECT "post"."id" AS "post_id", "post"."name" AS "post_name" FROM "custom"."post" "post" WHERE "post"."id" = @0`);
            table.name.should.be.equal("custom.post");
        })));
        it("should correctly create tables when custom table schema used in Entity decorator", () => Promise.all(connections.map(async (connection) => {
            const queryRunner = connection.createQueryRunner();
            const table = await queryRunner.getTable("userSchema.user");
            await queryRunner.release();
            const user = new User_1.User();
            user.name = "User #1";
            await connection.getRepository(User_1.User).save(user);
            const sql = connection
                .createQueryBuilder(User_1.User, "user")
                .where("user.id = :id", { id: 1 })
                .getSql();
            if (connection.driver.options.type === "postgres")
                sql.should.be.equal(`SELECT "user"."id" AS "user_id", "user"."name" AS "user_name" FROM "userSchema"."user" "user" WHERE "user"."id" = $1`);
            if (connection.driver.options.type === "mssql")
                sql.should.be.equal(`SELECT "user"."id" AS "user_id", "user"."name" AS "user_name" FROM "userSchema"."user" "user" WHERE "user"."id" = @0`);
            table.name.should.be.equal("userSchema.user");
        })));
        it("should correctly work with cross-schema queries", () => Promise.all(connections.map(async (connection) => {
            const queryRunner = connection.createQueryRunner();
            const table = await queryRunner.getTable("guest.category");
            await queryRunner.release();
            const post = new Post_1.Post();
            post.name = "Post #1";
            await connection.getRepository(Post_1.Post).save(post);
            const category = new Category_1.Category();
            category.name = "Category #1";
            category.post = post;
            await connection.getRepository(Category_1.Category).save(category);
            const loadedCategory = await connection
                .createQueryBuilder(Category_1.Category, "category")
                .innerJoinAndSelect("category.post", "post")
                .where("category.id = :id", { id: 1 })
                .getOne();
            loadedCategory.should.be.not.empty;
            loadedCategory.post.should.be.not.empty;
            loadedCategory.post.id.should.be.equal(1);
            const sql = connection
                .createQueryBuilder(Category_1.Category, "category")
                .innerJoinAndSelect("category.post", "post")
                .where("category.id = :id", { id: 1 })
                .getSql();
            if (connection.driver.options.type === "postgres")
                sql.should.be.equal(`SELECT "category"."id" AS "category_id", "category"."name" AS "category_name",` +
                    ` "category"."postId" AS "category_postId", "post"."id" AS "post_id", "post"."name" AS "post_name"` +
                    ` FROM "guest"."category" "category" INNER JOIN "custom"."post" "post" ON "post"."id"="category"."postId" WHERE "category"."id" = $1`);
            if (connection.driver.options.type === "mssql")
                sql.should.be.equal(`SELECT "category"."id" AS "category_id", "category"."name" AS "category_name",` +
                    ` "category"."postId" AS "category_postId", "post"."id" AS "post_id", "post"."name" AS "post_name"` +
                    ` FROM "guest"."category" "category" INNER JOIN "custom"."post" "post" ON "post"."id"="category"."postId" WHERE "category"."id" = @0`);
            table.name.should.be.equal("guest.category");
        })));
        it("should correctly work with QueryBuilder", () => Promise.all(connections.map(async (connection) => {
            const post = new Post_1.Post();
            post.name = "Post #1";
            await connection.getRepository(Post_1.Post).save(post);
            const user = new User_1.User();
            user.name = "User #1";
            await connection.getRepository(User_1.User).save(user);
            const category = new Category_1.Category();
            category.name = "Category #1";
            category.post = post;
            await connection.getRepository(Category_1.Category).save(category);
            const query = connection
                .createQueryBuilder()
                .select()
                .from(Category_1.Category, "category")
                .addFrom(User_1.User, "user")
                .addFrom(Post_1.Post, "post")
                .where("category.id = :id", { id: 1 })
                .andWhere("post.id = category.post");
            (await query.getRawOne()).should.be.not.empty;
            if (connection.driver.options.type === "postgres")
                query
                    .getSql()
                    .should.be.equal(`SELECT * FROM "guest"."category" "category", "userSchema"."user" "user",` +
                    ` "custom"."post" "post" WHERE "category"."id" = $1 AND "post"."id" = "category"."postId"`);
            if (connection.driver.options.type === "mssql")
                query
                    .getSql()
                    .should.be.equal(`SELECT * FROM "guest"."category" "category", "userSchema"."user" "user",` +
                    ` "custom"."post" "post" WHERE "category"."id" = @0 AND "post"."id" = "category"."postId"`);
        })));
    });
    describe("custom-table-schema-and-database", () => {
        let connections;
        before(async () => {
            connections = await (0, test_utils_1.createTestingConnections)({
                entities: [Question_1.Question, Answer_1.Answer],
                enabledDrivers: ["mssql"],
            });
        });
        beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
        after(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("should set the table database / schema", () => Promise.all(connections.map(async (connection) => {
            const queryRunner = connection.createQueryRunner();
            const table = (await queryRunner.getTable("testDB.questions.question"));
            await queryRunner.release();
            (0, chai_1.expect)(table.database).to.be.equal("testDB");
            (0, chai_1.expect)(table.schema).to.be.equal("questions");
            (0, chai_1.expect)(table.name).to.be.equal("testDB.questions.question");
        })));
        it("should correctly get the table primary keys when custom table schema used", () => Promise.all(connections.map(async (connection) => {
            var _a;
            const queryRunner = connection.createQueryRunner();
            const table = (await queryRunner.getTable("testDB.questions.question"));
            await queryRunner.release();
            (0, chai_1.expect)(table.primaryColumns).to.have.length(1);
            (0, chai_1.expect)((_a = table.findColumnByName("id")) === null || _a === void 0 ? void 0 : _a.isGenerated).to.be.true;
        })));
        it("should correctly create tables when custom database and custom schema used in Entity decorator", () => Promise.all(connections.map(async (connection) => {
            const queryRunner = connection.createQueryRunner();
            const table = await queryRunner.getTable("testDB.questions.question");
            await queryRunner.release();
            const question = new Question_1.Question();
            question.name = "Question #1";
            await connection.getRepository(Question_1.Question).save(question);
            const sql = connection
                .createQueryBuilder(Question_1.Question, "question")
                .where("question.id = :id", { id: 1 })
                .getSql();
            sql.should.be.equal(`SELECT "question"."id" AS "question_id", "question"."name" AS "question_name" FROM "testDB"."questions"."question" "question" WHERE "question"."id" = @0`);
            table.name.should.be.equal("testDB.questions.question");
        })));
        it("should correctly work with cross-schema and cross-database queries in QueryBuilder", () => Promise.all(connections.map(async (connection) => {
            const queryRunner = connection.createQueryRunner();
            const questionTable = await queryRunner.getTable("testDB.questions.question");
            const answerTable = await queryRunner.getTable("secondDB.answers.answer");
            await queryRunner.release();
            const question = new Question_1.Question();
            question.name = "Question #1";
            await connection.getRepository(Question_1.Question).save(question);
            const answer1 = new Answer_1.Answer();
            answer1.text = "answer 1";
            answer1.questionId = question.id;
            await connection.getRepository(Answer_1.Answer).save(answer1);
            const answer2 = new Answer_1.Answer();
            answer2.text = "answer 2";
            answer2.questionId = question.id;
            await connection.getRepository(Answer_1.Answer).save(answer2);
            const query = connection
                .createQueryBuilder()
                .select()
                .from(Question_1.Question, "question")
                .addFrom(Answer_1.Answer, "answer")
                .where("question.id = :id", { id: 1 })
                .andWhere("answer.questionId = question.id");
            (0, chai_1.expect)(await query.getRawOne()).to.be.not.empty;
            query
                .getSql()
                .should.be.equal(`SELECT * FROM "testDB"."questions"."question" "question", "secondDB"."answers"."answer"` +
                ` "answer" WHERE "question"."id" = @0 AND "answer"."questionId" = "question"."id"`);
            questionTable.name.should.be.equal("testDB.questions.question");
            answerTable.name.should.be.equal("secondDB.answers.answer");
        })));
    });
    describe("custom-database", () => {
        let connections;
        before(async () => {
            connections = await (0, test_utils_1.createTestingConnections)({
                entities: [Person_1.Person],
                enabledDrivers: ["mssql", "mysql"],
            });
        });
        beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
        after(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("should correctly create tables when custom database used in Entity decorator", () => Promise.all(connections.map(async (connection) => {
            const queryRunner = connection.createQueryRunner();
            const tablePath = connection.driver.options.type === "mssql"
                ? "secondDB..person"
                : "secondDB.person";
            const table = await queryRunner.getTable(tablePath);
            await queryRunner.release();
            const person = new Person_1.Person();
            person.name = "Person #1";
            await connection.getRepository(Person_1.Person).save(person);
            const sql = connection
                .createQueryBuilder(Person_1.Person, "person")
                .where("person.id = :id", { id: 1 })
                .getSql();
            if (connection.driver.options.type === "mssql")
                sql.should.be.equal(`SELECT "person"."id" AS "person_id", "person"."name" AS "person_name" FROM "secondDB".."person" "person" WHERE "person"."id" = @0`);
            if (DriverUtils_1.DriverUtils.isMySQLFamily(connection.driver))
                sql.should.be.equal("SELECT `person`.`id` AS `person_id`, `person`.`name` AS `person_name` FROM `secondDB`.`person` `person` WHERE `person`.`id` = ?");
            table.name.should.be.equal(tablePath);
        })));
    });
});
//# sourceMappingURL=multi-schema-and-database-basic-functionality.js.map