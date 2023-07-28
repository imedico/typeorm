"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const src_1 = require("../../../src");
const ExampleEntity_1 = require("./entity/ExampleEntity");
const chai_1 = require("chai");
const JsonExampleEntity_1 = require("./entity/JsonExampleEntity");
describe("github issues > #9381 The column option 《transformer》 affects the result of the query condition generation", () => {
    it("transform and find values", async () => {
        const dataSources = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/ExampleEntity{.js,.ts}"],
            schemaCreate: true,
            dropSchema: true,
        });
        await Promise.all(dataSources.map(async (dataSource) => {
            let repository = dataSource.getRepository(ExampleEntity_1.ExampleEntity);
            await repository.save(new ExampleEntity_1.ExampleEntity());
            await repository.save(new ExampleEntity_1.ExampleEntity());
            await repository.save(new ExampleEntity_1.ExampleEntity());
            await repository.save(new ExampleEntity_1.ExampleEntity());
            await repository.save(new ExampleEntity_1.ExampleEntity());
            const resultFindAll = await repository.find();
            (0, chai_1.expect)(resultFindAll.length).to.be.eql(5);
            const resultTransformer = await repository.findBy({
                id: (0, src_1.Not)((0, src_1.In)(["1", "3", "5"])),
            });
            (0, chai_1.expect)(resultTransformer).to.be.eql([
                {
                    id: "2",
                },
                {
                    id: "4",
                },
            ]);
            const findEqualsTransformer = await repository.findOne({
                where: {
                    id: "1",
                },
            });
            (0, chai_1.expect)(findEqualsTransformer).to.be.eql({ id: "1" });
        }));
        await (0, test_utils_1.closeTestingConnections)(dataSources);
    });
    it("transform json values and find values", async () => {
        const dataSources = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/JsonExampleEntity{.js,.ts}"],
            schemaCreate: true,
            dropSchema: true,
            enabledDrivers: ["postgres"],
        });
        await Promise.all(dataSources.map(async (dataSource) => {
            let repository = dataSource.getRepository(JsonExampleEntity_1.JsonExampleEntity);
            await repository.save(new JsonExampleEntity_1.JsonExampleEntity({ foo: "bar1" }));
            await repository.save(new JsonExampleEntity_1.JsonExampleEntity({ foo: "bar2" }));
            await repository.save(new JsonExampleEntity_1.JsonExampleEntity({ foo: "bar3" }));
            await repository.save(new JsonExampleEntity_1.JsonExampleEntity({ foo: "bar4" }));
            await repository.save(new JsonExampleEntity_1.JsonExampleEntity({ foo: "bar5" }));
            await repository.save(new JsonExampleEntity_1.JsonExampleEntity({ foo: { bar: [5, 6, 7, 8] } }));
            await repository.save(new JsonExampleEntity_1.JsonExampleEntity([5, 6, 7, 8]));
            const resultTransformer = await repository.findBy({
                id: (0, src_1.Not)((0, src_1.In)(["1", "3", "5", "6", "7"])),
            });
            (0, chai_1.expect)(resultTransformer).to.be.eql([
                {
                    id: "2",
                    jsonvalue: {
                        foo: "bar2",
                    },
                },
                {
                    id: "4",
                    jsonvalue: {
                        foo: "bar4",
                    },
                },
            ]);
            let result = await repository.findOneBy({
                jsonvalue: (0, src_1.JsonContains)({ foo: "bar1" }),
            });
            (0, chai_1.expect)(result).to.be.eql({
                id: "1",
                jsonvalue: {
                    foo: "bar1",
                },
            });
            result = await repository.findOneBy({
                jsonvalue: (0, src_1.JsonContains)({ foo: {} }),
            });
            (0, chai_1.expect)(result).to.be.eql({
                id: "6",
                jsonvalue: {
                    foo: { bar: [5, 6, 7, 8] },
                },
            });
            result = await repository.findOneBy({
                jsonvalue: (0, src_1.JsonContains)([5, 6, 7, 8]),
            });
            (0, chai_1.expect)(result).to.be.eql({
                id: "7",
                jsonvalue: [5, 6, 7, 8],
            });
        }));
        await (0, test_utils_1.closeTestingConnections)(dataSources);
    });
    // you can add additional tests if needed
});
//# sourceMappingURL=issue-9381.js.map