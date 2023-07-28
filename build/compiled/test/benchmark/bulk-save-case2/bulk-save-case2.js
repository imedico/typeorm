"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Document_1 = require("./entity/Document");
describe("benchmark > bulk-save > case2", () => {
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
            document.distributions = [
                {
                    weight: "0.9",
                    id: i,
                    docId: i,
                },
                {
                    weight: "0.23123",
                    id: i,
                    docId: i,
                },
                {
                    weight: "0.12312",
                    id: i,
                    docId: i,
                },
            ];
            document.date = new Date();
            documents.push(document);
            // await connection.manager.save(document);
            // await connection.manager.insert(Document, document);
        }
        await connection.manager.save(documents);
        // await connection.manager.insert(Document, documents);
    })));
});
//# sourceMappingURL=bulk-save-case2.js.map