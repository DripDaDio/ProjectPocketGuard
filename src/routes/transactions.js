const express = require('express');
const router = express.Router();

function requireAuth(req, res, next) {
  if (!req.session || !req.session.userId) return res.redirect('/login');
  next();
}

router.get('/', requireAuth, async (req, res) => {
  const prisma = req.prisma;
  const userId = req.session.userId;

  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      include: { 
        category: true,
        account: true 
      }
    });

    res.render('transactions', {
      title: 'Transactions',
      transactions
    });
  } catch (e) {
    console.error('Transactions error:', e);
    res.status(500).render('transactions', {
      title: 'Transactions',
      transactions: [],
      error: 'Failed to load transactions'
    });
  }
});

module.exports = router;
