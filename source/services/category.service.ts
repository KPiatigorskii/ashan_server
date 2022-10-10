import { category } from "../entities";
import { SqlHelper } from "../helpers/sql.helper";
import { ErrorService } from "./error.service";
import { Queries } from "../constants"
import { Status } from "../enums"

interface ICategory {
    getCategoryById(id: number): Promise<category>;
    updateCategoryById(id: number): Promise<category>;
    deleteCategoryById(id: number): Promise<category>;
    createCategory(): Promise<category>;
}

interface localCategory {
    id: number;
    inner_uuid: number;
    name: string;
    category_name: string;
    create_date: Date;
    update_date: Date;
    create_user_id: number;
    update_user_id: number;
    status_id: Status;
}

export class CategoryService implements ICategory {
    constructor(
        private errorService: ErrorService
    ) { }

    public getCategoryById(id: number): Promise<category> {
        return new Promise<category>((resolve, reject) => {
            SqlHelper.executeQuerySingleResult<localCategory>(this.errorService, Queries.CategoryById, id)
            .then((queryResult: localCategory) => {
                resolve(this.parseLocalCategory(queryResult));
            })
            .catch((error) => {
                reject(error)
            })
        })
    }
    public updateCategoryById(id: number): Promise<category> {
        return new Promise<category>((resolve, reject) => {

        })
    }
    public deleteCategoryById(id: number): Promise<category> {
        return new Promise<category>((resolve, reject) => {

        })
    }
    public createCategory(): Promise<category> {
        return new Promise<category>((resolve, reject) => {

        })
    }

    private parseLocalCategory(local: localCategory): category {
        return {
            id: local.id,
            innerUuid: local.inner_uuid,
            categoryName: local.name,
            createDate: local.create_date,
            createUserId: local.create_user_id, 
            statusId: local.status_id,
            updateDate: local.update_date,
            updateUserId: local.update_user_id
        }
    }
}