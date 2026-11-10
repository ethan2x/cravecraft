
"use client";

import { useState } from "react";
import Link from "next/link";
import ProfileMenu from "@/components/profile-menu";

type Recipe = {
  title: string;
  cuisine: string;
  description: string;
  prepMinutes: number;
  cookMinutes: number;
  servings: number;
  ingredients: string[];
  instructions: string[];
  seasoningTips: string;
  substitutions: string[];
};

export default function RecipesPage() {
  const [ingredients, setIngredients] = useState("");
  const [craving, setCraving] = useState("");
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generateRecipe() {
    setLoading(true);
    setError("");
    setRecipe(null);

    try {
      const response = await fetch("/api/recipes/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients, craving }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not generate recipe.");
      }

      setRecipe(data.recipe);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-charcoal px-5 py-12 text-cream">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl">
            Crave<span className="text-ember">Craft</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-cream-muted underline">
              My kitchen
            </Link>
            <ProfileMenu />
          </div>
        </header>

        <h1 className="font-display text-4xl">
          Fridge <span className="text-ember">Rescue</span> 🍳
        </h1>

        <p className="mt-3 text-cream-muted">
          Tell us what&apos;s in your kitchen. We&apos;ll turn it into
          something delicious.
        </p>

        <section className="mt-8 space-y-6 rounded-3xl border border-white/10 bg-charcoal-light p-7">
          <div>
            <label htmlFor="ingredients" className="block font-semibold">
              What ingredients do you have?
            </label>
            <textarea
              id="ingredients"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              placeholder="Chicken, rice, bell peppers, garlic, onions..."
              maxLength={1000}
              rows={4}
              className="mt-3 w-full rounded-xl bg-charcoal p-4 text-cream"
            />
          </div>

          <div>
            <label htmlFor="craving" className="block font-semibold">
              What are you craving? (optional)
            </label>
            <input
              id="craving"
              value={craving}
              onChange={(e) => setCraving(e.target.value)}
              placeholder="Something Caribbean, flavorful, and not too spicy"
              maxLength={300}
              className="mt-3 w-full rounded-xl bg-charcoal p-4 text-cream"
            />
          </div>

          <button
            onClick={generateRecipe}
            disabled={loading || !ingredients.trim()}
            className="rounded-full bg-ember px-7 py-3 font-semibold text-charcoal disabled:opacity-50"
          >
            {loading ? "Cooking up your recipe..." : "Generate my recipe ✨"}
          </button>

          {error && <p role="alert" className="text-red-400">{error}</p>}
        </section>

        {recipe && (
          <section className="mt-10 space-y-7 rounded-3xl border border-white/10 bg-charcoal-light p-7">
            <div>
              <p className="text-sm text-ember">{recipe.cuisine}</p>
              <h2 className="mt-2 font-display text-3xl">{recipe.title}</h2>
              <p className="mt-3 text-cream-muted">{recipe.description}</p>
              <p className="mt-4 text-sm text-cream-muted">
                Prep: {recipe.prepMinutes} min · Cook: {recipe.cookMinutes} min
                · Serves {recipe.servings}
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold">Ingredients</h3>
              <ul className="list-disc space-y-2 pl-6">
                {recipe.ingredients.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 text-xl font-semibold">Instructions</h3>
              <ol className="list-decimal space-y-3 pl-6">
                {recipe.instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>

            <div>
              <h3 className="mb-2 text-xl font-semibold">Seasoning tips 🌶️</h3>
              <p className="text-cream-muted">{recipe.seasoningTips}</p>
            </div>

            {recipe.substitutions?.length > 0 && (
              <div>
                <h3 className="mb-2 text-xl font-semibold">Substitutions</h3>
                <ul className="list-disc space-y-2 pl-6">
                  {recipe.substitutions.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

