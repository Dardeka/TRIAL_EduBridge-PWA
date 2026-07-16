# Uptime Monitoring Setup

## Recommended Services (Free Tier)

### Option 1: UptimeRobot (Recommended)

1. Sign up at https://uptimerobot.com
2. Add HTTP(s) monitor
3. URL: `https://your-domain.vercel.app/api/health`
4. Monitoring interval: 5 minutes
5. Alert contacts: email, Telegram, Slack

### Option 2: Better Uptime

1. Sign up at https://betterstack.com
2. Create monitor → HTTP monitor
3. URL: `https://your-domain.vercel.app/api/health`
4. Interval: 3 minutes
5. Status page included

### Option 3: Vercel Analytics

- Built-in for Vercel deployments
- Dashboard → Analytics → Web Vitals
- No setup needed for basic monitoring

## Health Check Response

```json
{
  "status": "healthy",
  "version": "1.0.0",
  "uptime": 3600,
  "timestamp": "2026-01-15T10:00:00.000Z",
  "latencyMs": 120,
  "services": [
    { "name": "mongodb", "status": "healthy", "latencyMs": 50 },
    { "name": "supabase", "status": "healthy", "latencyMs": 70 }
  ]
}
```

## Status Codes

- `200` = All services healthy
- `503` = One or more services degraded

## What to Monitor

- **Uptime**: Is the app responding?
- **Latency**: Is it responding fast enough?
- **MongoDB**: Is the database reachable?
- **Supabase**: Is auth service reachable?
- **Error Rate**: Check Vercel function logs for 5xx errors
