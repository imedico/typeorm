import { MigrationInterface, QueryRunner } from "../../../../src";
export declare class WithoutView1623518107000 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
