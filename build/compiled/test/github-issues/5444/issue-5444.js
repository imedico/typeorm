"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EntitySchemaTransformer_1 = require("../../../src/entity-schema/EntitySchemaTransformer");
const chai_1 = require("chai");
const Post_1 = require("./entity/Post");
const Author_1 = require("./entity/Author");
const src_1 = require("../../../src");
describe("github issues > #5444 EntitySchema missing support for multiple joinColumns in relations", () => {
    it("Update query returns the number of affected rows", async () => {
        const transformer = new EntitySchemaTransformer_1.EntitySchemaTransformer();
        const actual = transformer.transform([
            new src_1.EntitySchema(Author_1.AuthorSchema),
            new src_1.EntitySchema(Post_1.PostSchema),
        ]);
        const joinColumns = actual.joinColumns;
        (0, chai_1.expect)(joinColumns.length).to.eq(2);
        (0, chai_1.expect)(joinColumns).to.deep.eq([
            {
                target: Post_1.Post,
                propertyName: "author",
                name: "authorPublisherId",
                referencedColumnName: "publisherId",
                foreignKeyConstraintName: undefined,
            },
            {
                target: Post_1.Post,
                propertyName: "author",
                name: "authorId",
                referencedColumnName: "id",
                foreignKeyConstraintName: undefined,
            },
        ]);
    });
});
//# sourceMappingURL=issue-5444.js.map