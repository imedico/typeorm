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
    synchronize: true,
    logging: ["query", "error"],
    entities: [Post_1.Post, Author_1.Author],
};
const dataSource = new index_1.DataSource(options);
dataSource
    .initialize()
    .then(async (dataSource) => {
    // first insert all the data
    let author = new Author_1.Author();
    author.firstName = "Umed";
    author.lastName = "Khudoiberdiev";
    let post = new Post_1.Post();
    post.title = "hello";
    post.author = author;
    let postRepository = dataSource.getRepository(Post_1.Post);
    await postRepository.save(post);
    console.log("Database schema was created and data has been inserted into the database.");
    // close connection now
    await dataSource.destroy();
    // now re-initialize data source
    dataSource = new index_1.DataSource({
        type: "mysql",
        name: "mysql",
        host: "localhost",
        port: 3306,
        username: "test",
        password: "test",
        database: "test",
        logging: ["query", "error"],
        entities: [Post_1.Post, Author_1.Author],
        migrations: [__dirname + "/migrations/*{.js,.ts}"],
    });
    await dataSource.initialize();
    // run all migrations
    await dataSource.runMigrations();
    // and undo migrations two times (because we have two migrations)
    await dataSource.undoLastMigration();
    await dataSource.undoLastMigration();
    console.log("Done. We run two migrations then reverted them.");
})
    .catch((error) => console.log("Error: ", error));
//# sourceMappingURL=app.js.map