"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterByCteCapabilities = void 0;
function filterByCteCapabilities(capability, equalsTo = true) {
    return (conn) => conn.driver.cteCapabilities[capability] === equalsTo;
}
exports.filterByCteCapabilities = filterByCteCapabilities;
//# sourceMappingURL=helpers.js.map