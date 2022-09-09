import { Request, Response, NextFunction } from 'express';

const getAllStores = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: `getAllStores`
    });
};

const getStoreById = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: `getStoreById ${req.params.id}`
    });
};

const updateStoreById = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: `updateStoreById ${req.params.id}`
    });
};

const deleteStoreById = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: `DeleteStoreById ${req.params.id}`
    });
};

const createStore = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: `createStore`
    });
};

export default { createStore, getAllStores, getStoreById, updateStoreById, deleteStoreById }