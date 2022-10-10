import express from 'express';
import { Role } from '../enums';
import controller from '../controllers/user.controller';
const router = express.Router();

router.post('/', controller.add); //middleware.verifyToken([Role.Administrator]), 
router.get('/get/:id', controller.getById)
router.put('/:id', controller.updateById);
router.delete('/:id', controller.deleteById);

export default { router };