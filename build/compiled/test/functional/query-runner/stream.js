"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const Book_1 = require("./entity/Book");
describe("query runner > stream", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [Book_1.Book],
            enabledDrivers: [
                "mysql",
                "cockroachdb",
                "postgres",
                "mssql",
                "oracle",
                "spanner",
            ],
        });
    });
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should stream data", () => Promise.all(connections.map(async (connection) => {
        await connection.manager.save(Book_1.Book, { ean: "a" });
        await connection.manager.save(Book_1.Book, { ean: "b" });
        await connection.manager.save(Book_1.Book, { ean: "c" });
        await connection.manager.save(Book_1.Book, { ean: "d" });
        const queryRunner = connection.createQueryRunner();
        const query = connection
            .createQueryBuilder(Book_1.Book, "book")
            .select()
            .orderBy("book.ean")
            .getQuery();
        const readStream = await queryRunner.stream(query);
        if (!(connection.driver.options.type === "spanner"))
            await new Promise((ok) => readStream.once("readable", ok));
        const data = [];
        readStream.on("data", (row) => data.push(row));
        await new Promise((ok) => readStream.once("end", ok));
        (0, chai_1.expect)(data).to.have.length(4);
        (0, chai_1.expect)(data[0]).to.be.eql({ book_ean: "a" });
        (0, chai_1.expect)(data[1]).to.be.eql({ book_ean: "b" });
        (0, chai_1.expect)(data[2]).to.be.eql({ book_ean: "c" });
        (0, chai_1.expect)(data[3]).to.be.eql({ book_ean: "d" });
        await queryRunner.release();
    })));
});
//# sourceMappingURL=stream.js.map