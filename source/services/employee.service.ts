import { employee } from "../entities";
import { SqlHelper } from "../helpers/sql.helper";
import { ErrorService } from "./error.service";
import { Queries } from "../constants"
import { Status } from "../enums"

interface IEmployee {
    getEmployeeById(id: number): Promise<employee>;
    updateEmployeeById(id: number): Promise<employee>;
    deleteEmployeeById(id: number): Promise<employee>;
    createEmployee(): Promise<employee>;
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
    public updateEmployeeById(id: number): Promise<employee> {
        return new Promise<employee>((resolve, reject) => {

        })
    }
    public deleteEmployeeById(id: number): Promise<employee> {
        return new Promise<employee>((resolve, reject) => {

        })
    }
    public createEmployee(): Promise<employee> {
        return new Promise<employee>((resolve, reject) => {

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