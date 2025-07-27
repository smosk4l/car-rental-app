import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { z } from 'zod';
import { authOptions } from '@/lib/auth';

// Extended session type with role and accessToken
interface ExtendedSession {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  accessToken: string;
}

// Validation schema for creating a car
const createCarSchema = z.object({
  make: z.string().min(1, 'Make is required'),
  model: z.string().min(1, 'Model is required'),
  year: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear() + 1),
  color: z.string().min(1, 'Color is required'),
  licensePlate: z.string().min(1, 'License plate is required'),
  pricePerDay: z.number().positive('Price per day must be positive'),
  category: z.enum([
    'ECONOMY',
    'COMPACT',
    'MIDSIZE',
    'FULLSIZE',
    'PREMIUM',
    'LUXURY',
    'SUV',
    'VAN',
  ]),
  description: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal('')),
  transmission: z.string().default('MANUAL'),
  fuelType: z.string().default('GASOLINE'),
  seats: z.number().int().positive().default(5),
});

// Helper function to check if user is admin
async function checkAdminAccess() {
  const session = (await getServerSession(
    authOptions
  )) as ExtendedSession | null;

  if (!session || !session.user) {
    return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
  }

  if (session.user.role !== 'ADMIN') {
    return NextResponse.json(
      { error: 'Admin access required' },
      { status: 403 }
    );
  }

  return null;
}

// Helper function to make authenticated requests to backend
async function makeBackendRequest(
  endpoint: string,
  options: RequestInit,
  session: ExtendedSession
): Promise<Response> {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:5001/api';

  return fetch(`${backendUrl}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
      ...options.headers,
    },
  });
}

// POST /api/admin/cars - Create a new car
export async function POST(request: NextRequest) {
  const adminCheck = await checkAdminAccess();
  if (adminCheck) return adminCheck;

  const session = (await getServerSession(authOptions)) as ExtendedSession;

  try {
    const body = await request.json();

    // Validate request body
    const validatedData = createCarSchema.parse(body);

    // Forward request to backend
    const backendResponse = await makeBackendRequest(
      '/cars',
      {
        method: 'POST',
        body: JSON.stringify(validatedData),
      },
      session
    );

    const responseData = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: responseData.error || 'Failed to create car' },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(responseData, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: error.issues.map(issue => ({
            field: issue.path.join('.'),
            message: issue.message,
          })),
        },
        { status: 400 }
      );
    }

    console.error('Error creating car:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET /api/admin/cars - Get all cars (including unavailable ones)
export async function GET(request: NextRequest) {
  const adminCheck = await checkAdminAccess();
  if (adminCheck) return adminCheck;

  const session = (await getServerSession(authOptions)) as ExtendedSession;

  try {
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();

    // Forward request to backend with all query parameters
    const backendResponse = await makeBackendRequest(
      `/cars${queryString ? `?${queryString}` : ''}`,
      {
        method: 'GET',
      },
      session
    );

    const responseData = await backendResponse.json();

    if (!backendResponse.ok) {
      return NextResponse.json(
        { error: responseData.error || 'Failed to fetch cars' },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error fetching cars:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
