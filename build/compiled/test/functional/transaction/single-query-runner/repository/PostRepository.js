"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRepository = void 0;
const tslib_1 = require("tslib");
const AbstractRepository_1 = require("../../../../../src/repository/AbstractRepository");
const EntityRepository_1 = require("../../../../../src/decorator/EntityRepository");
let PostRepository = class PostRepository extends AbstractRepository_1.AbstractRepository {
    save(post) {
        return this.manager.save(post);
    }
    getManager() {
        return this.manager;
    }
};
PostRepository = tslib_1.__decorate([
    (0, EntityRepository_1.EntityRepository)()
], PostRepository);
exports.PostRepository = PostRepository;
//# sourceMappingURL=PostRepository.js.map