import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../models/User.js';
import { config } from 'dotenv'
config();
// Validate environment variables
const validateEnvVars = () => {
  const required = [
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET',
    'FACEBOOK_APP_ID', 
    'FACEBOOK_APP_SECRET',
    'GITHUB_CLIENT_ID',
    'GITHUB_CLIENT_SECRET',
    'UNSPLASH_ACCESS_KEY'
  ];

  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    console.warn('⚠️  Missing environment variables:', missing.join(', '));
    console.warn('🔗 Please check your .env file');
    
    // Don't throw error, just warn - app can still run without OAuth
    return false;
  }
  
  return true;
};

// Check if we have the required environment variables
const hasValidEnv = validateEnvVars();

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Only configure strategies if environment variables are available
if (hasValidEnv && process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/api/auth/google/callback",
    scope: ['profile', 'email']
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
      
      if (user) {
        return done(null, user);
      }

      // Check if user exists with same email but different provider
      user = await User.findOne({ email: profile.emails[0].value });
      
      if (user) {
        user.googleId = profile.id;
        user.avatar = profile.photos[0].value;
        await user.save();
        return done(null, user);
      }

      // Create new user
      user = await User.create({
        googleId: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        avatar: profile.photos[0].value,
        provider: 'google'
      });
      
      return done(null, user);
    } catch (error) {
      console.error('Google OAuth error:', error);
      return done(error, null);
    }
  }));
} else {
  console.warn('⚠️  Google OAuth not configured - missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET');
}

if (hasValidEnv && process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: "/api/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'emails', 'photos']
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ facebookId: profile.id });
      
      if (user) {
        return done(null, user);
      }

      user = await User.findOne({ email: profile.emails[0].value });
      
      if (user) {
        user.facebookId = profile.id;
        user.avatar = profile.photos[0].value;
        await user.save();
        return done(null, user);
      }

      user = await User.create({
        facebookId: profile.id,
        email: profile.emails[0].value || `${profile.id}@facebook.com`,
        name: profile.displayName,
        avatar: profile.photos[0].value,
        provider: 'facebook'
      });
      
      return done(null, user);
    } catch (error) {
      console.error('Facebook OAuth error:', error);
      return done(error, null);
    }
  }));
} else {
  console.warn('⚠️  Facebook OAuth not configured - missing FACEBOOK_APP_ID or FACEBOOK_APP_SECRET');
}

if (hasValidEnv && process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "/api/auth/github/callback",
    scope: ['user:email']
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ githubId: profile.id });
      
      if (user) {
        return done(null, user);
      }

      user = await User.findOne({ email: profile.emails[0]?.value });
      
      if (user) {
        user.githubId = profile.id;
        user.avatar = profile.photos[0].value;
        await user.save();
        return done(null, user);
      }

      user = await User.create({
        githubId: profile.id,
        email: profile.emails[0]?.value || `${profile.id}@github.com`,
        name: profile.displayName,
        avatar: profile.photos[0].value,
        provider: 'github'
      });
      
      return done(null, user);
    } catch (error) {
      console.error('GitHub OAuth error:', error);
      return done(error, null);
    }
  }));
} else {
  console.warn('⚠️  GitHub OAuth not configured - missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET');
}

console.log('✅ Passport configuration completed');


export default passport;