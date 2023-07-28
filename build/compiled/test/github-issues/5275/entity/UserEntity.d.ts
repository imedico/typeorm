export declare enum Role {
    GuildMaster = "Guild Master",
    Officer = "Officer",
    Boss = "BOSS \"LEVEL 80\"",
    Warrior = "Knight\\Rogue",
    Number = 1,
    PlayerAlt = "Player Alt"
}
export declare class User {
    id: number;
    role: Role;
    roles: Role[];
}
