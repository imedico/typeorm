export type UserRoleType = "user" | "admin";
export declare const userRoles: {
    USER: UserRoleType;
    ADMIN: UserRoleType;
};
export declare enum UserRoles {
    USER = "user",
    ADMIN = "admin"
}
export declare class SomeEntity {
    id: number;
    test: UserRoleType;
    test2: UserRoles;
}
