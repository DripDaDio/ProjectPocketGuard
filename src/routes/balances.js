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
    const accounts = await prisma.account.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    });

    res.render('balances', {
      title: 'Balances',
      accounts
    });
  } catch (e) {
    console.error('Balances error:', e);
    res.status(500).render('balances', {
      title: 'Balances',
      accounts: [],
      error: 'Failed to load accounts'
    });
  }
});

module.exports = router;
