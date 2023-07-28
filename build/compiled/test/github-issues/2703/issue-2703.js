"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const Dummy_1 = require("./entity/Dummy");
const wrapped_string_1 = require("./wrapped-string");
const memory_logger_1 = require("./memory-logger");
describe("github issues > #2703 Column with transformer is not normalized for update", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [`${__dirname}/entity/*{.js,.ts}`],
        schemaCreate: true,
        dropSchema: true,
        createLogger: () => new memory_logger_1.MemoryLogger(false),
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    afterEach(() => connections.forEach((connection) => {
        const logger = connection.logger;
        logger.enabled = false;
        logger.clear();
    }));
    it("should transform values when computing changed columns", () => Promise.all(connections.map(async (connection) => {
        const repository = connection.getRepository(Dummy_1.Dummy);
        const dummy = repository.create({
            value: new wrapped_string_1.WrappedString("test"),
        });
        await repository.save(dummy);
        const logger = connection.logger;
        logger.enabled = true;
        await repository.save(dummy);
        const updateQueries = logger.queries.filter((q) => q.startsWith("UPDATE"));
        (0, chai_1.expect)(updateQueries).to.be.empty;
    })));
});
//# sourceMappingURL=issue-2703.js.map