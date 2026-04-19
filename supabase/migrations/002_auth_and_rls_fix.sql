-- Fix two critical issues in 001_initial.sql:
--   1. public.users was not linked to auth.users (so RLS via auth.uid() never matched)
--   2. RLS policies only granted SELECT — INSERT/UPDATE/DELETE were silently blocked
-- Also adds a trigger to auto-provision public.users rows on signup.
--
-- Run this AFTER 001_initial.sql in the Supabase SQL editor.

-- 1. Link public.users.id to auth.users.id (ON DELETE CASCADE so deleting an
--    auth user cleans up their profile).
ALTER TABLE public.users
  DROP CONSTRAINT IF EXISTS users_id_fkey,
  ADD CONSTRAINT users_id_fkey
    FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;

-- 2. Auto-create a public.users row whenever someone signs up.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Replace SELECT-only policies with full CRUD policies keyed on auth.uid().

-- users (self-only)
DROP POLICY IF EXISTS "Users can view own data" ON public.users;
CREATE POLICY "Users own row select" ON public.users
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users own row update" ON public.users
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Helper macro: for every other table, grant full CRUD to the owner.
-- (Postgres has no macros; we just repeat.)

-- clients
DROP POLICY IF EXISTS "Users can view own clients" ON public.clients;
CREATE POLICY "clients owner all" ON public.clients
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- projects
DROP POLICY IF EXISTS "Users can view own projects" ON public.projects;
CREATE POLICY "projects owner all" ON public.projects
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- tasks
DROP POLICY IF EXISTS "Users can view own tasks" ON public.tasks;
CREATE POLICY "tasks owner all" ON public.tasks
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- invoices
DROP POLICY IF EXISTS "Users can view own invoices" ON public.invoices;
CREATE POLICY "invoices owner all" ON public.invoices
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- invoice_line_items (inherit through parent invoice)
CREATE POLICY "invoice_line_items via invoice" ON public.invoice_line_items
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.invoices i
    WHERE i.id = invoice_line_items.invoice_id AND i.user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.invoices i
    WHERE i.id = invoice_line_items.invoice_id AND i.user_id = auth.uid()
  ));

-- proposals
DROP POLICY IF EXISTS "Users can view own proposals" ON public.proposals;
CREATE POLICY "proposals owner all" ON public.proposals
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- proposal_line_items
CREATE POLICY "proposal_line_items via proposal" ON public.proposal_line_items
  FOR ALL
  USING (EXISTS (
    SELECT 1 FROM public.proposals p
    WHERE p.id = proposal_line_items.proposal_id AND p.user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.proposals p
    WHERE p.id = proposal_line_items.proposal_id AND p.user_id = auth.uid()
  ));

-- contracts
DROP POLICY IF EXISTS "Users can view own contracts" ON public.contracts;
CREATE POLICY "contracts owner all" ON public.contracts
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- time_entries
DROP POLICY IF EXISTS "Users can view own time entries" ON public.time_entries;
CREATE POLICY "time_entries owner all" ON public.time_entries
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- expenses
DROP POLICY IF EXISTS "Users can view own expenses" ON public.expenses;
CREATE POLICY "expenses owner all" ON public.expenses
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- messages
DROP POLICY IF EXISTS "Users can view own messages" ON public.messages;
CREATE POLICY "messages owner all" ON public.messages
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
