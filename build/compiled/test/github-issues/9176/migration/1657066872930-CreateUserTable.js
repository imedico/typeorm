"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUserTable1657066872930 = void 0;
const src_1 = require("../../../../src");
class CreateUserTable1657066872930 {
    async up(queryRunner) {
        await queryRunner.createTable(new src_1.Table({
            name: "user",
            columns: [
                {
                    name: "id",
                    type: "integer",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "firstName",
                    type: "varchar",
                },
                {
                    name: "lastName",
                    type: "varchar",
                },
                {
                    name: "middleName",
                    type: "varchar",
                },
            ],
        }), true, true, true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable("user");
    }
}
exports.CreateUserTable1657066872930 = CreateUserTable1657066872930;
//# sourceMappingURL=1657066872930-CreateUserTable.js.map