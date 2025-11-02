import express from 'express';
import { searchImages, getTopSearches } from '../controllers/searchController.js';
import { auth, optionalAuth } from '../middleware/auth.js';
import { validateSearchTerm } from '../middleware/validation.js';

const router = express.Router();

// Search images (requires auth)
router.post('/search', auth, validateSearchTerm, searchImages);

// Get top searches (optional auth)
router.get('/top-searches', optionalAuth, getTopSearches);

export default router;