"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const src_1 = require("../../../src");
const assert_1 = require("assert");
describe("github issues > #6442 JoinTable does not respect inverseJoinColumns referenced column width", () => {
    let connections;
    before(async () => {
        return (connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/v1/*{.js,.ts}"],
            schemaCreate: true,
            dropSchema: true,
            enabledDrivers: ["mysql"],
        }));
    });
    beforeEach(async () => await (0, test_utils_1.reloadTestingDatabases)(connections));
    after(async () => await (0, test_utils_1.closeTestingConnections)(connections));
    it("should generate column widths equal to the referenced column widths", async () => {
        await Promise.all(connections.map(async (connection) => {
            const options = (0, test_utils_1.setupSingleTestingConnection)(connection.options.type, {
                name: `${connection.name}-v2`,
                entities: [__dirname + "/entity/v2/*{.js,.ts}"],
                dropSchema: false,
                schemaCreate: false,
            });
            if (!options) {
                await connection.close();
                (0, assert_1.fail)();
            }
            const migrationDataSource = new src_1.DataSource(options);
            await migrationDataSource.initialize();
            try {
                const sqlInMemory = await migrationDataSource.driver
                    .createSchemaBuilder()
                    .log();
                const upQueries = sqlInMemory.upQueries.map((query) => query.query);
                upQueries.should.eql([
                    "CREATE TABLE `foo_bars` (`foo_id` int(10) UNSIGNED NOT NULL, `bar_id` int(10) UNSIGNED NOT NULL, INDEX `IDX_319290776f044043e3ef3ba5a8` (`foo_id`), INDEX `IDX_b7fd4be386fa7cdb87ef8b12b6` (`bar_id`), PRIMARY KEY (`foo_id`, `bar_id`)) ENGINE=InnoDB",
                    "ALTER TABLE `foo_bars` ADD CONSTRAINT `FK_319290776f044043e3ef3ba5a8d` FOREIGN KEY (`foo_id`) REFERENCES `foo_entity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE",
                    "ALTER TABLE `foo_bars` ADD CONSTRAINT `FK_b7fd4be386fa7cdb87ef8b12b69` FOREIGN KEY (`bar_id`) REFERENCES `bar_entity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE",
                ]);
            }
            finally {
                await connection.close();
                await migrationDataSource.close();
            }
        }));
    });
});
//# sourceMappingURL=issue-6442.js.map