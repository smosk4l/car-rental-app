import { Response } from 'express';
import { z } from 'zod';
import { Prisma, ReservationStatus } from '@prisma/client';
import { prisma } from '../utils/prisma';
import { AuthenticatedRequest } from '../types/express';

// Validation schemas
const createReservationSchema = z.object({
  carId: z.string().min(1, 'Car ID is required'),
  startDate: z.string().datetime('Invalid start date format'),
  endDate: z.string().datetime('Invalid end date format'),
  pickupLocation: z.string().min(1, 'Pickup location is required'),
  returnLocation: z.string().min(1, 'Return location is required'),
  pickupTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
  returnTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format (HH:MM)'),
  phoneNumber: z.string().optional(),
  notes: z.string().optional(),
});

const updateReservationSchema = createReservationSchema.partial();

// Helper function to validate dates
const validateDates = (startDate: Date, endDate: Date): string | null => {
  const now = new Date();

  if (startDate < now) {
    return 'Start date cannot be in the past';
  }

  if (endDate <= startDate) {
    return 'End date must be after start date';
  }

  return null;
};

// Helper function to calculate total cost
const calculateTotalCost = (startDate: Date, endDate: Date, pricePerDay: number): number => {
  const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(1, days) * pricePerDay;
};

// Helper function to check for overlapping reservations
const hasOverlappingReservations = async (
  carId: string,
  startDate: Date,
  endDate: Date,
  excludeReservationId?: string
): Promise<boolean> => {
  const where: Prisma.ReservationWhereInput = {
    carId,
    status: {
      in: [ReservationStatus.PENDING, ReservationStatus.CONFIRMED],
    },
    OR: [
      {
        startDate: {
          lte: endDate,
        },
        endDate: {
          gte: startDate,
        },
      },
    ],
  };

  if (excludeReservationId) {
    where.id = {
      not: excludeReservationId,
    };
  }

  const conflicts = await prisma.reservation.findMany({ where });
  return conflicts.length > 0;
};

