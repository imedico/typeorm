"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const index_1 = require("../../src/index");
const Post_1 = require("./entity/Post");
const CustomNamingStrategy_1 = require("./naming-strategy/CustomNamingStrategy");
const options = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin",
    database: "test",
    synchronize: true,
    namingStrategy: new CustomNamingStrategy_1.CustomNamingStrategy(),
    entities: [Post_1.Post],
};
const dataSource = new index_1.DataSource(options);
dataSource.initialize().then((dataSource) => {
    let post = new Post_1.Post();
    post.text = "Hello how are you?";
    post.title = "hello";
    let postRepository = dataSource.getRepository(Post_1.Post);
    postRepository
        .save(post)
        .then((post) => console.log("Post has been saved"))
        .catch((error) => console.log("Cannot save. Error: ", error));
}, (error) => console.log("Cannot connect: ", error));
//# sourceMappingURL=app.js.map