"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MigrationToFakeRun = void 0;
const src_1 = require("../../../../src");
const issue_6195_1 = require("../issue-6195");
class MigrationToFakeRun {
    constructor() {
        this.name = "MigrationToFakeRun" + Date.now();
    }
    async up(queryRunner) {
        await queryRunner.addColumn(issue_6195_1.testTableName, new src_1.TableColumn({
            name: issue_6195_1.testColumnName,
            type: "varchar",
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn(issue_6195_1.testTableName, issue_6195_1.nonExistentColumnName);
    }
}
exports.MigrationToFakeRun = MigrationToFakeRun;
//# sourceMappingURL=MigrationToFakeRun.js.map