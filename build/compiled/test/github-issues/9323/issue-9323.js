"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const chai_1 = require("chai");
require("reflect-metadata");
const src_1 = require("../../../src");
const test_utils_1 = require("../../utils/test-utils");
const Activity_1 = tslib_1.__importDefault(require("./entity/Activity"));
const Company_1 = tslib_1.__importDefault(require("./entity/Company"));
const Employee_1 = tslib_1.__importDefault(require("./entity/Employee"));
const TimeSheet_1 = tslib_1.__importDefault(require("./entity/TimeSheet"));
describe("github issues > #9323 Add new VirtualColumn decorator feature", () => {
    let connections;
    before(async () => (connections = await (0, test_utils_1.createTestingConnections)({
        enabledDrivers: ["postgres"],
        schemaCreate: true,
        dropSchema: true,
        entities: [Company_1.default, Employee_1.default, TimeSheet_1.default, Activity_1.default],
    })));
    after(() => (0, test_utils_1.closeTestingConnections)(connections));
    it("should generate expected sub-select & select statement", () => Promise.all(connections.map((connection) => {
        const metadata = connection.getMetadata(Company_1.default);
        const options1 = {
            select: {
                name: true,
                totalEmployeesCount: true,
            },
        };
        const query1 = connection
            .createQueryBuilder(Company_1.default, src_1.FindOptionsUtils.extractFindManyOptionsAlias(options1) || metadata.name)
            .setFindOptions(options1 || {})
            .getSql();
        (0, chai_1.expect)(query1).to.eq(`SELECT "Company"."name" AS "Company_name", (SELECT COUNT("name") FROM "employees" WHERE "companyName" = "Company".name) AS "Company_totalEmployeesCount" FROM "companies" "Company"`);
    })));
    it("should generate expected sub-select & nested-subselect statement", () => Promise.all(connections.map((connection) => {
        const metadata = connection.getMetadata(Company_1.default);
        const options1 = {
            select: {
                name: true,
                totalEmployeesCount: true,
                employees: {
                    timesheets: {
                        totalActvityHours: true,
                    },
                },
            },
            relations: {
                employees: {
                    timesheets: true,
                },
            },
        };
        const query1 = connection
            .createQueryBuilder(Company_1.default, src_1.FindOptionsUtils.extractFindManyOptionsAlias(options1) || metadata.name)
            .setFindOptions(options1 || {})
            .getSql();
        (0, chai_1.expect)(query1).to.include(`SELECT "Company"."name" AS "Company_name"`);
        (0, chai_1.expect)(query1).to.include(`(SELECT COUNT("name") FROM "employees" WHERE "companyName" = "Company".name) AS "Company_totalEmployeesCount", (SELECT SUM("hours") FROM "activities" WHERE "timesheetId" =`);
    })));
    it("should not generate sub-select if column is not selected", () => Promise.all(connections.map((connection) => {
        const metadata = connection.getMetadata(Company_1.default);
        const options = {
            select: {
                name: true,
                totalEmployeesCount: false,
            },
        };
        const query = connection
            .createQueryBuilder(Company_1.default, src_1.FindOptionsUtils.extractFindManyOptionsAlias(options) ||
            metadata.name)
            .setFindOptions(options || {})
            .getSql();
        (0, chai_1.expect)(query).to.eq(`SELECT "Company"."name" AS "Company_name" FROM "companies" "Company"`);
    })));
    it("should be able to save and find sub-select data in the database", () => Promise.all(connections.map(async (connection) => {
        var _a, _b;
        const companyName = "My Company 1";
        const company = Company_1.default.create({ name: companyName });
        await company.save();
        const employee1 = Employee_1.default.create({
            name: "Collin 1",
            company: company,
        });
        const employee2 = Employee_1.default.create({
            name: "John 1",
            company: company,
        });
        const employee3 = Employee_1.default.create({
            name: "Cory 1",
            company: company,
        });
        const employee4 = Employee_1.default.create({
            name: "Kevin 1",
            company: company,
        });
        await Employee_1.default.save([
            employee1,
            employee2,
            employee3,
            employee4,
        ]);
        const employee1TimeSheet = TimeSheet_1.default.create({
            employee: employee1,
        });
        await employee1TimeSheet.save();
        const employee1Activities = [
            Activity_1.default.create({
                hours: 2,
                timesheet: employee1TimeSheet,
            }),
            Activity_1.default.create({
                hours: 2,
                timesheet: employee1TimeSheet,
            }),
            Activity_1.default.create({
                hours: 2,
                timesheet: employee1TimeSheet,
            }),
        ];
        await Activity_1.default.save(employee1Activities);
        const findOneOptions = {
            select: {
                name: true,
                totalEmployeesCount: true,
                employees: {
                    name: true,
                    timesheets: {
                        id: true,
                        totalActvityHours: true,
                    },
                },
            },
            relations: {
                employees: {
                    timesheets: true,
                },
            },
            where: {
                name: companyName,
                totalEmployeesCount: (0, src_1.MoreThan)(2),
                employees: {
                    timesheets: {
                        totalActvityHours: (0, src_1.MoreThan)(0),
                    },
                },
            },
            order: {
                employees: {
                    timesheets: {
                        id: "DESC",
                        totalActvityHours: "ASC",
                    },
                },
            },
        };
        const usersUnderCompany = await Company_1.default.findOne(findOneOptions);
        (0, chai_1.expect)(usersUnderCompany === null || usersUnderCompany === void 0 ? void 0 : usersUnderCompany.totalEmployeesCount).to.eq(4);
        const employee1TimesheetFound = (_a = usersUnderCompany === null || usersUnderCompany === void 0 ? void 0 : usersUnderCompany.employees.find((e) => e.name === employee1.name)) === null || _a === void 0 ? void 0 : _a.timesheets.find((ts) => ts.id === employee1TimeSheet.id);
        (0, chai_1.expect)(employee1TimesheetFound === null || employee1TimesheetFound === void 0 ? void 0 : employee1TimesheetFound.totalActvityHours).to.eq(6);
        const usersUnderCompanyList = await Company_1.default.find(findOneOptions);
        const usersUnderCompanyListOne = usersUnderCompanyList[0];
        (0, chai_1.expect)(usersUnderCompanyListOne === null || usersUnderCompanyListOne === void 0 ? void 0 : usersUnderCompanyListOne.totalEmployeesCount).to.eq(4);
        const employee1TimesheetListOneFound = (_b = usersUnderCompanyListOne === null || usersUnderCompanyListOne === void 0 ? void 0 : usersUnderCompanyListOne.employees.find((e) => e.name === employee1.name)) === null || _b === void 0 ? void 0 : _b.timesheets.find((ts) => ts.id === employee1TimeSheet.id);
        (0, chai_1.expect)(employee1TimesheetListOneFound === null || employee1TimesheetListOneFound === void 0 ? void 0 : employee1TimesheetListOneFound.totalActvityHours).to.eq(6);
    })));
    it("should be able to save and find sub-select data in the databse (with query builder)", () => Promise.all(connections.map(async (connection) => {
        const companyName = "My Company 2";
        const company = Company_1.default.create({ name: companyName });
        await company.save();
        const employee1 = Employee_1.default.create({
            name: "Collin 2",
            company: company,
        });
        const employee2 = Employee_1.default.create({
            name: "John 2",
            company: company,
        });
        const employee3 = Employee_1.default.create({
            name: "Cory 2",
            company: company,
        });
        await Employee_1.default.save([employee1, employee2, employee3]);
        const employee1TimeSheet = TimeSheet_1.default.create({
            employee: employee1,
        });
        await employee1TimeSheet.save();
        const employee1Activities = [
            Activity_1.default.create({
                hours: 2,
                timesheet: employee1TimeSheet,
            }),
            Activity_1.default.create({
                hours: 2,
                timesheet: employee1TimeSheet,
            }),
            Activity_1.default.create({
                hours: 2,
                timesheet: employee1TimeSheet,
            }),
        ];
        await Activity_1.default.save(employee1Activities);
        const companyQueryData = await connection
            .createQueryBuilder(Company_1.default, "company")
            .leftJoinAndSelect("company.employees", "employee")
            .leftJoinAndSelect("employee.timesheets", "timesheet")
            .leftJoinAndSelect("timesheet.activities", "activity")
            .where("company.name = :name", { name: companyName })
            // we won't be supporting where & order bys with VirtualColumns (you will have to make your subquery a function that gets added to the query builder)
            //.andWhere("company.totalEmployeesCount > 2")
            //.orderBy({
            //    "employees.timesheets.id": "DESC",
            //    //"employees.timesheets.totalActvityHours": "ASC",
            //})
            .getOne();
        const foundEmployee = companyQueryData === null || companyQueryData === void 0 ? void 0 : companyQueryData.employees.find((e) => e.name === employee1.name);
        const foundEmployeeTimeSheet = foundEmployee === null || foundEmployee === void 0 ? void 0 : foundEmployee.timesheets.find((t) => t.id === employee1TimeSheet.id);
        (0, chai_1.expect)(foundEmployeeTimeSheet === null || foundEmployeeTimeSheet === void 0 ? void 0 : foundEmployeeTimeSheet.totalActvityHours).to.eq(6);
    })));
});
//# sourceMappingURL=issue-9323.js.map