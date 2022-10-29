import express from 'express';
import { Role } from '../enums';
import controller from '../controllers/user.controller';
import middleware from '../middleware/auth.middleware';
const router = express.Router();

router.post('/add', middleware.verifyToken([Role.Administrator]), controller.createUser); //middleware.verifyToken([Role.Administrator]), 
router.get('/get/:id', middleware.verifyToken([Role.RegularUser]),  controller.getById)
router.put('/:id', middleware.verifyToken([Role.Administrator]),  controller.updateById);
router.delete('/:id', middleware.verifyToken([Role.Administrator]),  controller.deleteById);

export default { router };