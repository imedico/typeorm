"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const src_1 = require("../../src");
// NOTE: this example is not working yet, only concepts of how this feature must work described here
const PostEntity = new src_1.EntitySchema(require(__dirname +
    "/../../../../sample/sample24-schemas/schemas/post.json"));
const PostDetailsEntity = new src_1.EntitySchema(require(__dirname +
    "/../../../../sample/sample24-schemas/schemas/post-details.json"));
const CategoryEntity = new src_1.EntitySchema(require(__dirname +
    "/../../../../sample/sample24-schemas/schemas/category.json"));
const ImageEntity = new src_1.EntitySchema(require(__dirname +
    "/../../../../sample/sample24-schemas/schemas/image.json"));
const options = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin",
    database: "test",
    synchronize: true,
    // entitySchemaDirectories: [__dirname + "/schemas"],
    entities: [PostEntity, PostDetailsEntity, CategoryEntity, ImageEntity],
};
const dataSource = new src_1.DataSource(options);
dataSource
    .initialize()
    .then((dataSource) => {
    let postRepository = dataSource.getRepository("Post");
    let post = {
        title: "Hello post",
        text: "I am virtual post!",
        details: {
            metadata: "#post,#virtual",
            comment: "it all about a post",
        },
        images: [],
        secondaryImages: [],
        categories: [],
    };
    postRepository
        .save(post)
        .then((result) => {
        console.log(result);
    })
        .catch((error) => console.log(error.stack ? error.stack : error));
})
    .catch((error) => console.log(error.stack ? error.stack : error));
//# sourceMappingURL=app.js.map