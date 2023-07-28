"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentUserParticipant = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../src/index");
const TournamentParticipant_1 = require("./TournamentParticipant");
const User_1 = require("./User");
let TournamentUserParticipant = class TournamentUserParticipant extends TournamentParticipant_1.TournamentParticipant {
    constructor(tournamentUserParticipant) {
        super();
        if (tournamentUserParticipant) {
            this.user = tournamentUserParticipant.user;
        }
    }
};
tslib_1.__decorate([
    (0, index_1.OneToOne)((type) => User_1.User, {
        eager: true,
    }),
    (0, index_1.JoinColumn)(),
    tslib_1.__metadata("design:type", User_1.User)
], TournamentUserParticipant.prototype, "user", void 0);
TournamentUserParticipant = tslib_1.__decorate([
    (0, index_1.ChildEntity)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], TournamentUserParticipant);
exports.TournamentUserParticipant = TournamentUserParticipant;
//# sourceMappingURL=TournamentUserParticipant.js.map