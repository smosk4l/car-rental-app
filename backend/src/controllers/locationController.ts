import { Request, Response } from 'express';
import { z } from 'zod';
import { prisma } from '../utils/prisma';

// Validation schemas
const createLocationSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  address: z.string().min(1, 'Address is required').max(200),
  city: z.string().min(1, 'City is required').max(100),
  state: z.string().min(1, 'State/Province is required').max(100),
  postalCode: z.string().min(1, 'Postal code is required').max(20),
  country: z.string().min(1, 'Country is required').max(100),
});

const updateLocationSchema = createLocationSchema.partial();

export const getAllLocations = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const locations = await prisma.location.findMany({
      orderBy: { createdAt: 'desc' },
    });

    res.json({ locations });
  } catch (error) {
    console.error('Get locations error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getLocationById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const location = await prisma.location.findUnique({
      where: { id },
    });

    if (!location) {
      res.status(404).json({ error: 'Location not found' });
      return;
    }

    res.json(location);
  } catch (error) {
    console.error('Get location error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createLocation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const locationData = createLocationSchema.parse(req.body);

    const location = await prisma.location.create({
      data: locationData,
    });

    res.status(201).json({
      message: 'Location created successfully',
      location,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ error: 'Validation error', details: error.errors });
      return;
    }
    console.error('Create location error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateLocation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const locationData = updateLocationSchema.parse(req.body);

    const location = await prisma.location.update({
      where: { id },
      data: locationData,
    });

    res.json({
      message: 'Location updated successfully',
      location,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res
        .status(400)
        .json({ error: 'Validation error', details: error.errors });
      return;
    }
    console.error('Update location error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteLocation = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.location.delete({
      where: { id },
    });

    res.json({ message: 'Location deleted successfully' });
  } catch (error) {
    console.error('Delete location error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
