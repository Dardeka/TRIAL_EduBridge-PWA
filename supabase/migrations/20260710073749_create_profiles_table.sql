/*
# Create profiles table for EduBridge user data

## Summary
Creates a `profiles` table that extends Supabase's built-in `auth.users` with
application-specific user data (display name, role, avatar). A trigger
automatically creates a profile row whenever a new auth user signs up.

## New Tables
- `profiles`
  - `id` (uuid, primary key, references auth.users.id ON DELETE CASCADE)
  - `full_name` (text, not null) — display name shown in the UI
  - `role` (text, not null, default 'student') — 'student', 'admin', or 'guest'
  - `avatar_url` (text, nullable) — optional avatar image URL
  - `created_at` (timestamptz, default now())
  - `updated_at` (timestamptz, default now())

## Security (RLS)
- RLS enabled on `profiles`.
- SELECT: authenticated users can read their own profile.
- INSERT: authenticated users can insert their own profile (auto-created by trigger).
- UPDATE: authenticated users can update their own profile.
- DELETE: authenticated users can delete their own profile.

## Trigger
- `handle_new_user` trigger fires AFTER INSERT on `auth.users` and creates a
  matching `profiles` row using the `full_name` from the user's metadata
  (raw_user_meta_data) if provided, otherwise defaults to 'User'.

## Notes
1. Guest mode does NOT create a profile row — guests are tracked client-side
   only via localStorage, so no auth.users entry exists for them.
2. The `role` column defaults to 'student'. Admin role is assigned manually
   via the Supabase dashboard for authorized educators.
3. Email confirmation stays OFF — users can sign in immediately after registering.
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL DEFAULT 'User',
  role text NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin', 'guest')),
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
CREATE POLICY "profiles_select_own"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
CREATE POLICY "profiles_insert_own"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
CREATE POLICY "profiles_update_own"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_delete_own" ON profiles;
CREATE POLICY "profiles_delete_own"
  ON profiles FOR DELETE
  TO authenticated
  USING (auth.uid() = id);

-- Function to create a profile row when a new auth user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists (idempotent)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS profiles_role_idx ON profiles(role);
