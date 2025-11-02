import express from 'express';
import passport from 'passport';
import {
  getAuthStatus,
  logout,
  oauthCallback,
  oauthFailure
} from '../controllers/authController.js';

const router = express.Router();

// Auth status
router.get('/status', getAuthStatus);

// Logout
router.post('/logout', logout);

// Google OAuth
router.get('/google', passport.authenticate('google'));
router.get(
  '/google/callback',
  passport.authenticate('google', { 
    failureRedirect: '/api/auth/failure',
    failureMessage: true 
  }),
  oauthCallback
);

// Facebook OAuth
router.get('/facebook', passport.authenticate('facebook'));
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { 
    failureRedirect: '/api/auth/failure',
    failureMessage: true 
  }),
  oauthCallback
);

// GitHub OAuth
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get(
  '/github/callback',
  passport.authenticate('github', { 
    failureRedirect: '/api/auth/failure',
    failureMessage: true 
  }),
  oauthCallback
);

// OAuth failure
router.get('/failure', oauthFailure);

export default router;