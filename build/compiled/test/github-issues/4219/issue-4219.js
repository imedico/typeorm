"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const class_transformer_1 = require("class-transformer");
const Photo_1 = require("./entity/Photo");
const User_1 = require("./entity/User");
describe("github issues > #4219 class-transformer-shim: support metadata reflection", () => {
    it("should create instances with the correct property types", () => {
        const photoLiteral = {
            url: "typeorm.io",
        };
        const user = (0, class_transformer_1.plainToClass)(User_1.User, {
            someDate: "Sat Jun 01 2019",
            oneToOnePhoto: photoLiteral,
            oneToManyPhotos: [photoLiteral],
            manyToOnePhoto: photoLiteral,
            manyToManyPhotos: [photoLiteral],
            treeChildrenPhotos: [photoLiteral],
            treeParentPhoto: photoLiteral,
        });
        user.someDate.should.be.instanceof(Date);
        user.oneToOnePhoto.should.be.instanceof(Photo_1.Photo);
        user.oneToManyPhotos[0].should.be.instanceof(Photo_1.Photo);
        user.manyToOnePhoto.should.be.instanceof(Photo_1.Photo);
        user.manyToManyPhotos[0].should.be.instanceof(Photo_1.Photo);
        user.treeParentPhoto.should.be.instanceof(Photo_1.Photo);
    });
});
//# sourceMappingURL=issue-4219.js.map