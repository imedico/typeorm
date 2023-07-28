"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const Post_1 = require("./entity/Post");
const Author_1 = require("./entity/Author");
const PostRepository_1 = require("./repository/PostRepository");
const User_1 = require("./entity/User");
const connection_1 = require("./connection");
// testing dynamic options set
connection_1.Sample33CustomRepositoryConnection.setOptions({
    entities: [Post_1.Post, Author_1.Author, User_1.User],
});
connection_1.Sample33CustomRepositoryConnection.connect()
    .then(async () => {
    const post = PostRepository_1.PostRepository.create();
    post.title = "Hello Custom Repositories!";
    await PostRepository_1.PostRepository.save(post);
    const loadedPost = await PostRepository_1.PostRepository.findMyPost();
    console.log("Post persisted! Loaded post: ", loadedPost);
})
    .catch((error) => console.log("Error: ", error));
//# sourceMappingURL=app.js.map