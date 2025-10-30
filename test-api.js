/**
 * Test script for Hedera Auth Server API
 * Run with: node test-api.js
 */

const baseUrl = process.env.API_URL || 'http://localhost:3000';
const testAccountId = process.env.TEST_ACCOUNT_ID || '0.0.12345';

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testEndpoint(name, method, endpoint, body = null, headers = {}) {
  log(`\n📍 Testing: ${name}`, 'blue');
  log(`   ${method} ${endpoint}`, 'yellow');
  
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };

    if (body) {
      options.body = JSON.stringify(body);
      log(`   Body: ${JSON.stringify(body, null, 2)}`, 'yellow');
    }

    const response = await fetch(`${baseUrl}${endpoint}`, options);
    const data = await response.json();

    if (response.ok) {
      log(`   ✅ Success (${response.status})`, 'green');
      log(`   Response: ${JSON.stringify(data, null, 2)}`, 'green');
      return { success: true, data, status: response.status };
    } else {
      log(`   ❌ Failed (${response.status})`, 'red');
      log(`   Response: ${JSON.stringify(data, null, 2)}`, 'red');
      return { success: false, data, status: response.status };
    }
  } catch (error) {
    log(`   ❌ Error: ${error.message}`, 'red');
    return { success: false, error: error.message };
  }
}

async function runTests() {
  log('='.repeat(60), 'blue');
  log('Hedera Auth Server API Test Suite', 'blue');
  log('='.repeat(60), 'blue');
  log(`Base URL: ${baseUrl}`);
  log(`Test Account: ${testAccountId}`);

  // Test 1: Health Check
  await testEndpoint('Health Check', 'GET', '/health');

  // Test 2: Root Endpoint
  await testEndpoint('Root Endpoint', 'GET', '/');

  // Test 3: Request Challenge
  const challengeResult = await testEndpoint(
    'Request Challenge',
    'POST',
    '/auth/challenge',
    { accountId: testAccountId }
  );

  let token = null;

  if (challengeResult.success) {
    const challenge = challengeResult.data.data.challenge;
    log(`\n📝 Challenge generated: "${challenge.substring(0, 50)}..."`, 'yellow');

    // Test 4: Verify with invalid signature (expected to fail)
    await testEndpoint(
      'Verify with Invalid Signature (should fail)',
      'POST',
      '/auth/verify',
      {
        accountId: testAccountId,
        signature: 'invalid_signature_hex',
        publicKey: 'invalid_public_key'
      }
    );

    // Note: Real signature verification requires actual wallet signing
    log('\n⚠️  Note: Real signature verification requires actual Hedera wallet signing', 'yellow');
    log('   Use the example-wallet-page.html or integrate with HashPack for real testing', 'yellow');
  }

  // Test 5: Validate token without auth (should fail)
  await testEndpoint('Validate Token Without Auth (should fail)', 'GET', '/auth/validate');

  // Test 6: Get user profile without auth (should fail)
  await testEndpoint('Get Profile Without Auth (should fail)', 'GET', '/user/profile');

  // Test 7: Invalid account ID format
  await testEndpoint(
    'Challenge with Invalid Account ID (should fail)',
    'POST',
    '/auth/challenge',
    { accountId: 'invalid-account-id' }
  );

  // Test 8: Missing parameters
  await testEndpoint(
    'Challenge with Missing Parameters (should fail)',
    'POST',
    '/auth/challenge',
    {}
  );

  // Test 9: Non-existent endpoint
  await testEndpoint(
    'Non-existent Endpoint (should fail)',
    'GET',
    '/nonexistent'
  );

  // Summary
  log('\n' + '='.repeat(60), 'blue');
  log('Test Suite Completed', 'blue');
  log('='.repeat(60), 'blue');
  log('\nℹ️  For complete authentication flow testing:', 'blue');
  log('   1. Start the server: npm start', 'yellow');
  log('   2. Open example-wallet-page.html in a browser', 'yellow');
  log('   3. Connect with a real Hedera wallet (HashPack/Blade)', 'yellow');
  log('   4. Complete the full authentication flow', 'yellow');
  log('\n📚 See UNREAL_INTEGRATION.md for Unreal Engine integration\n', 'blue');
}

// Check if fetch is available (Node.js 18+)
if (typeof fetch === 'undefined') {
  log('❌ This script requires Node.js 18+ with native fetch support', 'red');
  log('   Or install node-fetch: npm install node-fetch', 'yellow');
  process.exit(1);
}

// Run tests
runTests().catch(error => {
  log(`\n❌ Test suite error: ${error.message}`, 'red');
  process.exit(1);
});
