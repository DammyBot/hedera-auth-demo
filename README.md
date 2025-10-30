# Hedera Authentication Server for Unreal Engine

A secure authentication server that integrates Hedera wallet authentication with Unreal Engine games. This server allows players to sign in using their Hedera wallet and provides JWT-based session management.

## Features

- ✅ Hedera wallet authentication via signature verification
- ✅ JWT token-based session management
- ✅ Support for Testnet, Previewnet, and Mainnet
- ✅ CORS enabled for Unreal Engine HTTP requests
- ✅ Challenge-response authentication flow
- ✅ Protected API routes
- ✅ User profile management

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Hedera account (testnet or mainnet)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd hedera-auth-server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from the example:
```bash
cp .env.example .env
```

4. Configure your `.env` file:
```env
PORT=3000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h
HEDERA_NETWORK=testnet
CORS_ORIGINS=*
CHALLENGE_EXPIRATION=300
```

## Running the Server

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:3000` (or your configured PORT).

## API Endpoints

### Authentication Endpoints

#### 1. Get Challenge
**POST** `/auth/challenge`

Request a challenge message to sign with your Hedera wallet.

**Request Body:**
```json
{
  "accountId": "0.0.12345"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "challenge": "Sign this message to authenticate...",
    "expiresIn": 300
  }
}
```

#### 2. Verify Signature
**POST** `/auth/verify`

Verify the signed challenge and receive a JWT token.

**Request Body:**
```json
{
  "accountId": "0.0.12345",
  "signature": "hex-encoded-signature",
  "publicKey": "302a300506032b6570032100..."
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "accountId": "0.0.12345",
    "expiresIn": "24h"
  }
}
```

#### 3. Validate Token
**GET** `/auth/validate`

Validate an existing JWT token.

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "valid": true,
    "accountId": "0.0.12345",
    "publicKey": "302a300506032b6570032100..."
  }
}
```

#### 4. Refresh Token
**POST** `/auth/refresh`

Refresh an existing JWT token.

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "24h"
  }
}
```

### User Endpoints

#### 1. Get User Profile
**GET** `/user/profile`

Get detailed user profile including balance from Hedera network.

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accountId": "0.0.12345",
    "publicKey": "302a300506032b6570032100...",
    "balance": "100.50000000"
  }
}
```

#### 2. Get Current User
**GET** `/user/me`

Get basic information about the authenticated user.

**Headers:**
```
Authorization: Bearer <your-jwt-token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accountId": "0.0.12345",
    "publicKey": "302a300506032b6570032100..."
  }
}
```

### Utility Endpoints

#### Health Check
**GET** `/health`

Check server health status.

**Response:**
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Integration with Unreal Engine

### Authentication Flow

1. **Request Challenge:**
   - Use Unreal's HTTP Request node to POST to `/auth/challenge`
   - Send the user's Hedera account ID
   - Store the challenge message

2. **Sign Challenge:**
   - In Unreal, you'll need to integrate with a wallet provider (e.g., HashPack)
   - Have the user sign the challenge message
   - This typically happens in a web browser via WalletConnect or similar

3. **Verify Signature:**
   - POST the signed message to `/auth/verify`
   - Receive and store the JWT token

4. **Make Authenticated Requests:**
   - Include the JWT token in the Authorization header for all subsequent requests
   - Use format: `Authorization: Bearer <token>`

### Example Unreal Engine HTTP Request

In your Unreal Engine Widget Blueprint:

1. **Create HTTP Request Node**
2. **Set URL:** `http://your-server.com/auth/challenge`
3. **Set Method:** POST
4. **Set Content:** 
   ```json
   {"accountId": "0.0.12345"}
   ```
5. **Add Header:** 
   - Key: `Content-Type`
   - Value: `application/json`
6. **Process Response** and extract the challenge

### Unreal Engine Blueprint Tips

- Store the JWT token in a Game Instance variable to persist across levels
- Create a Blueprint Function Library for common auth operations
- Use the "VaRest" plugin for easier HTTP request handling in Blueprints
- Implement a token refresh mechanism before the token expires

## Wallet Integration Options

For signing messages in your Unreal game, you have several options:

### Option 1: Web Browser Widget (Recommended)
- Use Unreal's Web Browser widget
- Redirect to a web page that handles HashPack/Blade wallet connection
- Return signed data back to the game via JavaScript bridge

### Option 2: External Browser
- Open system browser for wallet connection
- Use deep linking to return to game
- Less seamless but easier to implement

### Option 3: QR Code
- Display QR code in game
- User scans with mobile wallet app
- Poll server for authentication completion

## Deployment

### Deploy to a VPS (DigitalOcean, AWS, etc.)

1. **Install Node.js on your server**
2. **Clone your repository**
3. **Install dependencies:**
   ```bash
   npm install --production
   ```
4. **Set up environment variables**
5. **Use PM2 for process management:**
   ```bash
   npm install -g pm2
   pm2 start src/server.js --name hedera-auth
   pm2 save
   pm2 startup
   ```

### Deploy to Heroku

1. **Create Heroku app:**
   ```bash
   heroku create your-app-name
   ```
2. **Set environment variables:**
   ```bash
   heroku config:set JWT_SECRET=your-secret
   heroku config:set HEDERA_NETWORK=testnet
   ```
3. **Deploy:**
   ```bash
   git push heroku main
   ```

### Deploy to Railway/Render

Both platforms support automatic deployment from Git:
1. Connect your repository
2. Set environment variables in the dashboard
3. Deploy with one click

## Security Considerations

- ✅ Always use HTTPS in production
- ✅ Change the JWT_SECRET to a strong, random value
- ✅ Set specific CORS_ORIGINS instead of using `*`
- ✅ Implement rate limiting for production
- ✅ Add request validation and sanitization
- ✅ Monitor and log authentication attempts
- ✅ Use environment-specific configuration

## Troubleshooting

### "Invalid Hedera account ID format"
- Ensure the account ID follows the format: `0.0.12345`
- Verify the account exists on the specified network

### "Challenge not found or expired"
- The challenge expires after 5 minutes (configurable)
- Request a new challenge if it expires

### "Invalid signature"
- Ensure the message signed matches exactly the challenge received
- Verify you're using the correct public key
- Check that the signature is hex-encoded

### CORS Errors from Unreal Engine
- Add your game server's origin to CORS_ORIGINS
- Ensure the Authorization header is included in allowedHeaders

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

MIT License - See LICENSE file for details

## Support

For issues and questions:
- Open an issue on GitHub
- Check existing documentation
- Review Hedera SDK documentation: https://docs.hedera.com/

## Acknowledgments

- Hedera Hashgraph for the blockchain infrastructure
- Epic Games for Unreal Engine
- The open-source community

---

Built for the Hedera Hackathon 🚀
