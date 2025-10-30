const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const NodeCache = require('node-cache');
const hederaService = require('../utils/hedera');
const authMiddleware = require('../middleware/auth');

const challengeCache = new NodeCache({ 
  stdTTL: parseInt(process.env.CHALLENGE_EXPIRATION) || 300 
});

router.post('/challenge', [
  body('accountId').notEmpty().withMessage('Account ID is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { accountId } = req.body;

    if (!hederaService.validateAccountId(accountId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid Hedera account ID format'
      });
    }

    const challenge = hederaService.generateChallenge(accountId);
    
    challengeCache.set(accountId, challenge);

    res.json({
      success: true,
      data: {
        challenge,
        expiresIn: parseInt(process.env.CHALLENGE_EXPIRATION) || 300
      }
    });
  } catch (error) {
    console.error('Error generating challenge:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to generate challenge'
    });
  }
});

router.post('/verify', [
  body('accountId').notEmpty().withMessage('Account ID is required'),
  body('signature').notEmpty().withMessage('Signature is required'),
  body('publicKey').notEmpty().withMessage('Public key is required')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { accountId, signature, publicKey } = req.body;

    const challenge = challengeCache.get(accountId);
    if (!challenge) {
      return res.status(400).json({
        success: false,
        error: 'Challenge not found or expired. Please request a new challenge.'
      });
    }

    const isValid = await hederaService.verifySignature(
      accountId,
      challenge,
      signature,
      publicKey
    );

    if (!isValid) {
      return res.status(401).json({
        success: false,
        error: 'Invalid signature'
      });
    }

    challengeCache.del(accountId);

    const token = jwt.sign(
      {
        accountId,
        publicKey
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '24h'
      }
    );

    res.json({
      success: true,
      data: {
        token,
        accountId,
        expiresIn: process.env.JWT_EXPIRES_IN || '24h'
      }
    });
  } catch (error) {
    console.error('Error verifying signature:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to verify signature'
    });
  }
});

router.get('/validate', authMiddleware, (req, res) => {
  res.json({
    success: true,
    data: {
      valid: true,
      accountId: req.user.accountId,
      publicKey: req.user.publicKey
    }
  });
});

router.post('/refresh', authMiddleware, (req, res) => {
  try {
    const token = jwt.sign(
      {
        accountId: req.user.accountId,
        publicKey: req.user.publicKey
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '24h'
      }
    );

    res.json({
      success: true,
      data: {
        token,
        expiresIn: process.env.JWT_EXPIRES_IN || '24h'
      }
    });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to refresh token'
    });
  }
});

module.exports = router;
