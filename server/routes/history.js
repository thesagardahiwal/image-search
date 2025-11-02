import express from 'express';
import { getSearchHistory, clearSearchHistory } from '../controllers/historyController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Get user's search history
router.get('/history', auth, getSearchHistory);

// Clear search history
router.delete('/history', auth, clearSearchHistory);

export default router;