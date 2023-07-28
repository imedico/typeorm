"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const memory_logger_1 = require("./memory-logger");
describe("github issues > #7662 postgres extensions installation should be optional", function () {
    it("should NOT install extensions if option is disabled", async function () {
        let connection = null;
        try {
            const connections = await (0, test_utils_1.createTestingConnections)({
                entities: [`${__dirname}/entity/*{.js,.ts}`],
                enabledDrivers: ["postgres"],
                schemaCreate: false,
                dropSchema: true,
                createLogger: () => new memory_logger_1.MemoryLogger(true),
                driverSpecific: {
                    installExtensions: false,
                },
            });
            if (connections.length < 1) {
                this.skip();
                return;
            }
            connection = connections[0];
            const logger = connection.logger;
            const createExtensionQueries = logger.queries.filter((q) => q.startsWith("CREATE EXTENSION IF NOT EXISTS"));
            (0, chai_1.expect)(createExtensionQueries).to.be.empty;
        }
        finally {
            if (connection) {
                const logger = connection.logger;
                logger.clear();
                await (0, test_utils_1.closeTestingConnections)([connection]);
            }
        }
    });
    it("should install extensions if option is undefined", async function () {
        let connections = [];
        try {
            connections = await (0, test_utils_1.createTestingConnections)({
                entities: [`${__dirname}/entity/*{.js,.ts}`],
                enabledDrivers: ["postgres"],
                schemaCreate: false,
                dropSchema: true,
                createLogger: () => new memory_logger_1.MemoryLogger(true),
            });
            if (connections.length < 1) {
                this.skip();
                return;
            }
            const connection = connections[0];
            const logger = connection.logger;
            const createExtensionQueries = logger.queries.filter((q) => q.startsWith("CREATE EXTENSION IF NOT EXISTS"));
            (0, chai_1.expect)(createExtensionQueries).to.have.length(1);
        }
        finally {
            await (0, test_utils_1.closeTestingConnections)(connections);
        }
    });
    it("should install extensions if option is enabled", async function () {
        let connections = [];
        try {
            connections = await (0, test_utils_1.createTestingConnections)({
                entities: [`${__dirname}/entity/*{.js,.ts}`],
                enabledDrivers: ["postgres"],
                schemaCreate: false,
                dropSchema: true,
                createLogger: () => new memory_logger_1.MemoryLogger(true),
                driverSpecific: {
                    installExtensions: true,
                },
            });
            if (connections.length < 1) {
                this.skip();
            }
            const connection = connections[0];
            const logger = connection.logger;
            const createExtensionQueries = logger.queries.filter((q) => q.startsWith("CREATE EXTENSION IF NOT EXISTS"));
            (0, chai_1.expect)(createExtensionQueries).to.have.length(1);
        }
        finally {
            await (0, test_utils_1.closeTestingConnections)(connections);
        }
    });
});
//# sourceMappingURL=issue-7662.js.map