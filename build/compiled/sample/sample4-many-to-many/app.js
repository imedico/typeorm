"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const index_1 = require("../../src/index");
const Post_1 = require("./entity/Post");
const PostDetails_1 = require("./entity/PostDetails");
const options = {
    type: "mssql",
    host: "192.168.1.10",
    username: "sa",
    password: "admin12345",
    database: "test",
    logging: ["query", "error"],
    synchronize: true,
    entities: [__dirname + "/entity/*"],
};
const dataSource = new index_1.DataSource(options);
dataSource.initialize().then((dataSource) => {
    let details1 = new PostDetails_1.PostDetails();
    details1.comment = "People";
    let details2 = new PostDetails_1.PostDetails();
    details2.comment = "Human";
    let post = new Post_1.Post();
    post.text = "Hello how are you?";
    post.title = "hello";
    post.details = [details1, details2];
    let postRepository = dataSource.getRepository(Post_1.Post);
    postRepository
        .save(post)
        .then((post) => console.log("Post has been saved"))
        .catch((error) => console.log("Cannot save. Error: ", error));
}, (error) => console.log("Cannot connect: ", error));
//# sourceMappingURL=app.js.map