# Row Level Security (RLS) Migration

## Overview

This migration enables Row Level Security on the `profiles` table to restrict direct data access based on the authenticated user's role.

## Policies

| Policy                           | Operation | Condition                    |
| -------------------------------- | --------- | ---------------------------- |
| Users can view own profile       | SELECT    | `auth.uid() = id`            |
| Admins can view all profiles     | SELECT    | User has `role = 'admin'`    |
| Users can update own profile     | UPDATE    | `auth.uid() = id`            |
| Admins can update any profile    | UPDATE    | User has `role = 'admin'`    |
| Service role can insert profiles | INSERT    | Always allowed (for trigger) |

## How to Apply

1. Open the **Supabase Dashboard** and navigate to your project.
2. Go to **SQL Editor**.
3. Paste the contents of `supabase/migrations/003_rls_policies.sql`.
4. Click **Run** to execute.

## Verification

After applying the migration:

1. Navigate to **Authentication → Policies** in the Supabase Dashboard.
2. Confirm that RLS is enabled on the `profiles` table.
3. Verify all five policies are listed and active.
4. Test with a regular user account — they should only see their own profile row.
5. Test with an admin account — they should see all profile rows.
