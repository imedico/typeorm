"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const index_1 = require("../../src/index");
const Post_1 = require("./entity/Post");
const options = {
    name: "sap",
    type: "sap",
    host: "192.168.56.102",
    port: 39015,
    username: "SYSTEM",
    password: "MySuperHanaPwd123!",
    database: "HXE",
    logging: true,
    synchronize: true,
    entities: [Post_1.Post],
};
const dataSource = new index_1.DataSource(options);
dataSource.initialize().then(async (dataSource) => {
    let post = new Post_1.Post();
    post.text = "Hello how are you?";
    post.title = "hello";
    post.likesCount = 100;
    let postRepository = dataSource.getRepository(Post_1.Post);
    postRepository
        .save(post)
        .then((post) => console.log("Post has been saved: ", post))
        .catch((error) => console.log("Cannot save. Error: ", error));
}, (error) => console.log("Cannot connect: ", error));
//# sourceMappingURL=app.js.map