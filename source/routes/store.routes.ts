import express from 'express';
import controller from '../controllers/store.controller';
const router = express.Router();

router.get('/get', controller.getAllStores); // Get a list of all stores
router.get('/get/:id', controller.getStoreById); // Get a store by id
router.put('/update/:id', controller.updateStoreById); // Update store by id
router.post('/create', controller.createStore); // Create new store
router.delete('/delete/:id', controller.deleteStoreById); // Delete a store by id

export default { router };