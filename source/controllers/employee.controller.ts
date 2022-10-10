import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { EmployeeService } from '../services/employee.service';
import { ErrorService } from '../services/error.service';
import { employee } from '../entities';

const errorService: ErrorService = new ErrorService();
const employeeService = new EmployeeService(errorService)

const getAllEmployees = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: `getAllEmployees`
    });
};

const getEmployeeByStoreId = async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json({
        message: `getEmployeeByStoreId`
    });
};

const getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
    employeeService.getEmployeeById(Number(req.params.id))
    .then((result: employee) => {
        return res.status(200).json({
            product: result
        });
    })
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