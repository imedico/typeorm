declare enum UserType {
    ADMIN = "ADMIN",
    USER = "USER"
}
export declare class UserEntity {
    id: number;
    userType: UserType;
}
export {};
