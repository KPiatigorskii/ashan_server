import { Request, Response, NextFunction } from 'express';
import { user } from '../entities';
import { ErrorService } from '../services/error.service';
import { UserService } from '../services/user.service';

const errorService = new ErrorService;
const userService = new UserService(errorService)

const add = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: `getAllCategories`
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

export default{ add , deleteById, updateById, getById }