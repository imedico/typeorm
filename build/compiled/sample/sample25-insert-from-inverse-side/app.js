"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const index_1 = require("../../src/index");
const Post_1 = require("./entity/Post");
const Author_1 = require("./entity/Author");
const options = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin",
    database: "test",
    logging: ["query", "error"],
    synchronize: true,
    entities: [Post_1.Post, Author_1.Author],
};
const dataSource = new index_1.DataSource(options);
dataSource.initialize().then((dataSource) => {
    let postRepository = dataSource.getRepository(Post_1.Post);
    let authorRepository = dataSource.getRepository(Author_1.Author);
    const authorPromise = authorRepository
        .findOneBy({ id: 1 })
        .then((author) => {
        if (!author) {
            author = new Author_1.Author();
            author.name = "Umed";
            return authorRepository.save(author).then((savedAuthor) => {
                return authorRepository.findOneBy({ id: 1 });
            });
        }
        return author;
    });
    const postPromise = postRepository.findOneBy({ id: 1 }).then((post) => {
        if (!post) {
            post = new Post_1.Post();
            post.title = "Hello post";
            post.text = "This is post contents";
            return postRepository.save(post).then((savedPost) => {
                return postRepository.findOneBy({ id: 1 });
            });
        }
        return post;
    });
    return Promise.all([authorPromise, postPromise])
        .then((results) => {
        const [author, post] = results;
        author.posts = [post];
        return authorRepository.save(author);
    })
        .then((savedAuthor) => {
        console.log("Author has been saved: ", savedAuthor);
    })
        .catch((error) => console.log(error.stack));
}, (error) => console.log("Cannot connect: ", error));
//# sourceMappingURL=app.js.map