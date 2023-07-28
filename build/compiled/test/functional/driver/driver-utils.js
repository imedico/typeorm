"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const DriverUtils_1 = require("../../../src/driver/DriverUtils");
describe("DriverUtils", () => {
    describe("parse mongo url", () => {
        it("should return a mongo url with a replica set", () => {
            const url = "mongodb://username:password@someHost1:27017,someHost2:27018/myDatabase?replicaSet=abc&tls=true";
            const result = DriverUtils_1.DriverUtils.buildMongoDBDriverOptions({ url });
            (0, chai_1.expect)(result).to.eql({
                database: "myDatabase",
                hostReplicaSet: "someHost1:27017,someHost2:27018",
                password: "password",
                replicaSet: "abc",
                tls: "true",
                type: "mongodb",
                url,
                username: "username",
            });
        });
        it("should return a mongo url without a replica set", () => {
            const url = "mongodb://username:password@someHost1:27017/myDatabase?tls=true";
            const result = DriverUtils_1.DriverUtils.buildMongoDBDriverOptions({ url });
            (0, chai_1.expect)(result).to.eql({
                database: "myDatabase",
                host: "someHost1",
                port: 27017,
                password: "password",
                tls: "true",
                type: "mongodb",
                url,
                username: "username",
            });
        });
    });
});
//# sourceMappingURL=driver-utils.js.map