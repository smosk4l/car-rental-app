import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import {
  createReservation,
  getUserReservations,
  getReservationById,
  updateReservation,
  cancelReservation,
  getAllReservations,
  updateReservationStatus,
} from '../controllers/reservationController';

const router = Router();

// User routes (authenticated users can manage their own reservations)
router.get('/', authenticate, getUserReservations);
router.post('/', authenticate, createReservation);
router.get('/:id', authenticate, getReservationById);
router.put('/:id', authenticate, updateReservation);
router.delete('/:id', authenticate, cancelReservation);

// Admin routes (admin-only access)
router.get('/admin/all', authenticate, authorize(['ADMIN']), getAllReservations);
router.patch('/:id/status', authenticate, authorize(['ADMIN']), updateReservationStatus);

export default router;
