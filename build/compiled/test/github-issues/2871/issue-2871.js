"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const src_1 = require("../../../src");
const Bar_1 = require("./entity/Bar");
const documentEnum_1 = require("./documentEnum");
describe("github issues > #2871 Empty enum array is returned as array with single empty string", () => {
    let dataSource;
    let repository;
    before(async () => {
        const options = (0, test_utils_1.setupSingleTestingConnection)("postgres", {
            entities: [__dirname + "/entity/*{.js,.ts}"],
            schemaCreate: true,
            dropSchema: true,
        });
        if (!options)
            return;
        dataSource = new src_1.DataSource(options);
        await dataSource.initialize();
    });
    beforeEach(async () => {
        if (!dataSource)
            return;
        await (0, test_utils_1.reloadTestingDatabases)([dataSource]);
        repository = dataSource.getRepository(Bar_1.Bar);
    });
    after(() => (0, test_utils_1.closeTestingConnections)([dataSource]));
    it("should extract array with values from enum array values from 'postgres'", async () => {
        if (!dataSource)
            return;
        const documents = [
            documentEnum_1.DocumentEnum.DOCUMENT_A,
            documentEnum_1.DocumentEnum.DOCUMENT_B,
            documentEnum_1.DocumentEnum.DOCUMENT_C,
        ];
        const barSaved = await repository.save({ documents });
        const barFromDb = await repository.findOneByOrFail({
            barId: barSaved.barId,
        });
        (0, chai_1.expect)(barFromDb.documents).to.eql(documents);
    });
    it("should extract array with one value from enum array with one value from 'postgres'", async () => {
        if (!dataSource)
            return;
        const documents = [documentEnum_1.DocumentEnum.DOCUMENT_D];
        const barSaved = await repository.save({ documents });
        const barFromDb = await repository.findOneByOrFail({
            barId: barSaved.barId,
        });
        (0, chai_1.expect)(barFromDb.documents).to.eql(documents);
    });
    // This `it` test that issue #2871 is fixed
    it("should extract empty array from empty enum array from 'postgres'", async () => {
        if (!dataSource)
            return;
        const documents = [];
        const barSaved = await repository.save({ documents });
        const barFromDb = await repository.findOneByOrFail({
            barId: barSaved.barId,
        });
        (0, chai_1.expect)(barFromDb.documents).to.eql(documents);
    });
});
//# sourceMappingURL=issue-2871.js.map