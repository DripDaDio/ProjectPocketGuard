require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const { populate } = require('./src/utils/demoData');

const prisma = new PrismaClient();

async function regenerateData() {
  try {
    console.log('Regenerating demo data with new expense categories...');
    const result = await populate(prisma, { reset: true, months: 3, perMonth: 30 });
    console.log('✅ Demo data regenerated successfully!');
    console.log('   - Transactions:', result.txCount);
    console.log('   - Budgets:', result.budgetCount);
    console.log('   - Subscriptions:', result.subCount);
    console.log('   - Goals:', result.goalCount);
    console.log('\nYou can now login with: demo@pocketguard.test / demo123');
    await prisma.$disconnect();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error regenerating data:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

regenerateData();
