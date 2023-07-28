"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const DataSource_1 = require("../../../../src/data-source/DataSource");
const ConnectionMetadataBuilder_1 = require("../../../../src/connection/ConnectionMetadataBuilder");
const EntityMetadataValidator_1 = require("../../../../src/metadata-builder/EntityMetadataValidator");
const chai_1 = require("chai");
const InitializedRelationError_1 = require("../../../../src/error/InitializedRelationError");
const Category_1 = require("./entity/Category");
const Post_1 = require("./entity/Post");
const Image_1 = require("./entity/Image");
const ImageInfo_1 = require("./entity/ImageInfo");
const Question_1 = require("./entity/Question");
describe("entity-metadata-validator > initialized relations", () => {
    it("should throw error if relation with initialized array was found on many-to-many relation", async () => {
        const connection = new DataSource_1.DataSource({
            // dummy connection options, connection won't be established anyway
            type: "mysql",
            host: "localhost",
            username: "test",
            password: "test",
            database: "test",
            entities: [Post_1.Post, Category_1.Category],
        });
        const connectionMetadataBuilder = new ConnectionMetadataBuilder_1.ConnectionMetadataBuilder(connection);
        const entityMetadatas = await connectionMetadataBuilder.buildEntityMetadatas([
            Post_1.Post,
            Category_1.Category,
        ]);
        const entityMetadataValidator = new EntityMetadataValidator_1.EntityMetadataValidator();
        (0, chai_1.expect)(() => entityMetadataValidator.validateMany(entityMetadatas, connection.driver)).to.throw(InitializedRelationError_1.InitializedRelationError);
    });
    it("should throw error if relation with initialized array was found on one-to-many relation", async () => {
        const connection = new DataSource_1.DataSource({
            // dummy connection options, connection won't be established anyway
            type: "mysql",
            host: "localhost",
            username: "test",
            password: "test",
            database: "test",
            entities: [Image_1.Image, ImageInfo_1.ImageInfo],
        });
        const connectionMetadataBuilder = new ConnectionMetadataBuilder_1.ConnectionMetadataBuilder(connection);
        const entityMetadatas = await connectionMetadataBuilder.buildEntityMetadatas([
            Image_1.Image,
            ImageInfo_1.ImageInfo,
        ]);
        const entityMetadataValidator = new EntityMetadataValidator_1.EntityMetadataValidator();
        (0, chai_1.expect)(() => entityMetadataValidator.validateMany(entityMetadatas, connection.driver)).to.throw(InitializedRelationError_1.InitializedRelationError);
    });
    it("should not throw error if relation with initialized array was not found", async () => {
        const connection = new DataSource_1.DataSource({
            // dummy connection options, connection won't be established anyway
            type: "mysql",
            host: "localhost",
            username: "test",
            password: "test",
            database: "test",
            entities: [Category_1.Category],
        });
        const connectionMetadataBuilder = new ConnectionMetadataBuilder_1.ConnectionMetadataBuilder(connection);
        const entityMetadatas = await connectionMetadataBuilder.buildEntityMetadatas([Category_1.Category]);
        const entityMetadataValidator = new EntityMetadataValidator_1.EntityMetadataValidator();
        (0, chai_1.expect)(() => entityMetadataValidator.validateMany(entityMetadatas, connection.driver)).not.to.throw(InitializedRelationError_1.InitializedRelationError);
    });
    it("should not throw error if relation with initialized array was found, but persistence for this relation was disabled", async () => {
        const connection = new DataSource_1.DataSource({
            // dummy connection options, connection won't be established anyway
            type: "mysql",
            host: "localhost",
            username: "test",
            password: "test",
            database: "test",
            entities: [Question_1.Question, Category_1.Category],
        });
        const connectionMetadataBuilder = new ConnectionMetadataBuilder_1.ConnectionMetadataBuilder(connection);
        const entityMetadatas = await connectionMetadataBuilder.buildEntityMetadatas([
            Question_1.Question,
            Category_1.Category,
        ]);
        const entityMetadataValidator = new EntityMetadataValidator_1.EntityMetadataValidator();
        (0, chai_1.expect)(() => entityMetadataValidator.validateMany(entityMetadatas, connection.driver)).not.to.throw(InitializedRelationError_1.InitializedRelationError);
    });
});
//# sourceMappingURL=validator-intialized-relations.js.map