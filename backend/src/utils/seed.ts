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
          color: 'Silver',
          licensePlate: 'ABC123',
          pricePerDay: 45.00,
          description: 'Reliable and comfortable sedan perfect for business trips and family outings.',
          category: 'SEDAN',
          transmission: 'AUTOMATIC',
          fuelType: 'GASOLINE',
          seats: 5,
          rating: 4.8,
          features: ['Bluetooth', 'Backup Camera', 'Cruise Control'],
          imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?q=80&w=2070&auto=format&fit=crop',
        },
      }),
      prisma.car.upsert({
        where: { licensePlate: 'XYZ789' },
        update: {},
        create: {
          make: 'BMW',
          model: 'X5',
          year: 2022,
          color: 'Black',
          licensePlate: 'XYZ789',
          pricePerDay: 85.00,
          description: 'Luxury SUV with spacious interior and premium features.',
          category: 'SUV',
          transmission: 'AUTOMATIC',
          fuelType: 'GASOLINE',
          seats: 7,
          rating: 4.9,
          features: ['Leather Seats', 'Panoramic Sunroof', 'Navigation'],
          imageUrl: 'https://images.unsplash.com/photo-1627454820516-34340c7601b1?q=80&w=2070&auto=format&fit=crop',
        },
      }),
      prisma.car.upsert({
        where: { licensePlate: 'LUX001' },
        update: {},
        create: {
          make: 'Honda',
          model: 'Civic',
          year: 2023,
          color: 'Blue',
          licensePlate: 'LUX001',
          pricePerDay: 35.00,
          description: 'Compact and fuel-efficient car ideal for city driving.',
          category: 'COMPACT',
          transmission: 'MANUAL',
          fuelType: 'GASOLINE',
          seats: 5,
          rating: 4.6,
          features: ['Apple CarPlay', 'Lane Assist', 'Rear Camera'],
          imageUrl: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=2070&auto=format&fit=crop',
        },
      }),
      prisma.car.upsert({
        where: { licensePlate: 'TESLA3' },
        update: {},
        create: {
          make: 'Tesla',
          model: 'Model 3',
          year: 2024,
          color: 'White',
          licensePlate: 'TESLA3',
          pricePerDay: 75.00,
          description: 'Premium electric vehicle with cutting-edge technology.',
          category: 'ELECTRIC',
          transmission: 'AUTOMATIC',
          fuelType: 'ELECTRIC',
          seats: 5,
          rating: 5.0,
          features: ['Autopilot', 'Premium Audio', 'Wireless Charging'],
          imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?q=80&w=2071&auto=format&fit=crop',
        },
      }),
      prisma.car.upsert({
        where: { licensePlate: 'MUST23' },
        update: {},
        create: {
          make: 'Ford',
          model: 'Mustang',
          year: 2023,
          color: 'Red',
          licensePlate: 'MUST23',
          pricePerDay: 95.00,
          description: 'High-performance sports car with powerful V8 engine.',
          category: 'SPORTS',
          transmission: 'MANUAL',
          fuelType: 'GASOLINE',
          seats: 4,
          rating: 4.7,
          features: ['Sport Mode', 'Premium Sound', 'Performance Package'],
          imageUrl: 'https://images.unsplash.com/photo-1584345604476-8ec5f8f2c049?q=80&w=2070&auto=format&fit=crop',
        },
      }),
      prisma.car.upsert({
        where: { licensePlate: 'MERC23' },
        update: {},
        create: {
          make: 'Mercedes-Benz',
          model: 'C-Class',
          year: 2023,
          color: 'Gray',
          licensePlate: 'MERC23',
          pricePerDay: 70.00,
          description: 'Luxury sedan with elegant design and advanced features.',
          category: 'SEDAN',
          transmission: 'AUTOMATIC',
          fuelType: 'GASOLINE',
          seats: 5,
          rating: 4.8,
          features: ['Massage Seats', 'Ambient Lighting', 'Voice Control'],
          imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop',
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
