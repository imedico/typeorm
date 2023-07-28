"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const DataSource_1 = require("../../../../src/data-source/DataSource");
const ConnectionMetadataBuilder_1 = require("../../../../src/connection/ConnectionMetadataBuilder");
const EntityMetadataValidator_1 = require("../../../../src/metadata-builder/EntityMetadataValidator");
const chai_1 = require("chai");
describe("entity-metadata-validator", () => {
    it("should throw error if relation count decorator used with ManyToOne or OneToOne relations", async () => {
        const connection = new DataSource_1.DataSource({
            // dummy connection options, connection won't be established anyway
            type: "mysql",
            host: "localhost",
            username: "test",
            password: "test",
            database: "test",
            entities: [__dirname + "/entity/*{.js,.ts}"],
        });
        const connectionMetadataBuilder = new ConnectionMetadataBuilder_1.ConnectionMetadataBuilder(connection);
        const entityMetadatas = await connectionMetadataBuilder.buildEntityMetadatas([
            __dirname + "/entity/*{.js,.ts}",
        ]);
        const entityMetadataValidator = new EntityMetadataValidator_1.EntityMetadataValidator();
        (0, chai_1.expect)(() => entityMetadataValidator.validateMany(entityMetadatas, connection.driver)).to.throw(Error);
    });
});
//# sourceMappingURL=entity-metadata-validator.js.map