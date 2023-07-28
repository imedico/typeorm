"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const index_1 = require("../../src/index");
const Post_1 = require("./entity/Post");
const BasePost_1 = require("./entity/BasePost");
const options = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "test",
    password: "test",
    database: "test",
    logging: ["query", "error"],
    synchronize: true,
    entities: [Post_1.Post, BasePost_1.BasePost],
};
const dataSource = new index_1.DataSource(options);
dataSource.initialize().then((dataSource) => {
    let post = new Post_1.Post();
    post.text = "Hello how are you?";
    post.title = "hello";
    post.likesCount = 0;
    let postRepository = dataSource.getRepository(Post_1.Post);
    postRepository
        .save(post)
        .then((post) => console.log("Post has been saved"));
}, (error) => console.log("Cannot connect: ", error));
//# sourceMappingURL=app.js.map