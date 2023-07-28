"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Person_1 = require("./entity/Person");
const User_1 = require("./entity/User");
describe.skip("github issues > #2758 Insert fails when related OneToOne entity's primary key is also a foreign key", () => {
    let connections;
    before(async () => {
        connections = await (0, test_utils_1.createTestingConnections)({
            entities: [__dirname + "/entity/*{.js,.ts}"],
            enabledDrivers: ["postgres"],
            schemaCreate: true,
            dropSchema: true,
        });
    });
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should insert person with nested new party", () => Promise.all(connections.map(async (connection) => {
        const repository = connection.getRepository(Person_1.Person);
        await connection.manager.save(repository.create({
            party: {},
        }));
    })));
    it("should insert user with nested new person", () => Promise.all(connections.map(async (connection) => {
        const repository = connection.getRepository(User_1.User);
        await connection.manager.save(repository.create({
            person: { party: {} },
        }));
    })));
    it("should insert a new user with existing person", () => Promise.all(connections.map(async (connection) => {
        const personRepository = connection.getRepository(Person_1.Person);
        const person = await connection.manager.save(personRepository.create({
            party: {},
        }));
        const userRepository = connection.getRepository(User_1.User);
        await connection.manager.save(userRepository.create({
            person: person,
        }));
    })));
    it("should insert user with existing personId", () => Promise.all(connections.map(async (connection) => {
        const personRepository = connection.getRepository(Person_1.Person);
        const person = await connection.manager.save(personRepository.create({
            party: {},
        }));
        const userRepository = connection.getRepository(User_1.User);
        await connection.manager.save(userRepository.create({
            personId: person.id,
        }));
    })));
});
//# sourceMappingURL=issue-2758.js.map