// exportData.ts
import { writeFileSync } from 'fs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const exportData = async () => {
  try {
    // Fetch all your tables
    const users = await prisma.user.findMany();
    const bookings = await prisma.booking.findMany();
    const rooms = await prisma.room.findMany();
    const hotels = await prisma.hotel.findMany();

    const data = {
      users,
      bookings,
      rooms,
      hotels,
    };

    writeFileSync('backup.json', JSON.stringify(data, null, 2));
    console.log('✅ Data exported successfully to backup.json');
  } catch (error) {
    console.error('❌ Error exporting data:', error);
  } finally {
    await prisma.$disconnect();
  }
};

exportData();
