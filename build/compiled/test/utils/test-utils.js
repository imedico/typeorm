"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTypeormMetadataTable = exports.sleep = exports.generateRandomText = exports.reloadTestingDatabases = exports.closeTestingConnections = exports.createTestingConnections = exports.createDataSource = exports.setupTestingConnections = exports.getTypeOrmConfig = exports.setupSingleTestingConnection = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../src");
const path_1 = tslib_1.__importDefault(require("path"));
const ObjectUtils_1 = require("../../src/util/ObjectUtils");
/**
 * Creates a testing connection options for the given driver type based on the configuration in the ormconfig.json
 * and given options that can override some of its configuration for the test-specific use case.
 */
function setupSingleTestingConnection(driverType, options) {
    const testingConnections = setupTestingConnections({
        name: options.name ? options.name : undefined,
        entities: options.entities ? options.entities : [],
        subscribers: options.subscribers ? options.subscribers : [],
        dropSchema: options.dropSchema ? options.dropSchema : false,
        schemaCreate: options.schemaCreate ? options.schemaCreate : false,
        enabledDrivers: [driverType],
        cache: options.cache,
        schema: options.schema ? options.schema : undefined,
        namingStrategy: options.namingStrategy
            ? options.namingStrategy
            : undefined,
    });
    if (!testingConnections.length)
        return undefined;
    return testingConnections[0];
}
exports.setupSingleTestingConnection = setupSingleTestingConnection;
/**
 * Loads test connection options from ormconfig.json file.
 */
function getOrmFilepath() {
    try {
        try {
            // first checks build/compiled
            // useful for docker containers in order to provide a custom config
            return require.resolve(__dirname + "/../../ormconfig.json");
        }
        catch (err) {
            // fallbacks to the root config
            return require.resolve(__dirname + "/../../../../ormconfig.json");
        }
    }
    catch (err) {
        throw new Error(`Cannot find ormconfig.json file in the root of the project. To run tests please create ormconfig.json file` +
            ` in the root of the project (near ormconfig.json.dist, you need to copy ormconfig.json.dist into ormconfig.json` +
            ` and change all database settings to match your local environment settings).`);
    }
}
function getTypeOrmConfig() {
    return require(getOrmFilepath());
}
exports.getTypeOrmConfig = getTypeOrmConfig;
/**
 * Creates a testing connections options based on the configuration in the ormconfig.json
 * and given options that can override some of its configuration for the test-specific use case.
 */
