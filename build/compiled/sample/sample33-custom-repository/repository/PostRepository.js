"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRepository = void 0;
const Post_1 = require("../entity/Post");
const connection_1 = require("../connection");
exports.PostRepository = connection_1.Sample33CustomRepositoryConnection.getRepository(Post_1.Post).extend({
    findMyPost() {
        return this.findOne();
    },
});
//# sourceMappingURL=PostRepository.js.map