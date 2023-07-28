"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithoutView1623518107000 = void 0;
class WithoutView1623518107000 {
    constructor() {
        this.name = "WithoutView1623518107000";
    }
    async up(queryRunner) {
        await queryRunner.query("CREATE TABLE `foo` (`id` int NOT NULL AUTO_INCREMENT, `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }
    async down(queryRunner) {
        await queryRunner.query("DROP Table `foo`");
    }
}
exports.WithoutView1623518107000 = WithoutView1623518107000;
//# sourceMappingURL=WithoutView.js.map