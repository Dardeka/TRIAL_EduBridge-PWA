import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { createSupabaseAdminClient } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

interface ServiceStatus {
  name: string;
  status: 'healthy' | 'unhealthy';
  latencyMs?: number;
  error?: string;
}

export async function GET() {
  const startTime = Date.now();
  const checks: ServiceStatus[] = [];

  // MongoDB check
  try {
    const mongoStart = Date.now();
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI!, {
        serverSelectionTimeoutMS: 5000,
      });
    } else {
      await mongoose.connection.db!.admin().ping();
    }
    checks.push({
      name: 'mongodb',
      status: 'healthy',
      latencyMs: Date.now() - mongoStart,
    });
  } catch (error) {
    checks.push({
      name: 'mongodb',
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }

  // Supabase check
  try {
    const supaStart = Date.now();
    const supabase = createSupabaseAdminClient();
    const { error } = await supabase
      .from('profiles')
      .select('id', { count: 'exact', head: true });
    if (error) throw error;
    checks.push({
      name: 'supabase',
      status: 'healthy',
      latencyMs: Date.now() - supaStart,
    });
  } catch (error) {
    checks.push({
      name: 'supabase',
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }

  const allHealthy = checks.every((c) => c.status === 'healthy');
  const totalLatency = Date.now() - startTime;

  return NextResponse.json(
    {
      status: allHealthy ? 'healthy' : 'degraded',
      version: process.env.npm_package_version || '1.0.0',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      latencyMs: totalLatency,
      services: checks,
    },
    { status: allHealthy ? 200 : 503 }
  );
}
