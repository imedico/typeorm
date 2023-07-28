"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePostTable1656926770819 = void 0;
const src_1 = require("../../../../src");
class CreatePostTable1656926770819 {
    async up(queryRunner) {
        await queryRunner.createTable(new src_1.Table({
            name: "post",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "title",
                    type: "varchar",
                },
                {
                    name: "text",
                    type: "varchar",
                },
            ],
        }), true, true, true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable("post");
    }
}
exports.CreatePostTable1656926770819 = CreatePostTable1656926770819;
//# sourceMappingURL=1656926770819-CreatePostTable.js.map