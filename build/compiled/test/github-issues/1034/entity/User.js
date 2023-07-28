"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const tslib_1 = require("tslib");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const ManyToMany_1 = require("../../../../src/decorator/relations/ManyToMany");
const Circle_1 = require("./Circle");
let User = class User {
    /**
     * Getter identifier
     *
     * @returns {number}
     */
    getId() {
        return this.id;
    }
    /**
     * Setter identifier
     *
     * @param id new identifier value
     */
    setId(id) {
        this.id = id;
    }
    /**
     * Getter circles
     *
     * @returns {Circle[]}
     */
    getCircles() {
        return this.circles;
    }
    /**
     * Setter circle
     *
     * @param circles new circle value
     */
    setCircles(circles) {
        this.circles = circles;
    }
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)({ type: "bigint" }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "id", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => Circle_1.Circle, (circle) => "users"),
    tslib_1.__metadata("design:type", Promise)
], User.prototype, "circles", void 0);
User = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map