"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecondReleaseMigration1481521933 = void 0;
class SecondReleaseMigration1481521933 {
    async up(queryRunner) {
        await queryRunner.query("ALTER TABLE `post` CHANGE `name` `title` VARCHAR(500)");
    }
    async down(queryRunner) {
        await queryRunner.query("ALTER TABLE `post` CHANGE `title` `name` VARCHAR(255)");
    }
}
exports.SecondReleaseMigration1481521933 = SecondReleaseMigration1481521933;
//# sourceMappingURL=1481521933-second-release-changes.js.map