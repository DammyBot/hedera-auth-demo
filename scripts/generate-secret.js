#!/usr/bin/env node

/**
 * Generate a secure JWT secret
 * Usage: node scripts/generate-secret.js
 */

const crypto = require('crypto');

console.log('\n==============================================');
console.log('JWT Secret Generator');
console.log('==============================================\n');

const secret = crypto.randomBytes(64).toString('hex');

console.log('Your new JWT secret:');
console.log('\x1b[32m%s\x1b[0m', secret);
console.log('\n');
console.log('Add this to your .env file:');
console.log('\x1b[33m%s\x1b[0m', `JWT_SECRET=${secret}`);
console.log('\n');
console.log('⚠️  Keep this secret secure and never commit it to version control!');
console.log('==============================================\n');
