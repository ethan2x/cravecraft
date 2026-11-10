
import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import ProfileEditor from "./profile-editor";
import ProfileMenu from "@/components/profile-menu";

export default async function Dashboard() {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select(
      "display_name,cooking_level,favorite_cuisines,dietary_preferences,kitchen_equipment"
    )
    .eq("id", user.id)
    .maybeSingle();

  return (
    <main className="min-h-screen bg-charcoal px-5 py-12 text-cream">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="font-display text-2xl">
            Crave<span className="text-ember">Craft</span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="hidden text-sm text-cream-muted sm:inline">
              {user.email}
            </span>
            <ProfileMenu />
          </div>
        </header>

        <h1 className="font-display text-4xl">
          Your kitchen
        </h1>

        <p className="mt-3 text-cream-muted">
          Set up your cooking profile so future recipes fit your tastes.
        </p>

        <section className="mt-8 rounded-2xl border border-orange-500/30 bg-[#222] p-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-400">
            Free Member Exclusive
          </p>

          <h2 className="mt-3 text-2xl font-bold">
            🍗 CraveCraft Originals
          </h2>

          <p className="mt-3 text-gray-300">
            Get access to exclusive recipes straight from the
            founder's kitchen, including signature Jerk Chicken
            Wings and Creamy Rasta Pasta.
          </p>

          <p className="mt-2 text-sm text-gray-400">
            Free with your account. These recipes don't count
            toward your regular recipe allowance.
          </p>

          <Link
            href="/originals"
            className="mt-6 inline-block rounded-full bg-orange-500 px-6 py-3 font-bold text-black transition hover:bg-orange-400"
          >
            Explore CraveCraft Originals →
          </Link>
        </section>

        <div className="mt-10">
          <ProfileEditor
            userId={user.id}
            initial={{
              display_name:
                profile?.display_name ??
                user.user_metadata?.display_name ??
                "",
              cooking_level: profile?.cooking_level ?? 1,
              favorite_cuisines: profile?.favorite_cuisines ?? [],
              dietary_preferences: profile?.dietary_preferences ?? [],
              kitchen_equipment: profile?.kitchen_equipment ?? [],
            }}
          />
        </div>
      </div>
    </main>
  );
}

