"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateIndex0000000000003 = void 0;
class CreateIndex0000000000003 {
    constructor() {
        this.transaction = false;
    }
    up(queryRunner) {
        return queryRunner.query("CREATE INDEX CONCURRENTLY user_ids_idx ON users(id)");
    }
    down(queryRunner) {
        return Promise.resolve();
    }
}
exports.CreateIndex0000000000003 = CreateIndex0000000000003;
//# sourceMappingURL=0000000000003-CreateIndex.js.map