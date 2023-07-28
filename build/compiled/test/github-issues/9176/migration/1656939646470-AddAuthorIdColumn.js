"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddAuthorIdColumn1656939646470 = void 0;
const src_1 = require("../../../../src");
class AddAuthorIdColumn1656939646470 {
    async up(queryRunner) {
        await queryRunner.addColumn("post", new src_1.TableColumn({
            name: "authorId",
            type: "integer",
        }));
        await queryRunner.createForeignKey("post", new src_1.TableForeignKey({
            columnNames: ["authorId"],
            referencedTableName: "author",
            referencedColumnNames: ["id"],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropForeignKey("post", new src_1.TableForeignKey({
            columnNames: ["authorId"],
            referencedTableName: "author",
            referencedColumnNames: ["id"],
        }));
        await queryRunner.dropColumn("post", "authorId");
    }
}
exports.AddAuthorIdColumn1656939646470 = AddAuthorIdColumn1656939646470;
//# sourceMappingURL=1656939646470-AddAuthorIdColumn.js.map