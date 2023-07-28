"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitUsers1530542855524 = void 0;
class InitUsers1530542855524 {
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE SEQUENCE users_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1
        `);
        await queryRunner.query(`
            DROP SEQUENCE IF EXISTS users_id_seq
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`
            DROP SEQUENCE IF EXISTS users_id_seq
        `);
    }
}
exports.InitUsers1530542855524 = InitUsers1530542855524;
//# sourceMappingURL=1530542855524-CreateUsersSeq.js.map