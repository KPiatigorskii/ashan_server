import express from 'express';
import controller from '../controllers/employee.controller';
import { Role } from '../enums';
import  middleware from '../middleware/auth.middleware'
const router = express.Router();

router.get('/get/all',  middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.getAllEmployees); // Get all employees positions
//router.get('/get-from-store/:id', controller.getEmployeeByStoreId); // Get a list of all employees by store id
router.get('/get/:id', middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.getEmployeeById); // Get an employee by id
router.put('/update/:id', middleware.verifyToken([Role.Administrator]), controller.updateEmployeeById); // Update employee info by id (including position)
router.post('/create', middleware.verifyToken([Role.Administrator]), controller.createEmployee); // Create new employee and reference the employee to a store(s) (including position)
router.put('/add-relation/:id', middleware.verifyToken([Role.Administrator]), controller.addRelations); // Add employee relation by id of a manager and id of subordinate
router.put('/delete/:id', middleware.verifyToken([Role.Administrator]), controller.deleteEmployeeById); // Delete an employee by id
router.put('/delete-relation/:id', middleware.verifyToken([Role.Administrator]), controller.deleteRelation); // Delete employees relation by manager id and subordinate id

export default { router };
