"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoCliente = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const cliente_1 = require("./cliente");
let TipoCliente = class TipoCliente {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], TipoCliente.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)({ name: "tipo" }),
    tslib_1.__metadata("design:type", String)
], TipoCliente.prototype, "descricao", void 0);
tslib_1.__decorate([
    (0, src_1.OneToMany)(() => cliente_1.Cliente, (c) => c.tipo),
    tslib_1.__metadata("design:type", Array)
], TipoCliente.prototype, "clientes", void 0);
TipoCliente = tslib_1.__decorate([
    (0, src_1.Entity)()
], TipoCliente);
exports.TipoCliente = TipoCliente;
//# sourceMappingURL=tipo-cliente.js.map