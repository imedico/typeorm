"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../utils/test-utils");
const User_1 = require("./entity/User");
const Photo_1 = require("./entity/Photo");
const DriverUtils_1 = require("../../../../src/driver/DriverUtils");
describe("query builder > insert", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should perform insertion correctly", () => Promise.all(connections.map(async (connection) => {
        const user = new User_1.User();
        user.name = "Alex Messer";
        await connection
            .createQueryBuilder()
            .insert()
            .into(User_1.User)
            .values(user)
            .execute();
        await connection
            .createQueryBuilder()
            .insert()
            .into(User_1.User)
            .values({
            name: "Dima Zotov",
        })
            .execute();
        await connection
            .getRepository(User_1.User)
            .createQueryBuilder("user")
            .insert()
            .values({ name: "Muhammad Mirzoev" })
            .execute();
        const users = await connection.getRepository(User_1.User).find({
            order: {
                id: "ASC",
            },
        });
        users.should.be.eql([
            { id: 1, name: "Alex Messer" },
            { id: 2, name: "Dima Zotov" },
            { id: 3, name: "Muhammad Mirzoev" },
        ]);
    })));
    it("should perform bulk insertion correctly", () => Promise.all(connections.map(async (connection) => {
        // it is skipped for Oracle and SAP because it does not support bulk insertion
        if (connection.driver.options.type === "oracle" ||
            connection.driver.options.type === "sap")
            return;
        await connection
            .createQueryBuilder()
            .insert()
            .into(User_1.User)
            .values([
            { name: "Umed Khudoiberdiev" },
            { name: "Bakhrom Baubekov" },
            { name: "Bakhodur Kandikov" },
        ])
            .execute();
        const users = await connection.getRepository(User_1.User).find({
            order: {
                id: "ASC",
            },
        });
        users.should.be.eql([
            { id: 1, name: "Umed Khudoiberdiev" },
            { id: 2, name: "Bakhrom Baubekov" },
            { id: 3, name: "Bakhodur Kandikov" },
        ]);
    })));
    it("should be able to use sql functions", () => Promise.all(connections.map(async (connection) => {
        await connection
            .createQueryBuilder()
            .insert()
            .into(User_1.User)
            .values({
            name: () => connection.driver.options.type === "mssql"
                ? "SUBSTRING('Dima Zotov', 1, 4)"
                : "SUBSTR('Dima Zotov', 1, 4)",
        })
            .execute();
        const loadedUser1 = await connection
            .getRepository(User_1.User)
            .findOneBy({ name: "Dima" });
        (0, chai_1.expect)(loadedUser1).to.exist;
        loadedUser1.name.should.be.equal("Dima");
    })));
    it("should be able to insert entities with different properties set even inside embeds", () => Promise.all(connections.map(async (connection) => {
        // this test is skipped for sqlite based drivers because it does not support DEFAULT values in insertions,
        // also it is skipped for Oracle and SAP because it does not support bulk insertion
        if (DriverUtils_1.DriverUtils.isSQLiteFamily(connection.driver) ||
            connection.driver.options.type === "oracle" ||
            connection.driver.options.type === "sap")
            return;
        await connection
            .createQueryBuilder()
            .insert()
            .into(Photo_1.Photo)
            .values([
            {
                url: "1.jpg",
                counters: {
                    likes: 1,
                    favorites: 1,
                    comments: 1,
                },
            },
            {
                url: "2.jpg",
            },
        ])
            .execute();
        const loadedPhoto1 = await connection
            .getRepository(Photo_1.Photo)
            .findOneBy({ url: "1.jpg" });
        (0, chai_1.expect)(loadedPhoto1).to.exist;
        loadedPhoto1.should.be.eql({
            id: 1,
            url: "1.jpg",
            counters: {
                likes: 1,
                favorites: 1,
                comments: 1,
            },
        });
        const loadedPhoto2 = await connection
            .getRepository(Photo_1.Photo)
            .findOneBy({ url: "2.jpg" });
        (0, chai_1.expect)(loadedPhoto2).to.exist;
        loadedPhoto2.should.be.eql({
            id: 2,
            url: "2.jpg",
            counters: {
                likes: 1,
                favorites: null,
                comments: 0,
            },
        });
    })));
});
//# sourceMappingURL=query-builder-insert.js.map