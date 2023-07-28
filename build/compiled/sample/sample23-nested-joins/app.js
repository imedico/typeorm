"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const index_1 = require("../../src/index");
const Post_1 = require("./entity/Post");
const Author_1 = require("./entity/Author");
const Category_1 = require("./entity/Category");
const options = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin",
    database: "test",
    logging: ["query", "error"],
    synchronize: true,
    entities: [Post_1.Post, Author_1.Author, Category_1.Category],
};
const dataSource = new index_1.DataSource(options);
dataSource.initialize().then((dataSource) => {
    let postRepository = dataSource.getRepository(Post_1.Post);
    let category1 = new Category_1.Category();
    category1.name = "category #1";
    let category2 = new Category_1.Category();
    category2.name = "category #2";
    let post = new Post_1.Post();
    post.text = "Hello how are you?";
    post.title = "hello";
    post.categories = [category1, category2];
    let author = new Author_1.Author();
    author.name = "Umed";
    post.author = author;
    let author2 = new Author_1.Author();
    author2.name = "Bakhrom";
    postRepository
        .save(post)
        .then((post) => {
        return postRepository
            .createQueryBuilder("post")
            .leftJoin("post.categories", "categories")
            .leftJoin("categories.author", "author")
            .where("post.id=1")
            .getOne();
    })
        .then((loadedPost) => {
        console.log("loadedPosts: ", loadedPost);
        console.log("Lets update a post - add a new category and change author");
        let category3 = new Category_1.Category();
        category3.name = "category #3";
        post.categories.push(category3);
        post.author = author2;
        return postRepository.save(post);
    })
        .then((updatedPost) => {
        return postRepository
            .createQueryBuilder("post")
            .leftJoinAndSelect("post.author", "author")
            .leftJoinAndSelect("post.categories", "categories")
            .where("post.id=:id", { id: post.id })
            .getOne();
    })
        .then((loadedPost) => {
        console.log(loadedPost);
        console.log("Lets update a post - return old author back:");
        console.log("updating with: ", author);
        loadedPost.title = "Umed's post";
        loadedPost.author = author;
        return postRepository.save(loadedPost);
    })
        .then((updatedPost) => {
        return postRepository
            .createQueryBuilder("post")
            .leftJoinAndSelect("post.author", "author")
            .leftJoinAndSelect("post.categories", "categories")
            .where("post.id=:id", { id: post.id })
            .getOne();
    })
        .then((loadedPost) => {
        console.log(loadedPost);
        console.log("Now lets remove post's author:");
        post.author = null;
        return postRepository.save(post);
    })
        .then((updatedPost) => {
        return postRepository
            .createQueryBuilder("post")
            .leftJoinAndSelect("post.author", "author")
            .leftJoinAndSelect("post.categories", "categories")
            .where("post.id=:id", { id: post.id })
            .getOne();
    })
        .then((loadedPost) => {
        console.log(loadedPost);
        console.log("Finally bakhrom's post:");
        post.author = author2;
        return postRepository.save(post);
    })
        .then((updatedPost) => {
        return postRepository
            .createQueryBuilder("post")
            .leftJoinAndSelect("post.author", "author")
            .leftJoinAndSelect("post.categories", "categories")
            .where("post.id=:id", { id: post.id })
            .getOne();
    })
        .then((loadedPost) => {
        console.log(loadedPost);
    })
        .catch((error) => console.log(error.stack));
}, (error) => console.log("Cannot connect: ", error));
//# sourceMappingURL=app.js.map