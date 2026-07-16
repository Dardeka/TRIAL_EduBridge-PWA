# Migration 002 — Auto-Create Profile on Signup

## What this migration does

When a new user registers via Supabase Auth, a trigger fires **after insert** on `auth.users` and automatically creates a row in the `profiles` table. This eliminates the need for a client-side INSERT after registration.

## How it works

1. **Trigger**: `on_auth_user_created` fires after every new row in `auth.users`.
2. **Function**: `handle_new_user()` reads `full_name` and `education_level` from `raw_user_meta_data` (the `options.data` passed during `signUp`) and inserts them into `profiles`.
3. **Defaults**: `full_name` defaults to `'User'` if not provided. `role` is always `'student'` for new signups.

## Prerequisites

The `profiles` table must have an `education_level` column. The migration adds this column with `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` if it does not already exist.

## How to run

1. Open the **Supabase Dashboard** → your project → **SQL Editor**.
2. Paste the contents of `supabase/migrations/002_auto_profile_on_signup.sql`.
3. Click **Run**.

Alternatively, if using the Supabase CLI locally:

```bash
supabase db reset   # replays all migrations from scratch
# or
supabase migration up  # applies pending migrations
```

## Registration flow reference

In `components/providers/auth-provider.tsx`, the `signUp` function passes user metadata that the trigger reads:

```ts
const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: { full_name: fullName, education_level: educationLevel },
  },
});
```

- `full_name` → stored as `profiles.full_name`
- `education_level` → stored as `profiles.education_level` (one of `'SD'`, `'SMP'`, `'SMA'`, or `null`)

## Idempotency

The migration is safe to re-run:

- `CREATE OR REPLACE FUNCTION` overwrites the previous function body.
- `DROP TRIGGER IF EXISTS` + `CREATE TRIGGER` recreates the trigger cleanly.
- `ADD COLUMN IF NOT EXISTS` skips adding the column if it already exists.
