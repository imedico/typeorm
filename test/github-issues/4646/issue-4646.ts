import "reflect-metadata"

// import { expect } from "chai"
// import { DataSource } from "../../../src/data-source/DataSource"
import {
    closeTestingConnections,
    createTestingConnections,
    //   sleep,
} from "../../utils/test-utils"
// import { Photo } from "./entity/Photo"

import { UserWithVersioning } from "./entity/UserWithVersioning"
import { UserWithoutVersioning } from "./entity/UserWithoutVersioning"
// import { Table } from "../../../src/schema-builder/table/Table"
/*
const getCurrentTimestamp = async () => {
    // give some time to simulate dataset modifications
    await sleep(100)
    const timestamp = new Date()
    await sleep(100)
    return timestamp
}
*/

describe("github issues > #4646 add support for temporal (system-versioned) table", () => {
    // let dataSources: DataSource[]

    describe("1", () => {
        it("should also working with joins", async () => {
            //  const User = await import("./entity/User")
            //  const User = UserWithoutVersioning

            let dataSources = await createTestingConnections({
                dropSchema: true,
                enabledDrivers: ["mssql"],
                entities: [UserWithVersioning],
                // entities: [UserWithoutVersioning],
                schemaCreate: true,
                logging: false,
            })

            await Promise.all(
                dataSources.map(async (dataSource) => {
                    const { manager } = dataSource
                    //  await dataSource.synchronize()
                    // const repository = manager.getRepository(UserWithVersioning)

                    /*                  const { upQueries, downQueries } = await dataSource.driver
                        .createSchemaBuilder()
                        .log()

                    console.log(upQueries)
                    console.log(downQueries)
*/

                    const user = new UserWithVersioning()
                    user.id = 1
                    user.name = "foo"
                    await manager.save(user)
                    user.name = "bar"
                    await manager.save(user)

                    //    const result = await UserWithoutVersioning.findOneBy({
                    //        id: 1,
                    //    })
                    //    expect(result?.name).to.be.equal("foo")
                }),
            )

            closeTestingConnections(dataSources)

            dataSources = await createTestingConnections({
                dropSchema: false,
                enabledDrivers: ["mssql"],
                entities: [UserWithoutVersioning],
                //entities: [UserWithVersioning],
                schemaCreate: false,
                logging: true,
            })

            await Promise.all(
                dataSources.map(async (dataSource) => {
                    //  const { manager } = dataSource
                    await dataSource.synchronize()

                    const { upQueries, downQueries } = await dataSource.driver
                        .createSchemaBuilder()
                        .log()

                    console.log(upQueries)
                    console.log(downQueries)
                }),
            )

            closeTestingConnections(dataSources)
        })
    })
})
