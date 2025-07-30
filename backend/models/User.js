import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String },
  passwordHash: { type: String },
  healthMetrics: {
    height: Number,
    weight: Number,
    age: Number,
    gender: String,
    cholesterol: Number,
    bloodPressure: String,
    bloodSugar: Number,
    medicalConditions: [String]
  },
  fitnessProfile: {
    experienceLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'] },
    fitnessGoal: { type: String, enum: ['Muscle Gain', 'Fat Loss', 'Endurance', 'General Wellness'] }
  },
  dietaryPreferences: {
    dietaryPattern: String,
    allergies: [String],
    restrictions: [String]
  },
  supplementPreferences: {
    preferredForm: String,
    preferredBrands: [String],
    ingredientTransparency: Boolean,
    certifications: [String],
    avoidProprietaryBlends: Boolean,
    clinicallySupportedDosage: Boolean
  },
  otherPreferences: {
    priceRange: { min: Number, max: Number },
    minCustomerRating: Number,
    allowInternational: Boolean,
    allowProprietaryBlends: Boolean
  },
  consent: Boolean,
  history: {
    supplementSuggestions: [Object],
    interactions: [Object]
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);

