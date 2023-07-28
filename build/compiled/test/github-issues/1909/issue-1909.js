"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DriverUtils_1 = require("../../../src/driver/DriverUtils");
const chai_1 = require("chai");
describe("github issues > #1493 Error parsing pg connection string", () => {
    it("should parse url with empty password", () => {
        const obj = {
            username: "usern@me",
            password: "",
            host: "host",
            database: "database",
            port: 8888,
        };
        const url = `postgres://${obj.username}:@${obj.host}:${obj.port}/${obj.database}`;
        const options = DriverUtils_1.DriverUtils.buildDriverOptions({ url });
        (0, chai_1.expect)(options.username).to.eql(obj.username);
        (0, chai_1.expect)(options.password).to.eql(obj.password);
    });
    it("should parse url without password", () => {
        const obj = {
            username: "usern@me",
            password: "",
            host: "host",
            database: "database",
            port: 8888,
        };
        const url = `postgres://${obj.username}@${obj.host}:${obj.port}/${obj.database}`;
        const options = DriverUtils_1.DriverUtils.buildDriverOptions({ url });
        (0, chai_1.expect)(options.username).to.eql(obj.username);
        (0, chai_1.expect)(options.password).to.eql(obj.password);
    });
});
//# sourceMappingURL=issue-1909.js.map