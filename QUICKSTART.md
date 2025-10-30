# Quick Start Guide

Get your Hedera authentication server running in 5 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Configure Environment

```bash
# Copy the example environment file
cp .env.example .env
```

Edit `.env` and set your configuration:
```env
PORT=3000
JWT_SECRET=your-secret-key-here-change-this
HEDERA_NETWORK=testnet
```

**Important:** Generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 3: Start the Server

```bash
npm start
```

You should see:
```
==================================================
Hedera Auth Server for Unreal Engine
==================================================
Environment: development
Network: testnet
Server running on port 3000
Server URL: http://localhost:3000
==================================================
```

## Step 4: Test the Server

Open another terminal and test:

```bash
# Test health endpoint
curl http://localhost:3000/health

# Test challenge endpoint
curl -X POST http://localhost:3000/auth/challenge \
  -H "Content-Type: application/json" \
  -d '{"accountId":"0.0.12345"}'
```

## Step 5: Test with Browser

Open `example-wallet-page.html` in your browser:

1. Enter your Hedera account ID (e.g., `0.0.12345`)
2. Click "Get Challenge"
3. You'll see a challenge message generated

## Next Steps

### For Development:
- See `README.md` for complete API documentation
- Check `UNREAL_INTEGRATION.md` for Unreal Engine integration
- Review `DEPLOYMENT.md` when ready to deploy

### For Unreal Engine:
1. Use the API endpoints in your Widget Blueprint
2. Implement wallet signing (HashPack/Blade)
3. Store the JWT token in Game Instance
4. Use the token for authenticated requests

### For Production:
1. Deploy to a hosting platform (Railway, Render, etc.)
2. Set up HTTPS/SSL
3. Configure proper CORS origins
4. Use mainnet Hedera network
5. Implement proper wallet integration

## Common Issues

### Port already in use
Change the PORT in `.env` file:
```env
PORT=3001
```

### Missing dependencies
Make sure you ran:
```bash
npm install
```

### Environment variables not loaded
Ensure `.env` file exists in the project root.

## File Structure

```
hedera-auth-server/
├── src/
│   ├── routes/
│   │   ├── auth.js          # Authentication endpoints
│   │   └── user.js          # User endpoints
│   ├── middleware/
│   │   └── auth.js          # JWT verification middleware
│   ├── utils/
│   │   └── hedera.js        # Hedera service utilities
│   └── server.js            # Main server file
├── .env                     # Your configuration (create this)
├── .env.example            # Example configuration
├── package.json            # Dependencies
├── README.md               # Full documentation
├── UNREAL_INTEGRATION.md   # Unreal Engine guide
└── DEPLOYMENT.md           # Deployment guide
```

## Quick Commands

```bash
# Start server
npm start

# Start with auto-reload (development)
npm run dev

# Run API tests
node test-api.js

# Generate new JWT secret
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## API Endpoints

### Get Challenge
```bash
POST /auth/challenge
Body: {"accountId": "0.0.12345"}
```

### Verify Signature
```bash
POST /auth/verify
Body: {
  "accountId": "0.0.12345",
  "signature": "hex_signature",
  "publicKey": "public_key"
}
```

### Validate Token
```bash
GET /auth/validate
Header: Authorization: Bearer <token>
```

### Get Profile
```bash
GET /user/profile
Header: Authorization: Bearer <token>
```

## Getting Help

- **Documentation:** See README.md
- **Unreal Integration:** See UNREAL_INTEGRATION.md
- **Deployment:** See DEPLOYMENT.md
- **Issues:** Open an issue on GitHub

## What's Next?

1. **Integrate with Unreal Engine** - Follow UNREAL_INTEGRATION.md
2. **Add Wallet Support** - Implement HashPack or Blade wallet
3. **Deploy to Production** - Follow DEPLOYMENT.md
4. **Customize** - Add game-specific features

---

Happy coding! 🚀 Need help? Check the README.md or open an issue.
