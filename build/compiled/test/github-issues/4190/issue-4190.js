"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Photo_1 = require("./entity/Photo");
const User_1 = require("./entity/User");
const Profile_1 = require("./entity/Profile");
const Category_1 = require("./entity/Category");
const Question_1 = require("./entity/Question");
describe("github issues > #4190 Relation decorators: allow to pass string instead of typeFunction", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should work with one-to-one relations", () => Promise.all(connections.map(async (connection) => {
        const profile = new Profile_1.Profile();
        profile.gender = "male";
        profile.photo = "me.jpg";
        await connection.manager.save(profile);
        const user = new User_1.User();
        user.name = "Joe Smith";
        user.profile = profile;
        await connection.manager.save(user);
        const users = await connection.manager.find(User_1.User, {
            relations: { profile: true },
        });
        users.should.eql([
            {
                id: 1,
                name: "Joe Smith",
                profile: {
                    id: 1,
                    gender: "male",
                    photo: "me.jpg",
                },
            },
        ]);
    })));
    it("should work with many-to-one/one-to-many relations", () => Promise.all(connections.map(async (connection) => {
        const photo1 = new Photo_1.Photo();
        photo1.url = "me.jpg";
        await connection.manager.save(photo1);
        const photo2 = new Photo_1.Photo();
        photo2.url = "me-and-bears.jpg";
        await connection.manager.save(photo2);
        const user = new User_1.User();
        user.name = "John";
        user.photos = [photo1, photo2];
        await connection.manager.save(user);
        const users = await connection.manager.find(User_1.User, {
            relations: { photos: true },
        });
        const photos = await connection.manager.find(Photo_1.Photo, {
            relations: { user: true },
        });
        // Check one-to-many
        users[0].photos.should.have.deep.members([
            {
                id: 1,
                url: "me.jpg",
            },
            {
                id: 2,
                url: "me-and-bears.jpg",
            },
        ]);
        // Check many-to-one
        photos.should.have.deep.members([
            {
                id: 1,
                url: "me.jpg",
                user: {
                    id: 1,
                    name: "John",
                },
            },
            {
                id: 2,
                url: "me-and-bears.jpg",
                user: {
                    id: 1,
                    name: "John",
                },
            },
        ]);
    })));
    it("should work with many-to-many relations", () => Promise.all(connections.map(async (connection) => {
        const category1 = new Category_1.Category();
        category1.name = "animals";
        await connection.manager.save(category1);
        const category2 = new Category_1.Category();
        category2.name = "zoo";
        await connection.manager.save(category2);
        const question = new Question_1.Question();
        question.name = "About animals";
        question.categories = [category1, category2];
        await connection.manager.save(question);
        const questions = await connection.manager.find(Question_1.Question, {
            relations: { categories: true },
        });
        questions[0].categories.should.have.deep.members([
            {
                id: 1,
                name: "animals",
            },
            {
                id: 2,
                name: "zoo",
            },
        ]);
    })));
});
//# sourceMappingURL=issue-4190.js.map