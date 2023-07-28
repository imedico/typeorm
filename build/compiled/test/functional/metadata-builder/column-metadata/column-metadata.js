"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const test_utils_1 = require("../../../utils/test-utils");
const Post_1 = require("./entity/Post");
const Counters_1 = require("./entity/Counters");
const Subcounters_1 = require("./entity/Subcounters");
describe("metadata-builder > ColumnMetadata", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("getValue", () => Promise.all(connections.map(async (connection) => {
        const post = new Post_1.Post();
        post.id = 1;
        post.title = "Post #1";
        post.counters = new Counters_1.Counters();
        post.counters.code = 123;
        post.counters.likes = 2;
        post.counters.comments = 3;
        post.counters.favorites = 4;
        post.counters.subcounters = new Subcounters_1.Subcounters();
        post.counters.subcounters.version = 1;
        post.counters.subcounters.watches = 10;
        const titleColumnMetadata = connection
            .getMetadata(Post_1.Post)
            .columns.find((column) => column.propertyName === "title");
        (0, chai_1.expect)(titleColumnMetadata).not.to.be.undefined;
        (0, chai_1.expect)(titleColumnMetadata.getEntityValue(post)).to.be.equal("Post #1");
        const codeColumnMetadata = connection
            .getMetadata(Post_1.Post)
            .columns.find((column) => column.propertyName === "code");
        (0, chai_1.expect)(codeColumnMetadata).not.to.be.undefined;
        (0, chai_1.expect)(codeColumnMetadata.getEntityValue(post)).to.be.equal(123);
        const watchesColumnMetadata = connection
            .getMetadata(Post_1.Post)
            .columns.find((column) => column.propertyName === "watches");
        (0, chai_1.expect)(watchesColumnMetadata).not.to.be.undefined;
        (0, chai_1.expect)(watchesColumnMetadata.getEntityValue(post)).to.be.equal(10);
    })));
    it("getValueMap", () => Promise.all(connections.map(async (connection) => {
        const post = new Post_1.Post();
        post.id = 1;
        post.title = "Post #1";
        post.counters = new Counters_1.Counters();
        post.counters.code = 123;
        post.counters.likes = 2;
        post.counters.comments = 3;
        post.counters.favorites = 4;
        post.counters.subcounters = new Subcounters_1.Subcounters();
        post.counters.subcounters.version = 1;
        post.counters.subcounters.watches = 10;
        const titleColumnMetadata = connection
            .getMetadata(Post_1.Post)
            .columns.find((column) => column.propertyName === "title");
        (0, chai_1.expect)(titleColumnMetadata).not.to.be.undefined;
        (0, chai_1.expect)(titleColumnMetadata.getEntityValueMap(post)).to.be.eql({
            title: "Post #1",
        });
        (0, chai_1.expect)(titleColumnMetadata.getEntityValueMap({ id: 1 })).to.be
            .undefined;
        const codeColumnMetadata = connection
            .getMetadata(Post_1.Post)
            .columns.find((column) => column.propertyName === "code");
        (0, chai_1.expect)(codeColumnMetadata).not.to.be.undefined;
        (0, chai_1.expect)(codeColumnMetadata.getEntityValueMap(post)).to.be.eql({
            counters: { code: 123 },
        });
        (0, chai_1.expect)(codeColumnMetadata.getEntityValueMap({ id: 1 })).to.be
            .undefined;
        (0, chai_1.expect)(codeColumnMetadata.getEntityValueMap({
            id: 1,
            counters: undefined,
        })).to.be.undefined;
        (0, chai_1.expect)(codeColumnMetadata.getEntityValueMap({
            id: 1,
            counters: {},
        })).to.be.undefined;
        (0, chai_1.expect)(codeColumnMetadata.getEntityValueMap({
            id: 1,
            counters: { code: undefined },
        })).to.be.undefined;
        (0, chai_1.expect)(codeColumnMetadata.getEntityValueMap({
            id: 1,
            counters: { code: null },
        })).to.be.eql({ counters: { code: null } });
        (0, chai_1.expect)(codeColumnMetadata.getEntityValueMap({
            id: 1,
            counters: { code: 0 },
        })).to.be.eql({ counters: { code: 0 } });
        (0, chai_1.expect)(codeColumnMetadata.getEntityValueMap({
            id: 1,
            counters: { likes: 123 },
        })).to.be.undefined;
        const watchesColumnMetadata = connection
            .getMetadata(Post_1.Post)
            .columns.find((column) => column.propertyName === "watches");
        (0, chai_1.expect)(watchesColumnMetadata).not.to.be.undefined;
        (0, chai_1.expect)(watchesColumnMetadata.getEntityValueMap(post)).to.be.eql({ counters: { subcounters: { watches: 10 } } });
        (0, chai_1.expect)(watchesColumnMetadata.getEntityValueMap({ id: 1 })).to.be.eql(undefined);
        (0, chai_1.expect)(watchesColumnMetadata.getEntityValueMap({
            id: 1,
            counters: undefined,
        })).to.be.undefined;
        (0, chai_1.expect)(watchesColumnMetadata.getEntityValueMap({
            id: 1,
            counters: {},
        })).to.be.undefined;
        (0, chai_1.expect)(watchesColumnMetadata.getEntityValueMap({
            id: 1,
            counters: { subcounters: undefined },
        })).to.be.undefined;
        (0, chai_1.expect)(watchesColumnMetadata.getEntityValueMap({
            id: 1,
            counters: { subcounters: { watches: null } },
        })).to.be.eql({ counters: { subcounters: { watches: null } } });
        (0, chai_1.expect)(watchesColumnMetadata.getEntityValueMap({
            id: 1,
            counters: { subcounters: { watches: 0 } },
        })).to.be.eql({ counters: { subcounters: { watches: 0 } } });
        (0, chai_1.expect)(watchesColumnMetadata.getEntityValueMap({
            id: 1,
            counters: { subcounters: { version: 123 } },
        })).to.be.undefined;
    })));
});
//# sourceMappingURL=column-metadata.js.map