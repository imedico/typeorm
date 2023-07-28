"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const DataSource_1 = require("../../../../../src/data-source/DataSource");
const EntityMetadataValidator_1 = require("../../../../../src/metadata-builder/EntityMetadataValidator");
const ConnectionMetadataBuilder_1 = require("../../../../../src/connection/ConnectionMetadataBuilder");
const chai_1 = require("chai");
describe("relations > eager relations > circular eager relations", () => {
    it("should throw error if eager: true is set on both sides of relationship", async () => {
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
//# sourceMappingURL=circular-eager-relations.js.map