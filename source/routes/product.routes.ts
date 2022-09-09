import express from 'express';
import controller from '../controllers/product.controller'
const router = express.Router();

router.get('/get-from-store/:id', controller.getAllProductByStoreId); // Get a list of all products by store id
router.get('/get/:id', controller.getProductById); // Get an product by id
router.put('/update/:id', controller.updateProductById); // Update product info by id (including category)
router.post('/create', controller.createProduct); // Create new product and reference the location in store(s) (including category)
router.post('/add-location', controller.createLocation); // Add product location by location info, product id and a store id
router.delete('/delete/:id', controller.deleteProductById); // Delete a product by id
router.delete('/delete-location/:id', controller.deletePositionById); // Delete a location of a product

export default { router };