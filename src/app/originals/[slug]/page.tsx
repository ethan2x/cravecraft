
import Link from "next/link";
import ProfileMenu from "@/components/profile-menu";
import { notFound } from "next/navigation";

const recipes = {
  "jerk-chicken-wings": {
    title: "Ethan's Signature Jerk Chicken Wings",
    subtitle: "Bold Caribbean flavor, straight from my kitchen.",
    image: "/images/recipes/IMG_1948.jpg",
    cuisine: "Caribbean",
    difficulty: "Beginner-friendly",
    ingredients: [
      "Chicken wings",
      "Jerk seasoning (your preferred brand)",
      "Black pepper",
      "Jerk BBQ sauce",
    ],
    steps: [
      "Pat the chicken wings dry with paper towels. Keep raw chicken separate from other ingredients and wash your hands after handling it.",
      "Season the wings generously with jerk seasoning and black pepper, making sure every piece is coated.",
      "Cover and refrigerate for at least 30 minutes. For deeper flavor, marinate for 1–2 hours.",
      "Preheat the oven to 350°F (175°C). Arrange the wings on a baking tray in a single layer.",
      "Bake for approximately 25–30 minutes, then flip the wings and continue cooking for another 25–30 minutes. Cooking time may vary depending on wing size.",
      "Brush the wings with jerk BBQ sauce and return them to the oven for another 5–10 minutes.",
      "Check that the thickest part of the wings reaches an internal temperature of 165°F (74°C). Let rest briefly before serving.",
    ],
    note: "My tip: Don't rush the seasoning! Giving the wings time to marinate makes a huge difference.",
  },
  "rasta-pasta": {
    title: "Ethan's Creamy Rasta Pasta",
    subtitle: "Creamy, cheesy, colorful, and packed with jerk flavor.",
    image: "/images/recipes/IMG_6420.jpg",
    cuisine: "Caribbean Fusion",
    difficulty: "Beginner-friendly",
    ingredients: [
      "Penne pasta (or your preferred pasta)",
      "Chicken breast",
      "Beef smoked sausage",
      "Jerk seasoning",
      "Olive oil",
      "Red bell pepper",
      "Yellow bell pepper",
      "500 mL heavy cream",
      "1/2 cup grated cheddar cheese",
      "1/2 cup mozzarella cheese",
      "1/2 cup Parmesan cheese",
      "1/2 cup chicken broth",
      "Butter",
      "Salt and black pepper",
      "Optional: green bell pepper, onion, and garlic",
    ],
    steps: [
      "Slice the chicken breast into bite-sized pieces and season with jerk seasoning, salt, and black pepper.",
      "Heat olive oil in a large skillet over medium heat. Cook the chicken until browned and fully cooked to 165°F (74°C). Remove and set aside.",
      "Slice the smoked sausage and brown it in the same skillet. Remove and set aside.",
      "Bring a large pot of salted water to a boil. Cook the pasta according to the package instructions until al dente, then drain.",
      "Slice the bell peppers into thin strips. Add butter to the skillet and sauté the peppers until slightly softened. Add onion and garlic if using.",
      "Lower the heat and pour in the heavy cream and chicken broth. Stir gently until warmed through.",
      "Gradually add the cheddar, mozzarella, and Parmesan, stirring until the sauce is smooth and creamy.",
      "Add a little jerk seasoning to the sauce, tasting as you go. Adjust the salt and black pepper.",
      "Return the chicken and smoked sausage to the skillet. Stir and let everything simmer gently for a few minutes.",
      "Add the cooked pasta and toss until evenly coated in the creamy sauce. Serve warm.",
    ],
    note: "My tip: Add the jerk seasoning gradually to the sauce. You want that bold flavor without overpowering the creaminess.",
  },
};

type RecipeSlug = keyof typeof recipes;

export default async function OriginalRecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const recipe = recipes[slug as RecipeSlug];

  if (!recipe) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#141414] px-6 py-12 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/originals"
            className="text-sm text-orange-400 hover:underline"
          >
            ← Back to CraveCraft Originals
          </Link>
          <ProfileMenu />
        </div>

        <div className="mt-10">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-400">
            CraveCraft Originals • Founder's Recipe
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            {recipe.title}
          </h1>

          <p className="mt-4 text-lg text-gray-300">
            {recipe.subtitle}
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <span className="rounded-full bg-orange-500/20 px-4 py-2 text-sm text-orange-300">
              {recipe.cuisine}
            </span>
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
              {recipe.difficulty}
            </span>
            <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
              Free Member Exclusive
            </span>
          </div>
        </div>

        <img
          src={recipe.image}
          alt={recipe.title}
          className="mt-8 h-80 w-full rounded-2xl object-cover md:h-[450px]"
        />

        <section className="mt-12 rounded-2xl bg-[#222] p-6 md:p-8">
          <h2 className="text-2xl font-bold text-orange-400">
            Ingredients
          </h2>

          <ul className="mt-6 space-y-3">
            {recipe.ingredients.map((ingredient) => (
              <li
                key={ingredient}
                className="flex gap-3 text-gray-200"
              >
                <span className="text-orange-400">✓</span>
                {ingredient}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 rounded-2xl bg-[#222] p-6 md:p-8">
          <h2 className="text-2xl font-bold text-orange-400">
            Step-by-Step Instructions
          </h2>

          <ol className="mt-7 space-y-7">
            {recipe.steps.map((step, index) => (
              <li key={index} className="flex gap-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-500 font-bold text-black">
                  {index + 1}
                </span>
                <p className="pt-2 leading-relaxed text-gray-200">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-10 rounded-2xl border border-orange-500/30 bg-orange-500/10 p-6">
          <h2 className="text-xl font-bold text-orange-400">
            Ethan's Kitchen Tip
          </h2>
          <p className="mt-3 text-gray-200">{recipe.note}</p>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/originals"
            className="inline-block rounded-full bg-orange-500 px-8 py-3 font-bold text-black hover:bg-orange-400"
          >
            Explore More Originals
          </Link>
        </div>
      </div>
    </main>
  );
}
