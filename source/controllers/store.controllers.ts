import { Request, Response, NextFunction } from 'express';
import { StoreService } from '../services/store.service';
import { ErrorService } from '../services/error.service';
import { store } from '../entities';

const errorService: ErrorService = new ErrorService();
const storeService = new StoreService(errorService);

const getAllStores = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: `getAllStores`
    });
};

const getStoreById = async (req: Request, res: Response, next: NextFunction) => {
    storeService.getStoreById(Number(req.params.id))
    .then((result: store) => {
        return res.status(200).json({
            product: result
        });
    })
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