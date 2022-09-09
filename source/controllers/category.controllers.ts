import { Request, Response, NextFunction } from 'express';

const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: `getAllCategories`
    });
};

const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: `getCategoryById ${req.params.id}`
    });
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