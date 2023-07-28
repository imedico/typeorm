"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Provider_1 = require("./entity/Provider");
const Personalization_1 = require("./entity/Personalization");
const chai_1 = require("chai");
describe("github issues > #1788 One to One does not load relationships.", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        enabledDrivers: ["mysql"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should work as expected when using find* methods with relations explicitly provided", () => Promise.all(connections.map(async (connection) => {
        const personalizationRepository = connection.getRepository(Personalization_1.Personalization);
        const providerRepository = connection.getRepository(Provider_1.Provider);
        const personalization = personalizationRepository.create({
            logo: "https://typeorm.io/logo.png",
        });
        await personalizationRepository.save(personalization);
        const provider = providerRepository.create({
            name: "Provider",
            description: "Desc",
            personalization,
        });
        await providerRepository.save(provider);
        const dbProvider = await providerRepository.find({
            relations: { personalization: true },
        });
        (0, chai_1.expect)(dbProvider[0].personalization).to.not.eql(undefined);
    })));
});
//# sourceMappingURL=issue-1788.js.map