import { City } from "./city";
import { Country } from "./country";
export declare class Zip {
    countryCode: string;
    country: Country;
    code: string;
    cities: City[];
}
