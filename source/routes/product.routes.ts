import express from 'express';
// import controller from '../controllers/school.controller';
const router = express.Router();

router.get('/get-all'); // Get a list of all products by store id
router.get('/get/:id'); // Get an product by id
router.put('/update/:id'); // Update product info by id (including category)
router.put('/create'); // Create new product and reference the location in store(s) (including category)
router.put('/add-location'); // Add product location by location info, product id and a store id
router.delete('/delete/:id'); // Delete a product by id
router.get('/get-all-positions'); // Delete a location of a product

export default { router };