function setupTestingConnections(options) {
    const ormConfigConnectionOptionsArray = getTypeOrmConfig();
    if (!ormConfigConnectionOptionsArray.length)
        throw new Error(`No connections setup in ormconfig.json file. Please create configurations for each database type to run tests.`);
    return ormConfigConnectionOptionsArray
        .filter((connectionOptions) => {
        if (connectionOptions.skip === true)
            return false;
        if (options &&
            options.enabledDrivers &&
            options.enabledDrivers.length)
            return (options.enabledDrivers.indexOf(connectionOptions.type) !==
                -1); // ! is temporary
        if (connectionOptions.disabledIfNotEnabledImplicitly === true)
            return false;
        return true;
    })
        .map((connectionOptions) => {
        let newOptions = Object.assign({}, connectionOptions, {
            name: options && options.name
                ? options.name
                : connectionOptions.name,
            entities: options && options.entities ? options.entities : [],
            migrations: options && options.migrations ? options.migrations : [],
            subscribers: options && options.subscribers
                ? options.subscribers
                : [],
            dropSchema: options && options.dropSchema !== undefined
                ? options.dropSchema
                : false,
            cache: options ? options.cache : undefined,
        });
        if (options && options.driverSpecific)
            newOptions = Object.assign({}, options.driverSpecific, newOptions);
        if (options && options.schemaCreate)
            newOptions.synchronize = options.schemaCreate;
        if (options && options.schema)
            newOptions.schema = options.schema;
        if (options && options.logging !== undefined)
            newOptions.logging = options.logging;
        if (options && options.createLogger !== undefined)
            newOptions.logger = options.createLogger();
        if (options && options.__dirname)
            newOptions.entities = [options.__dirname + "/entity/*{.js,.ts}"];
        if (options && options.__dirname)
            newOptions.migrations = [
                options.__dirname + "/migration/*{.js,.ts}",
            ];
        if (options && options.namingStrategy)
            newOptions.namingStrategy = options.namingStrategy;
        if (options && options.metadataTableName)
            newOptions.metadataTableName = options.metadataTableName;
        if (options && options.relationLoadStrategy)
            newOptions.relationLoadStrategy = options.relationLoadStrategy;
        newOptions.baseDirectory = path_1.default.dirname(getOrmFilepath());
        return newOptions;
    });
}
exports.setupTestingConnections = setupTestingConnections;
class GeneratedColumnReplacerSubscriber {
    beforeInsert(event) {
        event.metadata.columns.map((column) => {
            if (column.generationStrategy === "increment") {
                if (!GeneratedColumnReplacerSubscriber.globalIncrementValues[event.metadata.tableName]) {
                    GeneratedColumnReplacerSubscriber.globalIncrementValues[event.metadata.tableName] = 0;
                }
                GeneratedColumnReplacerSubscriber.globalIncrementValues[event.metadata.tableName] += 1;
                column.setEntityValue(event.entity, GeneratedColumnReplacerSubscriber.globalIncrementValues[event.metadata.tableName]);
            }
            else if ((column.isCreateDate || column.isUpdateDate) &&
                !column.getEntityValue(event.entity)) {
                column.setEntityValue(event.entity, new Date());
            }
            else if (!column.isCreateDate &&
                !column.isUpdateDate &&
                !column.isVirtual &&
                column.default !== undefined &&
                column.getEntityValue(event.entity) === undefined) {
                column.setEntityValue(event.entity, column.default);
            }
        });
    }
}
GeneratedColumnReplacerSubscriber.globalIncrementValues = {};
(0, src_1.getMetadataArgsStorage)().entitySubscribers.push({
    target: GeneratedColumnReplacerSubscriber,
});
function createDataSource(options) {
    if (options.type === "spanner") {
        process.env.SPANNER_EMULATOR_HOST = "localhost:9010";
        // process.env.GOOGLE_APPLICATION_CREDENTIALS =
        //     "/Users/messer/Documents/google/typeorm-spanner-3b57e071cbf0.json"
        if (Array.isArray(options.subscribers)) {
            options.subscribers.push(GeneratedColumnReplacerSubscriber);
        }
        else if (ObjectUtils_1.ObjectUtils.isObject(options.subscribers)) {
            options.subscribers["GeneratedColumnReplacer"] =
                GeneratedColumnReplacerSubscriber;
        }
        else {
            options = {
                ...options,
                subscribers: {
                    GeneratedColumnReplacer: GeneratedColumnReplacerSubscriber,
                },
            };
        }
    }
    return new src_1.DataSource(options);
}
exports.createDataSource = createDataSource;
/**
 * Creates a testing connections based on the configuration in the ormconfig.json
 * and given options that can override some of its configuration for the test-specific use case.
 */
