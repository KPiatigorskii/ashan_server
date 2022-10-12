import { product, systemError } from "../entities";
import { SqlHelper } from "../helpers/sql.helper";
import { ErrorService } from "./error.service";
import { Queries } from "../constants"
import { Status } from "../enums"
import { QueryEvent } from "msnodesqlv8";
import { DateHelper } from "../helpers/date.helpers";
import {v4 as uuidv4} from 'uuid'

interface IProductService {
    getAllProductsByStoreId(id: number): Promise<product[]>;
    getProductById(id: number): Promise<product>;
    updateProductById(product: product, id: number): Promise<product>;
    createProduct(): Promise<product>;
    deleteProductById(): Promise<product>;
}

interface localProduct {
    id: number;
    inner_uuid: number;
    name: string;
    create_date: Date;
    update_date: Date;
    create_user_id: number;
    update_user_id: number;
    category_id: number;
    status_id: Status;
}


export class ProductService implements IProductService{

    constructor(
        private errorService: ErrorService
    ) { }

    public getAllProductsByStoreId(id: number){
        return new Promise<product[]>((resolve, reject) => {
            const result: product[] = [];

            SqlHelper.executeQueryArrayResult<localProduct>(this.errorService, Queries.AllProductsByStoreId, id)
            .then((queryResult: localProduct[]) => {
                queryResult.forEach((product: localProduct) => {
                    result.push(this.parseLocalProduct(product))
                });
                resolve(result);
            })
            .catch((error: systemError) => {
                reject(error);
            });
    });
}
    public getProductById(id: number): Promise<product>{
        return new Promise<product>((resolve, reject) => {
            SqlHelper.executeQuerySingleResult<localProduct>(this.errorService, Queries.ProductById, id) // , Status.Active)
            .then((queryResult: localProduct) => {
                resolve(this.parseLocalProduct(queryResult));
            })
            .catch((error) => {
                reject(error)
            })
        })
    }
    public updateProductById(product: product, id: number): Promise<any>{
        return new Promise<product>((resolve, reject) => {
            const updateDate: Date = new Date();
            //const innerUuid: string =  uuidv4();
            SqlHelper.executeQueryNoResult(this.errorService, Queries.updateProductById, false, product.innerUuid, product.productName, product.categoryId, DateHelper.dateToString(updateDate),id  )
            .then(() => {
                resolve(product);
            })
            .catch((error: systemError) => {
                reject(error);
            });
        })
    }
    public createProduct(): Promise<any>{
        return new Promise<any>((resolve, reject) => {

        })
    }
    public deleteProductById(): Promise<any>{
        return new Promise<any>((resolve, reject) => {

        })
    }

    private parseLocalProduct(local: localProduct): product {
        return {
            id: local.id,
            productName: local.name,
            innerUuid: local.inner_uuid,
            categoryId: local.category_id,
            createDate: local.create_date,
            createUserId: local.create_user_id, 
            statusId: local.status_id,
            updateDate: local.update_date,
            updateUserId: local.update_user_id
        };
    }
}