require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function updateUserName() {
  try {
    console.log('Updating demo user name...');
    const user = await prisma.user.findUnique({ 
      where: { email: 'demo@pocketguard.test' } 
    });
    
    if (user) {
      await prisma.user.update({
        where: { id: user.id },
        data: { name: 'Suryansh Choudhary' }
      });
      console.log('✅ User name updated to: Suryansh Choudhary');
    } else {
      console.log('❌ Demo user not found');
    }
    
    await prisma.$disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating user:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

updateUserName();
