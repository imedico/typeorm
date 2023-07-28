"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
var Order;
(function (Order) {
    Order["FIRST"] = "first";
    Order["SECOND"] = "second";
    Order["THIRD"] = "third";
})(Order = exports.Order || (exports.Order = {}));
(function (Order) {
    function from(value) {
        switch (value) {
            case "_1":
                return Order.FIRST;
            case "_2":
                return Order.SECOND;
            case "_3":
                return Order.THIRD;
            default:
                return Order.FIRST;
        }
    }
    Order.from = from;
})(Order = exports.Order || (exports.Order = {}));
//# sourceMappingURL=order.js.map