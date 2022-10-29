import express from 'express';
import { verify } from 'jsonwebtoken';
// import controller from '../controllers/school.controller';
import controller from '../controllers/category.controller'
import { Role } from '../enums';
import  middleware from '../middleware/auth.middleware'

const router = express.Router();

router.get('/get',middleware.verifyToken, middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.getAllCategories); // Get all product categories
router.get('/get/:id', middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.getCategoryById); // Get product category by id
router.put('/update/:id', middleware.verifyToken([Role.Administrator]), controller.updateCategoryById); // Update product category by id
router.post('/create', middleware.verifyToken([Role.Administrator]), controller.createCategory); // Add a new product category
router.delete('/delete/:id', middleware.verifyToken([Role.Administrator]), controller.deleteCategoryById) // Delete an existing product category by category id

export default { router };