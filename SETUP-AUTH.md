# CraveCraft Supabase authentication setup

1. Run `npm install` to install the new dependencies and update package-lock.json. Commit both package files.
2. Copy `.env.example` to `.env.local`. Replace the placeholder with the **publishable** key from Supabase Dashboard > Project Settings > API Keys. Never use a secret/service-role key.
3. In Supabase Dashboard > Authentication > URL Configuration, set Site URL to `https://cravecraft-beta.vercel.app` and add `https://cravecraft-beta.vercel.app/auth/callback` and `http://localhost:3000/auth/callback` to redirect URLs.
4. Run `npm run dev`. Test sign-up, email confirmation (if enabled), login, editing profile, logout and unauthorized `/dashboard` access.
5. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in Vercel project settings > Environment Variables for Production, Preview, and Development. Redeploy after setting them.
6. Run `npm run build`, then push the updated project to GitHub to trigger Vercel deployment.

Existing Supabase tables: `profiles`, `saved_recipes`, `recipe_history`. They already have RLS policies. Auth users are managed in Supabase Authentication, not the public profiles table. A profile row is created the first time the user saves their cooking profile.

This phase does not implement AI, Stripe, or a demo paid-access account. Verify functionality before submitting it as working.
