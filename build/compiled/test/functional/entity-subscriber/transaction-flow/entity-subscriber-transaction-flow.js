"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const test_utils_1 = require("../../../utils/test-utils");
const sinon_1 = tslib_1.__importDefault(require("sinon"));
const chai_1 = require("chai");
describe("entity subscriber > transaction flow", () => {
    let beforeTransactionStart = sinon_1.default.spy();
    let afterTransactionStart = sinon_1.default.spy();
    let beforeTransactionCommit = sinon_1.default.spy();
    let afterTransactionCommit = sinon_1.default.spy();
    let beforeTransactionRollback = sinon_1.default.spy();
    let afterTransactionRollback = sinon_1.default.spy();
    let PostSubscriber = class PostSubscriber {
        beforeTransactionStart() {
            if (beforeTransactionStart)
                beforeTransactionStart();
        }
        afterTransactionStart() {
            if (afterTransactionStart)
                afterTransactionStart();
        }
        beforeTransactionCommit() {
            if (beforeTransactionCommit)
                beforeTransactionCommit();
        }
        afterTransactionCommit() {
            if (afterTransactionCommit)
                afterTransactionCommit();
        }
        beforeTransactionRollback() {
            if (beforeTransactionRollback)
                beforeTransactionRollback();
        }
        afterTransactionRollback() {
            if (afterTransactionRollback)
                afterTransactionRollback();
        }
    };
    PostSubscriber = tslib_1.__decorate([
        (0, src_1.EventSubscriber)()
    ], PostSubscriber);
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        subscribers: [PostSubscriber],
        dropSchema: true,
        schemaCreate: true,
    })));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("transactionStart", async () => {
        for (let connection of connections) {
            if (connection.driver.options.type === "mssql" ||
                connection.driver.options.type === "spanner")
                return;
            beforeTransactionStart.resetHistory();
            afterTransactionStart.resetHistory();
            let isolationLevel = undefined;
            if (connection.driver.options.type === "sap" ||
                connection.driver.options.type === "oracle") {
                isolationLevel = "READ COMMITTED";
            }
            const queryRunner = await connection.createQueryRunner();
            if (connection.driver.options.type === "aurora-postgres" ||
                connection.driver.options.type === "aurora-mysql") {
                const startTransactionFn = sinon_1.default.spy(queryRunner.startTransaction);
                await queryRunner.startTransaction();
                (0, chai_1.expect)(beforeTransactionStart.calledBefore(startTransactionFn))
                    .to.be.true;
                (0, chai_1.expect)(afterTransactionStart.calledAfter(startTransactionFn)).to
                    .be.true;
                startTransactionFn.restore();
                await queryRunner.commitTransaction();
            }
            else {
                const startTransactionFn = sinon_1.default.spy(queryRunner, "query");
                const queryCallBeforeTransactionStart = startTransactionFn
                    .getCalls()
                    .find((call) => {
                    return (call.args[0] === "BEGIN TRANSACTION" ||
                        call.args[0] === "START TRANSACTION" ||
                        call.args[0] ===
                            "SET TRANSACTION ISOLATION LEVEL READ COMMITTED");
                });
                (0, chai_1.expect)(queryCallBeforeTransactionStart).to.be.undefined;
                await queryRunner.startTransaction(isolationLevel);
                const queryCallAfterTransactionStart = startTransactionFn
                    .getCalls()
                    .find((call) => {
                    return (call.args[0] === "BEGIN TRANSACTION" ||
                        call.args[0] === "START TRANSACTION" ||
                        call.args[0] ===
                            "SET TRANSACTION ISOLATION LEVEL READ COMMITTED");
                });
                (0, chai_1.expect)(beforeTransactionStart.called).to.be.true;
                (0, chai_1.expect)(afterTransactionStart.called).to.be.true;
                (0, chai_1.expect)(queryCallAfterTransactionStart).to.be.not.undefined;
                (0, chai_1.expect)(beforeTransactionStart
                    .getCall(0)
                    .calledBefore(queryCallAfterTransactionStart)).to.be.true;
                (0, chai_1.expect)(afterTransactionStart
                    .getCall(0)
                    .calledAfter(queryCallAfterTransactionStart)).to.be.true;
                await queryRunner.commitTransaction();
                startTransactionFn.restore();
            }
            await queryRunner.release();
        }
    });
    it("transactionCommit", async () => {
        for (let connection of connections) {
            if (connection.driver.options.type === "mssql" ||
                connection.driver.options.type === "spanner")
                return;
            beforeTransactionCommit.resetHistory();
            afterTransactionCommit.resetHistory();
            const queryRunner = await connection.createQueryRunner();
            await queryRunner.startTransaction();
            if (connection.driver.options.type === "aurora-postgres" ||
                connection.driver.options.type === "aurora-mysql") {
                const commitTransactionFn = sinon_1.default.spy(queryRunner.commitTransaction);
                await queryRunner.commitTransaction();
                (0, chai_1.expect)(beforeTransactionCommit.calledBefore(commitTransactionFn)).to.be.true;
                (0, chai_1.expect)(afterTransactionCommit.calledAfter(commitTransactionFn))
                    .to.be.true;
                commitTransactionFn.restore();
            }
            else {
                const commitTransactionFn = sinon_1.default.spy(queryRunner, "query");
                const queryCallBeforeTransactionCommit = commitTransactionFn
                    .getCalls()
                    .find((call) => {
                    return call.args[0] === "COMMIT";
                });
                (0, chai_1.expect)(queryCallBeforeTransactionCommit).to.be.undefined;
                await queryRunner.commitTransaction();
                const queryCallAfterTransactionCommit = commitTransactionFn
                    .getCalls()
                    .find((call) => {
                    return call.args[0] === "COMMIT";
                });
                (0, chai_1.expect)(queryCallAfterTransactionCommit).to.be.not.undefined;
                (0, chai_1.expect)(beforeTransactionCommit.called).to.be.true;
                (0, chai_1.expect)(afterTransactionCommit.called).to.be.true;
                (0, chai_1.expect)(beforeTransactionCommit
                    .getCall(0)
                    .calledBefore(queryCallAfterTransactionCommit)).to.be.true;
                (0, chai_1.expect)(afterTransactionCommit
                    .getCall(0)
                    .calledAfter(queryCallAfterTransactionCommit)).to.be.true;
                commitTransactionFn.restore();
            }
            await queryRunner.release();
        }
    });
    it("transactionRollback", async () => {
        for (let connection of connections) {
            if (connection.driver.options.type === "mssql" ||
                connection.driver.options.type === "spanner")
                return;
            beforeTransactionRollback.resetHistory();
            afterTransactionRollback.resetHistory();
            const queryRunner = await connection.createQueryRunner();
            await queryRunner.startTransaction();
            if (connection.driver.options.type === "aurora-postgres" ||
                connection.driver.options.type === "aurora-mysql") {
                const rollbackTransactionFn = sinon_1.default.spy(queryRunner.rollbackTransaction);
                await queryRunner.rollbackTransaction();
                (0, chai_1.expect)(beforeTransactionRollback.calledBefore(rollbackTransactionFn)).to.be.true;
                (0, chai_1.expect)(afterTransactionRollback.calledAfter(rollbackTransactionFn)).to.be.true;
                rollbackTransactionFn.restore();
            }
            else {
                const rollbackTransactionFn = sinon_1.default.spy(queryRunner, "query");
                const queryCallBeforeTransactionRollback = rollbackTransactionFn
                    .getCalls()
                    .find((call) => {
                    return call.args[0] === "ROLLBACK";
                });
                (0, chai_1.expect)(queryCallBeforeTransactionRollback).to.be.undefined;
                await queryRunner.rollbackTransaction();
                const queryCallAfterTransactionRollback = rollbackTransactionFn
                    .getCalls()
                    .find((call) => {
                    return call.args[0] === "ROLLBACK";
                });
                (0, chai_1.expect)(queryCallAfterTransactionRollback).to.be.not.undefined;
                (0, chai_1.expect)(beforeTransactionRollback.called).to.be.true;
                (0, chai_1.expect)(afterTransactionRollback.called).to.be.true;
                (0, chai_1.expect)(beforeTransactionRollback
                    .getCall(0)
                    .calledBefore(queryCallAfterTransactionRollback)).to.be.true;
                (0, chai_1.expect)(afterTransactionRollback
                    .getCall(0)
                    .calledAfter(queryCallAfterTransactionRollback)).to.be.true;
                rollbackTransactionFn.restore();
            }
            await queryRunner.release();
        }
    });
});
//# sourceMappingURL=entity-subscriber-transaction-flow.js.map