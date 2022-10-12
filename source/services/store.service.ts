import { store, systemError, entityWithId } from "../entities";
import { SqlHelper } from "../helpers/sql.helper";
import { ErrorService } from "./error.service";
import { Queries } from "../constants"
import { Status } from "../enums"
import { DateHelper } from "../helpers/date.helpers";

interface IStore {
    getStoreById(id: number): Promise<store>;
    updateStoreById(store: store, id: number): Promise<store>;
    deleteStoreById(id: number): Promise<store>;
    getAllstores(): Promise<store[]>;
    createStore(store: store): Promise<store>;
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

    public createStore(store: store): Promise<store> {
        return new Promise<store>((resolve, reject) => {
            const createDate: Date = new Date();
            const createDateString = DateHelper.dateToString(createDate)

            SqlHelper.createNew(this.errorService, Queries.CreateStore, store, 
                store.address, store.storeName, createDateString, createDateString, 1, 1, 0)
                .then((result: entityWithId) => {
                    resolve(result as store);
                })
                .catch((error: systemError) => {
                    reject(error);
                });
        })
    }

    public getAllstores(): Promise<store[]> {
        return new Promise<store[]>((resolve, reject) => {
            const result: store[] = [];
            SqlHelper.executeQueryArrayResult<localStore>(this.errorService, Queries.GetAllStores)
            .then((queryResult: localStore[]) => {
                queryResult.forEach((store: localStore) => {
                    result.push(this.parseLocalStore(store))
                });
                resolve(result);
            })
            .catch((error: systemError) => {
                reject(error);
            })
        })
    }

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

    public updateStoreById(store: store, id: number): Promise<store> {
        return new Promise<store>((resolve, reject) => {
            const updateDate: Date = new Date();
            const updateDateString = DateHelper.dateToString(updateDate)

            SqlHelper.executeQueryNoResult(this.errorService, Queries.UpdateStoreById, false, 
                 store.address, store.storeName, updateDateString, id)  
            .then(() => {
                resolve(store);
            })
            .catch((error: systemError) => {
                reject(error);
            });
        })
    }


    public deleteStoreById(id: number): Promise<store> {
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