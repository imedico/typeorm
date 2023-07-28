"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.amendFoo1675779246631 = void 0;
const src_1 = require("../../../../src");
class amendFoo1675779246631 {
    async up(q) {
        await q.addColumn("foo", new src_1.TableColumn({
            name: "comment",
            type: "varchar",
            isNullable: true,
            default: null,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropColumn("foo", "comment");
    }
}
exports.amendFoo1675779246631 = amendFoo1675779246631;
//# sourceMappingURL=1675779246631-amendFoo.js.map