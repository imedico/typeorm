export declare enum UserRole {
    PLAYER = "PLAYER",
    FULL_GAME = "FULL_GAME",
    SUPERVISOR = "SUPERVISOR",
    REPORTS = "REPORTS",
    ADMIN = "ADMIN"
}
export declare class User {
    id: string;
    roles: UserRole[];
}
