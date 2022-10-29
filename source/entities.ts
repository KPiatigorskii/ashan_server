import employeeController from "./controllers/employee.controller";
import { AppError, Role, Status } from "./enums";

export interface entityWithId {
    id: number;
}

export interface defaultDBEntity {
    createUserId: number;
    updateUserId: number;
    createDate: Date;
    updateDate: Date;
    statusId: Status;
}

export interface systemError {
    key: AppError;
    message: string;
    code: number;
}

export interface authenticationToken {
    userData: jwtUserData;
}

export interface AuthenticatedRequest extends Request, authenticationToken { }

export interface product extends defaultDBEntity, entityWithId {
    innerUuid: number;
    productName: string;
    categoryId: number;
}

export interface store extends defaultDBEntity, entityWithId {
    address: string;
    storeName: string;
}

export interface location {
    productId: number;
    storeId: number;
    amountOfProducts: number;
    rowInStore: number;
    shelfInStore: number;
}

export interface employeeRelation extends entityWithId {
    chiefId: number;
}

export interface category extends defaultDBEntity, entityWithId  {
    innerUuid: number;
    categoryName: string;
}

export interface employee extends defaultDBEntity, entityWithId {
    firstName: string;
    lastName: string;
    storeId: number;
    birthDate: Date;
    position: string;
    chiefId: number;
}

export interface status {
    id: number;
    title: string;
}

export interface user extends defaultDBEntity, entityWithId {
    firstName: string;
    lastName: string;
    // login?: string;
    // password?: string;
}


export interface jwtUserData {
    userId: number;
    roleId: Role;
}