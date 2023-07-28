"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../utils/test-utils");
const PhoneBook_1 = require("./entity/PhoneBook");
const Post_1 = require("./entity/Post");
const User_1 = require("./entity/User");
const Category_1 = require("./entity/Category");
const View_1 = require("./entity/View");
const chai_1 = require("chai");
describe("columns > value-transformer functionality", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Post_1.Post, PhoneBook_1.PhoneBook, User_1.User, Category_1.Category, View_1.View],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should marshal data using the provided value-transformer", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        // create and save a post first
        const post = new Post_1.Post();
        post.title = "About columns";
        post.tags = ["simple", "transformer"];
        await postRepository.save(post);
        // then update all its properties and save again
        post.title = "About columns1";
        post.tags = ["very", "simple"];
        await postRepository.save(post);
        // check if all columns are updated except for readonly columns
        const loadedPost = await postRepository.findOneBy({
            id: post.id,
        });
        (0, chai_1.expect)(loadedPost.title).to.be.equal("About columns1");
        (0, chai_1.expect)(loadedPost.tags).to.deep.eq(["very", "simple"]);
        const phoneBookRepository = connection.getRepository(PhoneBook_1.PhoneBook);
        const phoneBook = new PhoneBook_1.PhoneBook();
        phoneBook.name = "George";
        phoneBook.phones = new Map();
        phoneBook.phones.set("work", 123456);
        phoneBook.phones.set("mobile", 1234567);
        await phoneBookRepository.save(phoneBook);
        const loadedPhoneBook = await phoneBookRepository.findOneBy({
            id: phoneBook.id,
        });
        (0, chai_1.expect)(loadedPhoneBook.name).to.be.equal("George");
        (0, chai_1.expect)(loadedPhoneBook.phones).not.to.be.undefined;
        (0, chai_1.expect)(loadedPhoneBook.phones.get("work")).to.equal(123456);
        (0, chai_1.expect)(loadedPhoneBook.phones.get("mobile")).to.equal(1234567);
    })));
    it("should apply three transformers in the right order", () => Promise.all(connections.map(async (connection) => {
        const userRepository = await connection.getRepository(User_1.User);
        const email = `${connection.name}@JOHN.doe`;
        const user = new User_1.User();
        user.email = email;
        await userRepository.save(user);
        const dbUser = await userRepository.findOneBy({ id: user.id });
        dbUser && dbUser.email.should.be.eql(email.toLocaleLowerCase());
    })));
    it("should apply all the transformers", () => Promise.all(connections.map(async (connection) => {
        const categoryRepository = await connection.getRepository(Category_1.Category);
        const description = `  ${connection.name}-DESCRIPTION   `;
        const category = new Category_1.Category();
        category.description = description;
        await categoryRepository.save(category);
        const dbCategory = await categoryRepository.findOneBy({
            id: category.id,
        });
        dbCategory &&
            dbCategory.description.should.be.eql(description.toLocaleLowerCase().trim());
    })));
    it("should apply no transformer", () => Promise.all(connections.map(async (connection) => {
        const viewRepository = await connection.getRepository(View_1.View);
        const title = `${connection.name}`;
        const view = new View_1.View();
        view.title = title;
        await viewRepository.save(view);
        const dbView = await viewRepository.findOneBy({ id: view.id });
        dbView && dbView.title.should.be.eql(title);
    })));
    it("should marshal data using a complex value-transformer", () => Promise.all(connections.map(async (connection) => {
        const postRepository = connection.getRepository(Post_1.Post);
        // create and save a post first
        const post = new Post_1.Post();
        post.title = "Complex transformers!";
        post.tags = ["complex", "transformer"];
        await postRepository.save(post);
        let loadedPost = await postRepository.findOneBy({ id: post.id });
        (0, chai_1.expect)(loadedPost.complex).to.eq(null);
        // then update all its properties and save again
        post.title = "Complex transformers2!";
        post.tags = ["very", "complex", "actually"];
        post.complex = new Post_1.Complex("3 2.5");
        await postRepository.save(post);
        // check if all columns are updated except for readonly columns
        loadedPost = await postRepository.findOneBy({ id: post.id });
        (0, chai_1.expect)(loadedPost.title).to.be.equal("Complex transformers2!");
        (0, chai_1.expect)(loadedPost.tags).to.deep.eq([
            "very",
            "complex",
            "actually",
        ]);
        (0, chai_1.expect)(loadedPost.complex.x).to.eq(3);
        (0, chai_1.expect)(loadedPost.complex.y).to.eq(2.5);
        // then update all its properties and save again
        post.title = "Complex transformers3!";
        post.tags = ["very", "lacking", "actually"];
        post.complex = null;
        await postRepository.save(post);
        loadedPost = await postRepository.findOneBy({ id: post.id });
        (0, chai_1.expect)(loadedPost.complex).to.eq(null);
        // then update all its properties and save again
        post.title = "Complex transformers4!";
        post.tags = ["very", "here", "again!"];
        post.complex = new Post_1.Complex("0.5 0.5");
        await postRepository.save(post);
        loadedPost = await postRepository.findOneBy({ id: post.id });
        (0, chai_1.expect)(loadedPost.complex.x).to.eq(0.5);
        (0, chai_1.expect)(loadedPost.complex.y).to.eq(0.5);
        // then update all its properties and save again
        post.title = "Complex transformers5!";
        post.tags = ["now", "really", "lacking!"];
        post.complex = new Post_1.Complex("1.05 2.3");
        await postRepository.save(post);
        loadedPost = await postRepository.findOneBy({ id: post.id });
        (0, chai_1.expect)(loadedPost.complex.x).to.eq(1.05);
        (0, chai_1.expect)(loadedPost.complex.y).to.eq(2.3);
    })));
});
//# sourceMappingURL=value-transformer.js.map