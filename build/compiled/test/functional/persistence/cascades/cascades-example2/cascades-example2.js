"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../../utils/test-utils");
const Question_1 = require("./entity/Question");
const Answer_1 = require("./entity/Answer");
const Photo_1 = require("./entity/Photo");
const User_1 = require("./entity/User");
describe("persistence > cascades > example 2", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should insert everything by cascades properly", () => Promise.all(connections.map(async (connection) => {
        // not supported in Spanner
        if (connection.driver.options.type === "spanner")
            return;
        const photo = new Photo_1.Photo();
        const user = new User_1.User();
        const answer1 = new Answer_1.Answer();
        answer1.photo = photo;
        answer1.user = user;
        const answer2 = new Answer_1.Answer();
        answer2.photo = photo;
        answer2.user = user;
        const question = new Question_1.Question();
        question.answers = [answer1, answer2];
        user.question = question;
        await connection.manager.save(question);
        const loadedQuestion = await connection.manager
            .createQueryBuilder(Question_1.Question, "question")
            .leftJoinAndSelect("question.answers", "answer")
            .leftJoinAndSelect("answer.photo", "answerPhoto")
            .leftJoinAndSelect("answer.user", "answerUser")
            .leftJoinAndSelect("answerUser.question", "userQuestion")
            .getOne();
        loadedQuestion.should.be.eql({
            id: 1,
            name: "My question",
            answers: [
                {
                    id: 1,
                    photo: {
                        id: 1,
                        name: "My photo",
                    },
                    user: {
                        id: 1,
                        question: {
                            id: 1,
                            name: "My question",
                        },
                    },
                },
                {
                    id: 2,
                    photo: {
                        id: 1,
                        name: "My photo",
                    },
                    user: {
                        id: 1,
                        question: {
                            id: 1,
                            name: "My question",
                        },
                    },
                },
            ],
        });
    })));
});
//# sourceMappingURL=cascades-example2.js.map