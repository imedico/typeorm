"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentSquadParticipant = void 0;
const tslib_1 = require("tslib");
const index_1 = require("../../../../src/index");
const TournamentParticipant_1 = require("./TournamentParticipant");
const User_1 = require("./User");
let TournamentSquadParticipant = class TournamentSquadParticipant extends TournamentParticipant_1.TournamentParticipant {
    constructor(tournamentSquadParticipant) {
        super();
        if (tournamentSquadParticipant) {
            this.users = tournamentSquadParticipant.users;
            this.owner = tournamentSquadParticipant.owner;
        }
    }
};
tslib_1.__decorate([
    (0, index_1.OneToOne)((type) => User_1.User, {
        eager: true,
    }),
    (0, index_1.JoinColumn)(),
    tslib_1.__metadata("design:type", User_1.User)
], TournamentSquadParticipant.prototype, "owner", void 0);
tslib_1.__decorate([
    (0, index_1.ManyToMany)((type) => User_1.User, {
        eager: true,
    }),
    (0, index_1.JoinTable)({ name: "tournament_squad_participants" }),
    tslib_1.__metadata("design:type", Array)
], TournamentSquadParticipant.prototype, "users", void 0);
TournamentSquadParticipant = tslib_1.__decorate([
    (0, index_1.ChildEntity)(),
    tslib_1.__metadata("design:paramtypes", [Object])
], TournamentSquadParticipant);
exports.TournamentSquadParticipant = TournamentSquadParticipant;
//# sourceMappingURL=TournamentSquadParticipant.js.map