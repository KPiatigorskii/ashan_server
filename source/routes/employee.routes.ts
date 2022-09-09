import express from 'express';
// import controller from '../controllers/school.controller';
const router = express.Router();

router.get('/get-all'); // Get all employees positions
router.get('/get-all-from-store/:id'); // Get a list of all employees by store id
router.get('/get/:id'); // Get an employee by id
router.put('/update/:id'); // Update employee info by id (including position)
router.put('/create'); // Create new employee and reference the employee to a store(s) (including position)
router.put('/add-relation'); // Add employee relation by id of a manager and id of subordinate
router.delete('/delete/:id'); // Delete an employee by id
router.delete('/delete-relation/:id'); // Delete employees relation by manager id and subordinate id

export default { router };
