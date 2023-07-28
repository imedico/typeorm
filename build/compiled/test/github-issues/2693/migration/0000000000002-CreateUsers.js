"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsers0000000000002 = void 0;
const Table_1 = require("../../../../src/schema-builder/table/Table");
class CreateUsers0000000000002 {
    up(queryRunner) {
        return queryRunner.createTable(new Table_1.Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    default: "uuid_generate_v4()",
                },
            ],
        }));
    }
    down(queryRunner) {
        return queryRunner.dropTable("users");
    }
}
exports.CreateUsers0000000000002 = CreateUsers0000000000002;
//# sourceMappingURL=0000000000002-CreateUsers.js.map