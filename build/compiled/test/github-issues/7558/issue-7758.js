"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../utils/test-utils");
const chai_1 = require("chai");
const Animal_1 = require("./entity/Animal");
const Cat_1 = require("./entity/Cat");
const Dog_1 = require("./entity/Dog");
const NnaryOperator_1 = require("./entity/NnaryOperator");
const NumberEntry_1 = require("./entity/NumberEntry");
const OperatorTreeEntry_1 = require("./entity/OperatorTreeEntry");
const Person_1 = require("./entity/Person");
const Photo_1 = require("./entity/Photo");
describe("github issues > #7558 Child entities' wrong discriminator value when embedded in parent entity", () => {
    let dataSources;
    before(async () => (dataSources = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
        schemaCreate: true,
        dropSchema: true,
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(dataSources));
    after(() => (0, test_utils_1.closeTestingConnections)(dataSources));
    it("should use the correct subclass for inheritance when saving & retrieving a single STI entity (one-to-one)", () => Promise.all(dataSources.map(async (dataSource) => {
        const entityManager = dataSource.createEntityManager();
        const personRepo = entityManager.getRepository(Person_1.PersonEntity);
        const photoRepo = entityManager.getRepository(Photo_1.Photo);
        const photo = photoRepo.create({
            title: "Cat Photo",
            size: 42,
        });
        (0, chai_1.expect)(photo).to.be.instanceOf(Photo_1.Photo);
        // Create a new person, cascade saving the content.
        const person = personRepo.create({
            pets: [],
            content: photo,
        });
        (0, chai_1.expect)(person.content).not.to.be.undefined;
        (0, chai_1.expect)(person.content).to.be.instanceOf(Photo_1.Photo);
        await entityManager.save(person);
        // Retrieve it back from the DB.
        const persons = await personRepo.find();
        (0, chai_1.expect)(persons.length).to.equal(1);
        // And check whether the content / photo is still the same.
        (0, chai_1.expect)(persons[0].pets.length).to.equal(0);
        (0, chai_1.expect)(persons[0].content).not.to.be.undefined;
        (0, chai_1.expect)(persons[0].content).not.to.be.null;
        (0, chai_1.expect)(persons[0].content).to.be.instanceOf(Photo_1.Photo);
        (0, chai_1.expect)(persons[0].content).to.include(photo);
    })));
    it("should use the correct subclass for inheritance when saving & retrieving multiple STI entities (one-to-many)", () => Promise.all(dataSources.map(async (dataSource) => {
        const entityManager = dataSource.createEntityManager();
        const personRepo = entityManager.getRepository(Person_1.PersonEntity);
        const animalRepo = entityManager.getRepository(Animal_1.AnimalEntity);
        const dogRepo = entityManager.getRepository(Dog_1.DogEntity);
        const catRepo = entityManager.getRepository(Cat_1.CatEntity);
        const mysteryUnicorn = animalRepo.create({
            name: "i-am-a-mystery",
        });
        (0, chai_1.expect)(mysteryUnicorn).to.be.instanceOf(Animal_1.AnimalEntity);
        const felix = catRepo.create({
            name: "felix",
            livesLeft: 9,
            // Cat stuff
        });
        (0, chai_1.expect)(felix).to.be.instanceOf(Cat_1.CatEntity);
        const spike = dogRepo.create({
            name: "spike",
            steaksEaten: 42,
            // Dog stuff
        });
        (0, chai_1.expect)(spike).to.be.instanceOf(Dog_1.DogEntity);
        const pets = [mysteryUnicorn, felix, spike];
        // Create a new person, cascade saving the pets.
        const person = personRepo.create({
            pets,
        });
        (0, chai_1.expect)(person.pets[0]).to.be.instanceOf(Animal_1.AnimalEntity);
        (0, chai_1.expect)(person.pets[1]).to.be.instanceOf(Cat_1.CatEntity);
        (0, chai_1.expect)(person.pets[2]).to.be.instanceOf(Dog_1.DogEntity);
        await entityManager.save(person);
        // Retrieve it back from the DB.
        const persons = await personRepo.find({ relations: ["pets"] });
        (0, chai_1.expect)(persons.length).to.equal(1);
        // And check whether the pets are still the same.
        (0, chai_1.expect)(persons[0].pets.length).to.equal(3);
        const animalPets = persons[0].pets.filter((entity) => entity instanceof Animal_1.AnimalEntity &&
            !(entity instanceof Cat_1.CatEntity) &&
            !(entity instanceof Dog_1.DogEntity));
        const catPets = persons[0].pets.filter((entity) => entity instanceof Cat_1.CatEntity);
        const dogPets = persons[0].pets.filter((entity) => entity instanceof Dog_1.DogEntity);
        (0, chai_1.expect)(animalPets.length).to.equal(1);
        (0, chai_1.expect)(animalPets[0]).to.include(mysteryUnicorn);
        (0, chai_1.expect)(catPets.length).to.equal(1);
        (0, chai_1.expect)(catPets[0]).to.include(felix);
        (0, chai_1.expect)(dogPets.length).to.equal(1);
        (0, chai_1.expect)(dogPets[0]).to.include(spike);
    })));
    it("should set the correct discriminators for trees in STI settings", () => Promise.all(dataSources.map(async (dataSource) => {
        const entityManager = dataSource.createEntityManager();
        const operatorTreeRepo = entityManager.getTreeRepository(OperatorTreeEntry_1.OperatorTreeEntry);
        const nnaryOperatorRepo = entityManager.getTreeRepository(NnaryOperator_1.NnaryOperator);
        const numberEntryRepo = entityManager.getRepository(NumberEntry_1.NumberEntry);
        // Create an operator tree (10.5 * (21 + 42)).
        const num1 = numberEntryRepo.create({ value: 42 });
        const num2 = numberEntryRepo.create({ value: 21 });
        const num3 = numberEntryRepo.create({ value: 10.5 });
        const mulOperator = nnaryOperatorRepo.create({
            operator: "*",
        });
        // Save the tree...
        // We need to first save the parents step by step.
        const savedMulOperator = await operatorTreeRepo.save(mulOperator);
        const plusOperator = nnaryOperatorRepo.create({
            parent: savedMulOperator,
            operator: "+",
        });
        num3.parent = savedMulOperator;
        await operatorTreeRepo.save(num3);
        const savedPlusOperator = await operatorTreeRepo.save(plusOperator);
        num1.parent = savedPlusOperator;
        num2.parent = savedPlusOperator;
        await operatorTreeRepo.save([num1, num2]);
        // ... and fetch it from the database.
        const fetchedTrees = await operatorTreeRepo.findTrees();
        (0, chai_1.expect)(fetchedTrees.length).to.eql(1);
        (0, chai_1.expect)(fetchedTrees[0]).to.be.instanceOf(NnaryOperator_1.NnaryOperator);
        const fetchedOperator = fetchedTrees[0];
        (0, chai_1.expect)(fetchedOperator.operator).to.eql("*");
        (0, chai_1.expect)(fetchedOperator.children.length).to.be.eql(2);
        // Order is *not* deterministic by default...
        (0, chai_1.expect)(fetchedOperator.children.find((operator) => operator.id === num3.id)).to.be.instanceOf(NumberEntry_1.NumberEntry);
        (0, chai_1.expect)(fetchedOperator.children.find((operator) => operator.id === savedPlusOperator.id)).to.be.instanceOf(NnaryOperator_1.NnaryOperator);
        const subOperator = fetchedOperator.children.find((operator) => operator.id === savedPlusOperator.id);
        (0, chai_1.expect)(subOperator.operator).to.eql("+");
        (0, chai_1.expect)(subOperator.children.length).to.be.eql(2);
        (0, chai_1.expect)(subOperator.children[0]).to.be.instanceOf(NumberEntry_1.NumberEntry);
        (0, chai_1.expect)(subOperator.children[1]).to.be.instanceOf(NumberEntry_1.NumberEntry);
    })));
});
//# sourceMappingURL=issue-7758.js.map