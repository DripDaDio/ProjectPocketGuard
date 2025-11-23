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
    const subscriptions = await prisma.subscription.findMany({
      where: { userId },
      orderBy: { dueDate: 'desc' }
    });

    res.render('bills', {
      title: 'Billings',
      subscriptions
    });
  } catch (e) {
    console.error('Bills error:', e);
    res.status(500).render('bills', {
      title: 'Billings',
      subscriptions: [],
      error: 'Failed to load bills'
    });
  }
});

module.exports = router;
