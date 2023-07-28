import { MigrationInterface, QueryRunner } from "../../../../src";
export declare class UpdateContacts1566560354098 implements MigrationInterface {
    up({ connection }: QueryRunner): Promise<any>;
    down({ connection }: QueryRunner): Promise<any>;
}
