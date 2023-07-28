"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const test_utils_1 = require("../../../../../utils/test-utils");
const Student_1 = require("./entity/Student");
const Teacher_1 = require("./entity/Teacher");
const Accountant_1 = require("./entity/Accountant");
const Employee_1 = require("./entity/Employee");
const Person_1 = require("./entity/Person");
const Faculty_1 = require("./entity/Faculty");
const Specialization_1 = require("./entity/Specialization");
const Department_1 = require("./entity/Department");
describe("table-inheritance > single-table > relations > one-to-many", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        entities: [__dirname + "/entity/*{.js,.ts}"],
    })));
    beforeEach(() => (0, test_utils_1.reloadTestingDatabases)(connections));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should work correctly with OneToMany relations", () => Promise.all(connections.map(async (connection) => {
        // -------------------------------------------------------------------------
        // Create
        // -------------------------------------------------------------------------
        const faculty1 = new Faculty_1.Faculty();
        faculty1.name = "Economics";
        await connection.getRepository(Faculty_1.Faculty).save(faculty1);
        const faculty2 = new Faculty_1.Faculty();
        faculty2.name = "Programming";
        await connection.getRepository(Faculty_1.Faculty).save(faculty2);
        const student = new Student_1.Student();
        student.name = "Alice";
        student.faculties = [faculty1, faculty2];
        await connection.getRepository(Student_1.Student).save(student);
        const specialization1 = new Specialization_1.Specialization();
        specialization1.name = "Geography";
        await connection
            .getRepository(Specialization_1.Specialization)
            .save(specialization1);
        const specialization2 = new Specialization_1.Specialization();
        specialization2.name = "Economist";
        await connection
            .getRepository(Specialization_1.Specialization)
            .save(specialization2);
        const teacher = new Teacher_1.Teacher();
        teacher.name = "Mr. Garrison";
        teacher.specializations = [specialization1, specialization2];
        teacher.salary = 2000;
        await connection.getRepository(Teacher_1.Teacher).save(teacher);
        const department1 = new Department_1.Department();
        department1.name = "Bookkeeping";
        await connection.getRepository(Department_1.Department).save(department1);
        const department2 = new Department_1.Department();
        department2.name = "HR";
        await connection.getRepository(Department_1.Department).save(department2);
        const accountant = new Accountant_1.Accountant();
        accountant.name = "Mr. Burns";
        accountant.departments = [department1, department2];
        accountant.salary = 3000;
        await connection.getRepository(Accountant_1.Accountant).save(accountant);
        // -------------------------------------------------------------------------
        // Select
        // -------------------------------------------------------------------------
        let loadedStudent = await connection.manager
            .createQueryBuilder(Student_1.Student, "student")
            .leftJoinAndSelect("student.faculties", "faculty")
            .where("student.name = :name", { name: "Alice" })
            .orderBy("student.id, faculty.id")
            .getOne();
        loadedStudent.should.have.all.keys("id", "name", "faculties");
        loadedStudent.id.should.equal(1);
        loadedStudent.name.should.equal("Alice");
        loadedStudent.faculties.length.should.equal(2);
        loadedStudent.faculties[0].name.should.be.equal("Economics");
        loadedStudent.faculties[1].name.should.be.equal("Programming");
        let loadedTeacher = await connection.manager
            .createQueryBuilder(Teacher_1.Teacher, "teacher")
            .leftJoinAndSelect("teacher.specializations", "specialization")
            .where("teacher.name = :name", { name: "Mr. Garrison" })
            .orderBy("teacher.id, specialization.id")
            .getOne();
        loadedTeacher.should.have.all.keys("id", "name", "specializations", "salary");
        loadedTeacher.id.should.equal(2);
        loadedTeacher.name.should.equal("Mr. Garrison");
        loadedTeacher.specializations.length.should.equal(2);
        loadedTeacher.specializations[0].name.should.be.equal("Geography");
        loadedTeacher.specializations[1].name.should.be.equal("Economist");
        loadedTeacher.salary.should.equal(2000);
        let loadedAccountant = await connection.manager
            .createQueryBuilder(Accountant_1.Accountant, "accountant")
            .leftJoinAndSelect("accountant.departments", "department")
            .where("accountant.name = :name", { name: "Mr. Burns" })
            .orderBy("accountant.id, department.id")
            .getOne();
        loadedAccountant.should.have.all.keys("id", "name", "departments", "salary");
        loadedAccountant.id.should.equal(3);
        loadedAccountant.name.should.equal("Mr. Burns");
        loadedAccountant.departments.length.should.equal(2);
        loadedAccountant.departments[0].name.should.be.equal("Bookkeeping");
        loadedAccountant.departments[1].name.should.be.equal("HR");
        loadedAccountant.salary.should.equal(3000);
        const loadedEmployees = await connection.manager
            .createQueryBuilder(Employee_1.Employee, "employee")
            .leftJoinAndSelect("employee.specializations", "specialization")
            .leftJoinAndSelect("employee.departments", "department")
            .orderBy("employee.id, specialization.id, department.id")
            .getMany();
        loadedEmployees[0].should.have.all.keys("id", "name", "salary", "specializations");
        loadedEmployees[0].should.be.instanceof(Teacher_1.Teacher);
        loadedEmployees[0].id.should.equal(2);
        loadedEmployees[0].name.should.equal("Mr. Garrison");
        loadedEmployees[0].specializations.length.should.equal(2);
        loadedEmployees[0].specializations[0].name.should.be.equal("Geography");
        loadedEmployees[0].specializations[1].name.should.be.equal("Economist");
        loadedEmployees[0].salary.should.equal(2000);
        loadedEmployees[1].should.have.all.keys("id", "name", "salary", "departments");
        loadedEmployees[1].should.be.instanceof(Accountant_1.Accountant);
        loadedEmployees[1].id.should.equal(3);
        loadedEmployees[1].name.should.equal("Mr. Burns");
        loadedEmployees[1].departments.length.should.equal(2);
        loadedEmployees[1].departments[0].name.should.be.equal("Bookkeeping");
        loadedEmployees[1].departments[1].name.should.be.equal("HR");
        loadedEmployees[1].salary.should.equal(3000);
        const loadedPersons = await connection.manager
            .createQueryBuilder(Person_1.Person, "person")
            .leftJoinAndSelect("person.faculties", "faculty")
            .leftJoinAndSelect("person.specializations", "specialization")
            .leftJoinAndSelect("person.departments", "department")
            .orderBy("person.id, specialization.id, department.id, faculty.id")
            .getMany();
        loadedPersons[0].should.have.all.keys("id", "name", "faculties");
        loadedPersons[0].should.be.instanceof(Student_1.Student);
        loadedPersons[0].id.should.equal(1);
        loadedPersons[0].name.should.equal("Alice");
        loadedPersons[0].faculties.length.should.equal(2);
        loadedPersons[0].faculties[0].name.should.be.equal("Economics");
        loadedPersons[0].faculties[1].name.should.be.equal("Programming");
        loadedPersons[1].should.have.all.keys("id", "name", "salary", "specializations");
        loadedPersons[1].should.be.instanceof(Teacher_1.Teacher);
        loadedPersons[1].id.should.equal(2);
        loadedPersons[1].name.should.equal("Mr. Garrison");
        loadedPersons[1].specializations.length.should.equal(2);
        loadedPersons[1].specializations[0].name.should.be.equal("Geography");
        loadedPersons[1].specializations[1].name.should.be.equal("Economist");
        loadedPersons[1].salary.should.equal(2000);
        loadedPersons[2].should.have.all.keys("id", "name", "salary", "departments");
        loadedPersons[2].should.be.instanceof(Accountant_1.Accountant);
        loadedPersons[2].id.should.equal(3);
        loadedPersons[2].name.should.equal("Mr. Burns");
        loadedPersons[2].departments.length.should.equal(2);
        loadedPersons[2].departments[0].name.should.be.equal("Bookkeeping");
        loadedPersons[2].departments[1].name.should.be.equal("HR");
        loadedPersons[2].salary.should.equal(3000);
    })));
});
//# sourceMappingURL=one-to-many.js.map