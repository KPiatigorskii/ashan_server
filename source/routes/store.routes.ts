import express from 'express';
// import controller from '../controllers/school.controller';
const router = express.Router();

router.get('/get-all-stores'); // Get a list of all stores
router.get('/get-store/:id'); // Get a store by id
router.put('/update-store/:id'); // Update store by id
router.put('/create-store'); // Create new store
router.delete('/delete-store/:id'); // Delete a store by id

export default { router };