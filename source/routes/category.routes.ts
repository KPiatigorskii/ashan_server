import express from 'express';
import { verify } from 'jsonwebtoken';
// import controller from '../controllers/school.controller';
import controller from '../controllers/category.controller'
import  middleware from '../middleware/auth.middleware'

const router = express.Router();

router.get('/get',middleware.verifyToken, controller.getAllCategories); // Get all product categories
router.get('/get/:id', controller.getCategoryById); // Get product category by id
router.put('/update/:id', controller.updateCategoryById); // Update product category by id
router.post('/create', controller.createCategory); // Add a new product category
router.delete('/delete/:id', controller.deleteCategoryById) // Delete an existing product category by category id

export default { router };