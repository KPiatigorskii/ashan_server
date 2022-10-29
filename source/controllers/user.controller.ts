import { Request, Response, NextFunction } from 'express';
import bcrypt from "bcryptjs";
import { NON_EXISTENT_ID } from '../constants';
import { AuthenticatedRequest, systemError, user } from '../entities';
import { ErrorService } from '../services/error.service';
import { UserService } from '../services/user.service';
import { ResponseHelper } from '../helpers/response.helper';

const errorService = new ErrorService;
const userService = new UserService(errorService)

const createUser = async (req: Request, res: Response, next: NextFunction) => {
    const body: user = req.body;

    const hashedPassword: string = bcrypt.hashSync(body.password as string);

    userService.createUser({
        id: NON_EXISTENT_ID,
        firstName: body.firstName,
        lastName: body.lastName,
        login: body.login,
        password: hashedPassword
    }, (req as unknown as AuthenticatedRequest).userData.userId)
        .then((result: user) => {
            const returnedUser: user = {
                id: result.id,
                firstName: result.firstName,
                lastName: result.lastName
            };
            return res.status(200).json(returnedUser);
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error);
        });
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
    userService.getUserById(Number(req.params.id))
    .then((result: user) => {
        return res.status(200).json({
            product: result
        });
    })
};

const updateById = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: `getAllCategories`
    });
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: `getAllCategories`
    });
};

export default{ createUser , deleteById, updateById, getById }