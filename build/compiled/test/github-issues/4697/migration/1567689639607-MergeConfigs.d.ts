import { MigrationInterface, QueryRunner } from "../../../../src";
export declare class MergeConfigs1567689639607 implements MigrationInterface {
    up({ connection }: QueryRunner): Promise<any>;
    down({ connection }: QueryRunner): Promise<any>;
}
