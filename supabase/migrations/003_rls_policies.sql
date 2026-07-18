-- Enable RLS on profiles table
alter table profiles enable row level security;

-- Helper: SECURITY DEFINER function to check admin status without RLS recursion.
-- The existing policies on `profiles` query the same table they protect,
-- which causes infinite recursion.  Running the check inside a SECURITY
-- DEFINER function lets it bypass RLS (the function owner is a privileged
-- role) while `auth.uid()` still resolves to the calling user.
create or replace function public.is_admin()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- Drop the old recursive / duplicate policies so re-applying is idempotent
drop policy if exists "Users can view own profile" on profiles;
drop policy if exists "Admins can view all profiles" on profiles;
drop policy if exists "Users can update own profile" on profiles;
drop policy if exists "Admins can update any profile" on profiles;
drop policy if exists "Service role can insert profiles" on profiles;

-- Profiles: users can read their own profile
create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

-- Profiles: admins can view all profiles (non-recursive)
create policy "Admins can view all profiles"
  on profiles for select
  using (public.is_admin());

-- Profiles: users can update their own profile (limited columns)
create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Profiles: admins can update any profile (non-recursive)
create policy "Admins can update any profile"
  on profiles for update
  using (public.is_admin());

-- Profiles: service role can insert (for trigger)
create policy "Service role can insert profiles"
  on profiles for insert
  with check (true);
