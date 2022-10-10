import { Request, Response, NextFunction } from 'express';
import { category } from '../entities';
import { CategoryService } from '../services/category.service';
import { ErrorService } from '../services/error.service';

const errorService = new ErrorService()
const categoryService = new CategoryService(errorService)

const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: `getAllCategories`
    });
};

const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    categoryService.getCategoryById(Number(req.params.id))
    .then((result: category) => {
        return res.status(200).json({
            product: result
        });
    })
};

const updateCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: `updateCategoryById ${req.params.id}`
    });
};

const deleteCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: `DeleteCategoryById ${req.params.id}`
    });
};

const createCategory = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: `createCategory`
    });
};

export default { createCategory, getAllCategories, getCategoryById, updateCategoryById, deleteCategoryById }