import { AppError, Status } from "./enums";
import employeeRoutes from "./routes/employee.routes";

export interface entityWithId {
    id: number;
}

export interface defaultDBEntity extends entityWithId{
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

export interface product extends defaultDBEntity {
    innerUuid: number;
    productName: string;
    categoryId: number;
}

export interface store extends defaultDBEntity {
    address: string;
    storeName: string;
}

export interface category extends defaultDBEntity {
    innerUuid: number;
    categoryName: string;
}

export interface employee extends defaultDBEntity{
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

export interface user {
    id: number;
    firstName: string;
    lastName: string;
    // login?: string;
    // password?: string;
}