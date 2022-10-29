import express from 'express';
import { Role } from '../enums';
import controller from '../controllers/user.controller';
import middleware from '../middleware/auth.middleware';
const router = express.Router();

router.post('/create', middleware.verifyToken([Role.Administrator]), controller.createUser);
router.get('/get/:id', middleware.verifyToken([Role.RegularUser, Role.Administrator]),  controller.getById)
router.put('/:id', middleware.verifyToken([Role.Administrator]),  controller.updateById);
router.delete('/:id', middleware.verifyToken([Role.Administrator]),  controller.deleteById);

export default { router };