"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const index_1 = require("../../src/index");
const Post_1 = require("./entity/Post");
const PostCategory_1 = require("./entity/PostCategory");
const PostAuthor_1 = require("./entity/PostAuthor");
const EverythingSubscriber_1 = require("./subscriber/EverythingSubscriber");
// first create a connection
const options = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin",
    database: "test",
    synchronize: true,
    entities: [Post_1.Post, PostAuthor_1.PostAuthor, PostCategory_1.PostCategory],
    subscribers: [EverythingSubscriber_1.EverythingSubscriber],
};
const dataSource = new index_1.DataSource(options);
dataSource.initialize().then((dataSource) => {
    let category1 = new PostCategory_1.PostCategory();
    category1.name = "post category #1";
    let category2 = new PostCategory_1.PostCategory();
    category2.name = "post category #2";
    let author = new PostAuthor_1.PostAuthor();
    author.name = "Umed";
    let post = new Post_1.Post();
    post.text = "Hello how are you?";
    post.title = "hello";
    post.categories.push(category1, category2);
    post.author = author;
    let postRepository = dataSource.getRepository(Post_1.Post);
    postRepository
        .save(post)
        .then((post) => {
        console.log("Post has been saved");
        return postRepository.findOneBy({ id: post.id });
    })
        .then((loadedPost) => {
        console.log("---------------------------");
        console.log("post is loaded. Lets now load it with relations.");
        return postRepository
            .createQueryBuilder("p")
            .leftJoinAndSelect("p.author", "author")
            .leftJoinAndSelect("p.categories", "categories")
            .where("p.id = :id", { id: loadedPost.id })
            .getOne();
    })
        .then((loadedPost) => {
        console.log("---------------------------");
        console.log("load finished. Now lets update entity");
        loadedPost.text = "post updated";
        loadedPost.author.name = "Bakha";
        return postRepository.save(loadedPost);
    })
        .then((loadedPost) => {
        console.log("---------------------------");
        console.log("update finished. Now lets remove entity");
        return postRepository.remove(loadedPost);
    })
        .then((loadedPost) => {
        console.log("---------------------------");
        console.log("post removed.");
    })
        .catch((error) => console.log("Cannot save. Error: ", error.stack ? error.stack : error));
}, (error) => console.log("Cannot connect: ", error.stack ? error.stack : error));
//# sourceMappingURL=app.js.map