"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DriverUtils_1 = require("../../../src/driver/DriverUtils");
const chai_1 = require("chai");
describe("github issues > #6389 MongoDB URI Connection string with query params", () => {
    it("should parse correctly mongodb URI", () => {
        const obj = {
            type: "mongodb",
            username: "user",
            password: "password",
            host: "host",
            database: "database",
            port: 27017,
        };
        const url = `${obj.type}://${obj.username}:${obj.password}@${obj.host}:${obj.port}/${obj.database}?readPreference=primary`;
        const options = DriverUtils_1.DriverUtils.buildDriverOptions({ url });
        (0, chai_1.expect)(options.type).to.eql(obj.type);
        (0, chai_1.expect)(options.username).to.eql(obj.username);
        (0, chai_1.expect)(options.username).to.eql(obj.username);
        (0, chai_1.expect)(options.password).to.eql(obj.password);
        (0, chai_1.expect)(options.host).to.eql(obj.host);
        (0, chai_1.expect)(options.port).to.eql(obj.port);
        (0, chai_1.expect)(options.database).to.eql(obj.database);
    });
});
//# sourceMappingURL=issue-6389.js.map