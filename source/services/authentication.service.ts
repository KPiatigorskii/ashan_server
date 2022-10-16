import { Queries } from "../constants";
import { entityWithId, systemError } from "../entities"
import { SqlHelper } from "../helpers/sql.helper"
import { ErrorService } from "./error.service"
import bcrypt from "bcryptjs"
import { AppError } from "../enums";


interface IauthenticationService{
    login(login: string, password: string): Promise<number>
}

interface localUser extends entityWithId {
    password: string;
}

export class AuthenticationService implements IauthenticationService {
    constructor(
        private errorService: ErrorService
   ) { }

   public login(login: string, password: string): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            SqlHelper.executeQuerySingleResult<localUser>(this.errorService, Queries.GetUserByLogin, login)
            .then((user: localUser) => {
                if (bcrypt.compareSync(password, user.password)){
                    resolve(user.id);
                }
                else {
                    reject(this.errorService.getError(AppError.NoData ));
                }
            })
            .catch((error: systemError) => {
                reject(error)
            });
        });
   }
}