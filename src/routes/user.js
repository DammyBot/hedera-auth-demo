const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const hederaService = require('../utils/hedera');

router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const accountInfo = await hederaService.getAccountInfo(req.user.accountId);
    
    res.json({
      success: true,
      data: {
        accountId: req.user.accountId,
        publicKey: req.user.publicKey,
        balance: accountInfo.balance
      }
    });
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch user profile'
    });
  }
});

router.get('/me', authMiddleware, (req, res) => {
  res.json({
    success: true,
    data: {
      accountId: req.user.accountId,
      publicKey: req.user.publicKey
    }
  });
});

module.exports = router;
