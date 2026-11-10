
"use client";


import { useEffect, useState } from "react";
import Link from "next/link";
import ProfileMenu from "@/components/profile-menu";
import { getSupabase } from "@/lib/supabase/client";
import { recipes } from "@/lib/recipes/catalog";

const cuisines = [
  "All Cuisines",
  "Caribbean",
  "African",
  "Southern / Soul Food",
  "Italian",
  "Mexican",
  "Asian",
  "American",
  "Mediterranean",
];

const cravings = [
  "All Cravings",
  "Spicy",
  "Creamy",
  "Savory",
  "Sweet",
  "Comfort Food",
  "Healthy",
  "Quick & Easy",
];

export default function RecipesPage() {
  const [level, setLevel] = useState<1 | 2 | 3>(1);

const [loadingProfile, setLoadingProfile] = useState(true);

useEffect(() => {
  let active = true;

  async function loadCookingLevel() {
    try {
      const supabase = getSupabase();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!active) return;

      if (!user) {
        window.location.replace("/login");
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("cooking_level")
        .eq("id", user.id)
        .maybeSingle();

      if (error) throw error;

      if (active) {
        const savedLevel = Number(profile?.cooking_level ?? 1);

        setLevel(
          savedLevel === 2 || savedLevel === 3 ? savedLevel : 1
        );
      }
    } catch (error) {
      console.error("Could not load cooking level:", error);
    } finally {
      if (active) setLoadingProfile(false);
    }
  }

  loadCookingLevel();

  return () => {
    active = false;
  };
}, []);

  const [cuisine, setCuisine] = useState("All Cuisines");
  const [craving, setCraving] = useState("All Cravings");
  const [search, setSearch] = useState("");

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesLevel = recipe.level <= level;

    const matchesCuisine =
      cuisine === "All Cuisines" || recipe.cuisine === cuisine;

    const matchesCraving =
      craving === "All Cravings" ||
      recipe.cravings.includes(craving);

    const matchesSearch =
      recipe.title.toLowerCase().includes(search.toLowerCase()) ||
      recipe.description.toLowerCase().includes(search.toLowerCase());

    return (
      matchesLevel &&
      matchesCuisine &&
      matchesCraving &&
      matchesSearch
    );
  });

if (loadingProfile) {
  return (
    <main className="min-h-screen bg-[#141414] p-12 text-white">
      Loading your personalized recipes...
    </main>
  );
} 
 return (
    <main className="min-h-screen bg-[#141414] px-5 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="text-2xl font-bold">
            Crave<span className="text-orange-500">Craft</span>
          </Link>

          <div className="flex items-center gap-5">
            <Link
              href="/dashboard"
              className="text-sm text-orange-400 hover:underline"
            >
              My Kitchen →
            </Link>
            <ProfileMenu />
          </div>
        </header>

        <div className="mt-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-400">
            Discover Something Delicious
          </p>

          <h1 className="mt-3 text-4xl font-bold md:text-5xl">
            What are you craving?
          </h1>

          <p className="mt-4 max-w-2xl text-gray-400">
            Discover real recipes from trusted chefs and cooking
            websites, matched to your cooking skills and cravings.
          </p>
        </div>

        <section className="mt-10 rounded-2xl border border-white/10 bg-[#222] p-6">
          <h2 className="text-xl font-bold">
            Find Your Next Recipe
          </h2>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="level"
                className="mb-2 block text-sm text-gray-300"
              >
                Cooking Level
              </label>

              <select
                id="level"
                value={level}
                onChange={(event) =>
                  setLevel(Number(event.target.value) as 1 | 2 | 3)
                }
                className="w-full rounded-lg border border-white/10 bg-[#141414] p-3 text-white"
              >
                <option value={1}>Level 1 — Beginner</option>
                <option value={2}>Level 2 — Intermediate</option>
                <option value={3}>Level 3 — Advanced</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="cuisine"
                className="mb-2 block text-sm text-gray-300"
              >
                Cuisine
              </label>

              <select
                id="cuisine"
                value={cuisine}
                onChange={(event) => setCuisine(event.target.value)}
                className="w-full rounded-lg border border-white/10 bg-[#141414] p-3 text-white"
              >
                {cuisines.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="craving"
                className="mb-2 block text-sm text-gray-300"
              >
                What are you craving?
              </label>

              <select
                id="craving"
                value={craving}
                onChange={(event) => setCraving(event.target.value)}
                className="w-full rounded-lg border border-white/10 bg-[#141414] p-3 text-white"
              >
                {cravings.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="search"
                className="mb-2 block text-sm text-gray-300"
              >
                Search Recipes
              </label>

              <input
                id="search"
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Chicken, pasta, spicy..."
                className="w-full rounded-lg border border-white/10 bg-[#141414] p-3 text-white placeholder:text-gray-500"
              />
            </div>
          </div>
        </section>

        <section className="mt-12">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-2xl font-bold">
              Explore Recipes
            </h2>

            <p className="text-sm text-gray-400">
              {filteredRecipes.length} recipes found
            </p>
          </div>

          {filteredRecipes.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-dashed border-white/20 bg-[#1d1d1d] px-6 py-16 text-center">
              <h3 className="text-2xl font-bold">
                The Kitchen Is Heating Up 🍳
              </h3>

              <p className="mx-auto mt-4 max-w-lg text-gray-400">
                We're preparing a collection of real recipes from
                established cooking sources. Check back soon
                for recipes matched to your skill level.
              </p>

              <Link
                href="/originals"
                className="mt-7 inline-block rounded-full bg-orange-500 px-6 py-3 font-bold text-black hover:bg-orange-400"
              >
                Explore CraveCraft Originals →
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredRecipes.map((recipe) => (
                <article
                  key={recipe.id}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-[#222]"
                >

{recipe.image ? (
  <img
    src={recipe.image}
    alt={recipe.title}
    className="h-52 w-full object-cover"
  />
) : (
  <div className="flex h-52 items-center justify-center bg-gradient-to-br from-orange-950 to-[#29201b]">
    <span className="text-center text-5xl">🍽️</span>
  </div>
)}

                  <div className="p-5">
                    <p className="text-sm text-orange-400">
                      {recipe.cuisine} • Level {recipe.level}
                    </p>

                    <h3 className="mt-2 text-xl font-bold">
                      {recipe.title}
                    </h3>

                    <p className="mt-2 text-sm text-gray-400">
                      {recipe.description}
                    </p>

                    <p className="mt-3 text-xs text-gray-500">
                      Recipe by {recipe.source}
                    </p>

                    <a
                      href={recipe.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-block font-semibold text-orange-400 hover:underline"
                    >
                      View Original Recipe →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

