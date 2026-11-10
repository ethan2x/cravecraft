
"use client";

import { useRef, useState } from "react";
import { Camera, ImagePlus } from "lucide-react";
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
  const [fridgePhoto, setFridgePhoto] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState("");
  const [scanning, setScanning] = useState(false);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const handleFridgePhoto = (file?: File) => {
  setPhotoError("");
  setFridgePhoto(null);
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    setPhotoError("Please choose an image.");
    return;
  }

  if (file.size > 10 * 1024 * 1024) {
    setPhotoError("Please choose an image smaller than 10 MB.");
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    if (typeof reader.result !== "string") {
      setPhotoError("Could not read this photo.");
      return;
    }

    const img = new Image();

    img.onload = () => {
      const maxDimension = 1200;
      const scale = Math.min(
        1,
        maxDimension / Math.max(img.width, img.height)
      );

      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);

      const context = canvas.getContext("2d");

      if (!context) {
        setPhotoError("Could not process this photo.");
        return;
      }

      context.drawImage(img, 0, 0, canvas.width, canvas.height);

      const compressedPhoto = canvas.toDataURL("image/jpeg", 0.7);

      if (compressedPhoto.length > 2_500_000) {
        setPhotoError("Photo is still too large. Try another image.");
        return;
      }

      setFridgePhoto(compressedPhoto);
    };

    img.onerror = () => setPhotoError("Could not process this photo.");
    img.src = reader.result;
  };

  reader.onerror = () => setPhotoError("Could not read this photo.");
  reader.readAsDataURL(file);
};

async function scanFridgePhoto() {
  if (!fridgePhoto || scanning) return;

  setScanning(true);
  setPhotoError("");

  try {
    const response = await fetch("/api/ingredients/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: fridgePhoto }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Could not scan photo.");
    }

    if (!Array.isArray(data.ingredients) || data.ingredients.length === 0) {
      setPhotoError("No ingredients detected. Try another photo.");
      return;
    }

    setIngredients(data.ingredients.join(", "));
  } catch (err) {
    setPhotoError(
      err instanceof Error ? err.message : "Photo scanning failed."
    );
  } finally {
    setScanning(false);
  }
}
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
          <div className="space-y-4">
            <h2 className="font-semibold">Scan your fridge</h2>
            <p className="text-sm text-cream-muted">
              Take a photo or upload one from your device.
            </p>

            <input
              ref={cameraInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              aria-label="Take a fridge photo"
              onChange={(e) => {
                handleFridgePhoto(e.target.files?.[0]);
                e.target.value = "";
              }}
            />

            <input
              ref={uploadInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              aria-label="Upload a fridge photo"
              onChange={(e) => {
                handleFridgePhoto(e.target.files?.[0]);
                e.target.value = "";
              }}
            />

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => cameraInputRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-full bg-ember px-5 py-3 font-semibold text-charcoal"
              >
                <Camera size={18} />
                Take Photo
              </button>

              <button
                type="button"
                onClick={() => uploadInputRef.current?.click()}
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-3 font-semibold"
              >
                <ImagePlus size={18} />
                Upload Photo
              </button>
            </div>

            {photoError && (
              <p role="alert" className="text-sm text-red-400">
                {photoError}
              </p>
            )}

            {fridgePhoto && (
              <div className="space-y-3">
<button
  type="button"
  onClick={scanFridgePhoto}
  disabled={scanning}
  className="w-full rounded-xl bg-ember px-5 py-3 font-semibold text-charcoal transition hover:opacity-90 disabled:opacity-50"
>
  {scanning ? "Scanning ingredients..." : "Scan Photo with AI"}
</button>
                <img
                  src={fridgePhoto}
                  alt="Selected fridge photo preview"
                  className="max-h-72 w-full rounded-xl object-contain"
                />
                <button
                  type="button"
                  onClick={() => setFridgePhoto(null)}
                  className="text-sm text-cream-muted underline"
                >
                  Remove photo
                </button>
                <p className="text-sm text-cream-muted">
                  Photo selected. AI ingredient scanning is coming next.
                  For now, enter your ingredients below.
                </p>
              </div>
            )}
          </div>

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

