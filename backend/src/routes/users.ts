import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { getAllUsers, getProfile, updateProfile, suspendUser, deleteUser } from '../controllers/userController';

const router = Router();

// User profile routes
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);

// Admin-only routes
router.get('/', authenticate, authorize(['ADMIN']), getAllUsers);
router.patch('/:id/suspend', authenticate, authorize(['ADMIN']), suspendUser);
router.delete('/:id', authenticate, authorize(['ADMIN']), deleteUser);

export default router;
