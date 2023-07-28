"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../utils/test-utils");
const Category_1 = require("./entity/Category");
const User_1 = require("./entity/User");
const Post_1 = require("./entity/Post");
describe("query builder > distinct on", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    async function prepareData(connection) {
        const users = [
            {
                name: "Dion",
            },
            {
                name: "Zelda",
            },
            {
                name: "Sarah",
            },
            {
                name: "Pablo",
            },
        ];
        await connection
            .createQueryBuilder()
            .insert()
            .into(User_1.User)
            .values(users)
            .execute();
        const categories = [
            {
                title: "Category One",
                author: "Dion",
            },
            {
                title: "Category Two",
                author: "Dion",
            },
            {
                title: "Category Three",
                author: "Zelda",
            },
            {
                title: "Category Four",
                author: "Zelda",
            },
            {
                title: "Category Five",
                author: "Dion",
            },
        ];
        await connection
            .createQueryBuilder()
            .insert()
            .into(Category_1.Category)
            .values(categories)
            .execute();
        const posts = [
            {
                title: "Post One",
                author: "Dion",
                moderator: "Dion",
            },
            {
                title: "Post Two",
                author: "Sarah",
                moderator: "Dion",
            },
            {
                title: "Post Three",
                author: "Zelda",
                moderator: "Dion",
            },
            {
                title: "Post Four",
                author: "Sarah",
                moderator: "Dion",
            },
            {
                title: "Post Five",
                author: "Pablo",
                moderator: "Sarah",
            },
        ];
        await connection
            .createQueryBuilder()
            .insert()
            .into(Post_1.Post)
            .values(posts)
            .execute();
    }
    it("should perform distinct on category authors", () => Promise.all(connections.map(async (connection) => {
        await prepareData(connection);
        const result = await connection.manager
            .createQueryBuilder(Category_1.Category, "category")
            .distinctOn(["category.author"])
            .getMany();
        (0, chai_1.expect)(result.map(({ author }) => author)).to.have.members([
            "Dion",
            "Zelda",
        ]);
    })));
    it("should perform distinct on post authors and moderators combination", () => Promise.all(connections.map(async (connection) => {
        await prepareData(connection);
        const result = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .distinctOn(["post.author", "post.moderator"])
            .getMany();
        (0, chai_1.expect)(result.map(({ moderator }) => moderator)).to.have.members(["Dion", "Sarah", "Dion", "Dion"]) &&
            (0, chai_1.expect)(result.map(({ author }) => author)).to.have.members([
                "Dion",
                "Pablo",
                "Sarah",
                "Zelda",
            ]);
    })));
    it("should perform distinct on post and category authors", () => Promise.all(connections.map(async (connection) => {
        await prepareData(connection);
        const result = await connection.manager
            .createQueryBuilder(Post_1.Post, "post")
            .leftJoinAndSelect(Category_1.Category, "category", "category.author = post.author")
            .distinctOn(["post.author", "category.author"])
            .getMany();
        (0, chai_1.expect)(result.map(({ author }) => author)).to.have.members([
            "Dion",
            "Pablo",
            "Sarah",
            "Zelda",
        ]);
    })));
});
//# sourceMappingURL=query-builder-distinct-on.js.map