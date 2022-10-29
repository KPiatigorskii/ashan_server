import express from 'express';
import controller from '../controllers/product.controller'
import { Role } from '../enums';
import  middleware from '../middleware/auth.middleware'
const router = express.Router();

router.get('/get-all', middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.getAllProducts);
router.get('/get-from-store/:id', middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.getAllProductByStoreId); // Get a list of all products by store id
router.get('/get/:id', middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.getProductById); // Get an product by id
router.put('/update/:id', middleware.verifyToken([Role.Administrator]), controller.updateProductById); // Update product info by id (including category)
router.post('/create', middleware.verifyToken([Role.Administrator]), controller.createProduct); // Create new product and reference the location in store(s) (including category)
router.post('/add-location', middleware.verifyToken([Role.Administrator]), controller.createLocation); // Add product location by location info, product id and a store id
router.delete('/delete/:id', middleware.verifyToken([Role.Administrator]), controller.deleteProductById); // Delete a product by id
router.delete('/delete-location/:id', middleware.verifyToken([Role.Administrator]), controller.deletePositionById); // Delete a location of a product

export default { router };