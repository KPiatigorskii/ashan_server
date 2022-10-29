import { entityWithId, systemError, user } from "../entities";
import { SqlHelper } from "../helpers/sql.helper";
import { ErrorService } from "./error.service";
import { Queries } from "../constants"
import { Role, Status } from "../enums"
import { DateHelper } from "../helpers/date.helpers";

interface IUser {
    getUserById(id: number): Promise<user>;
    updateById(user: user, userId: number): Promise<user>;
    deleteById(id: number, userId: number): Promise<void>;
    createUser(user: user, userId: number): Promise<user>;
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

    public updateById(user: user, userId: number): Promise<user> {
        return new Promise<user>((resolve, reject) => {
            const updateDate: Date = new Date();
            SqlHelper.executeQueryNoResult(this.errorService, Queries.UpdateUserById, false, user.firstName, user.lastName, DateHelper.dateToString(updateDate), userId, user.id, Status.Active)
                .then(() => {
                    resolve(user);
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    public deleteById(id: number, userId: number): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const updateDate: Date = new Date();
            SqlHelper.executeQueryNoResult(this.errorService, Queries.DeleteUserById, true, DateHelper.dateToString(updateDate), userId, Status.NotActive, id, Status.Active)
                .then(() => {
                    resolve();
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    public createUser(user: user, userId: number): Promise<user> {
        return new Promise<user>((resolve, reject) => {
            const createDate: string = DateHelper.dateToString(new Date());
            SqlHelper.createNew(this.errorService, Queries.AddUser, user, user.firstName, user.lastName, user.login as string, user.password as string, Role.RegularUser, createDate, createDate, userId, userId, Status.Active)
                .then((result: entityWithId) => {
                    resolve(result as user);
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        });
    }

    private parseLocalUser(local: localUser): user {
        return {
            id: local.id,
            firstName: local.first_name,
            lastName: local.last_name
        }
    }
}