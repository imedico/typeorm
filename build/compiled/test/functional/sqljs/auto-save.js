"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const chai_1 = require("chai");
const Post_1 = require("./entity/Post");
const test_utils_1 = require("../../utils/test-utils");
describe("sqljs driver > autosave", () => {
    let connections;
    let saves = 0;
    const callback = (database) => {
        saves++;
    };
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Post_1.Post],
        schemaCreate: true,
        enabledDrivers: ["sqljs"],
        driverSpecific: {
            autoSaveCallback: callback,
            autoSave: true,
        },
    })));
    it("should call autoSaveCallback on insert, update and delete", () => Promise.all(connections.map(async (connection) => {
        let posts = [
            {
                title: "second post",
            },
            {
                title: "third post",
            },
        ];
        await connection
            .createQueryBuilder()
            .insert()
            .into(Post_1.Post)
            .values(posts)
            .execute();
        await connection
            .createQueryBuilder()
            .update(Post_1.Post)
            .set({ title: "Many posts" })
            .execute();
        await connection
            .createQueryBuilder()
            .delete()
            .from(Post_1.Post)
            .where("title = ?", { title: "third post" })
            .execute();
        const repository = connection.getRepository(Post_1.Post);
        let post = new Post_1.Post();
        post.title = "A post";
        await repository.save(post);
        let savedPost = await repository.findOneBy({ title: "A post" });
        (0, chai_1.expect)(savedPost).not.to.be.null;
        if (savedPost) {
            savedPost.title = "A updated post";
            await repository.save(savedPost);
            await repository.remove(savedPost);
        }
        await connection.close();
        (0, chai_1.expect)(saves).to.be.equal(8);
    })));
});
describe("sqljs driver > autosave off", () => {
    let connections;
    let saves = 0;
    const callback = (database) => {
        saves++;
    };
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [Post_1.Post],
        schemaCreate: true,
        enabledDrivers: ["sqljs"],
        driverSpecific: {
            autoSaveCallback: callback,
            autoSave: false,
        },
    })));
    it("should not call autoSaveCallback when autoSave is disabled", () => Promise.all(connections.map(async (connection) => {
        const repository = connection.getRepository(Post_1.Post);
        let post = new Post_1.Post();
        post.title = "A post";
        await repository.save(post);
        let savedPost = await repository.findOneBy({ title: "A post" });
        (0, chai_1.expect)(savedPost).not.to.be.null;
        if (savedPost) {
            savedPost.title = "A updated post";
            await repository.save(savedPost);
            await repository.remove(savedPost);
        }
        await connection.close();
        (0, chai_1.expect)(saves).to.be.equal(0);
    })));
});
//# sourceMappingURL=auto-save.js.map