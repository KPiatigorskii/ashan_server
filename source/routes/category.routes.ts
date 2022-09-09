import express from 'express';
// import controller from '../controllers/school.controller';
const router = express.Router();

router.get('/get-all'); // Get all product categories
router.get('/get/:id'); // Get product category by id
router.put('/update/:id'); // Update product category by id
router.put('/create'); // Add a new product category
router.delete('/delete/:id') // Delete an existing product category by category id

export default { router };