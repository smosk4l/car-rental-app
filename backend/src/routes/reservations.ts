import { Router } from 'express';
import { authenticate } from '../middleware/auth';

const router = Router();

// TODO: Add reservation controller functions
router.get('/', authenticate, (req, res) => {
  res.json({ message: 'Get reservations endpoint - TODO' });
});

router.post('/', authenticate, (req, res) => {
  res.json({ message: 'Create reservation endpoint - TODO' });
});

router.get('/:id', authenticate, (req, res) => {
  res.json({ message: 'Get reservation by ID endpoint - TODO' });
});

router.put('/:id', authenticate, (req, res) => {
  res.json({ message: 'Update reservation endpoint - TODO' });
});

router.delete('/:id', authenticate, (req, res) => {
  res.json({ message: 'Cancel reservation endpoint - TODO' });
});

export default router;
