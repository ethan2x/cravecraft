
import Link from "next/link";
import ProfileMenu from "@/components/profile-menu";

const recipes = [
  {
    title: "Ethan's Signature Jerk Chicken Wings",
    description:
      "Oven-baked Jamaican-inspired jerk wings, seasoned with bold spices and finished with jerk BBQ sauce.",
    image: "/images/recipes/IMG_1948.jpg",
    slug: "jerk-chicken-wings",
    category: "Caribbean",
    level: "Beginner-friendly",
  },
  {
    title: "Ethan's Creamy Rasta Pasta",
    description:
      "Creamy, cheesy penne pasta with jerk-seasoned chicken, smoked sausage, and colorful bell peppers.",
    image: "/images/recipes/IMG_6420.jpg",
    slug: "rasta-pasta",
    category: "Caribbean Fusion",
    level: "Beginner-friendly",
  },
];

export default function OriginalsPage() {
  return (
    <main className="min-h-screen bg-[#141414] px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/dashboard"
            className="text-sm text-orange-400 hover:underline"
          >
            ← Back to Dashboard
          </Link>
          <ProfileMenu />
        </div>

        <div className="mt-12 mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-orange-400">
            CraveCraft Originals
          </p>

          <h1 className="text-4xl font-bold md:text-5xl">
            From My Kitchen to Yours.
          </h1>

          <p className="mt-5 max-w-2xl text-lg text-gray-300">
            Exclusive recipes created by Ethan, the founder of CraveCraft.
            These recipes are free for members and separate from your
            regular recipe allowance.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {recipes.map((recipe) => (
            <Link
              key={recipe.slug}
              href={`/originals/${recipe.slug}`}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#222]"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <div className="mb-3 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-full bg-orange-500/20 px-3 py-1 text-orange-300">
                    {recipe.category}
                  </span>
                  <span className="rounded-full bg-white/10 px-3 py-1 text-gray-300">
                    {recipe.level}
                  </span>
                </div>

                <h2 className="text-2xl font-bold group-hover:text-orange-400">
                  {recipe.title}
                </h2>

                <p className="mt-3 text-gray-400">
                  {recipe.description}
                </p>

                <p className="mt-6 font-semibold text-orange-400">
                  View Recipe →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

