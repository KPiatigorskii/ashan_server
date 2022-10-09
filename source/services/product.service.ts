import { product } from "../entities";
import { SqlHelper } from "../helpers/sql.helper";
import { ErrorService } from "./error.service";
import { Queries } from "../constants"
import { Status } from "../enums"

interface IProductService {
    getAllProductsByStoreId(id: number): Promise<product>;
    getProductById(id: number): Promise<product>;
    updateProductById(id: number): Promise<product>;
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
        return new Promise<product>((resolve, reject) => {
        })
    }
    getProductById(id: number): Promise<product>{
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
    updateProductById(id: number): Promise<any>{
        return new Promise<any>((resolve, reject) => {

        })
    }
    createProduct(): Promise<any>{
        return new Promise<any>((resolve, reject) => {

        })
    }
    deleteProductById(): Promise<any>{
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