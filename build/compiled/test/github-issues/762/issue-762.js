"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const Foo_1 = require("./entity/Foo");
const FooMetadata_1 = require("./entity/FooMetadata");
const FooChildMetadata_1 = require("./entity/FooChildMetadata");
describe("github issues > #762 Nullable @Embedded inside @Embedded", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should work perfectly with all data set", () => Promise.all(connections.map(async (connection) => {
        const foo = new Foo_1.Foo();
        foo.name = "Apple";
        foo.metadata = new FooMetadata_1.FooMetadata();
        foo.metadata.bar = 1;
        foo.metadata.child = new FooChildMetadata_1.FooChildMetadata();
        foo.metadata.child.something = 2;
        foo.metadata.child.somethingElse = 3;
        await connection.manager.save(foo);
        const loadedFoo = await connection
            .getRepository(Foo_1.Foo)
            .findOneBy({ name: "Apple" });
        loadedFoo.should.be.eql({
            id: 1,
            name: "Apple",
            metadata: {
                bar: 1,
                child: {
                    something: 2,
                    somethingElse: 3,
                },
            },
        });
    })));
    it("should work perfectly with some data not set", () => Promise.all(connections.map(async (connection) => {
        const foo = new Foo_1.Foo();
        foo.name = "Apple";
        foo.metadata = new FooMetadata_1.FooMetadata();
        foo.metadata.bar = 1;
        foo.metadata.child = new FooChildMetadata_1.FooChildMetadata();
        foo.metadata.child.somethingElse = 3;
        await connection.manager.save(foo);
        const loadedFoo = await connection
            .getRepository(Foo_1.Foo)
            .findOneBy({ name: "Apple" });
        loadedFoo.should.be.eql({
            id: 1,
            name: "Apple",
            metadata: {
                bar: 1,
                child: {
                    something: null,
                    somethingElse: 3,
                },
            },
        });
        const foo2 = new Foo_1.Foo();
        foo2.name = "Apple2";
        foo2.metadata = new FooMetadata_1.FooMetadata();
        foo2.metadata.child = new FooChildMetadata_1.FooChildMetadata();
        foo2.metadata.child.something = 2;
        await connection.manager.save(foo2);
        const loadedFoo2 = await connection
            .getRepository(Foo_1.Foo)
            .findOneBy({ name: "Apple2" });
        loadedFoo2.should.be.eql({
            id: 2,
            name: "Apple2",
            metadata: {
                bar: null,
                child: {
                    something: 2,
                    somethingElse: null,
                },
            },
        });
        const foo3 = new Foo_1.Foo();
        foo3.name = "Apple3";
        foo3.metadata = new FooMetadata_1.FooMetadata();
        await connection.manager.save(foo3);
        const loadedFoo3 = await connection
            .getRepository(Foo_1.Foo)
            .findOneBy({ name: "Apple3" });
        loadedFoo3.should.be.eql({
            id: 3,
            name: "Apple3",
            metadata: {
                bar: null,
                child: {
                    something: null,
                    somethingElse: null,
                },
            },
        });
    })));
    it("should work perfectly without any data set", () => Promise.all(connections.map(async (connection) => {
        const foo = new Foo_1.Foo();
        foo.name = "Orange";
        await connection.manager.save(foo);
        const loadedFoo = await connection
            .getRepository(Foo_1.Foo)
            .findOneBy({ name: "Orange" });
        loadedFoo.should.be.eql({
            id: 1,
            name: "Orange",
            metadata: {
                bar: null,
                child: {
                    something: null,
                    somethingElse: null,
                },
            },
        });
    })));
});
//# sourceMappingURL=issue-762.js.map