"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const Content_1 = require("./entity/Content");
const Photo_1 = require("./entity/Photo");
const SpecialPhoto_1 = require("./entity/SpecialPhoto");
const Post_1 = require("./entity/Post");
describe("github issues > #2927 When using base class' custom repository, the discriminator is ignored", () => {
    let dataSources;
    before(async () => (dataSources = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(dataSources));
    after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
    it("should use the correct subclass for inheritance when saving and retrieving concrete instance", () => Promise.all(dataSources.map(async (dataSource) => {
        const entityManager = dataSource.createEntityManager();
        const repository = entityManager.getRepository(Content_1.Content);
        // Create and save a new Photo.
        const photo = new Photo_1.Photo();
        photo.title = "some title";
        photo.description = "some description";
        photo.size = 42;
        await repository.save(photo);
        // Retrieve it back from the DB.
        const contents = await repository.find();
        (0, chai_1.expect)(contents.length).to.equal(1);
        (0, chai_1.expect)(contents[0]).to.be.an.instanceOf(Photo_1.Photo);
        const fetchedPhoto = contents[0];
        (0, chai_1.expect)(fetchedPhoto).to.eql(photo);
    })));
    it("should work for deeply nested classes", () => Promise.all(dataSources.map(async (dataSource) => {
        const entityManager = dataSource.createEntityManager();
        const repository = entityManager.getRepository(Content_1.Content);
        // Create and save a new SpecialPhoto.
        const specialPhoto = new SpecialPhoto_1.SpecialPhoto();
        specialPhoto.title = "some title";
        specialPhoto.description = "some description";
        specialPhoto.size = 42;
        specialPhoto.specialProperty = 420;
        await repository.save(specialPhoto);
        // Retrieve it back from the DB.
        const contents = await repository.find();
        (0, chai_1.expect)(contents.length).to.equal(1);
        (0, chai_1.expect)(contents[0]).to.be.an.instanceOf(SpecialPhoto_1.SpecialPhoto);
        const fetchedSpecialPhoto = contents[0];
        (0, chai_1.expect)(fetchedSpecialPhoto).to.eql(specialPhoto);
    })));
    it("should work for saving and fetching different subclasses", () => Promise.all(dataSources.map(async (dataSource) => {
        const entityManager = dataSource.createEntityManager();
        const repository = entityManager.getRepository(Content_1.Content);
        // Create and save a new Post.
        const post = new Post_1.Post();
        post.title = "some title";
        post.description = "some description";
        post.viewCount = 69;
        // Create and save a new SpecialPhoto.
        const specialPhoto = new SpecialPhoto_1.SpecialPhoto();
        specialPhoto.title = "some title";
        specialPhoto.description = "some description";
        specialPhoto.size = 42;
        specialPhoto.specialProperty = 420;
        await repository.save([post, specialPhoto]);
        // Retrieve them back from the DB.
        const contents = await repository.find();
        (0, chai_1.expect)(contents.length).to.equal(2);
        (0, chai_1.expect)(contents.find((content) => content instanceof Post_1.Post)).not
            .to.be.undefined;
        (0, chai_1.expect)(contents.find((content) => content instanceof SpecialPhoto_1.SpecialPhoto)).not.to.be.undefined;
    })));
});
//# sourceMappingURL=issue-2927.js.map