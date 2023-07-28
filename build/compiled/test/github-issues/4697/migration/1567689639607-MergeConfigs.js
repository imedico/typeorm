"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MergeConfigs1567689639607 = void 0;
const item_entity_1 = require("../entity/item.entity");
const config_entity_1 = require("../entity/config.entity");
class MergeConfigs1567689639607 {
    async up({ connection }) {
        const itemRepository = connection.getMongoRepository(item_entity_1.Item);
        const configRepository = connection.getMongoRepository(config_entity_1.Config);
        const configs = await configRepository.find();
        await Promise.all(configs.map(async ({ itemId, data }) => {
            const item = await itemRepository.findOneBy({
                _id: itemId,
            });
            if (item) {
                item.config = data;
                return itemRepository.save(item);
            }
            else {
                console.warn(`No item found with id: ${itemId}. Ignoring.`);
                return null;
            }
        }));
    }
    async down({ connection }) {
        const itemRepository = connection.getRepository(item_entity_1.Item);
        const configRepository = connection.getRepository(config_entity_1.Config);
        const items = await itemRepository.find();
        await Promise.all(items.map((item) => {
            const config = new config_entity_1.Config();
            config.itemId = item._id.toString();
            config.data = item.config;
            return configRepository.save(config);
        }));
    }
}
exports.MergeConfigs1567689639607 = MergeConfigs1567689639607;
//# sourceMappingURL=1567689639607-MergeConfigs.js.map