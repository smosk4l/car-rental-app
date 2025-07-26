import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// TODO: Add user controller functions
router.get('/profile', authenticate, (req, res) => {
  res.json({ message: 'Get user profile endpoint - TODO' });
});

router.put('/profile', authenticate, (req, res) => {
  res.json({ message: 'Update user profile endpoint - TODO' });
});

// Admin-only routes
router.get('/', authenticate, authorize(['ADMIN']), (req, res) => {
  res.json({ message: 'Get all users endpoint - TODO' });
});

export default router;
