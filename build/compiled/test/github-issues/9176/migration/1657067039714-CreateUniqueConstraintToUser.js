"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUniqueConstraintToUser1657067039714 = void 0;
const src_1 = require("../../../../src");
class CreateUniqueConstraintToUser1657067039714 {
    async up(queryRunner) {
        await queryRunner.createUniqueConstraint("user", new src_1.TableUnique({
            columnNames: ["firstName", "lastName", "middleName"],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropUniqueConstraint("user", new src_1.TableUnique({
            columnNames: ["firstName", "lastName", "middleName"],
        }));
    }
}
exports.CreateUniqueConstraintToUser1657067039714 = CreateUniqueConstraintToUser1657067039714;
//# sourceMappingURL=1657067039714-CreateUniqueConstraintToUser.js.map