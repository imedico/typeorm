"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init1674040078325 = void 0;
class init1674040078325 {
    constructor() {
        this.name = "init1674040078325";
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "example_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "enumcolumn" varchar CHECK( "enumcolumn" IN ('enumvalue1','enumvalue2','enumvalue3') ) NOT NULL)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "example_entity"`);
    }
}
exports.init1674040078325 = init1674040078325;
//# sourceMappingURL=1674040078325-init.js.map