async function createTestingConnections(options) {
    const dataSourceOptions = setupTestingConnections(options);
    const dataSources = [];
    for (let options of dataSourceOptions) {
        const dataSource = createDataSource(options);
        await dataSource.initialize();
        dataSources.push(dataSource);
    }
    await Promise.all(dataSources.map(async (connection) => {
        var _a;
        // create new databases
        const databases = [];
        connection.entityMetadatas.forEach((metadata) => {
            if (metadata.database &&
                databases.indexOf(metadata.database) === -1)
                databases.push(metadata.database);
        });
        const queryRunner = connection.createQueryRunner();
        for (const database of databases) {
            await queryRunner.createDatabase(database, true);
        }
        if (connection.driver.options.type === "cockroachdb") {
            await queryRunner.query(`ALTER RANGE default CONFIGURE ZONE USING num_replicas = 1, gc.ttlseconds = 60;`);
            await queryRunner.query(`ALTER DATABASE system CONFIGURE ZONE USING num_replicas = 1, gc.ttlseconds = 60;`);
            await queryRunner.query(`ALTER TABLE system.public.jobs CONFIGURE ZONE USING num_replicas = 1, gc.ttlseconds = 60;`);
            await queryRunner.query(`ALTER RANGE meta CONFIGURE ZONE USING num_replicas = 1, gc.ttlseconds = 60;`);
            await queryRunner.query(`ALTER RANGE system CONFIGURE ZONE USING num_replicas = 1, gc.ttlseconds = 60;`);
            await queryRunner.query(`ALTER RANGE liveness CONFIGURE ZONE USING num_replicas = 1, gc.ttlseconds = 60;`);
            await queryRunner.query(`SET CLUSTER SETTING jobs.retention_time = '180s';`);
            await queryRunner.query(`SET CLUSTER SETTING kv.range_merge.queue_interval = '200ms'`);
            await queryRunner.query(`SET CLUSTER SETTING kv.raft_log.disable_synchronization_unsafe = 'true'`);
            await queryRunner.query(`SET CLUSTER SETTING sql.defaults.experimental_temporary_tables.enabled = 'true';`);
        }
        // create new schemas
        const schemaPaths = new Set();
        connection.entityMetadatas
            .filter((entityMetadata) => !!entityMetadata.schema)
            .forEach((entityMetadata) => {
            let schema = entityMetadata.schema;
            if (entityMetadata.database) {
                schema = `${entityMetadata.database}.${schema}`;
            }
            schemaPaths.add(schema);
        });
        const schema = ((_a = connection.driver.options) === null || _a === void 0 ? void 0 : _a.hasOwnProperty("schema"))
            ? connection.driver.options.schema
            : undefined;
        if (schema) {
            schemaPaths.add(schema);
        }
        for (const schemaPath of schemaPaths) {
            try {
                await queryRunner.createSchema(schemaPath, true);
            }
            catch (e) {
                // Do nothing
            }
        }
        await queryRunner.release();
    }));
    return dataSources;
}
exports.createTestingConnections = createTestingConnections;
/**
 * Closes testing connections if they are connected.
 */
function closeTestingConnections(connections) {
    return Promise.all(connections.map((connection) => connection && connection.isInitialized
        ? connection.destroy()
        : undefined));
}
exports.closeTestingConnections = closeTestingConnections;
/**
 * Reloads all databases for all given connections.
 */
function reloadTestingDatabases(connections) {
    GeneratedColumnReplacerSubscriber.globalIncrementValues = {};
    return Promise.all(connections.map((connection) => connection.synchronize(true)));
}
exports.reloadTestingDatabases = reloadTestingDatabases;
/**
 * Generates random text array with custom length.
 */
function generateRandomText(length) {
    let text = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i <= length; i++)
        text += characters.charAt(Math.floor(Math.random() * characters.length));
    return text;
}
exports.generateRandomText = generateRandomText;
function sleep(ms) {
    return new Promise((ok) => {
        setTimeout(ok, ms);
    });
}
exports.sleep = sleep;
/**
 * Creates typeorm service table for storing user defined Views and generate columns.
 */
async function createTypeormMetadataTable(driver, queryRunner) {
    const schema = driver.schema;
    const database = driver.database;
    const typeormMetadataTable = driver.buildTableName("typeorm_metadata", schema, database);
    await queryRunner.createTable(new src_1.Table({
        database: database,
        schema: schema,
        name: typeormMetadataTable,
        columns: [
            {
                name: "type",
                type: driver.normalizeType({
                    type: driver.mappedDataTypes.metadataType,
                }),
                isNullable: false,
            },
            {
                name: "database",
                type: driver.normalizeType({
                    type: driver.mappedDataTypes.metadataDatabase,
                }),
                isNullable: true,
            },
            {
                name: "schema",
                type: driver.normalizeType({
                    type: driver.mappedDataTypes.metadataSchema,
                }),
                isNullable: true,
            },
            {
                name: "table",
                type: driver.normalizeType({
                    type: driver.mappedDataTypes.metadataTable,
                }),
                isNullable: true,
            },
            {
                name: "name",
                type: driver.normalizeType({
                    type: driver.mappedDataTypes.metadataName,
                }),
                isNullable: true,
            },
            {
                name: "value",
                type: driver.normalizeType({
                    type: driver.mappedDataTypes.metadataValue,
                }),
                isNullable: true,
            },
        ],
    }), true);
}
exports.createTypeormMetadataTable = createTypeormMetadataTable;
//# sourceMappingURL=test-utils.js.map