"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../../utils/test-utils");
const Author_1 = require("./entity/Author");
const Employee_1 = require("./entity/Employee");
const PostItNote_1 = require("./entity/PostItNote");
const StickyNote_1 = require("./entity/StickyNote");
describe("table-inheritance > single-table > no-type-column", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should return subclass in relations", () => Promise.all(connections.map(async (connection) => {
        const postItRepo = connection.getRepository(PostItNote_1.PostItNote);
        const stickyRepo = connection.getRepository(StickyNote_1.StickyNote);
        // -------------------------------------------------------------------------
        // Create
        // -------------------------------------------------------------------------
        const employee = new Employee_1.Employee();
        employee.name = "alicefoo";
        employee.employeeName = "Alice Foo";
        await connection.getRepository(Employee_1.Employee).save(employee);
        const author = new Author_1.Author();
        author.name = "bobbar";
        author.authorName = "Bob Bar";
        await connection.getRepository(Author_1.Author).save(author);
        await postItRepo.insert({
            postItNoteLabel: "A post-it note",
            owner: employee,
        });
        await stickyRepo.insert({
            stickyNoteLabel: "A sticky note",
            owner: author,
        });
        // -------------------------------------------------------------------------
        // Select
        // -------------------------------------------------------------------------
        const [postIt] = await postItRepo.find({
            relations: { owner: true },
        });
        postIt.owner.should.be.an.instanceOf(Employee_1.Employee);
        postIt.owner.name.should.be.equal("alicefoo");
        postIt.owner.employeeName.should.be.equal("Alice Foo");
        const [sticky] = await stickyRepo.find({
            relations: { owner: true },
        });
        sticky.owner.should.be.an.instanceOf(Author_1.Author);
        sticky.owner.name.should.be.equal("bobbar");
        sticky.owner.authorName.should.be.equal("Bob Bar");
    })));
});
//# sourceMappingURL=no-type-column.js.map