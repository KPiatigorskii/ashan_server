import { user } from "../entities";
import { SqlHelper } from "../helpers/sql.helper";
import { ErrorService } from "./error.service";
import { Queries } from "../constants"
import { Status } from "../enums"

interface IUser {
    getUserById(id: number): Promise<user>;
    updateUserById(id: number): Promise<user>;
    deleteUserById(id: number): Promise<user>;
    createUser(): Promise<user>;
}

interface localUser {
    id: number;
    first_name: string;
    last_name: string;
    create_date: Date;
    update_date: Date;
    create_user_id: number;
    update_user_id: number;
    status_id: Status;
}

export class UserService implements IUser {
    constructor(
        private errorService: ErrorService
    ) { }

    public getUserById(id: number): Promise<user> {
        return new Promise<user>((resolve, reject) => {
            SqlHelper.executeQuerySingleResult<localUser>(this.errorService, Queries.UserById, id)
            .then((queryResult: localUser) => {
                resolve(this.parseLocalUser(queryResult));
            })
            .catch((error) => {
                reject(error)
            })
        })
    }
    public updateUserById(id: number): Promise<user> {
        return new Promise<user>((resolve, reject) => {

        })
    }
    public deleteUserById(id: number): Promise<user> {
        return new Promise<user>((resolve, reject) => {

        })
    }
    public createUser(): Promise<user> {
        return new Promise<user>((resolve, reject) => {

        })
    }

    private parseLocalUser(local: localUser): user {
        return {
            id: local.id,
            firstName: local.first_name,
            lastName: local.last_name,
            createDate: local.create_date,
            createUserId: local.create_user_id, 
            statusId: local.status_id,
            updateDate: local.update_date,
            updateUserId: local.update_user_id
        }
    }
}