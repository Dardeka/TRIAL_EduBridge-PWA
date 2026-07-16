-- Enable RLS on profiles table
alter table profiles enable row level security;

-- Profiles: users can read their own profile
create policy "Users can view own profile"
  on profiles for select
  using (auth.uid() = id);

-- Profiles: admins can view all profiles
create policy "Admins can view all profiles"
  on profiles for select
  using (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Profiles: users can update their own profile (limited columns)
create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Profiles: admins can update any profile
create policy "Admins can update any profile"
  on profiles for update
  using (
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Profiles: service role can insert (for trigger)
create policy "Service role can insert profiles"
  on profiles for insert
  with check (true);
