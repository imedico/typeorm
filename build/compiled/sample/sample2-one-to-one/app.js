"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const index_1 = require("../../src/index");
const Post_1 = require("./entity/Post");
const PostDetails_1 = require("./entity/PostDetails");
const PostCategory_1 = require("./entity/PostCategory");
const PostMetadata_1 = require("./entity/PostMetadata");
const PostImage_1 = require("./entity/PostImage");
const PostInformation_1 = require("./entity/PostInformation");
const PostAuthor_1 = require("./entity/PostAuthor");
const options = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin",
    database: "test",
    logging: ["query", "error"],
    synchronize: true,
    entities: [
        Post_1.Post,
        PostDetails_1.PostDetails,
        PostCategory_1.PostCategory,
        PostMetadata_1.PostMetadata,
        PostImage_1.PostImage,
        PostInformation_1.PostInformation,
        PostAuthor_1.PostAuthor,
    ],
};
const dataSource = new index_1.DataSource(options);
dataSource.initialize().then((dataSource) => {
    let details = new PostDetails_1.PostDetails();
    details.authorName = "Umed";
    details.comment = "about post";
    details.metadata = "post,details,one-to-one";
    let post = new Post_1.Post();
    post.text = "hello how are you?";
    post.title = "hello";
    post.details = details;
    let postRepository = dataSource.getRepository(Post_1.Post);
    postRepository
        .save(post)
        .then((post) => {
        console.log("Post has been saved. Lets try to find this post using query builder: ");
        return postRepository
            .createQueryBuilder("post")
            .where("post.title=:keyword")
            .setParameter("keyword", "hello")
            .getMany();
    })
        .then((post) => {
        console.log("Loaded post: ", post);
    })
        .catch((error) => console.log("Cannot save. Error: ", error));
}, (error) => console.log("Cannot connect: ", error));
//# sourceMappingURL=app.js.map