export const createReservation = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const validatedData = createReservationSchema.parse(req.body);

    const startDate = new Date(validatedData.startDate);
    const endDate = new Date(validatedData.endDate);

    // Validate dates
    const dateError = validateDates(startDate, endDate);
    if (dateError) {
      res.status(400).json({ error: dateError });
      return;
    }

    // Check if car exists
    const car = await prisma.car.findUnique({
      where: { id: validatedData.carId },
    });

    if (!car) {
      res.status(404).json({ error: 'Car not found' });
      return;
    }

    // Check car availability (basic check)
    if (!car.isAvailable) {
      res.status(400).json({ error: 'Car is not available for rental' });
      return;
    }

    // Check for overlapping reservations
    const hasConflict = await hasOverlappingReservations(
      validatedData.carId,
      startDate,
      endDate
    );

    if (hasConflict) {
      res.status(409).json({
        error: 'Car is already booked for the selected dates',
        message: 'Please choose different dates or select another vehicle'
      });
      return;
    }

    // Calculate total cost server-side
    const totalCost = calculateTotalCost(startDate, endDate, car.pricePerDay);

    // Create reservation
    const reservation = await prisma.reservation.create({
      data: {
        userId: req.user.id,
        carId: validatedData.carId,
        startDate,
        endDate,
        pickupLocation: validatedData.pickupLocation,
        returnLocation: validatedData.returnLocation,
        pickupTime: validatedData.pickupTime,
        returnTime: validatedData.returnTime,
        totalCost,
        phoneNumber: validatedData.phoneNumber,
        notes: validatedData.notes,
        status: ReservationStatus.PENDING,
      },
      include: {
        car: {
          select: {
            id: true,
            make: true,
            model: true,
            year: true,
            imageUrl: true,
            pricePerDay: true,
            category: true,
          },
        },
      },
    });

    res.status(201).json({
      message: 'Reservation created successfully',
      reservation,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: 'Validation error',
        details: error.errors
      });
      return;
    }
    console.error('Create reservation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserReservations = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const {
      status,
      page = '1',
      limit = '10',
    } = req.query;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    const where: Prisma.ReservationWhereInput = {
      userId: req.user.id,
    };

    if (status) {
      where.status = status as ReservationStatus;
    }

    const [reservations, total] = await Promise.all([
      prisma.reservation.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          car: {
            select: {
              id: true,
              make: true,
              model: true,
              year: true,
              imageUrl: true,
              pricePerDay: true,
              category: true,
              transmission: true,
              fuelType: true,
              seats: true,
            },
          },
        },
      }),
      prisma.reservation.count({ where }),
    ]);

    res.json({
      reservations,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        totalPages: Math.ceil(total / take),
      },
    });
  } catch (error) {
    console.error('Get user reservations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getReservationById = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { id } = req.params;

    const reservation = await prisma.reservation.findUnique({
      where: { id },
      include: {
        car: {
          select: {
            id: true,
            make: true,
            model: true,
            year: true,
            imageUrl: true,
            pricePerDay: true,
            category: true,
            transmission: true,
            fuelType: true,
            seats: true,
            description: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            phone: true,
          },
        },
      },
    });

    if (!reservation) {
      res.status(404).json({ error: 'Reservation not found' });
      return;
    }

    // Check if user owns the reservation or is admin
    if (reservation.userId !== req.user.id && req.user.role !== 'ADMIN') {
      res.status(403).json({ error: 'Access denied' });
      return;
    }

    res.json(reservation);
  } catch (error) {
    console.error('Get reservation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateReservation = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { id } = req.params;
    const validatedData = updateReservationSchema.parse(req.body);

    // Get existing reservation
    const existingReservation = await prisma.reservation.findUnique({
      where: { id },
      include: { car: true },
    });

    if (!existingReservation) {
      res.status(404).json({ error: 'Reservation not found' });
      return;
    }

    // Check if user owns the reservation
    if (existingReservation.userId !== req.user.id && req.user.role !== 'ADMIN') {
      res.status(403).json({ error: 'Access denied' });
      return;
    }

    // Only allow updates to PENDING reservations
    if (existingReservation.status !== ReservationStatus.PENDING) {
      res.status(400).json({
        error: 'Cannot update reservation',
        message: 'Only pending reservations can be updated'
      });
      return;
    }

    // Validate dates if they're being updated
    const startDate = validatedData.startDate
      ? new Date(validatedData.startDate)
      : existingReservation.startDate;
    const endDate = validatedData.endDate
      ? new Date(validatedData.endDate)
      : existingReservation.endDate;

    if (validatedData.startDate || validatedData.endDate) {
      const dateError = validateDates(startDate, endDate);
      if (dateError) {
        res.status(400).json({ error: dateError });
        return;
      }

      // Check for conflicts if dates are changing
      const hasConflict = await hasOverlappingReservations(
        existingReservation.carId,
        startDate,
        endDate,
        id
      );

      if (hasConflict) {
        res.status(409).json({
          error: 'Car is already booked for the selected dates',
          message: 'Please choose different dates'
        });
        return;
      }
    }

    // Recalculate total cost if dates changed
    let totalCost = existingReservation.totalCost;
    if (validatedData.startDate || validatedData.endDate) {
      totalCost = calculateTotalCost(startDate, endDate, existingReservation.car.pricePerDay);
    }

    // Update reservation
    const updateData: Prisma.ReservationUpdateInput = {
      ...validatedData,
      ...(validatedData.startDate && { startDate }),
      ...(validatedData.endDate && { endDate }),
      totalCost,
    };

    const reservation = await prisma.reservation.update({
      where: { id },
      data: updateData,
      include: {
        car: {
          select: {
            id: true,
            make: true,
            model: true,
            year: true,
            imageUrl: true,
            pricePerDay: true,
            category: true,
          },
        },
      },
    });

    res.json({
      message: 'Reservation updated successfully',
      reservation,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: 'Validation error',
        details: error.errors
      });
      return;
    }
    console.error('Update reservation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const cancelReservation = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ error: 'Unauthorized' });
      return;
    }

    const { id } = req.params;

    // Get existing reservation
    const existingReservation = await prisma.reservation.findUnique({
      where: { id },
    });

    if (!existingReservation) {
      res.status(404).json({ error: 'Reservation not found' });
      return;
    }

    // Check if user owns the reservation or is admin
    if (existingReservation.userId !== req.user.id && req.user.role !== 'ADMIN') {
      res.status(403).json({ error: 'Access denied' });
      return;
    }

    // Check if already cancelled
    if (existingReservation.status === ReservationStatus.CANCELLED) {
      res.status(400).json({
        error: 'Reservation is already cancelled'
      });
      return;
    }

    // Update status to CANCELLED
    const reservation = await prisma.reservation.update({
      where: { id },
      data: {
        status: ReservationStatus.CANCELLED
      },
      include: {
        car: {
          select: {
            id: true,
            make: true,
            model: true,
            year: true,
          },
        },
      },
    });

    res.json({
      message: 'Reservation cancelled successfully',
      reservation,
    });
  } catch (error) {
    console.error('Cancel reservation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Admin-only: Get all reservations
export const getAllReservations = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const {
      status,
      userId,
      carId,
      page = '1',
      limit = '10',
    } = req.query;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    const where: Prisma.ReservationWhereInput = {};

    if (status) {
      where.status = status as ReservationStatus;
    }

    if (userId) {
      where.userId = userId as string;
    }

    if (carId) {
      where.carId = carId as string;
    }

    const [reservations, total] = await Promise.all([
      prisma.reservation.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          car: {
            select: {
              id: true,
              make: true,
              model: true,
              year: true,
              imageUrl: true,
              licensePlate: true,
            },
          },
          user: {
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              phone: true,
            },
          },
        },
      }),
      prisma.reservation.count({ where }),
    ]);

    res.json({
      reservations,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        totalPages: Math.ceil(total / take),
      },
    });
  } catch (error) {
    console.error('Get all reservations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Admin-only: Update reservation status
export const updateReservationStatus = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !Object.values(ReservationStatus).includes(status)) {
      res.status(400).json({
        error: 'Invalid status',
        validStatuses: Object.values(ReservationStatus)
      });
      return;
    }

    const reservation = await prisma.reservation.update({
      where: { id },
      data: { status },
      include: {
        car: {
          select: {
            id: true,
            make: true,
            model: true,
            year: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    res.json({
      message: 'Reservation status updated successfully',
      reservation,
    });
  } catch (error) {
    console.error('Update reservation status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
