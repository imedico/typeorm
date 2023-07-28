"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sinon_1 = tslib_1.__importDefault(require("sinon"));
const src_1 = require("../../../src");
const test_utils_1 = require("../../utils/test-utils");
const Username_1 = require("./entity/Username");
const CommandUtils_1 = require("../../../src/commands/CommandUtils");
const MigrationGenerateCommand_1 = require("../../../src/commands/MigrationGenerateCommand");
const Post_1 = require("./entity/Post");
const results_templates_1 = require("./results-templates");
// TODO: broken after 0.3.0 changes, fix later
describe.skip("github issues > #4415 allow beautify generated migrations", () => {
    let connectionOptions;
    let createFileStub;
    let getConnectionOptionsStub;
    let migrationGenerateCommand;
    let connectionOptionsReader;
    let baseConnectionOptions;
    const enabledDrivers = [
        "postgres",
        "mssql",
        "mysql",
        "mariadb",
        "sqlite",
        "better-sqlite3",
        "oracle",
        "cockroachdb",
    ];
    // simulate args: `npm run typeorm migration:run -- -n test-migration -d test-directory`
    const testHandlerArgs = (options) => ({
        $0: "test",
        _: ["test"],
        name: "test-migration",
        dir: "test-directory",
        ...options,
    });
    before(async () => {
        // clean out db from any prior tests in case previous state impacts the generated migrations
        const connections = await (0, test_utils_1.createTestingConnections)({
            entities: [],
            enabledDrivers,
        });
        await (0, test_utils_1.reloadTestingDatabases)(connections);
        await (0, test_utils_1.closeTestingConnections)(connections);
        connectionOptions = (0, test_utils_1.setupTestingConnections)({
            entities: [Username_1.Username, Post_1.Post],
            enabledDrivers,
        });
        connectionOptionsReader = new src_1.ConnectionOptionsReader();
        migrationGenerateCommand = new MigrationGenerateCommand_1.MigrationGenerateCommand();
        createFileStub = sinon_1.default.stub(CommandUtils_1.CommandUtils, "createFile");
    });
    after(() => createFileStub.restore());
    it("writes regular migration file when no option is passed", async () => {
        for (const connectionOption of connectionOptions) {
            createFileStub.resetHistory();
            baseConnectionOptions = await connectionOptionsReader.get(connectionOption.name);
            getConnectionOptionsStub = sinon_1.default
                .stub(src_1.ConnectionOptionsReader.prototype, "get")
                .resolves({
                ...baseConnectionOptions,
                entities: [Username_1.Username, Post_1.Post],
            });
            await migrationGenerateCommand.handler(testHandlerArgs({
                connection: connectionOption.name,
            }));
            // compare against control test strings in results-templates.ts
            for (const control of results_templates_1.resultsTemplates[connectionOption.type].control) {
                sinon_1.default.assert.calledWith(createFileStub, sinon_1.default.match(/test-directory.*test-migration.ts/), sinon_1.default.match(control));
            }
            getConnectionOptionsStub.restore();
        }
    });
    it("writes pretty printed file when pretty option is passed", async () => {
        for (const connectionOption of connectionOptions) {
            createFileStub.resetHistory();
            baseConnectionOptions = await connectionOptionsReader.get(connectionOption.name);
            getConnectionOptionsStub = sinon_1.default
                .stub(src_1.ConnectionOptionsReader.prototype, "get")
                .resolves({
                ...baseConnectionOptions,
                entities: [Username_1.Username, Post_1.Post],
            });
            await migrationGenerateCommand.handler(testHandlerArgs({
                connection: connectionOption.name,
                pretty: true,
            }));
            // compare against "pretty" test strings in results-templates.ts
            for (const pretty of results_templates_1.resultsTemplates[connectionOption.type].pretty) {
                sinon_1.default.assert.calledWith(createFileStub, sinon_1.default.match(/test-directory.*test-migration.ts/), sinon_1.default.match(pretty));
            }
            getConnectionOptionsStub.restore();
        }
    });
});
//# sourceMappingURL=issue-4415.js.map