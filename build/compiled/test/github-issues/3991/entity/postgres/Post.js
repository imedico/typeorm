"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../../src");
let Post = class Post {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Post.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "date", default: () => "CURRENT_DATE" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col1", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "date", default: () => "current_date" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col2", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "time", default: () => "CURRENT_TIME" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col3", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "time", default: () => "CURRENT_TIME(3)" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col4", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "time", default: () => "current_time" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col5", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col6", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(3)" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col7", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "timestamp", default: () => "current_timestamp" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col8", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "timestamp", default: () => "NOW()" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col9", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "time", default: () => "LOCALTIME" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col10", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "time", default: () => "LOCALTIME(3)" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col11", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "time", default: () => "localtime" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col12", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "timestamp", default: () => "LOCALTIMESTAMP" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col13", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "timestamp", default: () => "LOCALTIMESTAMP(3)" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col14", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ type: "timestamp", default: () => "localtimestamp" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col15", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)({ type: "date", default: () => "CURRENT_DATE" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col16", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)({ type: "date", default: () => "current_date" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col17", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)({ type: "time", default: () => "CURRENT_TIME" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col18", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)({ type: "time", default: () => "CURRENT_TIME(3)" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col19", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)({ type: "time", default: () => "current_time" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col20", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col21", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(3)",
    }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col22", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)({ type: "timestamp", default: () => "current_timestamp" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col23", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)({ type: "timestamp", default: () => "NOW()" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col24", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)({ type: "time", default: () => "LOCALTIME" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col25", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)({ type: "time", default: () => "LOCALTIME(3)" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col26", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)({ type: "time", default: () => "localtime" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col27", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)({ type: "timestamp", default: () => "LOCALTIMESTAMP" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col28", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)({ type: "timestamp", default: () => "LOCALTIMESTAMP(3)" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col29", void 0);
tslib_1.__decorate([
    (0, src_1.CreateDateColumn)({ type: "timestamp", default: () => "localtimestamp" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col30", void 0);
tslib_1.__decorate([
    (0, src_1.UpdateDateColumn)({ type: "date", default: () => "CURRENT_DATE" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col31", void 0);
tslib_1.__decorate([
    (0, src_1.UpdateDateColumn)({ type: "date", default: () => "current_date" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col32", void 0);
tslib_1.__decorate([
    (0, src_1.UpdateDateColumn)({ type: "time", default: () => "CURRENT_TIME" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col33", void 0);
tslib_1.__decorate([
    (0, src_1.UpdateDateColumn)({ type: "time", default: () => "CURRENT_TIME(3)" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col34", void 0);
tslib_1.__decorate([
    (0, src_1.UpdateDateColumn)({ type: "time", default: () => "current_time" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col35", void 0);
tslib_1.__decorate([
    (0, src_1.UpdateDateColumn)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col36", void 0);
tslib_1.__decorate([
    (0, src_1.UpdateDateColumn)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(3)",
    }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col37", void 0);
tslib_1.__decorate([
    (0, src_1.UpdateDateColumn)({ type: "timestamp", default: () => "current_timestamp" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col38", void 0);
tslib_1.__decorate([
    (0, src_1.UpdateDateColumn)({ type: "timestamp", default: () => "NOW()" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col39", void 0);
tslib_1.__decorate([
    (0, src_1.UpdateDateColumn)({ type: "time", default: () => "LOCALTIME" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col40", void 0);
tslib_1.__decorate([
    (0, src_1.UpdateDateColumn)({ type: "time", default: () => "LOCALTIME(3)" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col41", void 0);
tslib_1.__decorate([
    (0, src_1.UpdateDateColumn)({ type: "time", default: () => "localtime" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col42", void 0);
tslib_1.__decorate([
    (0, src_1.UpdateDateColumn)({ type: "timestamp", default: () => "LOCALTIMESTAMP" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col43", void 0);
tslib_1.__decorate([
    (0, src_1.UpdateDateColumn)({ type: "timestamp", default: () => "LOCALTIMESTAMP(3)" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col44", void 0);
tslib_1.__decorate([
    (0, src_1.UpdateDateColumn)({ type: "timestamp", default: () => "localtimestamp" }),
    tslib_1.__metadata("design:type", Date)
], Post.prototype, "col45", void 0);
Post = tslib_1.__decorate([
    (0, src_1.Entity)()
], Post);
exports.Post = Post;
//# sourceMappingURL=Post.js.map