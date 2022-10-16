import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/product.service';
import { ErrorService } from '../services/error.service';
import { product, location } from '../entities';
import { systemError } from '../entities';
import { RequestHelper } from '../helpers/request.helper';
import { ResponseHelper } from  '../helpers/response.helper';
import { NON_EXISTENT_ID } from '../constants';

const errorService: ErrorService = new ErrorService();
const productService = new ProductService(errorService);

// Get a list of all products by store id
// Get an product by id
// Update product info by id (including category)
// Create new product and reference the location in store(s) (including category)
// Delete a product by id
// Add product location by location info, product id and a store id
// Delete a location of a product
// Get all product categories
// Add a new product category
// Delete an existing product category by category id

const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    productService.getAllProducts()
    .then((result: product[]) => {
        return res.status(200).json({
            products: result
        });
    })
};

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
                statusId: 1,
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
    const body: product = req.body;

    productService.createProduct({
        id: NON_EXISTENT_ID,
        innerUuid: body.innerUuid,
        productName: body.productName,
        categoryId: body.categoryId,
        createDate:  new Date,
        createUserId: 1, 
        statusId: 1,
        updateDate: new Date,
        updateUserId: 0
    }, )
    .then((result: product) => {
        return res.status(200).json(result);
    })
    .catch((error: systemError) => {
        return ResponseHelper.handleError(res, error);
    });
};

const createLocation = async (req: Request, res: Response, next: NextFunction) => {
    const body: location = req.body;
    productService.createLocation({
        productId: body.productId,
        storeId: body.storeId,
        amountOfProducts: body.amountOfProducts,
        rowInStore: body.rowInStore,
        shelfInStore: body.shelfInStore
    })
    .then((result: location) => {
        return res.status(200).json(result);
    })
    .catch((error: systemError) => {
        return ResponseHelper.handleError(res, error);
    });
};

const deleteProductById = async (req: Request, res: Response, next: NextFunction) => {
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

const deletePositionById = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: `DeleteProductById ${req.params.id}`
    });
};


export default { getAllProducts, createLocation, deletePositionById, createProduct, getAllProductByStoreId, getProductById, updateProductById, deleteProductById }