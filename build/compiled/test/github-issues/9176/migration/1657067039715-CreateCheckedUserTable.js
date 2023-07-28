"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCheckedUserTable1657067039715 = void 0;
const src_1 = require("../../../../src");
class CreateCheckedUserTable1657067039715 {
    async up(queryRunner) {
        await queryRunner.createTable(new src_1.Table({
            name: "checked_user",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "age",
                    type: "integer",
                },
            ],
        }), true, true, true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable("checked_user");
    }
}
exports.CreateCheckedUserTable1657067039715 = CreateCheckedUserTable1657067039715;
//# sourceMappingURL=1657067039715-CreateCheckedUserTable.js.map