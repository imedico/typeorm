"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const index_1 = require("../../src/index");
const Post_1 = require("./entity/Post");
const Question_1 = require("./entity/Question");
const Counters_1 = require("./entity/Counters");
const options = {
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "admin",
    database: "test",
    logging: ["query", "error"],
    synchronize: true,
    entities: [Post_1.Post, Question_1.Question, Counters_1.Counters],
};
const dataSource = new index_1.DataSource(options);
dataSource.initialize().then((dataSource) => {
    let questionRepository = dataSource.getRepository(Question_1.Question);
    const question = new Question_1.Question();
    question.title = "Hello question!";
    question.counters = new Counters_1.Counters();
    question.counters.stars = 5;
    question.counters.raiting = 10;
    question.counters.commentCount = 3;
    question.counters.metadata = "#question #question-counter";
    questionRepository
        .save(question)
        .then((savedQuestion) => {
        console.log("question has been saved: ", savedQuestion);
        // lets load it now:
        return questionRepository.findOneBy({
            id: savedQuestion.id,
        });
    })
        .then((loadedQuestion) => {
        console.log("question has been loaded: ", loadedQuestion);
        loadedQuestion.counters.commentCount = 7;
        loadedQuestion.counters.metadata = "#updated question";
        return questionRepository.save(loadedQuestion);
    })
        .then((updatedQuestion) => {
        console.log("question has been updated: ", updatedQuestion);
    })
        .catch((e) => console.log(e));
}, (error) => console.log("Cannot connect: ", error));
//# sourceMappingURL=app.js.map