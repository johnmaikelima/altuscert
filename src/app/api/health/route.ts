import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'CertDigital API is running',
    timestamp: new Date().toISOString(),
  });
}
