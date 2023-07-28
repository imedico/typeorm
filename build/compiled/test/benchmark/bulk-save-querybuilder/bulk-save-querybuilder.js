"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Document_1 = require("../bulk-save-case2/entity/Document");
describe("benchmark > bulk-save > case-querybuilder", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        __dirname,
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("testing bulk save of 10000 objects", () => Promise.all(connections.map(async (connection) => {
        const documents = [];
        for (let i = 0; i < 10000; i++) {
            const document = new Document_1.Document();
            document.id = i.toString();
            document.docId = "label/" + i;
            document.context =
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent vel faucibus nunc. Etiam volutpat vel urna in scelerisque. Cras a erat ipsum. ";
            document.label = "label/" + i;
            document.date = new Date();
            documents.push(document);
        }
        await connection
            .createQueryRunner()
            .query(`CREATE TABLE "document" ("id" text NOT NULL, "docId" text NOT NULL, "label" text NOT NULL, "context" text NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777" PRIMARY KEY ("id"))`);
        await connection.manager
            .createQueryBuilder()
            .insert()
            .into("document", [
            "id",
            "docId",
            "label",
            "context",
            "date",
        ])
            .values(documents)
            .execute();
    })));
});
//# sourceMappingURL=bulk-save-querybuilder.js.map