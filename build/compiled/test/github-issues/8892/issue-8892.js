"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../utils/test-setup");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const city_1 = require("./entity/city");
const zip_1 = require("./entity/zip");
const country_1 = require("./entity/country");
describe('github issues > #8892 ManyToMany relations save throws "Violation of PRIMARY KEY constraint"', async () => {
    let connections;
    beforeEach(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    afterEach(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should work perfectly with with many to many relation with primary key from related object is a primary key from an many to one relation", async () => await Promise.all(connections.map(async (connection) => {
        const cityRepository = connection.getRepository(city_1.City);
        const countryRepository = connection.getRepository(country_1.Country);
        const country = new country_1.Country();
        country.code = "de";
        country.caption = "Germany";
        const city = new city_1.City();
        city.caption = "Test city";
        const zip1 = new zip_1.Zip();
        zip1.countryCode = "de";
        zip1.code = "12345";
        const zip2 = new zip_1.Zip();
        zip2.countryCode = "de";
        zip2.code = "54321";
        await countryRepository.save(country);
        await cityRepository.save(city);
        const zipRepository = connection.getRepository(zip_1.Zip);
        await zipRepository.save(zip1);
        await zipRepository.save(zip2);
        await cityRepository.save({
            id: city.id,
            zips: [zip1, zip2],
        });
        await cityRepository.save({
            id: city.id,
            zips: [zip2],
        });
        const existingCity = await cityRepository.find({
            where: {
                id: city.id,
            },
            relations: {
                zips: true,
            },
        });
        if (!existingCity.length)
            throw new Error("city not found");
        (0, chai_1.expect)(existingCity[0].zips.length).to.deep.equal(1);
        (0, chai_1.expect)(existingCity[0].zips[0].code).to.deep.equal(zip2.code);
        (0, chai_1.expect)(existingCity[0].zipCodes[0]).to.deep.equal({
            countryCode: zip2.countryCode,
            code: zip2.code,
        });
    })));
});
//# sourceMappingURL=issue-8892.js.map