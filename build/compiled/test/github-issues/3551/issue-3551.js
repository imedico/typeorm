"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Book_1 = require("./entity/Book");
describe("github issues > #3551 array of embedded documents through multiple levels are not handled", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: ["mongodb"],
            dropSchema: true,
        });
    });
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should return entity with all these embedded documents", () => Promise.all(connections.map(async (connection) => {
        const bookInput = {
            title: "Book 1",
            chapters: [
                {
                    title: "Chapter 1",
                    pages: [
                        {
                            number: 1,
                        },
                        {
                            number: 2,
                        },
                    ],
                },
                {
                    title: "Chapter 2",
                    pages: [
                        {
                            number: 3,
                        },
                        {
                            number: 4,
                        },
                    ],
                },
            ],
        };
        await connection.mongoManager
            .getMongoRepository(Book_1.Book)
            .insert(bookInput);
        const books = await connection.mongoManager
            .getMongoRepository(Book_1.Book)
            .find();
        const book = books[0];
        book.title.should.be.equal(bookInput.title);
        book.chapters.should.be.lengthOf(2);
        book.chapters[0].title.should.be.equal(bookInput.chapters[0].title);
        book.chapters[0].pages.should.have.lengthOf(2);
        book.chapters[0].pages[0].number.should.be.equal(bookInput.chapters[0].pages[0].number);
        book.chapters[0].pages[1].number.should.be.equal(bookInput.chapters[0].pages[1].number);
        book.chapters[1].pages.should.have.lengthOf(2);
        book.chapters[1].pages[0].number.should.be.equal(bookInput.chapters[1].pages[0].number);
        book.chapters[1].pages[1].number.should.be.equal(bookInput.chapters[1].pages[1].number);
    })));
});
//# sourceMappingURL=issue-3551.js.map