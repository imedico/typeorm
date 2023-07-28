"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateContacts1566560354098 = void 0;
const item_entity_1 = require("../entity/item.entity");
class UpdateContacts1566560354098 {
    async up({ connection }) {
        const repo = connection.getMongoRepository(item_entity_1.Item);
        const items = await repo.find();
        items.forEach((item) => {
            if (!item.contacts) {
                item.contacts = [item.contact || ""];
            }
        });
        await repo.save(items);
    }
    async down({ connection }) {
        const repo = connection.getMongoRepository(item_entity_1.Item);
        const items = await repo.find();
        items.forEach((item) => {
            item.contact = item.contacts[0];
        });
        await repo.save(items);
    }
}
exports.UpdateContacts1566560354098 = UpdateContacts1566560354098;
//# sourceMappingURL=1566560354098-UpdateContacts.js.map