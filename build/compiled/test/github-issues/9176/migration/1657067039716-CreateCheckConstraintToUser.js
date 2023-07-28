"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCheckConstraintToUser1657067039716 = void 0;
const src_1 = require("../../../../src");
class CreateCheckConstraintToUser1657067039716 {
    async up(queryRunner) {
        await queryRunner.createCheckConstraint("checked_user", new src_1.TableCheck({
            expression: `"age" > 18`,
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropCheckConstraint("checked_user", new src_1.TableCheck({
            expression: `"age" > 18`,
        }));
    }
}
exports.CreateCheckConstraintToUser1657067039716 = CreateCheckConstraintToUser1657067039716;
//# sourceMappingURL=1657067039716-CreateCheckConstraintToUser.js.map