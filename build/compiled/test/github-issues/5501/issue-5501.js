"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Post_1 = require("./entity/Post");
const chai_1 = require("chai");
describe("github issues > #5501 Incorrect data loading from JSON string for column type 'simple-json'", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            enabledDrivers: ["mysql", "mariadb"],
            entities: [Post_1.Post],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should correctly store simple-json field", () => Promise.all(connections.map(async (connection) => {
        let id = 0;
        const runTestCase = async (input, expected, message) => {
            id++;
            await connection
                .getRepository(Post_1.Post)
                .save({ id, jsonField: input });
            const actual = (await connection
                .createQueryBuilder()
                .from("Post", "post")
                .select("post.jsonField", "json")
                .where("post.id = :id", { id })
                .getRawOne()).json;
            (0, chai_1.expect)(actual).to.be.equal(expected, message);
        };
        await runTestCase("hello world", '"hello world"', "normal string");
        await runTestCase("", '""', "empty string");
        await runTestCase("null", '"null"', "string containing the word null");
        await runTestCase({ key: "value" }, '{"key":"value"}', "object containing a key and string value");
        await runTestCase(["hello"], '["hello"]', "array containing a string");
        await runTestCase(null, null, "a null object value");
        await runTestCase(1, "1", "the real number 1");
        await runTestCase(0.3, "0.3", "the number 0.3");
        await runTestCase(true, "true", "the boolean value true");
        await runTestCase([
            { hello: "earth", planet: true },
            { hello: "moon", planet: false },
        ], '[{"hello":"earth","planet":true},{"hello":"moon","planet":false}]', "a complex object example");
    })));
    it("should correctly retrieve simple-json field", () => Promise.all(connections.map(async (connection) => {
        let id = 0;
        const runTestCase = async (input, expected, message) => {
            id++;
            await connection
                .createQueryBuilder()
                .insert()
                .into(Post_1.Post)
                .values({ id, jsonField: () => ":field" }) // A bit of a hack to get the raw value inserting
                .setParameter("field", input)
                .execute();
            const actual = (await connection
                .getRepository(Post_1.Post)
                .findOne({ where: { id } })).jsonField;
            (0, chai_1.expect)(actual).to.be.eql(expected, message);
        };
        await runTestCase('"hello world"', "hello world", "normal string");
        await runTestCase('""', "", "empty string");
        await runTestCase('"null"', "null", "string containing the word null");
        await runTestCase('{"key":"value"}', { key: "value" }, "object containing a key and string value");
        await runTestCase('["hello"]', ["hello"], "array containing a string");
        await runTestCase(null, null, "a null object value");
        await runTestCase("1", 1, "the real number 1");
        await runTestCase("0.3", 0.3, "the number 0.3");
        await runTestCase("true", true, "the boolean value true");
        await runTestCase('[{"hello":"earth","planet":true},{"hello":"moon","planet":false}]', [
            { hello: "earth", planet: true },
            { hello: "moon", planet: false },
        ], "a complex object example");
    })));
    it("should throw an error when the data in the database is invalid", () => Promise.all(connections.map(async (connection) => {
        const insert = (id, value) => connection
            .createQueryBuilder()
            .insert()
            .into(Post_1.Post)
            .values({ id, jsonField: () => ":field" }) // A bit of a hack to get the raw value inserting
            .setParameter("field", value)
            .execute();
        // This was the likely data within the database in #4440
        // This will happen if you've tried to manually insert the data in ways where
        // we aren't expecting you to - like switching the column type to a text &
        // trying to push a value into it that is an object.
        await insert(1, "[object Object]");
        const repo = connection.getRepository(Post_1.Post);
        const getJson = async (id) => (await repo.findOne({ where: { id } })).jsonField;
        await (0, chai_1.expect)(getJson(1)).to.be.rejected;
    })));
});
//# sourceMappingURL=issue-5501.js.map