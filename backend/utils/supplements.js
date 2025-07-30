// Example supplement database (in production, replace with API or real DB)
export const SUPPLEMENTS = [
  {
    name: 'Whey Protein',
    goal: ['Muscle Gain', 'Endurance'],
    scientificBacking: true,
    ingredientTransparency: true,
    certifications: ['NSF', 'USP'],
    allergens: ['dairy'],
    dietary: ['Vegetarian'],
    form: ['Powder'],
    minAge: 16,
    maxAge: 65,
    minRating: 4.2,
    brands: ['BrandA', 'BrandB'],
    price: 1500,
    proprietaryBlend: false,
    clinicallySupportedDosage: true,
    description: 'Supports muscle synthesis and recovery. Backed by clinical studies.'
  },
  {
    name: 'Plant Protein',
    goal: ['Muscle Gain', 'Endurance'],
    scientificBacking: true,
    ingredientTransparency: true,
    certifications: ['NSF'],
    allergens: [],
    dietary: ['Vegan', 'Vegetarian'],
    form: ['Powder'],
    minAge: 16,
    maxAge: 65,
    minRating: 4.0,
    brands: ['BrandC'],
    price: 1800,
    proprietaryBlend: false,
    clinicallySupportedDosage: true,
    description: 'Plant-based protein for muscle gain. Clean label.'
  },
  {
    name: 'Multivitamin',
    goal: ['General Wellness', 'Endurance'],
    scientificBacking: true,
    ingredientTransparency: true,
    certifications: ['USP'],
    allergens: [],
    dietary: ['Vegan', 'Vegetarian', 'Non-Vegetarian'],
    form: ['Capsule'],
    minAge: 12,
    maxAge: 99,
    minRating: 4.1,
    brands: ['BrandD'],
    price: 900,
    proprietaryBlend: false,
    clinicallySupportedDosage: true,
    description: 'Daily essential vitamins and minerals. Third-party tested.'
  },
  {
    name: 'Omega-3 Fish Oil',
    goal: ['General Wellness'],
    scientificBacking: true,
    ingredientTransparency: true,
    certifications: ['NSF'],
    allergens: ['fish'],
    dietary: ['Non-Vegetarian'],
    form: ['Capsule'],
    minAge: 18,
    maxAge: 99,
    minRating: 4.3,
    brands: ['BrandE'],
    price: 1200,
    proprietaryBlend: false,
    clinicallySupportedDosage: true,
    description: 'Supports heart and brain health. High purity.'
  },
  {
    name: 'Fat Burner X',
    goal: ['Fat Loss'],
    scientificBacking: false,
    ingredientTransparency: false,
    certifications: [],
    allergens: [],
    dietary: ['Vegan', 'Vegetarian', 'Non-Vegetarian'],
    form: ['Capsule'],
    minAge: 18,
    maxAge: 65,
    minRating: 3.2,
    brands: ['BrandF'],
    price: 800,
    proprietaryBlend: true,
    clinicallySupportedDosage: false,
    description: 'Claims to boost metabolism. No credible studies.'
  }
];

// Recommendation logic
export function recommendSupplements(user, options = {}) {
  const {
    fitnessProfile = {},
    dietaryPreferences = {},
    supplementPreferences = {},
    otherPreferences = {},
    healthMetrics = {},
  } = user;
  let results = SUPPLEMENTS.filter(supp => {
    // Match fitness goal
    if (!supp.goal.includes(fitnessProfile.fitnessGoal)) return false;
    // Age
    if (healthMetrics.age && (healthMetrics.age < supp.minAge || healthMetrics.age > supp.maxAge)) return false;
    // Dietary pattern
    if (dietaryPreferences.dietaryPattern && !supp.dietary.includes(dietaryPreferences.dietaryPattern)) return false;
    // Allergies
    if (dietaryPreferences.allergies && dietaryPreferences.allergies.some(a => supp.allergens.includes(a))) return false;
    // Supplement form
    if (supplementPreferences.preferredForm && !supp.form.includes(supplementPreferences.preferredForm)) return false;
    // Ingredient transparency
    if (supplementPreferences.ingredientTransparency && !supp.ingredientTransparency) return false;
    // Certifications
    if (supplementPreferences.certifications && supplementPreferences.certifications.length > 0) {
      if (!supplementPreferences.certifications.every(cert => supp.certifications.includes(cert))) return false;
    }
    // Avoid proprietary blends
    if (supplementPreferences.avoidProprietaryBlends && supp.proprietaryBlend) return false;
    // Clinically supported dosage
    if (supplementPreferences.clinicallySupportedDosage && !supp.clinicallySupportedDosage) return false;
    // Minimum rating
    if (otherPreferences.minCustomerRating && supp.minRating < otherPreferences.minCustomerRating) return false;
    // Price range
    if (otherPreferences.priceRange) {
      if (supp.price < otherPreferences.priceRange.min || supp.price > otherPreferences.priceRange.max) return false;
    }
    // Brand preference
    if (supplementPreferences.preferredBrands && supplementPreferences.preferredBrands.length > 0) {
      if (!supplementPreferences.preferredBrands.some(b => supp.brands.includes(b))) return false;
    }
    // International brands (stub: all are allowed)
    // ...add more as needed
    return true;
  });

  // Sort by price ascending, then by rating descending
  results = results.sort((a, b) => a.price - b.price || b.minRating - a.minRating);
  return results.map(supp => ({
    name: supp.name,
    brands: supp.brands,
    price: supp.price,
    minRating: supp.minRating,
    certifications: supp.certifications,
    ingredientTransparency: supp.ingredientTransparency,
    proprietaryBlend: supp.proprietaryBlend,
    clinicallySupportedDosage: supp.clinicallySupportedDosage,
    dietary: supp.dietary,
    allergens: supp.allergens,
    description: supp.description,
    scientificBacking: supp.scientificBacking
  }));
}
