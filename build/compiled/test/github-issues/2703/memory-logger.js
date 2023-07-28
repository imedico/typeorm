"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryLogger = void 0;
class MemoryLogger {
    constructor(enabled = true) {
        this.enabled = enabled;
        this._queries = [];
    }
    get queries() {
        return this._queries;
    }
    logQuery(query) {
        if (this.enabled) {
            this._queries.push(query);
        }
    }
    logQueryError(error, query) { }
    logQuerySlow(time, query) { }
    logSchemaBuild(message) { }
    logMigration(message) { }
    log(level, message) { }
    clear() {
        this._queries = [];
    }
}
exports.MemoryLogger = MemoryLogger;
//# sourceMappingURL=memory-logger.js.map