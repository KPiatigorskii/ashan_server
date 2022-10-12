import { Request, Response, NextFunction } from 'express';
import { StoreService } from '../services/store.service';
import { ErrorService } from '../services/error.service';
import { store, systemError } from '../entities';
import { NON_EXISTENT_ID } from '../constants';
import { ResponseHelper } from '../helpers/response.helper';
import { RequestHelper } from '../helpers/request.helper';

const errorService: ErrorService = new ErrorService();
const storeService = new StoreService(errorService);

const getAllStores = async (req: Request, res: Response, next: NextFunction) => {
    storeService.getAllstores()
    .then((result: store[]) => {
        return res.status(200).json({
            stores: result
        });
    })
};

const getStoreById = async (req: Request, res: Response, next: NextFunction) => {
    storeService.getStoreById(Number(req.params.id))
    .then((result: store) => {
        return res.status(200).json({
            product: result
        });
    })
};

const createStore = async (req: Request, res: Response, next: NextFunction) => {
    const body: store = req.body;
    storeService.createStore({
        id: NON_EXISTENT_ID,
        address: body.address,
        storeName: body.storeName,
        createDate:  new Date,
        createUserId: 1, 
        statusId: 0,
        updateDate: new Date,
        updateUserId: 0
    })
    .then((result: store) => {
        return res.status(200).json(result);
    })
    .catch((error: systemError) => {
        return ResponseHelper.handleError(res, error);
    });
}

const updateStoreById = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id)
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            const body: store = req.body;
            storeService.updateStoreById({
                id: NON_EXISTENT_ID,
                address: body.address,
                storeName: body.storeName,
                createDate:  new Date,
                createUserId: 1, 
                statusId: 0,
                updateDate: new Date,
                updateUserId: 0
            }, numericParamOrError)
            .then((result: store)=> {
                return res.status(200).json(result);
            })
            .catch((error: systemError) => {
                return ResponseHelper.handleError(res, error);
            });
        }
    }
};

const deleteStoreById = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: `DeleteStoreById ${req.params.id}`
    });
};



export default { createStore, getAllStores, getStoreById, updateStoreById, deleteStoreById }