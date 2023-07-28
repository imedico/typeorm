"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAuthorTable1656939116999 = void 0;
const src_1 = require("../../../../src");
class CreateAuthorTable1656939116999 {
    async up(queryRunner) {
        await queryRunner.createTable(new src_1.Table({
            name: "author",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "name",
                    type: "varchar",
                },
            ],
        }), true, true, true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable("author");
    }
}
exports.CreateAuthorTable1656939116999 = CreateAuthorTable1656939116999;
//# sourceMappingURL=1656939116999-CreateAuthorTable.js.map