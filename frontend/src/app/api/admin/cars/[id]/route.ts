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

// Validation schema for updating a car (all fields optional)
const updateCarSchema = z.object({
  make: z.string().min(1).optional(),
  model: z.string().min(1).optional(),
  year: z
    .number()
    .int()
    .min(1900)
    .max(new Date().getFullYear() + 1)
    .optional(),
  color: z.string().min(1).optional(),
  licensePlate: z.string().min(1).optional(),
  pricePerDay: z.number().positive().optional(),
  category: z
    .enum([
      'ECONOMY',
      'COMPACT',
      'MIDSIZE',
      'FULLSIZE',
      'PREMIUM',
      'LUXURY',
      'SUV',
      'VAN',
    ])
    .optional(),
  description: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal('')),
  transmission: z.string().optional(),
  fuelType: z.string().optional(),
  seats: z.number().int().positive().optional(),
  isAvailable: z.boolean().optional(),
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

// GET /api/admin/cars/[id] - Get car by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const adminCheck = await checkAdminAccess();
  if (adminCheck) return adminCheck;

  const session = (await getServerSession(authOptions)) as ExtendedSession;
  const { id } = params;

  try {
    // Forward request to backend
    const backendResponse = await makeBackendRequest(
      `/cars/${id}`,
      {
        method: 'GET',
      },
      session
    );

    if (!backendResponse.ok) {
      if (backendResponse.status === 404) {
        return NextResponse.json({ error: 'Car not found' }, { status: 404 });
      }

      const responseData = await backendResponse.json();
      return NextResponse.json(
        { error: responseData.error || 'Failed to fetch car' },
        { status: backendResponse.status }
      );
    }

    const carData = await backendResponse.json();
    return NextResponse.json(carData, { status: 200 });
  } catch (error) {
    console.error('Error fetching car:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/admin/cars/[id] - Update car by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const adminCheck = await checkAdminAccess();
  if (adminCheck) return adminCheck;

  const session = (await getServerSession(authOptions)) as ExtendedSession;
  const { id } = params;

  try {
    const body = await request.json();

    // Validate request body
    const validatedData = updateCarSchema.parse(body);

    // Forward request to backend
    const backendResponse = await makeBackendRequest(
      `/cars/${id}`,
      {
        method: 'PUT',
        body: JSON.stringify(validatedData),
      },
      session
    );

    const responseData = await backendResponse.json();

    if (!backendResponse.ok) {
      if (backendResponse.status === 404) {
        return NextResponse.json({ error: 'Car not found' }, { status: 404 });
      }

      return NextResponse.json(
        { error: responseData.error || 'Failed to update car' },
        { status: backendResponse.status }
      );
    }

    return NextResponse.json(responseData);
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

    console.error('Error updating car:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/cars/[id] - Delete car by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const adminCheck = await checkAdminAccess();
  if (adminCheck) return adminCheck;

  const session = (await getServerSession(authOptions)) as ExtendedSession;
  const { id } = params;

  try {
    // Forward request to backend
    const backendResponse = await makeBackendRequest(
      `/cars/${id}`,
      {
        method: 'DELETE',
      },
      session
    );

    if (!backendResponse.ok) {
      if (backendResponse.status === 404) {
        return NextResponse.json({ error: 'Car not found' }, { status: 404 });
      }

      const responseData = await backendResponse.json();
      return NextResponse.json(
        { error: responseData.error || 'Failed to delete car' },
        { status: backendResponse.status }
      );
    }

    // Return success response for deletion
    return NextResponse.json(
      { message: 'Car deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting car:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
