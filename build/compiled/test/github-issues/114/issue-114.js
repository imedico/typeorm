"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const DataSource_1 = require("../../../src/data-source/DataSource");
describe.skip("github issues > #114 Can not be parsed correctly the URL of pg.", () => {
    let connection;
    before(() => {
        connection = new DataSource_1.DataSource({
            // Dummy Connection, won't be established
            type: "postgres",
            url: "postgres://test:test@localhost:5432/test",
        });
    });
    it("should not fail in url parser", () => {
        const options = connection.options;
        (0, chai_1.expect)(options.username).to.be.eq("test");
        (0, chai_1.expect)(options.password).to.be.eq("test");
        (0, chai_1.expect)(options.host).to.be.eq("localhost");
        (0, chai_1.expect)(options.port).to.be.eq(5432);
        (0, chai_1.expect)(options.database).to.be.eq("test");
    });
});
//# sourceMappingURL=issue-114.js.map