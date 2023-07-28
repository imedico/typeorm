import { MigrationInterface, QueryRunner } from "../../../../src";
export declare class MigrationToFakeRun implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
