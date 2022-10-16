import { Request, Response, NextFunction } from 'express';
import { ResponseHelper } from '../helpers/response.helper';
import { ErrorService } from '../services/error.service';
import { AuthenticationService } from '../services/authentication.service'; 
import bcrypt from "bcryptjs"
import { entityWithId, systemError } from '../entities';

const errorService = new ErrorService()
const authenticationService: AuthenticationService = new AuthenticationService(errorService)

interface localUser {
  login: string
  password: string;
}

const login = async (req: Request, res: Response, next: NextFunction) => {
    const user: localUser = req.body
    authenticationService.login(user.login, user.password)
    .then((id: number) => {
      // generate JWT token
        const token: string = "1"; 
        return res.status(200).json({
          token: token
        }); // handle errors
    })
    .catch((error: systemError) => {
      return ResponseHelper.handleError(res, error)
    })

};

 export default {login}