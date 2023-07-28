"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirstReleaseMigration1481283582 = void 0;
class FirstReleaseMigration1481283582 {
    async up(queryRunner) {
        await queryRunner.renameColumn("post", "title", "name");
        // alternatively you can do:
        // await queryRunner.query("ALTER TABLE `post` CHANGE `title` `name` VARCHAR(255)");
    }
    async down(queryRunner) {
        await queryRunner.renameColumn("post", "name", "title");
        // alternatively you can do:
        // await queryRunner.query("ALTER TABLE `post` CHANGE `name` `title` VARCHAR(255)");
    }
}
exports.FirstReleaseMigration1481283582 = FirstReleaseMigration1481283582;
//# sourceMappingURL=1481283582-first-release-changes.js.map