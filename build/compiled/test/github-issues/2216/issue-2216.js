"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sinon_1 = tslib_1.__importDefault(require("sinon"));
const test_utils_1 = require("../../utils/test-utils");
const src_1 = require("../../../src");
const Foo_1 = require("./entity/Foo");
const chai_1 = require("chai");
describe("github issues > #2216 - Ability to capture Postgres notifications in logger", () => {
    let connections;
    let queryRunner;
    let manager;
    let logInfoStub;
    before(() => {
        logInfoStub = sinon_1.default.stub(src_1.SimpleConsoleLogger.prototype, "log");
    });
    beforeEach(async () => {
        await (0, test_utils_1.reloadTestingDatabases)(connections);
    });
    afterEach(() => logInfoStub.resetHistory());
    after(() => logInfoStub.restore());
    describe("when logNotifications option is NOT enabled", () => {
        before(async () => {
            connections = await (0, test_utils_1.createTestingConnections)({
                enabledDrivers: ["postgres"],
                entities: [Foo_1.Foo],
                createLogger: () => new src_1.SimpleConsoleLogger(),
            });
        });
        after(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("should NOT pass extension setup notices to client", async () => Promise.all(connections.map(async (connection) => {
            sinon_1.default.assert.neverCalledWith(logInfoStub, "info", `extension "uuid-ossp" already exists, skipping`);
            sinon_1.default.assert.neverCalledWith(logInfoStub, "info", `extension "citext" already exists, skipping`);
        })));
        it("should NOT pass manual notices to client", async () => Promise.all(connections.map(async (connection) => {
            queryRunner = connection.createQueryRunner();
            await queryRunner.query(`DO $do$ BEGIN RAISE NOTICE 'this is a notice'; END $do$`);
            sinon_1.default.assert.neverCalledWith(logInfoStub, "info", "this is a notice");
            await queryRunner.release();
        })));
        it("should NOT pass 'listen -> notify' messages to client", async () => Promise.all(connections.map(async (connection) => {
            queryRunner = connection.createQueryRunner();
            await queryRunner.query("LISTEN foo;");
            await queryRunner.query("NOTIFY foo, 'bar!'");
            sinon_1.default.assert.neverCalledWith(logInfoStub, "info", "Received NOTIFY on channel foo: bar!.");
            await queryRunner.release();
        })));
    });
    describe("when logNotifications option is enabled", () => {
        before(async () => {
            connections = await (0, test_utils_1.createTestingConnections)({
                enabledDrivers: ["postgres"],
                entities: [Foo_1.Foo],
                createLogger: () => new src_1.SimpleConsoleLogger(),
                driverSpecific: { logNotifications: true },
            });
        });
        after(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("should pass extension setup notices to client", async () => Promise.all(connections.map(async (connection) => {
            sinon_1.default.assert.calledWith(logInfoStub, "info", `extension "uuid-ossp" already exists, skipping`);
            sinon_1.default.assert.calledWith(logInfoStub, "info", `extension "citext" already exists, skipping`);
        })));
        it("should pass manual notices to client", async () => Promise.all(connections.map(async (connection) => {
            queryRunner = connection.createQueryRunner();
            await queryRunner.query(`DO $do$ BEGIN RAISE NOTICE 'this is a notice'; END $do$`);
            sinon_1.default.assert.calledWith(logInfoStub, "info", "this is a notice");
            await queryRunner.release();
        })));
        it("should pass 'listen -> notify' messages to client", async () => Promise.all(connections.map(async (connection) => {
            queryRunner = connection.createQueryRunner();
            await queryRunner.query("LISTEN foo;");
            await queryRunner.query("NOTIFY foo, 'bar!'");
            sinon_1.default.assert.calledWith(logInfoStub, "info", "Received NOTIFY on channel foo: bar!.");
            await queryRunner.release();
        })));
        it("should not interfere with actual queries", async () => Promise.all(connections.map(async (connection) => {
            manager = connection.manager;
            const foo = new Foo_1.Foo();
            await manager.save(Object.assign(foo, {
                lowercaseval: "foo",
                lowercaseval2: "bar",
            }));
            const loadedFoo = await manager.findOneBy(Foo_1.Foo, {
                uuid: foo.uuid,
            });
            (0, chai_1.expect)(loadedFoo).not.to.be.null;
            (0, chai_1.expect)(loadedFoo).to.contain({
                lowercaseval: "foo",
                lowercaseval2: "bar",
            });
        })));
    });
});
//# sourceMappingURL=issue-2216.js.map