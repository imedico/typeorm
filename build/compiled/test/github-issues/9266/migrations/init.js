"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDatabase = void 0;
class CreateDatabase {
    constructor() {
        this.name = "CreateDatabase1623518107000";
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "author" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "post" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "text" varchar NOT NULL, "authorId" integer NOT NULL REFERENCES author(id) ON DELETE CASCADE ON UPDATE NO ACTION)`);
    }
    async down(queryRunner) { }
}
exports.CreateDatabase = CreateDatabase;
//# sourceMappingURL=init.js.map