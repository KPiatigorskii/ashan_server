import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { EmployeeService } from '../services/employee.service';
import { ErrorService } from '../services/error.service';
import { employee, employeeRelation, systemError } from '../entities';
import { ResponseHelper } from '../helpers/response.helper';
import { RequestHelper } from '../helpers/request.helper'
import { NON_EXISTENT_ID } from '../constants';

const errorService: ErrorService = new ErrorService();
const employeeService = new EmployeeService(errorService)

const getAllEmployees = async (req: Request, res: Response, next: NextFunction) => {
    employeeService.getAllEmployee()
    .then((result: employee[]) => {
        return res.status(200).json({
            employees: result
        });
    })
    .catch((error: systemError) => {
        return ResponseHelper.handleError(res, error);
    });
};

const getEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
    employeeService.getEmployeeById(Number(req.params.id))
    .then((result: employee) => {
        return res.status(200).json({
            employee: result
        });
    })
    .catch((error: systemError) => {
        return ResponseHelper.handleError(res, error);
    });
};

const updateEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id)
    if (typeof numericParamOrError === "number" && numericParamOrError > 0) {
        let body: employee = req.body
        employeeService.updateEmployeeById({
            id: NON_EXISTENT_ID,
            firstName: body.firstName,
            lastName: body.lastName,
            storeId: body.storeId,
            birthDate: body.birthDate,
            position: body.position,
            chiefId: body.chiefId,
            createUserId: body.createUserId,
            updateUserId: body.updateUserId,
            createDate: body.createDate,
            updateDate: body.updateDate,
            statusId: body.statusId
        }, numericParamOrError)
        .then((result: employee) => {
            return res.status(200).json({
                employee: result
            });
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error);
        });
    }
};

const deleteEmployeeById = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id)
    if (typeof numericParamOrError === "number" && numericParamOrError > 0) {
        employeeService.deleteEmployeeById(numericParamOrError)
        .then(() => {
            return res.status(200).json({
                employee: numericParamOrError
            });
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error);
        });
    }
};

const createEmployee = async (req: Request, res: Response, next: NextFunction) => {
    let body: employee = req.body
    employeeService.createEmployee({
        id: NON_EXISTENT_ID,
        firstName: body.firstName,
        lastName: body.lastName,
        storeId: body.storeId,
        birthDate: body.birthDate,
        position: body.position,
        chiefId: body.chiefId,
        createUserId: body.createUserId,
        updateUserId: body.updateUserId,
        createDate: body.createDate,
        updateDate: body.updateDate,
        statusId: body.statusId
    })
    .then((result: employee) => {
        return res.status(200).json({
            employee: result
        });
    })
    .catch((error: systemError) => {
        return ResponseHelper.handleError(res, error);
    });
};

const addRelations = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id)
    const relation: employeeRelation = req.body
    if (typeof numericParamOrError === "number" && numericParamOrError > 0) {
        employeeService.createRelationEmployee({id: numericParamOrError, chiefId: relation.chiefId})
        .then(() => {
            return res.status(200).json({
                addRelation: relation
            });
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error);
        });
    }

};

const deleteRelation = async (req: Request, res: Response, next: NextFunction) => {
    const numericParamOrError: number | systemError = RequestHelper.ParseNumericInput(errorService, req.params.id)
    const relation: employeeRelation = req.body
    if (typeof numericParamOrError === "number" && numericParamOrError > 0) {
        employeeService.deleteRelationEmployee({id: numericParamOrError, chiefId: relation.chiefId})
        .then(() => {
            return res.status(200).json({
                deleteRelation: relation
            });
        })
        .catch((error: systemError) => {
            return ResponseHelper.handleError(res, error);
        });
    }
};

export default { createEmployee, 
    deleteEmployeeById,
    updateEmployeeById,
    getEmployeeById,
    getAllEmployees,
    addRelations,
    deleteRelation
}