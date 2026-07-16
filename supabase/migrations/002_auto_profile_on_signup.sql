-- Auto-create profile row when a new user signs up via Supabase Auth
-- The education_level comes from user_metadata (set during registration)

-- Add education_level column if it does not exist yet
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS education_level text;

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role, education_level)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', 'User'),
    'student',
    (new.raw_user_meta_data ->> 'education_level')::text
  );
  return new;
end;
$$ language plpgsql security definer;

-- Drop trigger if exists, then recreate
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();
