"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const index_1 = require("../../src/index");
const Post_1 = require("./entity/Post");
const Author_1 = require("./entity/Author");
const Category_1 = require("./entity/Category");
const options = {
    type: "sqlite",
    database: "temp/sqlitedb.db",
    entityPrefix: "samples_",
    synchronize: true,
    logging: ["query", "error"],
    entities: [Post_1.Post, Author_1.Author, Category_1.Category],
};
const dataSource = new index_1.DataSource(options);
dataSource
    .initialize()
    .then(async (dataSource) => {
    let category1 = new Category_1.Category();
    category1.name = "Animals";
    let category2 = new Category_1.Category();
    category2.name = "People";
    let author = new Author_1.Author();
    author.firstName = "Umed";
    author.lastName = "Khudoiberdiev";
    let post = new Post_1.Post();
    post.text = "Hello how are you?";
    post.title = "hello";
    post.author = author;
    post.categories = [category1, category2];
    let postRepository = dataSource.getRepository(Post_1.Post);
    await postRepository.save(post);
    console.log("Post has been saved");
})
    .catch((error) => console.log("Error: ", error));
//# sourceMappingURL=app.js.map