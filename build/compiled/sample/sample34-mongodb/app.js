"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const index_1 = require("../../src/index");
const Post_1 = require("./entity/Post");
const options = {
    type: "mongodb",
    host: "localhost",
    database: "test",
    logging: ["query", "error"],
    // synchronize: true,
    entities: [Post_1.Post],
};
const dataSource = new index_1.DataSource(options);
dataSource.initialize().then(async (dataSource) => {
    const post = new Post_1.Post();
    post.text = "Hello how are you?";
    post.title = "hello";
    post.likesCount = 100;
    await dataSource.getRepository(Post_1.Post).save(post);
    console.log("Post has been saved: ", post);
    const loadedPost = await dataSource.getRepository(Post_1.Post).findOneBy({
        text: "Hello how are you?",
    });
    console.log("Post has been loaded: ", loadedPost);
    // take last 5 of saved posts
    const allPosts = await dataSource.getRepository(Post_1.Post).find({ take: 5 });
    console.log("All posts: ", allPosts);
    // perform mongodb-specific query using cursor which returns properly initialized entities
    const cursor1 = dataSource
        .getMongoRepository(Post_1.Post)
        .createEntityCursor({ title: "hello" });
    console.log("Post retrieved via cursor #1: ", await cursor1.next());
    console.log("Post retrieved via cursor #2: ", await cursor1.next());
    // we can also perform mongodb-specific queries using mongodb-specific entity manager
    const cursor2 = dataSource.mongoManager.createEntityCursor(Post_1.Post, {
        title: "hello",
    });
    console.log("Only two posts retrieved via cursor: ", await cursor2.limit(2).toArray());
}, (error) => console.log("Error: ", error));
//# sourceMappingURL=app.js.map