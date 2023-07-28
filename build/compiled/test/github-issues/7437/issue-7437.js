"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const DriverUtils_1 = require("../../../src/driver/DriverUtils");
const chai_1 = require("chai");
describe("github issues > #7437 MongoDB options never parse in connectionUrl and after my fix was parse incorrect", () => {
    it("should parse options in ConnectionUrl", () => {
        var options = DriverUtils_1.DriverUtils.buildMongoDBDriverOptions({
            url: "mongodb://testuser:testpwd@test-primary.example.com:27017/testdb?retryWrites=true&w=majority&useUnifiedTopology=true",
        });
        (0, chai_1.expect)(options.host ? options.host : "").to.equal("test-primary.example.com");
        (0, chai_1.expect)(options.username ? options.username : "").to.equal("testuser");
        (0, chai_1.expect)(options.password ? options.password : "").to.equal("testpwd");
        (0, chai_1.expect)(options.port ? options.port : 0).to.equal(27017);
        (0, chai_1.expect)(options.database ? options.database : "").to.equal("testdb");
        (0, chai_1.expect)(options.retryWrites ? options.retryWrites : "").to.equal("true");
        (0, chai_1.expect)(options.w ? options.w : "").to.equal("majority");
        (0, chai_1.expect)(options.useUnifiedTopology
            ? options.useUnifiedTopology
            : "").to.equal("true");
    });
});
//# sourceMappingURL=issue-7437.js.map