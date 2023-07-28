"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
const tslib_1 = require("tslib");
const src_1 = require("../../../../src");
const tipo_cliente_1 = require("./tipo-cliente");
let Cliente = class Cliente {
};
tslib_1.__decorate([
    (0, src_1.PrimaryGeneratedColumn)(),
    tslib_1.__metadata("design:type", Number)
], Cliente.prototype, "id", void 0);
tslib_1.__decorate([
    (0, src_1.Column)(),
    tslib_1.__metadata("design:type", String)
], Cliente.prototype, "nome", void 0);
tslib_1.__decorate([
    (0, src_1.ManyToOne)(() => tipo_cliente_1.TipoCliente, (tc) => tc.clientes),
    (0, src_1.JoinColumn)({ name: "tipoCliente" }),
    tslib_1.__metadata("design:type", tipo_cliente_1.TipoCliente)
], Cliente.prototype, "tipo", void 0);
Cliente = tslib_1.__decorate([
    (0, src_1.Entity)()
], Cliente);
exports.Cliente = Cliente;
//# sourceMappingURL=cliente.js.map