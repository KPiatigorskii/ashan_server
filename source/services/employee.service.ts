import { employee, entityWithId, systemError, employeeRelation } from "../entities";
import { SqlHelper } from "../helpers/sql.helper";
import { ErrorService } from "./error.service";
import { Queries } from "../constants"
import { Status } from "../enums"
import { reject, result } from "underscore";
import { DateHelper } from "../helpers/date.helpers";

interface IEmployee {
    getEmployeeById(id: number): Promise<employee>;
    getAllEmployee(): Promise<employee[]>;
    createEmployeeWithRelation(employee: employee): Promise<employee>;
    createRelationEmployee(employeeRelation: employeeRelation): Promise<employeeRelation>;
    deleteRelationEmployee(employeeRelation: employeeRelation): Promise<employeeRelation>;
    updateEmployeeById(employee: employee, id: number): Promise<employee>;
    deleteEmployeeById(id: number): Promise<number>;
    createEmployee(employee: employee): Promise<employee>;
}

interface localEmployee {
    id: number;
    first_name: string;
    last_name: string;
    store_id: number;
    date_of_birth: Date;
    position: string;
    chief_id: number;
    create_date: Date;
    update_date: Date;
    create_user_id: number;
    update_user_id: number;
    status_id: Status;
}

export class EmployeeService implements IEmployee {
    constructor(
        private errorService: ErrorService
    ) { }

    public createEmployee(employee: employee): Promise<employee> {
        return new Promise<employee>((resolve, reject) => {
            
            const createDate: Date = new Date();
            const createDateString = DateHelper.dateToString(createDate)
            const birthDateString = String(employee.birthDate)

            SqlHelper.createNew(this.errorService, Queries.CreateEmployee, employee,
                employee.firstName, employee.lastName, employee.storeId, birthDateString, 
                employee.position, 1, 1, createDateString, createDateString, 1 , 1)
            .then((result: entityWithId) => {
                resolve(result as employee)
            })
            .catch((error: ErrorService) => {
                reject(error)
            })
        })
    }

    public getAllEmployee(): Promise<employee[]>{
        let result: employee[] = [];
        return new Promise<employee[]>((resolve, reject) => {
            SqlHelper.executeQueryArrayResult<localEmployee>(this.errorService, Queries.GetAllEmployee)
            .then((queryResult: localEmployee[]) => {
                queryResult.forEach((employee: localEmployee) => {
                    result.push(this.parseLocalEmployee(employee))
                })
                resolve(result);
            })
            .catch((error: ErrorService) => {
                reject(error)
            });
        });
    }

    public createEmployeeWithRelation(employee: employee): Promise<employee> {
        return new Promise<employee>((resolve, reject) => {
            
            const createDate: Date = new Date();
            const createDateString = DateHelper.dateToString(createDate)
            const birthDateString = DateHelper.dateToString(employee.birthDate)

            SqlHelper.createNew(this.errorService, Queries.CreateEmployee, employee,
                employee.storeId, employee.firstName, employee.lastName, birthDateString, 
                employee.position, employee.chiefId, 1, createDateString, createDateString, 1 , 1)
            .then((result: entityWithId) => {
                resolve(result as employee)
            })
            .catch((error: ErrorService) => {
                reject(error)
            })
        })
    }

    
    public updateEmployeeById(employee: employee, id: number): Promise<employee> {
        return new Promise<employee>((resolve, reject) => {
            const createDate: Date = new Date();
            const updateDateString = DateHelper.dateToString(createDate)
            const birthDateString = String(employee.birthDate)
            SqlHelper.executeQueryNoResult(this.errorService, Queries.UpdateEmployeeById, false,
                employee.firstName, employee.lastName,employee.storeId,  birthDateString, 
                employee.position, employee.chiefId, 1, updateDateString, 1 , id)
                .then(() => {
                    resolve(employee)
                })
                .catch((error: systemError) => {
                    reject(error)
                })
        })
    }

    public createRelationEmployee(employeeRelation: employeeRelation): Promise<employeeRelation> {
        return new Promise<employeeRelation>((resolve, reject) => {
            SqlHelper.executeQueryNoResult(this.errorService, Queries.CreateRelationEmployee, false, 
                employeeRelation.chiefId, employeeRelation.id)
            .then(() => {
                resolve(employeeRelation)
            })
            .catch((error: systemError) => {
                reject(error)
            })
        })
    }
    public deleteRelationEmployee(employeeRelation: employeeRelation): Promise<employeeRelation> {
        return new Promise<employeeRelation>((resolve, reject) => {
            SqlHelper.executeQueryNoResult(this.errorService, Queries.DeleteRelationEmployee, false, employeeRelation.id)
            .then(() => {
                resolve(employeeRelation)
            })
            .catch((error: systemError) => {
                reject(error)
            })
        })
    }

    public getEmployeeById(id: number): Promise<employee> {
        return new Promise<employee>((resolve, reject) => {
            SqlHelper.executeQuerySingleResult<localEmployee>(this.errorService, Queries.EmployeeById, id)
            .then((queryResult: localEmployee) => {
                resolve(this.parseLocalEmployee(queryResult));
            })
            .catch((error) => {
                reject(error)
            })
        })
    }

    public deleteEmployeeById(id: number): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            SqlHelper.executeQueryNoResult(this.errorService, Queries.DeleteEmployeeById, false, id)
            .then(() => {
                resolve(id)
            })
            .catch((error: systemError) => {
                reject(error)
            })
        })
    }

    private parseLocalEmployee(local: localEmployee): employee {
        return {
            id: local.id,
            firstName: local.first_name,
            lastName: local.last_name,
            storeId: local.store_id,
            birthDate: local.date_of_birth,
            position: local.position,
            chiefId: local.chief_id,
            createDate: local.create_date,
            createUserId: local.create_user_id, 
            statusId: local.status_id,
            updateDate: local.update_date,
            updateUserId: local.update_user_id
        }
    }
}