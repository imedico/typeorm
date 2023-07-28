import { Zip } from "./zip";
export declare class City {
    id: number;
    caption: string;
    zipCodes: {
        countryCode: string;
        zipCode: string;
    }[];
    zips: Zip[];
}
