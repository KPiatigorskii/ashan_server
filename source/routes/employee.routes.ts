import express from 'express';
import controller from '../controllers/employee.controllers';
const router = express.Router();

router.get('/get', controller.getAllEmployees); // Get all employees positions
router.get('/get-from-store/:id', controller.getEmployeeByStoreId); // Get a list of all employees by store id
router.get('/get/:id', controller.getEmployeeById); // Get an employee by id
router.put('/update/:id', controller.updateEmployeeById); // Update employee info by id (including position)
router.put('/create', controller.createEmployee); // Create new employee and reference the employee to a store(s) (including position)
router.put('/add-relation', controller.addRelations); // Add employee relation by id of a manager and id of subordinate
router.delete('/delete/:id', controller.deleteEmployeeById); // Delete an employee by id
router.delete('/delete-relation/:id', controller.deleteRelation); // Delete employees relation by manager id and subordinate id

export default { router };