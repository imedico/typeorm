"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const src_1 = require("../../../src");
const chai_1 = require("chai");
describe("github issues > #9189 check invalid constraint options", () => {
    let dataSources = [];
    after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
    it("should throw an exception, when invalid option is configured", async () => {
        let err;
        try {
            await Promise.all((dataSources = await (0, test_utils_1.createTestingConnections)({
                entities: [__dirname + "/entity/*{.js,.ts}"],
                schemaCreate: false,
                dropSchema: true,
                enabledDrivers: ["oracle"],
            })));
        }
        catch (e) {
            err = e;
        }
        if (err)
            // skip for other databases
            (0, chai_1.expect)(err).to.eql(new src_1.TypeORMError('OnDeleteType "RESTRICT" is not supported for oracle!'));
    });
    // you can add additional tests if needed
});
//# sourceMappingURL=issue-9189.js.map