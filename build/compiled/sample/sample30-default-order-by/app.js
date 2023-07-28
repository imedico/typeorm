"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const index_1 = require("../../src/index");
const Post_1 = require("./entity/Post");
const Category_1 = require("./entity/Category");
const options = {
    type: "sqlite",
    database: "temp/sqlitedb.db",
    logging: ["query", "error"],
    synchronize: true,
    entities: [Post_1.Post, Category_1.Category],
};
const dataSource = new index_1.DataSource(options);
dataSource
    .initialize()
    .then(async (dataSource) => {
    let postRepository = dataSource.getRepository(Post_1.Post);
    let post1 = new Post_1.Post("Me", "hello me", [
        new Category_1.Category("programming"),
        new Category_1.Category("family"),
        new Category_1.Category("chocolate"),
    ]);
    let post2 = new Post_1.Post("Zorro", "hello zorro", [
        new Category_1.Category("woman"),
        new Category_1.Category("money"),
        new Category_1.Category("weapon"),
    ]);
    let post3 = new Post_1.Post("About earth", "hello earth", [
        new Category_1.Category("kids"),
        new Category_1.Category("people"),
        new Category_1.Category("animals"),
    ]);
    let post4 = new Post_1.Post("Zorro", "hello zorro", [
        new Category_1.Category("woman"),
        new Category_1.Category("money"),
        new Category_1.Category("weapon"),
    ]);
    console.log("saving posts");
    await postRepository.save([post1, post2, post3, post4]);
    console.log("loading the post. pay attention on order: ");
    const allPosts = await postRepository.find();
    console.log(allPosts);
})
    .catch((error) => console.log("Error: ", error));
//# sourceMappingURL=app.js.map