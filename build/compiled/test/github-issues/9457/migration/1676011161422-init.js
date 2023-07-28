"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init1676011161422 = void 0;
class init1676011161422 {
    constructor() {
        this.name = "init1676011161422";
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "example_entity"
             (
                 "id"         int NOT NULL IDENTITY(1,1),
                 "enumcolumn" nvarchar(255) CONSTRAINT CHK_a80c9d6a2a8749d7aadb857dc6_ENUM CHECK (enumcolumn IN ('enumvalue1','enumvalue2','enumvalue3')) NOT NULL,
                 CONSTRAINT "PK_fccd73330168066a434dbac114f" PRIMARY KEY ("id")
             )`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "example_entity"`);
    }
}
exports.init1676011161422 = init1676011161422;
//# sourceMappingURL=1676011161422-init.js.map