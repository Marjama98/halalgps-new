// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  try {
    // Create admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    
    const admin = await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        email: 'admin@example.com',
        name: 'Admin User',
        passwordHash: adminPassword,
        role: 'admin'
      }
    });
    
    console.log(`Admin user created: ${admin.email}`);
    
    // Seed some sample restaurants
    const restaurant1 = await prisma.restaurant.upsert({
      where: { id: '1' },
      update: {},
      create: {
        name: 'Pasta Paradise',
        cuisine: 'Italian',
        address: '123 Main Street, Cityville',
        description: 'Authentic Italian cuisine in a cozy atmosphere.',
        imageUrl: '/images/restaurants/pasta-paradise.jpg',
        phone: '555-123-4567',
        priceRange: '$$',
        openingHours: 'Mon-Fri: 11am-10pm, Sat-Sun: 10am-11pm',
        featured: true
      }
    });
    
    const restaurant2 = await prisma.restaurant.upsert({
      where: { id: '2' },
      update: {},
      create: {
        name: 'Sushi Sensation',
        cuisine: 'Japanese',
        address: '456 Oak Avenue, Townsville',
        description: 'Fresh sushi and Japanese specialties prepared by master chefs.',
        imageUrl: '/images/restaurants/sushi-sensation.jpg',
        phone: '555-987-6543',
        priceRange: '$$$',
        openingHours: 'Tue-Sun: 12pm-10pm, Closed Mondays',
        featured: true
      }
    });
    
    console.log(`Created restaurants: ${restaurant1.name}, ${restaurant2.name}`);
    
    await prisma.review.create({
      data: {
        rating: 5,
        comment: 'Best pasta I\'ve ever had! The service was excellent.',
        status: 'published',
        userId: admin.id,
        restaurantId: restaurant1.id,  // Ensure there's a comma here if it's part of a larger object
      },
    });
    
    
    const review2 = await prisma.review.upsert({
      where: { id: '2' },
      update: {},
      create: {
        rating: 4,
        comment: 'Great sushi, fresh ingredients. A bit pricey but worth it.',
        status: 'published',
        userId: admin.id,
        restaurantId: restaurant2.id
      }
    });
    
    console.log(`Created reviews for: ${restaurant1.name}, ${restaurant2.name}`);
    
    console.log('Database seeding completed successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });