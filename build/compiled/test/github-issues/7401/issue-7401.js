"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const DriverUtils_1 = require("../../../src/driver/DriverUtils");
const chai_1 = require("chai");
describe('github issues > #7401 MongoDB replica set connection string not support with method "parseConnectionUrl" & "buildConnectionUrl"', () => {
    it("should parse replicaSet and host list in ConnectionUrl", () => {
        var options = DriverUtils_1.DriverUtils.buildMongoDBDriverOptions({
            url: "mongodb://testuser:testpwd@test-primary.example.com:27017,test-secondary-1.example.com:27017,test-secondary-2.example.com:27017/testdb?replicaSet=testreplicaset",
        });
        (0, chai_1.expect)(options.hostReplicaSet ? options.hostReplicaSet : "").to.equal("test-primary.example.com:27017,test-secondary-1.example.com:27017,test-secondary-2.example.com:27017");
        (0, chai_1.expect)(options.username ? options.username : "").to.equal("testuser");
        (0, chai_1.expect)(options.password ? options.password : "").to.equal("testpwd");
        (0, chai_1.expect)(options.database ? options.database : "").to.equal("testdb");
        (0, chai_1.expect)(options.replicaSet ? options.replicaSet : "").to.equal("testreplicaset");
    });
});
//# sourceMappingURL=issue-7401.js.map