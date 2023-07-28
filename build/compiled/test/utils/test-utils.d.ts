import { DatabaseType, DataSource, DataSourceOptions, Driver, EntitySchema, Logger, NamingStrategyInterface, QueryRunner } from "../../src";
import { QueryResultCache } from "../../src/cache/QueryResultCache";
/**
 * Interface in which data is stored in ormconfig.json of the project.
 */
export type TestingConnectionOptions = DataSourceOptions & {
    /**
     * Indicates if this connection should be skipped.
     */
    skip?: boolean;
    /**
     * If set to true then tests for this driver wont run until implicitly defined "enabledDrivers" section.
     */
    disabledIfNotEnabledImplicitly?: boolean;
};
/**
 * Options used to create a connection for testing purposes.
 */
export interface TestingOptions {
    /**
     * Dirname of the test directory.
     * If specified, entities will be loaded from that directory.
     */
    __dirname?: string;
    /**
     * Connection name to be overridden.
     * This can be used to create multiple connections with single connection configuration.
     */
    name?: string;
    /**
     * List of enabled drivers for the given test suite.
     */
    enabledDrivers?: DatabaseType[];
    /**
     * Entities needs to be included in the connection for the given test suite.
     */
    entities?: (string | Function | EntitySchema<any>)[];
    /**
     * Migrations needs to be included in connection for the given test suite.
     */
    migrations?: (string | Function)[];
    /**
     * Subscribers needs to be included in the connection for the given test suite.
     */
    subscribers?: (string | Function)[];
    /**
     * Indicates if schema sync should be performed or not.
     */
    schemaCreate?: boolean;
    /**
     * Indicates if schema should be dropped on connection setup.
     */
    dropSchema?: boolean;
    /**
     * Enables or disables logging.
     */
    logging?: boolean;
    /**
     * Schema name used for postgres driver.
     */
    schema?: string;
    /**
     * Naming strategy defines how auto-generated names for such things like table name, or table column gonna be
     * generated.
     */
    namingStrategy?: NamingStrategyInterface;
    /**
     * Typeorm metadata table name, in case of different name from "typeorm_metadata".
     * Accepts single string name.
     */
    metadataTableName?: string;
    /**
     * Schema name used for postgres driver.
     */
    cache?: boolean | {
        /**
         * Type of caching.
         *
         * - "database" means cached values will be stored in the separate table in database. This is default value.
         * - "mongodb" means cached values will be stored in mongodb database. You must provide mongodb connection options.
         * - "redis" means cached values will be stored inside redis. You must provide redis connection options.
         */
        readonly type?: "database" | "redis" | "ioredis" | "ioredis/cluster";
        /**
         * Factory function for custom cache providers that implement QueryResultCache.
         */
        readonly provider?: (connection: DataSource) => QueryResultCache;
        /**
         * Used to provide mongodb / redis connection options.
         */
        options?: any;
        /**
         * If set to true then queries (using find methods and QueryBuilder's methods) will always be cached.
         */
        alwaysEnabled?: boolean;
        /**
         * Time in milliseconds in which cache will expire.
         * This can be setup per-query.
         * Default value is 1000 which is equivalent to 1 second.
         */
        duration?: number;
    };
    /**
     * Options that may be specific to a driver.
     * They are passed down to the enabled drivers.
     */
    driverSpecific?: Object;
    /**
     * Factory to create a logger for each test connection.
     */
    createLogger?: () => "advanced-console" | "simple-console" | "file" | "debug" | Logger;
    relationLoadStrategy?: "join" | "query";
}
/**
 * Creates a testing connection options for the given driver type based on the configuration in the ormconfig.json
 * and given options that can override some of its configuration for the test-specific use case.
 */
export declare function setupSingleTestingConnection(driverType: DatabaseType, options: TestingOptions): DataSourceOptions | undefined;
export declare function getTypeOrmConfig(): TestingConnectionOptions[];
/**
 * Creates a testing connections options based on the configuration in the ormconfig.json
 * and given options that can override some of its configuration for the test-specific use case.
 */
export declare function setupTestingConnections(options?: TestingOptions): DataSourceOptions[];
export declare function createDataSource(options: DataSourceOptions): DataSource;
/**
 * Creates a testing connections based on the configuration in the ormconfig.json
 * and given options that can override some of its configuration for the test-specific use case.
 */
export declare function createTestingConnections(options?: TestingOptions): Promise<DataSource[]>;
/**
 * Closes testing connections if they are connected.
 */
export declare function closeTestingConnections(connections: DataSource[]): Promise<(void | undefined)[]>;
/**
 * Reloads all databases for all given connections.
 */
export declare function reloadTestingDatabases(connections: DataSource[]): Promise<void[]>;
/**
 * Generates random text array with custom length.
 */
export declare function generateRandomText(length: number): string;
export declare function sleep(ms: number): Promise<void>;
/**
 * Creates typeorm service table for storing user defined Views and generate columns.
 */
export declare function createTypeormMetadataTable(driver: Driver, queryRunner: QueryRunner): Promise<void>;
