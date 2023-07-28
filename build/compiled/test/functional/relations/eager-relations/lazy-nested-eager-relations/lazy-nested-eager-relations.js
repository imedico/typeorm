"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../../utils/test-utils");
const User_1 = require("./entity/User");
const Profile_1 = require("./entity/Profile");
const Editor_1 = require("./entity/Editor");
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
const chai_1 = require("chai");
describe("relations > eager relations > lazy nested eager relations", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    async function prepareData(connection) {
        const profile = new Profile_1.Profile();
        profile.about = "I cut trees!";
        await connection.manager.save(profile);
        const user = new User_1.User();
        user.firstName = "Timber";
        user.lastName = "Saw";
        user.profile = profile;
        await connection.manager.save(user);
        const primaryCategory1 = new Category_1.Category();
        primaryCategory1.name = "primary category #1";
        await connection.manager.save(primaryCategory1);
        const primaryCategory2 = new Category_1.Category();
        primaryCategory2.name = "primary category #2";
        await connection.manager.save(primaryCategory2);
        const secondaryCategory1 = new Category_1.Category();
        secondaryCategory1.name = "secondary category #1";
        await connection.manager.save(secondaryCategory1);
        const secondaryCategory2 = new Category_1.Category();
        secondaryCategory2.name = "secondary category #2";
        await connection.manager.save(secondaryCategory2);
        const post = new Post_1.Post();
        post.title = "about eager relations";
        post.categories1 = [primaryCategory1, primaryCategory2];
        post.categories2 = [secondaryCategory1, secondaryCategory2];
        post.author = user;
        await connection.manager.save(post);
        const editor = new Editor_1.Editor();
        editor.post = Promise.resolve(post);
        editor.user = user;
        await connection.manager.save(editor);
    }
    it("should load all eager relations nested inside a lazy relation", () => Promise.all(connections.map(async (connection) => {
        await prepareData(connection);
        const loadedEditor = await connection.manager.findOne(Editor_1.Editor, {
            where: {
                id: 1,
            },
        });
        const loadedPost = await (loadedEditor === null || loadedEditor === void 0 ? void 0 : loadedEditor.post);
        (0, chai_1.expect)(loadedPost === null || loadedPost === void 0 ? void 0 : loadedPost.categories1).to.have.deep.members([
            {
                id: 1,
                name: "primary category #1",
            },
            {
                id: 2,
                name: "primary category #2",
            },
        ]);
        (0, chai_1.expect)(loadedPost === null || loadedPost === void 0 ? void 0 : loadedPost.categories2).to.have.deep.members([
            {
                id: 3,
                name: "secondary category #1",
            },
            {
                id: 4,
                name: "secondary category #2",
            },
        ]);
        (0, chai_1.expect)(loadedPost === null || loadedPost === void 0 ? void 0 : loadedPost.author).to.deep.equal({
            id: 1,
            firstName: "Timber",
            lastName: "Saw",
            profile: {
                id: 1,
                about: "I cut trees!",
            },
        });
        (0, chai_1.expect)(loadedPost === null || loadedPost === void 0 ? void 0 : loadedPost.editors).to.have.deep.members([
            {
                id: 1,
                user: {
                    id: 1,
                    firstName: "Timber",
                    lastName: "Saw",
                    profile: {
                        id: 1,
                        about: "I cut trees!",
                    },
                },
            },
        ]);
    })));
});
//# sourceMappingURL=lazy-nested-eager-relations.js.map