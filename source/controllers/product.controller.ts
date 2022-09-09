import { Request, Response, NextFunction } from 'express';

const getAllProductByStoreId = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: `getAllProductByStoreId ${req.params.id}`
    });
};

const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: `getProductById ${req.params.id}`
    });
};

const updateProductById = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: `updateProductById ${req.params.id}`
    });
};

const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: `createProduct`
    });
};

const createLocation = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: `createLocation`
    });
};

const deleteProductById = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: `DeleteProductById ${req.params.id}`
    });
};

const deletePositionById = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: `DeleteProductById ${req.params.id}`
    });
};


export default { createLocation, deletePositionById, createProduct, getAllProductByStoreId, getProductById, updateProductById, deleteProductById }