"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const src_1 = require("../../../src");
const chai_1 = require("chai");
const sinon_1 = tslib_1.__importDefault(require("sinon"));
const Node_1 = require("./entity/Node");
const Fact_1 = require("./entity/Fact");
const Rule_1 = require("./entity/Rule");
describe("github issues > #9673 TreeRepository not loading relations on findDescendants() method using QUERY method (relationLoadStrategy)", () => {
    let dataSources;
    before(async () => (dataSources = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
        relationLoadStrategy: "query",
        enabledDrivers: ["mysql"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(dataSources));
    after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
    it("should generate multiple queries per relation", () => Promise.all(dataSources.map(async (dataSource) => {
        var _a;
        const nodeRepository = dataSource.getTreeRepository(Node_1.Node);
        const ruleRepository = dataSource.getRepository(Rule_1.Rule);
        const factRepository = dataSource.getRepository(Fact_1.Fact);
        // Entity instances setup
        let parent = await nodeRepository.save(nodeRepository.create({ name: "root node" }));
        let child = await nodeRepository.save(nodeRepository.create({ name: "child node", parent }));
        const [factA, factB] = await factRepository.save([
            { name: "Fact A" },
            { name: "Fact B" },
        ]);
        const rules = await ruleRepository.save([
            { name: "Rule 1", node: child, fact: factA },
            { name: "Rule 2", node: child, fact: factA },
            { name: "Rule 3", node: child, fact: factB },
        ]);
        const leftJoinBuilder = sinon_1.default.spy(src_1.SelectQueryBuilder.prototype, "leftJoinAndSelect");
        [, child] = await nodeRepository.findDescendants(parent, {
            relations: ["rules", "rules.fact"],
        });
        (0, chai_1.expect)(child.rules).length(rules.length);
        (_a = child.rules) === null || _a === void 0 ? void 0 : _a.forEach((rule) => {
            (0, chai_1.expect)(rule.fact).exist;
        });
        (0, chai_1.expect)(leftJoinBuilder.called).not.to.be.true;
    })));
});
//# sourceMappingURL=issue-9673.js.map