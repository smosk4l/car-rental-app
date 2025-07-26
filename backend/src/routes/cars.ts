import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import {
  getAllCars,
  getCarById,
  createCar,
  updateCar,
  deleteCar,
} from '../controllers/carController';

const router = Router();

// Public routes
router.get('/', getAllCars);
router.get('/:id', getCarById);

// Admin-only routes
router.post('/', authenticate, authorize(['ADMIN']), createCar);
router.put('/:id', authenticate, authorize(['ADMIN']), updateCar);
router.delete('/:id', authenticate, authorize(['ADMIN']), deleteCar);

export default router;
