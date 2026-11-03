export const steps = [
  { n: "01", title: "Pick your level", text: "Beginner, Intermediate, or Advanced. Instructions adapt to how you cook." },
  { n: "02", title: "Tell us your craving", text: "Choose a cuisine and describe what you're in the mood for." },
  { n: "03", title: "Get recipes that fit", text: "Discover recipes matched to your taste, kitchen, and skill." },
];

export const features = [
  { icon: "🤖", title: "CraveChef AI", text: "A personal cooking assistant for questions, techniques, substitutions, and fixing mistakes.", status: "Coming soon" },
  { icon: "🧬", title: "Taste DNA", text: "Learns your flavor preferences, favorite cuisines, and spice tolerance over time.", status: "Coming soon" },
  { icon: "🔍", title: "Kitchen Reality Check", text: "Recipes based on your ingredients, equipment, available time, and experience.", status: "Coming soon" },
  { icon: "📈", title: "Level-Up Recipes", text: "One dish, three versions: beginner, intermediate, and advanced.", status: "Coming soon" },
  { icon: "👩‍🍳", title: "Cook With Me", text: "Step-by-step guided cooking with AI help when you get stuck.", status: "Coming soon" },
  { icon: "📸", title: "Fridge Rescue", text: "Snap a photo of your ingredients and get meal ideas.", status: "Planned" },
];

export const plans = [
  {
    name: "Free", price: "$0", featured: false,
    items: ["12 free recipes per cuisine", "5 AI cooking questions per day", "All three cooking levels", "Save up to 5 favorite recipes"],
  },
  {
    name: "Crave+", price: "$5", featured: true,
    items: ["Unlimited recipes across all cuisines", "15 AI cooking questions per day", "Unlimited saved recipes", "Personalized meal plans", "Smart grocery lists", "Advanced recipe customization"],
  },
  {
    name: "Crave AI", price: "$10", featured: false,
    items: ["Everything in Crave+", "Unlimited AI cooking assistance (reasonable fair-use limits)", "Personalized AI cooking recommendations", "Full access to premium cooking tools"],
  },
];
