import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/product.service';
import { ErrorService } from '../services/error.service';
import { product } from '../entities';
import { systemError } from '../entities';
import { RequestHelper } from '../helpers/request.helper';
import { ResponseHelper } from  '../helpers/response.helper';

const errorService: ErrorService = new ErrorService();
const productService = new ProductService(errorService);

const getAllProductByStoreId = async (req: Request, res: Response, next: NextFunction) => {
    productService.getAllProductsByStoreId(Number(req.params.id))
    .then((result: product[]) => {
        return res.status(200).json({
            products: result
        });
    })
};

const getProductById = async (req: Request, res: Response, next: NextFunction) => {
    productService.getProductById(Number(req.params.id))
    .then((result: product) => {
        return res.status(200).json({
            product: result
        });
    })
};

const updateProductById = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id)
    if (typeof numericParamOrError === "number") {
        if (numericParamOrError > 0) {
            const body: product = req.body;

            productService.updateProductById({
                id: numericParamOrError,
                innerUuid: body.innerUuid, 
                productName: body.productName, 
                categoryId: body.categoryId,
                createDate:  new Date,
                createUserId: 1, 
                statusId: 0,
                updateDate: new Date,
                updateUserId: 0
            }, numericParamOrError)
            .then((result: product)=> {
                return res.status(200).json(result);
            })
            .catch((error: systemError) => {
                return ResponseHelper.handleError(res, error);
            });
        }
    }
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