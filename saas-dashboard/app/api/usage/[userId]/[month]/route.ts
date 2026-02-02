import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string; month: string }> }
) {
  const apiKey = request.headers.get('x-api-key');
  const { userId, month } = await params;
  
  const backendUrl = `http://localhost:3001/usage/${userId}/${month}`;
  console.log('🔍 Attempting to fetch:', backendUrl);  // ← Added
  
  try {
    const response = await fetch(backendUrl, {
      headers: {
        'x-api-key': apiKey || '',
      },
    });

    console.log('✅ Response status:', response.status);  // ← Added

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Backend error:', errorText);  // ← Added
      throw new Error(`Backend returned ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('📦 Data received:', data);  // ← Added
    return NextResponse.json(data);
    
  } catch (error: any) {
    console.error('💥 Fetch failed:', error.message);  // ← Improved
    console.error('Full error:', error);  // ← Added
    return NextResponse.json(
      { error: 'Failed to fetch usage', details: error.message },
      { status: 500 }
    );
  }
}

