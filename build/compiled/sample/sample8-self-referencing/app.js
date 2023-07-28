"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const index_1 = require("../../src/index");
const Category_1 = require("./entity/Category");
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
    let categoryRepository = dataSource.getRepository(Category_1.Category);
    let category1 = new Category_1.Category();
    category1.name = "category #1";
    let mainCategory = new Category_1.Category();
    mainCategory.manyCategories = [];
    mainCategory.name = "main category";
    mainCategory.oneCategory = category1;
    mainCategory.manyCategories.push(category1);
    mainCategory.oneManyCategory = category1;
    categoryRepository
        .save(mainCategory)
        .then((savedCategory) => {
        console.log("saved category: ", savedCategory);
    })
        .catch((error) => console.log("Cannot save. Error: ", error.stack ? error.stack : error));
}, (error) => console.log("Cannot connect: ", error.stack ? error.stack : error));
//# sourceMappingURL=app.js.map