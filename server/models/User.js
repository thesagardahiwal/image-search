import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    sparse: true,
  },
  facebookId: {
    type: String,
    sparse: true,
  },
  githubId: {
    type: String,
    sparse: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
  },
  provider: {
    type: String,
    required: true,
    enum: ['google', 'facebook', 'github'],
  },
}, {
  timestamps: true,
});

// Compound indexes
userSchema.index({ googleId: 1 }, { sparse: true, unique: true });
userSchema.index({ facebookId: 1 }, { sparse: true, unique: true });
userSchema.index({ githubId: 1 }, { sparse: true, unique: true });
userSchema.index({ email: 1 });

export default mongoose.model('User', userSchema);