export function validateUserProfile(data) {
  const errors = {};
  // Height (cm)
  if (!data.healthMetrics?.height || data.healthMetrics.height < 100 || data.healthMetrics.height > 250) {
    errors.height = 'Height should be between 100 and 250 cm';
  }
  // Weight (kg)
  if (!data.healthMetrics?.weight || data.healthMetrics.weight < 30 || data.healthMetrics.weight > 250) {
    errors.weight = 'Weight should be between 30 and 250 kg';
  }
  // Age
  if (!data.healthMetrics?.age || data.healthMetrics.age < 10 || data.healthMetrics.age > 100) {
    errors.age = 'Age should be between 10 and 100';
  }
  // Gender
  if (!['Male', 'Female', 'Other'].includes(data.healthMetrics?.gender)) {
    errors.gender = 'Gender is required';
  }
  // Cholesterol
  if (!data.healthMetrics?.cholesterol || data.healthMetrics.cholesterol < 50 || data.healthMetrics.cholesterol > 400) {
    errors.cholesterol = 'Cholesterol should be between 50 and 400 mg/dL';
  }
  // Blood Pressure
  if (!/^\d{2,3}\/\d{2,3}$/.test(data.healthMetrics?.bloodPressure || '')) {
    errors.bloodPressure = 'Blood pressure must be in format systolic/diastolic, e.g. 120/80';
  }
  // Blood Sugar
  if (!data.healthMetrics?.bloodSugar || data.healthMetrics.bloodSugar < 50 || data.healthMetrics.bloodSugar > 400) {
    errors.bloodSugar = 'Blood sugar should be between 50 and 400 mg/dL';
  }
  // Experience Level
  if (!['Beginner', 'Intermediate', 'Advanced'].includes(data.fitnessProfile?.experienceLevel)) {
    errors.experienceLevel = 'Experience level is required';
  }
  // Fitness Goal
  if (!['Muscle Gain', 'Fat Loss', 'Endurance', 'General Wellness'].includes(data.fitnessProfile?.fitnessGoal)) {
    errors.fitnessGoal = 'Fitness goal is required';
  }
  // Consent
  if (data.consent !== true) {
    errors.consent = 'User consent is required';
  }
  return errors;
}
