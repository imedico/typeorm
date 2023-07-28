"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DriverUtils_1 = require("../../../src/driver/DriverUtils");
const chai_1 = require("chai");
// import {exec} from "child_process";
describe("github issues > #1493 Error parsing pg connection string", () => {
    it("should parse common connection url", () => {
        const obj = {
            username: "username",
            password: "password",
            host: "host",
            database: "database",
            port: 8888,
        };
        const url = `postgres://${obj.username}:${obj.password}@${obj.host}:${obj.port}/${obj.database}`;
        const options = DriverUtils_1.DriverUtils.buildDriverOptions({ url });
        for (const key of Object.keys(obj)) {
            (0, chai_1.expect)(options[key]).to.eql(obj[key]);
        }
    });
    it("should parse url with password contains colons", () => {
        const obj = {
            username: "username",
            password: "pas:swo:rd",
            host: "host",
            database: "database",
            port: 8888,
        };
        const url = `postgres://${obj.username}:${obj.password}@${obj.host}:${obj.port}/${obj.database}`;
        const options = DriverUtils_1.DriverUtils.buildDriverOptions({ url });
        (0, chai_1.expect)(options.password).to.eql(obj.password);
    });
    it("should parse url with username and password contains at signs", () => {
        const obj = {
            username: "usern@me",
            password: "p@ssword",
            host: "host",
            database: "database",
            port: 8888,
        };
        const url = `postgres://${obj.username}:${obj.password}@${obj.host}:${obj.port}/${obj.database}`;
        const options = DriverUtils_1.DriverUtils.buildDriverOptions({ url });
        (0, chai_1.expect)(options.username).to.eql(obj.username);
        (0, chai_1.expect)(options.password).to.eql(obj.password);
    });
});
//# sourceMappingURL=issue-1493.js.map