"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const index_1 = require("../../src/index");
const Post_1 = require("./entity/Post");
const options = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin",
    database: "test",
    logging: ["query", "error"],
    synchronize: true,
    entities: [Post_1.Post],
};
const dataSource = new index_1.DataSource(options);
dataSource.initialize().then(async (dataSource) => {
    let postRepository = dataSource.getRepository(Post_1.Post);
    const post = new Post_1.Post();
    post.id = 1;
    post.type = "person";
    post.text = "this is test post!";
    console.log("saving the post: ");
    await postRepository.save(post);
    console.log("Post has been saved: ", post);
    console.log("now loading the post: ");
    const loadedPost = await postRepository.findOneBy({
        id: 1,
        type: "person",
    });
    console.log("loaded post: ", loadedPost);
}, (error) => console.log("Error: ", error));
//# sourceMappingURL=app.js.map