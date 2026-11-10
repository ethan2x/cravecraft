import SubscribeButton from "@/components/subscribe-button";
import ProfileMenu from "@/components/profile-menu";
import { steps, features, plans } from "@/lib/content";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const links = [
  { href: "#how", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#pricing", label: "Pricing" },
  { href: "#about", label: "About" },
];

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-ember/40 bg-ember/10 px-3 py-1 text-xs font-medium text-ember-soft">
      {children}
    </span>
  );
}

export default async function Home() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main>
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-charcoal/80 backdrop-blur">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#top" className="font-display text-2xl font-semibold">
            Crave<span className="text-ember">Craft</span>
          </a>
          <ul className="hidden gap-8 text-sm text-cream-muted md:flex">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition hover:text-ember">{l.label}</a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <a href="/recipes" className="text-sm text-cream-muted hover:text-cream">
                  Recipes
                </a>
                <ProfileMenu />
              </>
            ) : (
              <>
                <a href="/login" className="text-sm text-cream-muted hover:text-cream">
                  Log in
                </a>
                <a href="/signup" className="rounded-full bg-ember px-5 py-2 text-sm font-semibold text-charcoal transition hover:bg-ember-soft">
                  Sign up
                </a>
              </>
            )}
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 right-0 h-[28rem] w-[28rem] rounded-full bg-ember/20 blur-3xl" />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-28">
          <div className="animate-fade-up">
            <Badge>AI-powered cooking platform</Badge>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-tight md:text-7xl">
              Crave it. <span className="text-ember">Learn it.</span> Make it.
            </h1>
            <p className="mt-6 max-w-lg text-lg text-cream-muted">
              CraveCraft turns your cravings into recipes that fit your skill, your kitchen, and your taste, and helps you become a better cook with every meal.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href={user ? "/recipes" : "/signup"} className="rounded-full bg-ember px-7 py-3 font-semibold text-charcoal shadow-lg shadow-ember/20 transition hover:-translate-y-0.5 hover:bg-ember-soft">
                {user ? "Explore recipes" : "Get started"}
              </a>
              <a href="#how" className="rounded-full border border-white/15 px-7 py-3 font-semibold transition hover:border-ember hover:text-ember">
                See how it works
              </a>
            </div>
            <p className="mt-4 text-xs text-cream-muted">Create a free account today. AI recipes and subscriptions are coming soon.</p>
          </div>

          {/* Replace with a real photo: put hero.jpg in /public/images and swap this block for <Image> */}
          <div className="relative animate-fade-up [animation-delay:200ms]">
            <div className="animate-float flex aspect-square items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-ember via-ember-deep to-charcoal-card text-[9rem] shadow-2xl shadow-ember/20">
              🍝
            </div>
            <div className="absolute -bottom-4 -left-4 rounded-2xl border border-white/10 bg-charcoal-card px-4 py-3 text-sm shadow-xl">
              <span className="text-ember">●</span> Level: Beginner · 25 min
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
        <h2 className="font-display text-4xl font-semibold">How it works</h2>
        <p className="mt-3 max-w-xl text-cream-muted">Three simple steps from hungry to cooking.</p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-3xl border border-white/5 bg-charcoal-light p-8 transition hover:-translate-y-1 hover:border-ember/40">
              <span className="font-display text-5xl text-ember">{s.n}</span>
              <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-cream-muted">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="scroll-mt-20 bg-charcoal-light py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-display text-4xl font-semibold">Cooking, built around you</h2>
          <p className="mt-3 max-w-xl text-cream-muted">We&rsquo;re building tools that teach, not just tell. These features are in development.</p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="rounded-3xl bg-charcoal-card p-7 transition hover:-translate-y-1 hover:shadow-xl hover:shadow-ember/10">
                <div className="flex items-start justify-between">
                  <span className="text-4xl">{f.icon}</span>
                  <Badge>{f.status}</Badge>
                </div>
                <h3 className="mt-5 text-xl font-semibold">{f.title}</h3>
                <p className="mt-2 text-cream-muted">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
        <h2 className="text-center font-display text-4xl font-semibold">Simple pricing</h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-cream-muted">
          Choose the plan that fits your cooking journey. Subscriptions are currently in test mode.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((p) => (
            <div key={p.name} className={`relative flex flex-col rounded-3xl p-8 ${p.featured ? "border-2 border-ember bg-charcoal-card shadow-2xl shadow-ember/10 md:-translate-y-3" : "border border-white/10 bg-charcoal-light"}`}>
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-ember px-3 py-1 text-xs font-bold text-charcoal">Most popular</span>
              )}
              <h3 className="text-xl font-semibold">{p.name}</h3>
              <p className="mt-4"><span className="font-display text-5xl">{p.price}</span><span className="text-cream-muted">/month</span></p>
              <ul className="mt-6 flex-1 space-y-3 text-sm text-cream-muted">
                {p.items.map((i) => (
                  <li key={i} className="flex gap-2"><span className="text-ember">✓</span>{i}</li>
                ))}
              </ul>
              {p.name === "Free" ? (
                <a
                  href={user ? "/dashboard" : "/signup"}
                  className="mt-8 rounded-full border border-white/15 py-3 text-center text-sm font-semibold text-cream hover:bg-white/10"
                >
                  {user ? "Go to Dashboard" : "Get Started Free"}
                </a>
              ) : (
                <SubscribeButton plan={p.name === "Crave+" ? "plus" : "ai"} />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-20 bg-charcoal-light py-24">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-4xl font-semibold">About CraveCraft</h2>
          <p className="mt-6 text-lg text-cream-muted">
            Our mission is to make cooking accessible, enjoyable, and personalized for everyone. Most recipe sites hand you instructions and hope for the best. CraveCraft is being built to meet you where you are, whether you&rsquo;re boiling your first pasta or perfecting a sauce, and to help you grow into a more confident cook.
          </p>
          <p className="mt-6 font-display text-2xl text-ember">Crave it. Learn it. Make it.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 text-sm text-cream-muted md:flex-row">
          <span className="font-display text-lg text-cream">Crave<span className="text-ember">Craft</span></span>
          <span>Created by Ethan Samuel</span>
          <span>© {new Date().getFullYear()} CraveCraft</span>
        </div>
      </footer>
    </main>
  );
}
