import { store } from "../entities";
import { SqlHelper } from "../helpers/sql.helper";
import { ErrorService } from "./error.service";
import { Queries } from "../constants"
import { Status } from "../enums"

interface IStore {
    getStoreById(id: number): Promise<store>;
    updateStoreById(id: number): Promise<store>;
    deleteStoreById(id: number): Promise<store>;
    createStore(): Promise<store>;
}

interface localStore {
    id: number;
    address: string;
    store_name: string;
    create_date: Date;
    update_date: Date;
    create_user_id: number;
    update_user_id: number;
    status_id: Status;
}

export class StoreService implements IStore {
    constructor(
        private errorService: ErrorService
    ) { }

    public getStoreById(id: number): Promise<store> {
        return new Promise<store>((resolve, reject) => {
            SqlHelper.executeQuerySingleResult<localStore>(this.errorService, Queries.StoreById, id)
            .then((queryResult: localStore) => {
                resolve(this.parseLocalStore(queryResult));
            })
            .catch((error) => {
                reject(error)
            })
        })
    }
    public updateStoreById(id: number): Promise<store> {
        return new Promise<store>((resolve, reject) => {

        })
    }
    public deleteStoreById(id: number): Promise<store> {
        return new Promise<store>((resolve, reject) => {

        })
    }
    public createStore(): Promise<store> {
        return new Promise<store>((resolve, reject) => {

        })
    }

    private parseLocalStore(local: localStore): store {
        return {
            id: local.id,
            address: local.address,
            storeName: local.store_name,
            createDate: local.create_date,
            createUserId: local.create_user_id, 
            statusId: local.status_id,
            updateDate: local.update_date,
            updateUserId: local.update_user_id
        }
    }
}