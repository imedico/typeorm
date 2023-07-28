"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithView1623518107000 = void 0;
class WithView1623518107000 {
    constructor() {
        this.name = "WithView1623518107000";
    }
    async up(queryRunner) {
        await queryRunner.query("CREATE TABLE `foo` (`id` int NOT NULL AUTO_INCREMENT, `updated_at` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE VIEW `foo_view` AS  SELECT updated_at FROM `foo`");
        await queryRunner.query("INSERT INTO `typeorm_metadata`(`type`, `schema`, `name`, `value`) VALUES (?, ?, ?, ?)", ["VIEW", null, "foo_view", "SELECT `updated_at` FROM `foo`"]);
    }
    async down(queryRunner) {
        await queryRunner.query("DELETE FROM `typeorm_metadata` WHERE `type` = 'VIEW' AND `schema` = ? AND `name` = ?", [null, "foo_view"]);
        await queryRunner.query("DROP VIEW `foo_view`");
        await queryRunner.query("DROP Table `foo`");
    }
}
exports.WithView1623518107000 = WithView1623518107000;
//# sourceMappingURL=WithView.js.map