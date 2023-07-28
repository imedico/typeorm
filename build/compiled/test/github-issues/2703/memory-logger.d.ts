import { Logger } from "../../../src/logger/Logger";
export declare class MemoryLogger implements Logger {
    enabled: boolean;
    constructor(enabled?: boolean);
    private _queries;
    get queries(): string[];
    logQuery(query: string): void;
    logQueryError(error: string, query: string): void;
    logQuerySlow(time: number, query: string): void;
    logSchemaBuild(message: string): void;
    logMigration(message: string): void;
    log(level: "log" | "info" | "warn", message: any): void;
    clear(): void;
}
