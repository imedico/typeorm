"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentParticipant = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../src/index");
let TournamentParticipant = class TournamentParticipant {
};
tslib_1.__decorate([
    (0, index_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], TournamentParticipant.prototype, "id", void 0);
TournamentParticipant = tslib_1.__decorate([
    (0, index_1.Entity)(),
    (0, index_1.TableInheritance)({
        pattern: "STI",
        column: {
            name: "type",
            type: "varchar",
        },
    })
], TournamentParticipant);
exports.TournamentParticipant = TournamentParticipant;
//# sourceMappingURL=TournamentParticipant.js.map