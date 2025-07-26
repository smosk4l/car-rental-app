import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../utils/password';

const prisma = new PrismaClient();

export async function seedDatabase(): Promise<void> {
  try {
    console.log('🌱 Seeding database...');

    // Create admin user
    const adminPassword = await hashPassword('admin123');
    const admin = await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        email: 'admin@example.com',
        password: adminPassword,
        firstName: 'Admin',
        lastName: 'User',
        role: 'ADMIN',
      },
    });

    // Create sample user
    const userPassword = await hashPassword('user123');
    const user = await prisma.user.upsert({
      where: { email: 'user@example.com' },
      update: {},
      create: {
        email: 'user@example.com',
        password: userPassword,
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1234567890',
        role: 'USER',
      },
    });

    // Create sample cars
    const cars = await Promise.all([
      prisma.car.upsert({
        where: { licensePlate: 'ABC123' },
        update: {},
        create: {
          make: 'Toyota',
          model: 'Camry',
          year: 2023,
          color: 'White',
          licensePlate: 'ABC123',
          pricePerDay: 45.00,
          description: 'Comfortable and fuel-efficient sedan',
          category: 'MIDSIZE',
          transmission: 'AUTOMATIC',
          fuelType: 'GASOLINE',
          seats: 5,
        },
      }),
      prisma.car.upsert({
        where: { licensePlate: 'XYZ789' },
        update: {},
        create: {
          make: 'Honda',
          model: 'Civic',
          year: 2023,
          color: 'Blue',
          licensePlate: 'XYZ789',
          pricePerDay: 35.00,
          description: 'Economic and reliable compact car',
          category: 'COMPACT',
          transmission: 'MANUAL',
          fuelType: 'GASOLINE',
          seats: 5,
        },
      }),
      prisma.car.upsert({
        where: { licensePlate: 'LUX001' },
        update: {},
        create: {
          make: 'BMW',
          model: 'X5',
          year: 2024,
          color: 'Black',
          licensePlate: 'LUX001',
          pricePerDay: 120.00,
          description: 'Luxury SUV with premium features',
          category: 'LUXURY',
          transmission: 'AUTOMATIC',
          fuelType: 'GASOLINE',
          seats: 7,
        },
      }),
    ]);

    console.log('✅ Database seeded successfully!');
    console.log(`Created admin user: ${admin.email}`);
    console.log(`Created regular user: ${user.email}`);
    console.log(`Created ${cars.length} sample cars`);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run seed if called directly
if (require.main === module) {
  seedDatabase().catch(console.error);
}
