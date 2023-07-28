"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_utils_1 = require("../../utils/test-utils");
const Author_1 = require("./entity/Author");
const Book_1 = require("./entity/Book");
const chai_1 = require("chai");
describe("github issues > #4980 (Postgres) onUpdate: 'CASCADE' doesn't work on many-to-many relation", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        enabledDrivers: ["postgres"],
        entities: [Author_1.Author, Book_1.Book],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should generate onDelete: CASCADE and onUpdate: CASCADE for 'books' side of many-to-many relation", () => Promise.all(connections.map(async (connection) => {
        const booksRelation = connection
            .getMetadata(Author_1.Author)
            .manyToManyRelations.find((mtm) => mtm.propertyName === "books");
        (0, chai_1.expect)(booksRelation).not.to.be.undefined;
        (0, chai_1.expect)(booksRelation.onDelete).to.be.equal("CASCADE");
        (0, chai_1.expect)(booksRelation.onUpdate).to.be.equal("CASCADE");
    })));
    it("should generate onDelete: NO ACTION and onUpdate: CASCADE for 'authors' side of many-to-many relation", () => Promise.all(connections.map(async (connection) => {
        const authorsRelation = connection
            .getMetadata(Book_1.Book)
            .manyToManyRelations.find((mtm) => mtm.propertyName === "authors");
        (0, chai_1.expect)(authorsRelation).not.to.be.undefined;
        (0, chai_1.expect)(authorsRelation.onDelete).to.be.equal("NO ACTION");
        (0, chai_1.expect)(authorsRelation.onUpdate).to.be.equal("CASCADE");
    })));
    it("should generate onDelete: NO ACTION and onUpdate: CASCADE for foreign key pointing to Book", () => Promise.all(connections.map(async (connection) => {
        const booksRelation = connection
            .getMetadata(Author_1.Author)
            .manyToManyRelations.find((mtm) => mtm.propertyName === "books");
        const booksFk = booksRelation.foreignKeys.find((fk) => fk.referencedTablePath === "book");
        (0, chai_1.expect)(booksFk).not.to.be.undefined;
        (0, chai_1.expect)(booksFk.onDelete).to.be.equal("NO ACTION");
        // Oracle does not support ON UPDATE clause
        if (connection.driver.options.type === "oracle") {
            (0, chai_1.expect)(booksFk.onUpdate).to.be.equal("NO ACTION");
        }
        else {
            (0, chai_1.expect)(booksFk.onUpdate).to.be.equal("CASCADE");
        }
    })));
    it("should generate onDelete: CASCADE and onUpdate: CASCADE for foreign key pointing to Author", () => Promise.all(connections.map(async (connection) => {
        // take books relation bc foreign keys are on owning side
        const booksRelation = connection
            .getMetadata(Author_1.Author)
            .manyToManyRelations.find((mtm) => mtm.propertyName === "books");
        const authorsFk = booksRelation.foreignKeys.find((fk) => fk.referencedTablePath === "author");
        (0, chai_1.expect)(authorsFk).not.to.be.undefined;
        (0, chai_1.expect)(authorsFk.onDelete).to.be.equal("CASCADE");
        // Oracle does not support ON UPDATE clause
        if (connection.driver.options.type === "oracle") {
            (0, chai_1.expect)(authorsFk.onUpdate).to.be.equal("NO ACTION");
        }
        else {
            (0, chai_1.expect)(authorsFk.onUpdate).to.be.equal("CASCADE");
        }
    })));
});
//# sourceMappingURL=issue-4980.js.map