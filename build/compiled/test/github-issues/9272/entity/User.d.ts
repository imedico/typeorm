export declare class LatLong {
    latitude: number;
    longitude: number;
}
export declare class Address {
    latLong: LatLong;
}
export declare class User {
    id: number;
    firstName: string;
    lastName: string;
    address: Address;
    age: number;
}
