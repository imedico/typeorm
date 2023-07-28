"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostCategory = exports.uppercase = void 0;
const tslib_1 = require("tslib");
const ViewColumn_1 = require("../../../../../src/decorator/columns/ViewColumn");
const ViewEntity_1 = require("../../../../../src/decorator/entity-view/ViewEntity");
exports.uppercase = {
    to: (entityValue) => { },
    from: (databaseValue) => databaseValue.toLocaleUpperCase(),
};
let PostCategory = class PostCategory {
};
tslib_1.__decorate([
    (0, ViewColumn_1.ViewColumn)(),
    tslib_1.__metadata("design:type", Number)
], PostCategory.prototype, "id", void 0);
tslib_1.__decorate([
    (0, ViewColumn_1.ViewColumn)({ name: "name" }),
    tslib_1.__metadata("design:type", String)
], PostCategory.prototype, "postName", void 0);
tslib_1.__decorate([
    (0, ViewColumn_1.ViewColumn)({ transformer: exports.uppercase }),
    tslib_1.__metadata("design:type", String)
], PostCategory.prototype, "categoryName", void 0);
PostCategory = tslib_1.__decorate([
    (0, ViewEntity_1.ViewEntity)({
        expression: `
    SELECT \`post\`.\`id\` \`id\`, \`post\`.\`name\` AS \`name\`, \`category\`.\`name\` AS \`categoryName\`
    FROM \`post\` \`post\`
    LEFT JOIN \`category\` \`category\` ON \`post\`.\`categoryId\` = \`category\`.\`id\`
`,
    })
], PostCategory);
exports.PostCategory = PostCategory;
//# sourceMappingURL=PostCategory.js.map