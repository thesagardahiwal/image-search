import express from 'express';
import session from 'express-session';
import cors from 'cors';
import {config, configDotenv} from 'dotenv';

// Load environment variables FIRST
config();
configDotenv();

// Now import other modules
import { connectDB } from './config/database.js';
import passport from './config/passport.js';
import { errorHandler } from './middleware/errorHandler.js';

// Routes
import authRoutes from './routes/auth.js';
import searchRoutes from './routes/search.js';
import historyRoutes from './routes/history.js';

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', searchRoutes);
app.use('/api', historyRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 200,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    data: {
      version: '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      oauth_configured: !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)
    }
  });
});

// Add this before the 404 handler
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'Server is working! OAuth not configured yet.',
    data: {
      google_configured: !!process.env.GOOGLE_CLIENT_ID,
      facebook_configured: !!process.env.FACEBOOK_APP_ID,
      github_configured: !!process.env.GITHUB_CLIENT_ID
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    status: 404,
    error: 'Route not found',
    message: `Cannot ${req.method} ${req.originalUrl}`,
    timestamp: new Date().toISOString()
  });
});

// Error handler
app.use(errorHandler);

export default app;