"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("../../utils/test-setup");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const GroupWithVeryLongName_1 = require("./entity/GroupWithVeryLongName");
const AuthorWithVeryLongName_1 = require("./entity/AuthorWithVeryLongName");
const PostWithVeryLongName_1 = require("./entity/PostWithVeryLongName");
const CategoryWithVeryLongName_1 = require("./entity/CategoryWithVeryLongName");
/**
 * @see https://www.postgresql.org/docs/current/sql-syntax-lexical.html#SQL-SYNTAX-IDENTIFIERS
 * "The system uses no more than NAMEDATALEN-1 bytes of an identifier; longer names can be
 * written in commands, but they will be truncated. By default, NAMEDATALEN is 64 so the
 * maximum identifier length is 63 bytes. If this limit is problematic, it can be raised
 * by changing the NAMEDATALEN constant in src/include/pg_config_manual.h."
 */
describe("github issues > #3118 shorten alias names (for RDBMS with a limit) when they are longer than 63 characters", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: [
            "mysql",
            "postgres",
            "cockroachdb",
            "sap",
            "mariadb",
            "mssql",
        ],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should be able to load deeply nested entities, even with long aliases", () => Promise.all(connections.map(async (connection) => {
        const group = new GroupWithVeryLongName_1.GroupWithVeryLongName();
        group.name = "La Pléiade";
        await connection
            .getRepository(GroupWithVeryLongName_1.GroupWithVeryLongName)
            .save(group);
        const authorFirstNames = [
            "Pierre",
            "Paul",
            "Jacques",
            "Jean",
            "Rémy",
            "Guillaume",
            "Lazare",
            "Étienne",
        ];
        for (const authorFirstName of authorFirstNames) {
            const author = new AuthorWithVeryLongName_1.AuthorWithVeryLongName();
            author.firstName = authorFirstName;
            author.groupWithVeryLongName = group;
            const post = new PostWithVeryLongName_1.PostWithVeryLongName();
            post.authorWithVeryLongName = author;
            const category = new CategoryWithVeryLongName_1.CategoryWithVeryLongName();
            category.postsWithVeryLongName = [post];
            await connection
                .getRepository(AuthorWithVeryLongName_1.AuthorWithVeryLongName)
                .save(author);
            await connection
                .getRepository(PostWithVeryLongName_1.PostWithVeryLongName)
                .save(post);
            await connection
                .getRepository(CategoryWithVeryLongName_1.CategoryWithVeryLongName)
                .save(category);
        }
        const [loadedCategory] = await connection.manager.find(CategoryWithVeryLongName_1.CategoryWithVeryLongName, {
            relations: {
                postsWithVeryLongName: {
                    authorWithVeryLongName: {
                        groupWithVeryLongName: true,
                    },
                },
                // before: used to generate a SELECT "AS" alias like `CategoryWithVeryLongName__postsWithVeryLongName__authorWithVeryLongName_firstName`
                // now: `CaWiVeLoNa__poWiVeLoNa__auWiVeLoNa_firstName`, which is acceptable by Postgres (limit to 63 characters)
                // "postsWithVeryLongName.authorWithVeryLongName",
                // before:
                // used to generate a JOIN "AS" alias like :
                // `CategoryWithVeryLongName__postsWithVeryLongName__authorWithVeryLongName_firstName`
                // `CategoryWithVeryLongName__postsWithVeryLongName__authorWithVeryLongName__groupWithVeryLongName_name`
                // which was truncated automatically by the RDBMS to :
                // `CategoryWithVeryLongName__postsWithVeryLongName__authorWithVery`
                // `CategoryWithVeryLongName__postsWithVeryLongName__authorWithVery`
                // resulting in: `ERROR:  table name "CategoryWithVeryLongName__postsWithVeryLongName__authorWithVery" specified more than once`
                // now:
                // `CaWiVeLoNa__poWiVeLoNa__auWiVeLoNa_firstName`
                // `CaWiVeLoNa__poWiVeLoNa__auWiVeLoNa__grWiVeLoNa_name`
                // "postsWithVeryLongName.authorWithVeryLongName.groupWithVeryLongName",
            },
        });
        (0, chai_1.expect)(loadedCategory).not.to.be.null;
        (0, chai_1.expect)(loadedCategory.postsWithVeryLongName).not.to.be
            .undefined;
        (0, chai_1.expect)(loadedCategory.postsWithVeryLongName).not.to.be.empty;
        (0, chai_1.expect)(loadedCategory.postsWithVeryLongName[0]
            .authorWithVeryLongName).not.to.be.undefined;
        (0, chai_1.expect)(loadedCategory.postsWithVeryLongName[0]
            .authorWithVeryLongName.firstName).to.be.oneOf(authorFirstNames);
        (0, chai_1.expect)(loadedCategory.postsWithVeryLongName[0]
            .authorWithVeryLongName.groupWithVeryLongName.name).to.equal(group.name);
        const loadedCategories = await connection.manager.find(CategoryWithVeryLongName_1.CategoryWithVeryLongName, {
            relations: {
                postsWithVeryLongName: {
                    authorWithVeryLongName: {
                        groupWithVeryLongName: true,
                    },
                },
            },
        });
        (0, chai_1.expect)(loadedCategories).to.be.an("array").that.is.not.empty;
        for (const loadedCategory of loadedCategories) {
            (0, chai_1.expect)(loadedCategory).not.to.be.null;
            (0, chai_1.expect)(loadedCategory.postsWithVeryLongName).not.to.be
                .undefined;
            (0, chai_1.expect)(loadedCategory.postsWithVeryLongName).not.to.be
                .empty;
            (0, chai_1.expect)(loadedCategory.postsWithVeryLongName[0]
                .authorWithVeryLongName).not.to.be.undefined;
            (0, chai_1.expect)(loadedCategory.postsWithVeryLongName[0]
                .authorWithVeryLongName.firstName).to.be.oneOf(authorFirstNames);
            (0, chai_1.expect)(loadedCategory.postsWithVeryLongName[0]
                .authorWithVeryLongName.groupWithVeryLongName.name).to.equal(group.name);
        }
    })));
    it("should shorten table names which exceed the max length", () => Promise.all(connections.map(async (connection) => {
        const shortName = "cat_wit_ver_lon_nam_pos_wit_ver_lon_nam_pos_wit_ver_lon_nam";
        const normalName = "category_with_very_long_name_posts_with_very_long_name_post_with_very_long_name";
        const { maxAliasLength } = connection.driver;
        const expectedTableName = maxAliasLength &&
            maxAliasLength > 0 &&
            normalName.length > maxAliasLength
            ? shortName
            : normalName;
        (0, chai_1.expect)(connection.entityMetadatas.some((em) => em.tableName === expectedTableName)).to.be.true;
    })));
});
//# sourceMappingURL=issue-3118.js.map