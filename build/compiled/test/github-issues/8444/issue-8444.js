"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const StrictlyInitializedEntity_1 = require("./entity/StrictlyInitializedEntity");
describe("github issues > #8444 entitySkipConstructor not working", () => {
    describe("without entitySkipConstructor", () => {
        it("createTestingConnections should fail with 'someColumn cannot be undefined.'", async () => {
            async function bootstrapWithoutEntitySkipConstructor() {
                return await (0, test_utils_1.createTestingConnections)({
                    driverSpecific: {
                        entitySkipConstructor: false,
                    },
                    entities: [StrictlyInitializedEntity_1.StrictlyInitializedEntity],
                    schemaCreate: true,
                    dropSchema: true,
                });
            }
            await (0, chai_1.expect)(bootstrapWithoutEntitySkipConstructor()).to.be.rejectedWith("someColumn cannot be undefined");
        });
    });
    describe("with entitySkipConstructor", () => {
        let connections = [];
        afterEach(() => (0, test_utils_1.closeTestingConnections)(connections));
        it("createTestingConnections should succeed", async () => {
            connections = await (0, test_utils_1.createTestingConnections)({
                driverSpecific: {
                    entitySkipConstructor: true,
                },
                entities: [StrictlyInitializedEntity_1.StrictlyInitializedEntity],
                schemaCreate: true,
                dropSchema: true,
            });
        });
    });
});
//# sourceMappingURL=issue-8444.js.map