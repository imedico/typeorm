"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const sinon_1 = tslib_1.__importDefault(require("sinon"));
const src_1 = require("../../../src");
const test_utils_1 = require("../../utils/test-utils");
const CommandUtils_1 = require("../../../src/commands/CommandUtils");
const MigrationGenerateCommand_1 = require("../../../src/commands/MigrationGenerateCommand");
const Post_1 = require("./entity/Post");
const result_templates_generate_1 = require("./templates/result-templates-generate");
// TODO: broken after 0.3.0 changes, fix later
describe.skip("commands - migration generate", () => {
    let connectionOptions;
    let createFileStub;
    let timerStub;
    let getConnectionOptionsStub;
    let migrationGenerateCommand;
    let connectionOptionsReader;
    let baseConnectionOptions;
    const enabledDrivers = ["mysql"];
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
            entities: [Post_1.Post],
            enabledDrivers,
        });
        connectionOptionsReader = new src_1.ConnectionOptionsReader();
        migrationGenerateCommand = new MigrationGenerateCommand_1.MigrationGenerateCommand();
        createFileStub = sinon_1.default.stub(CommandUtils_1.CommandUtils, "createFile");
        timerStub = sinon_1.default.useFakeTimers(1610975184784);
    });
    after(async () => {
        timerStub.restore();
        createFileStub.restore();
    });
    it("writes regular migration file when no option is passed", async () => {
        for (const connectionOption of connectionOptions) {
            createFileStub.resetHistory();
            baseConnectionOptions = await connectionOptionsReader.get(connectionOption.name);
            getConnectionOptionsStub = sinon_1.default
                .stub(src_1.ConnectionOptionsReader.prototype, "get")
                .resolves({
                ...baseConnectionOptions,
                entities: [Post_1.Post],
            });
            await migrationGenerateCommand.handler(testHandlerArgs({
                connection: connectionOption.name,
            }));
            // compare against control test strings in results-templates.ts
            sinon_1.default.assert.calledWith(createFileStub, sinon_1.default.match(/test-directory.*test-migration.ts/), sinon_1.default.match(result_templates_generate_1.resultsTemplates.control));
            getConnectionOptionsStub.restore();
        }
    });
    it("writes Javascript printed file when option is passed", async () => {
        for (const connectionOption of connectionOptions) {
            createFileStub.resetHistory();
            baseConnectionOptions = await connectionOptionsReader.get(connectionOption.name);
            getConnectionOptionsStub = sinon_1.default
                .stub(src_1.ConnectionOptionsReader.prototype, "get")
                .resolves({
                ...baseConnectionOptions,
                entities: [Post_1.Post],
            });
            await migrationGenerateCommand.handler(testHandlerArgs({
                connection: connectionOption.name,
                outputJs: true,
            }));
            // compare against "pretty" test strings in results-templates.ts
            sinon_1.default.assert.calledWith(createFileStub, sinon_1.default.match(/test-directory.*test-migration.js/), sinon_1.default.match(result_templates_generate_1.resultsTemplates.javascript));
            getConnectionOptionsStub.restore();
        }
    });
    it("writes migration file with custom timestamp when option is passed", async () => {
        for (const connectionOption of connectionOptions) {
            createFileStub.resetHistory();
            baseConnectionOptions = await connectionOptionsReader.get(connectionOption.name);
            getConnectionOptionsStub = sinon_1.default
                .stub(src_1.ConnectionOptionsReader.prototype, "get")
                .resolves({
                ...baseConnectionOptions,
                entities: [Post_1.Post],
            });
            await migrationGenerateCommand.handler(testHandlerArgs({
                connection: connectionOption.name,
                timestamp: "1641163894670",
            }));
            // compare against control test strings in results-templates.ts
            sinon_1.default.assert.calledWith(createFileStub, sinon_1.default.match("test-directory/1641163894670-test-migration.ts"), sinon_1.default.match(result_templates_generate_1.resultsTemplates.timestamp));
            getConnectionOptionsStub.restore();
        }
    });
});
//# sourceMappingURL=migration-generate.js.map