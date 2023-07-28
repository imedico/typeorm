"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../utils/test-utils");
const Address_1 = require("./entity/Address");
const ActionDetails_1 = require("./entity/ActionDetails");
const ActionLog_1 = require("./entity/ActionLog");
const Person_1 = require("./entity/Person");
describe('github issues > #3120 Add relation option "createForeignKeyConstraints"', () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        subscribers: [__dirname + "/subscriber/*{.js,.ts}"],
        enabledDrivers: ["postgres"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should create foreign key for relation without createForeignKeyConstraints option", () => Promise.all(connections.map(async function (connection) {
        const queryRunner = connection.createQueryRunner();
        const mainTable = await queryRunner.getTable("person");
        const joinTable = await queryRunner.getTable("person_addresses_address");
        await queryRunner.release();
        (0, chai_1.expect)(mainTable.foreignKeys.length).to.be.equal(2);
        (0, chai_1.expect)(joinTable.foreignKeys.length).to.be.equal(2);
    })));
    it("should not create foreign key for relation with createForeignKeyConstraints equal false", () => Promise.all(connections.map(async function (connection) {
        const queryRunner = connection.createQueryRunner();
        const mainTable = await queryRunner.getTable("action_log");
        const joinTable = await queryRunner.getTable("action_log_addresses_address");
        await queryRunner.release();
        (0, chai_1.expect)(mainTable.foreignKeys.length).to.be.equal(0);
        (0, chai_1.expect)(joinTable.foreignKeys.length).to.be.equal(0);
    })));
    describe("relation with createForeignKeyConstraints equal false", () => {
        it("should work perfectly", () => Promise.all(connections.map(async (connection) => {
            const fakeAddresses = [];
            for (let i = 0; i < 8; i++) {
                const fakeRecord = new Address_1.Address();
                fakeRecord.country = "Fake Address #" + i;
                fakeRecord.city = "Fake Address #" + i;
                fakeRecord.street = "Fake Address #" + i;
                fakeAddresses.push(fakeRecord);
            }
            await connection.manager.save(fakeAddresses);
            const fakePeople = [];
            for (let i = 0; i < 8; i++) {
                const fakeRecord = new Person_1.Person();
                fakeRecord.name = "Fake Person #" + i;
                fakePeople.push(fakeRecord);
            }
            await connection.manager.save(fakePeople);
            const fakeDetails = [];
            for (let i = 0; i < 8; i++) {
                const fakeRecord = new ActionDetails_1.ActionDetails();
                fakeRecord.description = "Fake Details #" + i;
                fakeDetails.push(fakeRecord);
            }
            await connection.manager.save(fakeDetails);
            const fakeLogs = [];
            for (let i = 0; i < 8; i++) {
                const fakeRecord = new ActionLog_1.ActionLog();
                fakeRecord.date = new Date();
                fakeRecord.action = "Fake Log #" + i;
                fakeLogs.push(fakeRecord);
            }
            await connection.manager.save(fakeLogs);
            const testAddresses = [];
            for (let i = 0; i < 3; i++) {
                const testRecord = new Address_1.Address();
                testRecord.country = "Test Address #" + i;
                testRecord.city = "Test Address #" + i;
                testRecord.street = "Test Address #" + i;
                testAddresses.push(testRecord);
            }
            await connection.manager.save(testAddresses);
            const testPerson = new Person_1.Person();
            testPerson.name = "Test Person #1";
            await connection.manager.save(testPerson);
            const testDetail = new ActionDetails_1.ActionDetails();
            testDetail.description = "Test Details #1";
            await connection.manager.save(testDetail);
            const testLog = new ActionLog_1.ActionLog();
            testLog.date = new Date();
            testLog.action = "Test Log #1";
            testLog.person = testPerson;
            testLog.addresses = testAddresses;
            testLog.actionDetails = testDetail;
            await connection.manager.save(testLog);
            const loadedLog = await connection.manager.findOneOrFail(ActionLog_1.ActionLog, {
                where: { action: "Test Log #1" },
                relations: {
                    person: true,
                    actionDetails: true,
                    addresses: true,
                },
            });
            loadedLog.person.name.should.be.equal("Test Person #1");
            loadedLog.actionDetails.description.should.be.equal("Test Details #1");
            loadedLog.addresses.length.should.be.equal(3);
        })));
    });
});
//# sourceMappingURL=issue-3120.js.map