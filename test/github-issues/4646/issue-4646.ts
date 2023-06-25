import "reflect-metadata"

import { expect } from "chai"
import { DataSource } from "../../../src/data-source/DataSource"
import {
    closeTestingConnections,
    createTestingConnections,
} from "../../utils/test-utils"
import { Table } from "../../../src/schema-builder/table/Table"
import { User } from "./entity/User"

describe("github issues > #4646 Add support for temporal (system-versioned) table", () => {
    let connections: DataSource[]

    before(async () => {
        connections = await createTestingConnections({
            dropSchema: true,
            enabledDrivers: ["mssql"],
            entities: [__dirname + "/entity/*{.js,.ts}"],
            schemaCreate: true,
        })
    })

    after(() => closeTestingConnections(connections))

    it("should get dataset before and after update", () =>
        Promise.all(
            connections.map(async (connection) => {
                const { manager } = connection
                const repository = manager.getRepository(User)
                let user = repository.create({ name: "foo" })
                await repository.save(user)

                const datetime = new Date()
                let result = await repository.findOneBy({ id: 1 })
                expect(result?.name).to.be.equal("foo")

                await repository.update(1, { name: "bar" })

                result = await repository.findOne({ where: { id: 1 } })
                expect(result?.name).to.be.equal("bar")

                result = await repository.findOneBy({ id: 1 }, datetime)
                expect(result?.name).to.be.equal("foo")

                await repository.delete(1)
            }),
        ))

    it("should get deleted datasets", () =>
        Promise.all(
            connections.map(async (connection) => {
                const { manager } = connection
                const repository = manager.getRepository(User)
                const userOne = repository.create({ name: "foo" })
                const userTwo = repository.create({ name: "bar" })

                await repository.save(userOne)
                await repository.save(userTwo)

                const datetime = new Date()
                let results = await repository.find()
                expect(results).to.have.length(2)

                await repository.delete({ id: 2 })

                results = await repository.find()
                expect(results).to.have.length(1)

                results = await repository.find({ datetime })
                expect(results).to.have.length(2)

                await repository.delete(1)
            }),
        ))

    it("should correctly create additional temporal table", () =>
        Promise.all(
            connections.map(async (connection) => {
                const queryRunner = connection.createQueryRunner()
                const metadata = connection.getMetadata(User)

                const newTable = Table.create(metadata, connection.driver)
                await queryRunner.createTable(newTable, true)

                const table = await queryRunner.getTable("user")
                let idColumn = table!.findColumnByName("id")
                let nameColumn = table!.findColumnByName("name")
                let validFromColumn = table!.findColumnByName("validFrom")!
                let validToColumn = table!.findColumnByName("validTo")!

                expect(table).to.exist
                expect(idColumn).to.exist
                expect(nameColumn).to.exist
                expect(validFromColumn).to.exist
                expect(validToColumn).to.exist

                const historyTable = await queryRunner.getTable("user_history")
                idColumn = historyTable!.findColumnByName("id")
                nameColumn = historyTable!.findColumnByName("name")
                validFromColumn = historyTable!.findColumnByName("validFrom")!
                validToColumn = historyTable!.findColumnByName("validTo")!

                expect(historyTable).to.exist
                expect(idColumn).to.exist
                expect(nameColumn).to.exist
                expect(validFromColumn).to.exist
                expect(validToColumn).to.exist

                await queryRunner.dropTable(table!)
                await queryRunner.clearDatabase()
                await queryRunner.release()
            }),
        ))
})
