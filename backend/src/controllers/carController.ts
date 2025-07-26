import { Request, Response } from 'express';
import { z } from 'zod';
import { Prisma, Category } from '@prisma/client';
import { prisma } from '../utils/prisma';

// Validation schemas
const createCarSchema = z.object({
  make: z.string().min(1),
  model: z.string().min(1),
  year: z.number().min(1900).max(new Date().getFullYear() + 1),
  color: z.string().min(1),
  licensePlate: z.string().min(1),
  pricePerDay: z.number().positive(),
  description: z.string().optional(),
  imageUrl: z.string().url().optional(),
  category: z.enum(['ECONOMY', 'COMPACT', 'MIDSIZE', 'FULLSIZE', 'PREMIUM', 'LUXURY', 'SUV', 'VAN']),
  transmission: z.string().default('MANUAL'),
  fuelType: z.string().default('GASOLINE'),
  seats: z.number().min(1).max(15).default(5),
});

const updateCarSchema = createCarSchema.partial();

export const getAllCars = async (req: Request, res: Response): Promise<void> => {
  try {
    const { 
      category, 
      minPrice, 
      maxPrice, 
      available, 
      page = '1', 
      limit = '10' 
    } = req.query;

    const skip = (parseInt(page as string) - 1) * parseInt(limit as string);
    const take = parseInt(limit as string);

    const where: Prisma.CarWhereInput = {};

    if (category) {
      where.category = category as Category;
    }

    if (minPrice || maxPrice) {
      where.pricePerDay = {};
      if (minPrice) where.pricePerDay.gte = parseFloat(minPrice as string);
      if (maxPrice) where.pricePerDay.lte = parseFloat(maxPrice as string);
    }

    if (available) {
      where.isAvailable = available === 'true';
    }

    const [cars, total] = await Promise.all([
      prisma.car.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.car.count({ where }),
    ]);

    res.json({
      cars,
      pagination: {
        page: parseInt(page as string),
        limit: parseInt(limit as string),
        total,
        totalPages: Math.ceil(total / take),
      },
    });
  } catch (error) {
    console.error('Get cars error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getCarById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const car = await prisma.car.findUnique({
      where: { id },
    });

    if (!car) {
      res.status(404).json({ error: 'Car not found' });
      return;
    }

    res.json(car);
  } catch (error) {
    console.error('Get car error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const carData = createCarSchema.parse(req.body);

    const car = await prisma.car.create({
      data: carData,
    });

    res.status(201).json({
      message: 'Car created successfully',
      car,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation error', details: error.errors });
      return;
    }
    console.error('Create car error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const carData = updateCarSchema.parse(req.body);

    const car = await prisma.car.update({
      where: { id },
      data: carData,
    });

    res.json({
      message: 'Car updated successfully',
      car,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ error: 'Validation error', details: error.errors });
      return;
    }
    console.error('Update car error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteCar = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.car.delete({
      where: { id },
    });

    res.json({ message: 'Car deleted successfully' });
  } catch (error) {
    console.error('Delete car error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
