# Supabase Setup — SoloDesk

Step-by-step to go from scaffold → working auth + real data. About 10 minutes.

## 1. Create a Supabase project

1. Go to https://supabase.com and sign in
2. Click **New project** → name it `solodesk` (or whatever)
3. Pick a strong database password (save it somewhere)
4. Choose the region closest to you
5. Wait ~2 min for provisioning

## 2. Grab your API keys

In the Supabase dashboard:

- **Project Settings → API**
- Copy the **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- Copy the **anon / public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Paste both into `.env.local`, replacing the placeholders.

## 3. Run the migrations

In the Supabase dashboard:

- **SQL Editor → New query**
- Paste the contents of `supabase/migrations/001_initial.sql` → Run
- Paste the contents of `supabase/migrations/002_auth_and_rls_fix.sql` → Run

Why two? `001` is the original schema. `002` fixes two bugs in it:
- Links `public.users.id` to `auth.users.id` so RLS actually matches
- Replaces SELECT-only policies with full CRUD policies
- Adds a trigger that auto-creates a `public.users` row on signup

## 4. Configure auth

In the Supabase dashboard:

- **Authentication → Providers → Email**
- Make sure **Enable email signup** is on
- For local dev, under **Authentication → URL Configuration**, set the **Site URL** to `http://localhost:3000`
- Add `http://localhost:3000/auth/callback` to **Redirect URLs**

If you want to skip email confirmation while testing, you can toggle off **Confirm email** under Email provider settings. (Re-enable before going live.)

## 5. Run the app

```bash
npm run dev
```

- Visit http://localhost:3000 → landing page
- Click `/signup` → create an account
- If email confirmation is on, check your inbox and click the link
- You should land on `/dashboard`

## 6. Test it

- Go to `/dashboard/clients`
- Use the quick-add form to add a client
- Confirm it appears in the table
- Check the `clients` table in the Supabase dashboard → your row should be there with your `user_id`
- Sign out from the sidebar → `/dashboard` should redirect back to `/login`

## What's wired up so far

- ✅ `@supabase/ssr` for Next.js 15 App Router
- ✅ Browser client (`src/lib/supabase/client.ts`)
- ✅ Server client (`src/lib/supabase/server.ts`)
- ✅ Middleware-based session refresh (`src/middleware.ts`)
- ✅ Auth-gated dashboard routes
- ✅ Login, signup, sign-out flows
- ✅ Email confirmation callback at `/auth/callback`
- ✅ RLS policies for all tables (full CRUD per owner)
- ✅ Clients page reads real data + has a working add-client form

## What's still on mock data

Everything else in `/dashboard/*` still reads from `src/lib/mock-data.ts`. The clients page is the reference pattern — convert the others by:

1. Removing `'use client'` from `page.tsx`
2. Fetching with `const supabase = await createClient()` (from `@/lib/supabase/server`)
3. Moving any interactive state to a child `'use client'` component
4. Adding server actions (see `src/app/dashboard/clients/actions.ts`) for writes

## Generate typed DB client (recommended later)

The types in `src/types/database.ts` are hand-written. To regenerate from the live schema:

```bash
npx supabase login
npx supabase gen types typescript --project-id YOUR_PROJECT_REF > src/types/database.ts
```

## Troubleshooting

**"Invalid login credentials"** — email not confirmed, or wrong password. Check the email provider settings.

**Dashboard redirects to login even after sign-in** — middleware isn't seeing the cookie. Verify `src/middleware.ts` exists and the matcher didn't get accidentally narrowed.

**Queries return empty / silently fail** — almost always RLS. Make sure migration `002` was run. In the SQL editor: `SELECT * FROM pg_policies WHERE schemaname = 'public';` should show `FOR ALL` policies per table.

**"permission denied for table clients" on INSERT** — you're running an old policy set. Run migration `002`.
