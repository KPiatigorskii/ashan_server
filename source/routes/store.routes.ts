import express from 'express';
import controller from '../controllers/store.controller';
import  middleware from '../middleware/auth.middleware'
import { Role } from '../enums';
const router = express.Router();

router.get('/get/all', middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.getAllStores); // Get a list of all stores
router.get('/get/:id', middleware.verifyToken([Role.Administrator, Role.RegularUser]), controller.getStoreById); // Get a store by id
router.put('/update/:id', middleware.verifyToken([Role.Administrator]), controller.updateStoreById); // Update store by id
router.post('/create', middleware.verifyToken([Role.Administrator]), controller.createStore); // Create new store
router.delete('/delete/:id', middleware.verifyToken([Role.Administrator]), controller.deleteStoreById); // Delete a store by id

export default { router };