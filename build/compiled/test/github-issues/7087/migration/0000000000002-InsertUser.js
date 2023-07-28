"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertUser0000000000002 = void 0;
const user_1 = require("../entity/user");
class InsertUser0000000000002 {
    constructor() {
        this.transaction = true;
    }
    up(queryRunner) {
        const userRepo = queryRunner.connection.getRepository(user_1.User);
        return userRepo.save(new user_1.User());
    }
    down(queryRunner) {
        return Promise.resolve();
    }
}
exports.InsertUser0000000000002 = InsertUser0000000000002;
//# sourceMappingURL=0000000000002-InsertUser.js.map