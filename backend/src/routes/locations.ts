import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import {
  getAllLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
} from '../controllers/locationController';

const router = Router();

// Public routes
router.get('/', getAllLocations);
router.get('/:id', getLocationById);

// Admin-only routes
router.post('/', authenticate, authorize(['ADMIN']), createLocation);
router.put('/:id', authenticate, authorize(['ADMIN']), updateLocation);
router.delete('/:id', authenticate, authorize(['ADMIN']), deleteLocation);

export default router;
