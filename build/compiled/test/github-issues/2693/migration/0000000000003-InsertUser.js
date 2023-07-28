"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertUser0000000000003 = void 0;
const user_1 = require("../entity/user");
class InsertUser0000000000003 {
    up(queryRunner) {
        const userRepo = queryRunner.connection.getRepository(user_1.User);
        return userRepo.save(new user_1.User());
    }
    down(queryRunner) {
        return Promise.resolve();
    }
}
exports.InsertUser0000000000003 = InsertUser0000000000003;
//# sourceMappingURL=0000000000003-InsertUser.js.map