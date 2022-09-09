import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

const getAllEmployees = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: `getAllEmployees`
    });
};

const getEmployeeByStoreId = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: `getEmployeeByStoreId ${req.params.id}`
    });
};

const getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: `getEmployeeById ${req.params.id}`
    });
};

const updateEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: `updateEmployeeById ${req.params.id}`
    });
};

const deleteEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: `deleteEmployeeById ${req.params.id}`
    });
};

const createEmployee = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: `createEmployee`
    });
};

const addRelations = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: `addRelations`
    });
};

const deleteRelation = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: `deleteRelation`
    });
};

export default { createEmployee, 
    deleteEmployeeById,
    updateEmployeeById,
    getEmployeeById,
    getEmployeeByStoreId,
    getAllEmployees,
    addRelations,
    deleteRelation
}