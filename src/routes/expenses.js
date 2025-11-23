const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const userId = req.session.userId;
    const prisma = req.prisma;

    // Get user's transactions for expenses
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      take: 100
    });

    // Calculate expense categories
    const categories = {
      food: { name: 'Food & Dining', total: 0, count: 0, icon: 'restaurant', color: '#FF6B6B' },
      transport: { name: 'Transportation', total: 0, count: 0, icon: 'directions_car', color: '#4ECDC4' },
      shopping: { name: 'Shopping', total: 0, count: 0, icon: 'shopping_bag', color: '#95E1D3' },
      entertainment: { name: 'Entertainment', total: 0, count: 0, icon: 'movie', color: '#F38181' },
      bills: { name: 'Bills & Utilities', total: 0, count: 0, icon: 'receipt_long', color: '#AA96DA' },
      health: { name: 'Healthcare', total: 0, count: 0, icon: 'local_hospital', color: '#FCBAD3' },
      other: { name: 'Other', total: 0, count: 0, icon: 'more_horiz', color: '#A8D8EA' }
    };

    // Categorize transactions
    transactions.forEach(tx => {
      if (tx.amount < 0) { // Expenses are negative
        const amount = Math.abs(tx.amount);
        const description = (tx.description || '').toLowerCase();
        
        let category = 'other';
        if (description.includes('food') || description.includes('restaurant') || description.includes('cafe')) {
          category = 'food';
        } else if (description.includes('transport') || description.includes('taxi') || description.includes('uber') || description.includes('car')) {
          category = 'transport';
        } else if (description.includes('shop') || description.includes('store') || description.includes('mall')) {
          category = 'shopping';
        } else if (description.includes('movie') || description.includes('game') || description.includes('entertainment')) {
          category = 'entertainment';
        } else if (description.includes('bill') || description.includes('utility') || description.includes('electric') || description.includes('water')) {
          category = 'bills';
        } else if (description.includes('health') || description.includes('hospital') || description.includes('doctor')) {
          category = 'health';
        }
        
        categories[category].total += amount;
        categories[category].count++;
      }
    });

    // Calculate totals
    const totalExpenses = Object.values(categories).reduce((sum, cat) => sum + cat.total, 0);
    const thisMonth = totalExpenses;
    const lastMonth = thisMonth * 0.85; // Mock data for comparison

    res.render('expenses', {
      title: 'Expenses',
      user: req.session.user || { name: 'User' },
      categories,
      totalExpenses,
      thisMonth,
      lastMonth,
      transactions: transactions.filter(tx => tx.amount < 0).slice(0, 20)
    });
  } catch (error) {
    console.error('Expenses page error:', error);
    res.status(500).render('errors/500', { title: 'Error', error: error.message });
  }
});

module.exports = router;
