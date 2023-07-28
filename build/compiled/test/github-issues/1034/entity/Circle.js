"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Circle = void 0;
const tslib_1 = require("tslib");
const User_1 = require("./User");
const Entity_1 = require("../../../../src/decorator/entity/Entity");
const PrimaryGeneratedColumn_1 = require("../../../../src/decorator/columns/PrimaryGeneratedColumn");
const ManyToMany_1 = require("../../../../src/decorator/relations/ManyToMany");
const JoinTable_1 = require("../../../../src/decorator/relations/JoinTable");
let Circle = class Circle {
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
     * Setter user
     *
     * @param {Promise<User[]>} users
     */
    setUsers(users) {
        this.users = users;
    }
    /**
     * Getter user
     *
     * @returns {User[]}
     */
    getUsers() {
        return this.users;
    }
};
tslib_1.__decorate([
    (0, PrimaryGeneratedColumn_1.PrimaryGeneratedColumn)({ type: "bigint" }),
    tslib_1.__metadata("design:type", String)
], Circle.prototype, "id", void 0);
tslib_1.__decorate([
    (0, ManyToMany_1.ManyToMany)((type) => User_1.User, (user) => "circles"),
    (0, JoinTable_1.JoinTable)({ name: "circle_users_user" }),
    tslib_1.__metadata("design:type", Promise)
], Circle.prototype, "users", void 0);
Circle = tslib_1.__decorate([
    (0, Entity_1.Entity)()
], Circle);
exports.Circle = Circle;
//# sourceMappingURL=Circle.js.map