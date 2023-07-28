"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUuidExtension0000000000001 = void 0;
class CreateUuidExtension0000000000001 {
    up(queryRunner) {
        return queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    }
    down(queryRunner) {
        return queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }
}
exports.CreateUuidExtension0000000000001 = CreateUuidExtension0000000000001;
//# sourceMappingURL=0000000000001-CreateUuidExtension.js.map