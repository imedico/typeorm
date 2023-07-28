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
    let author = new Author_1.Author();
    author.name = "Umed";
    let category1 = new Category_1.Category();
    category1.name = "Category #1";
    let category2 = new Category_1.Category();
    category2.name = "Category #2";
    let post = new Post_1.Post();
    post.text = "Hello how are you?";
    post.title = "hello";
    post.author = author;
    post.categories = [category1, category2];
    postRepository
        .save(post)
        .then((post) => {
        console.log("Post has been saved. Lets load it now.");
        return postRepository.find({
            join: {
                alias: "post",
                leftJoinAndSelect: {
                    categories: "post.categories",
                    author: "post.user", // note that table column is used, not object property
                },
            },
        });
    })
        .then((loadedPosts) => {
        console.log("loadedPosts: ", loadedPosts);
    })
        .catch((error) => console.log(error.stack));
}, (error) => console.log("Cannot connect: ", error));
//# sourceMappingURL=app.js.map