"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const index_1 = require("../../src/index");
const Post_1 = require("./entity/Post");
const PostCategory_1 = require("./entity/PostCategory");
const PostAuthor_1 = require("./entity/PostAuthor");
const Blog_1 = require("./entity/Blog");
const options = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin",
    database: "test",
    synchronize: true,
    entities: [__dirname + "/entity/*"],
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
    post.author = author;
    post.categories.push(category1, category2);
    /*category1 = new PostCategory();
category1.name = "post category #1";

category2 = new PostCategory();
category2.name = "post category #2";

author = new PostAuthor();
author.name = "Umed";*/
    let blog = new Blog_1.Blog();
    blog.text = "Hello how are you?";
    blog.title = "hello";
    blog.author = author;
    blog.categories.push(category1, category2);
    let postRepository = dataSource.getRepository(Post_1.Post);
    let blogRepository = dataSource.getRepository(Blog_1.Blog);
    postRepository
        .save(post)
        .then((post) => {
        console.log("Post has been saved");
        return postRepository.findOneBy({ id: post.id });
    })
        .then((loadedPost) => {
        console.log("post is loaded: ", loadedPost);
        return blogRepository.save(blog);
    })
        .then((blog) => {
        console.log("Blog has been saved");
        return blogRepository.findOneBy({ id: blog.id });
    })
        .then((loadedBlog) => {
        console.log("blog is loaded: ", loadedBlog);
        return blogRepository.save(blog);
    })
        .catch((error) => console.log("Cannot save. Error: ", error.stack ? error.stack : error));
}, (error) => console.log("Cannot connect: ", error.stack ? error.stack : error));
//# sourceMappingURL=app.js.map