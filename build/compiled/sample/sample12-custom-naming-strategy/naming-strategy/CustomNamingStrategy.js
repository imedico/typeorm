"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomNamingStrategy = void 0;
const DefaultNamingStrategy_1 = require("../../../src/naming-strategy/DefaultNamingStrategy");
const StringUtils_1 = require("../../../src/util/StringUtils");
class CustomNamingStrategy extends DefaultNamingStrategy_1.DefaultNamingStrategy {
    tableName(targetName, userSpecifiedName) {
        return userSpecifiedName ? userSpecifiedName : (0, StringUtils_1.snakeCase)(targetName);
    }
    columnName(propertyName, customName, embeddedPrefixes) {
        return (0, StringUtils_1.snakeCase)(embeddedPrefixes
            .concat(customName ? customName : propertyName)
            .join("_"));
    }
    columnNameCustomized(customName) {
        return customName;
    }
    relationName(propertyName) {
        return (0, StringUtils_1.snakeCase)(propertyName);
    }
}
exports.CustomNamingStrategy = CustomNamingStrategy;
//# sourceMappingURL=CustomNamingStrategy.js.map