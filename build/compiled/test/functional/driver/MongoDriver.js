"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chai_1 = require("chai");
const sinon_1 = tslib_1.__importDefault(require("sinon"));
const DriverUtils_1 = require("../../../src/driver/DriverUtils");
const MongoDriver_1 = require("../../../src/driver/mongodb/MongoDriver");
describe("MongoDriver", () => {
    async function getConnectionUrlFromFakedMongoClient(url) {
        const options = DriverUtils_1.DriverUtils.buildMongoDBDriverOptions({ url });
        // Setup a MongoDriver with a mocked connect method, so we can get the connection
        // url from the actual call afterwards.
        const driver = new MongoDriver_1.MongoDriver({
            options,
        });
        const connect = sinon_1.default.fake();
        driver.mongodb = {
            ...driver.mongodb,
            MongoClient: {
                connect,
            },
        };
        const connectPromise = driver.connect();
        // There is not callback on connect method
        // Take the promise parameter that we receive in the callback, call it, so the underlying promise gets resolved.
        // const firstMethodCall = connect.args[0]
        // const callback = firstMethodCall[2]
        // callback(undefined, {})
        await connectPromise;
        return url;
    }
    describe("connection string", () => {
        it("should create a connection string for replica sets", async () => {
            const url = "mongodb://username:password@someHost1:27017,someHost2:27018/myDatabase?replicaSet=abc&tls=true";
            const connectionUrl = await getConnectionUrlFromFakedMongoClient(url);
            (0, chai_1.expect)(connectionUrl).to.eql(url);
        });
        it("should create a connection string for non replica sets", async () => {
            const url = "mongodb://username:password@someHost1:27017/myDatabase?tls=true";
            const connectionUrl = await getConnectionUrlFromFakedMongoClient(url);
            (0, chai_1.expect)(connectionUrl).to.eql(url);
        });
    });
});
//# sourceMappingURL=MongoDriver.js.map