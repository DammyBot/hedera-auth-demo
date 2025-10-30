# Unreal Engine Integration Guide

This guide explains how to integrate the Hedera authentication server with your Unreal Engine game.

## Prerequisites

- Unreal Engine 5.x (or 4.26+)
- VaRest plugin (optional but recommended)
- Basic knowledge of Blueprints

## Step-by-Step Integration

### 1. Setting Up HTTP Requests in Unreal

#### Option A: Using VaRest Plugin (Recommended)

1. **Install VaRest:**
   - Download from Epic Marketplace or GitHub
   - Enable in your project's plugins

2. **Create a Blueprint Function Library:**
   - Create a new Blueprint Function Library called `HederaAuthLib`

3. **Add Authentication Functions:**

**Function: RequestChallenge**
```
Input: AccountId (String)
Output: Challenge (String), Success (Boolean)

Nodes:
1. Construct Json Object
2. Set String Field "accountId" = AccountId
3. Create VaRest Request
4. Set URL = "http://your-server.com/auth/challenge"
5. Set Verb = POST
6. Set Request Object = Json Object
7. Process Request
8. On Response -> Get String Field "challenge"
```

**Function: VerifySignature**
```
Input: AccountId (String), Signature (String), PublicKey (String)
Output: Token (String), Success (Boolean)

Nodes:
1. Construct Json Object
2. Set String Field "accountId" = AccountId
3. Set String Field "signature" = Signature
4. Set String Field "publicKey" = PublicKey
5. Create VaRest Request
6. Set URL = "http://your-server.com/auth/verify"
7. Set Verb = POST
8. Set Request Object = Json Object
9. Process Request
10. On Response -> Get String Field "token"
```

#### Option B: Using Built-in HTTP Request

**Blueprint Setup:**
```
1. Create HTTP Request node
2. Set URL node
3. Set Method to POST
4. Set Content Type header: "Content-Type: application/json"
5. Set Content from JSON string
6. Bind to OnRequestComplete event
7. Parse response using JSON library
```

### 2. Creating a Login Widget

Create a new Widget Blueprint called `WBP_HederaLogin`:

**Visual Elements:**
- Text Input for Account ID (e.g., "0.0.12345")
- Button "Connect Wallet"
- Progress Indicator
- Status Text

**Blueprint Logic:**

```
Event: On Connect Wallet Clicked
├─ Show Progress Indicator
├─ Get Account ID from Text Input
├─ Call RequestChallenge(AccountId)
├─ On Success:
│  ├─ Store Challenge in variable
│  ├─ Open Wallet Connection Flow
│  └─ Wait for Signature
└─ On Failure:
   └─ Show Error Message
```

### 3. Wallet Integration Methods

#### Method 1: Web Browser Widget

**Create Widget with Web Browser:**

1. Add Web Browser component to your login widget
2. Load a custom HTML page that connects to HashPack
3. Use JavaScript Interface to communicate

**Example HTML (host this separately):**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Hedera Wallet Connect</title>
    <script src="https://unpkg.com/@hashgraph/sdk"></script>
</head>
<body>
    <button id="connect">Connect HashPack</button>
    <script>
        document.getElementById('connect').onclick = async () => {
            // HashPack integration code
            const pairing = await hashconnect.init();
            const signature = await hashconnect.sign(challenge);
            
            // Send back to Unreal
            window.ue.sendSignature(signature);
        };
    </script>
</body>
</html>
```

**In Unreal Widget:**
```
1. Set Web Browser URL to your HTML page
2. Bind JavaScript "sendSignature" function
3. When signature received:
   ├─ Call VerifySignature()
   ├─ Store JWT Token
   └─ Close Login Widget
```

#### Method 2: System Browser + Deep Link

1. Generate a unique session ID
2. Open system browser to your auth page with session ID
3. After wallet connection, redirect back to your game via deep link
4. Poll server for authentication status

**Blueprint:**
```
Event: Connect Wallet
├─ Generate Session ID
├─ Launch URL: "http://your-auth-page.com?session={SessionID}"
└─ Start Polling Timer

Timer Event: Check Auth Status
├─ HTTP GET to /auth/status?session={SessionID}
├─ If authenticated:
│  ├─ Get Token
│  ├─ Stop Timer
│  └─ Close Login
└─ If timeout:
   └─ Show Error
```

#### Method 3: QR Code Display

1. Request challenge
2. Generate QR code with challenge data
3. User scans with mobile wallet app
4. Poll server for verification

**Blueprint:**
```
Event: Connect Wallet
├─ Request Challenge
├─ Generate QR Code (plugin needed)
├─ Display QR Code
└─ Start Polling

Timer: Check Verification
├─ HTTP GET to /auth/check?accountId={AccountId}
└─ If verified:
   └─ Get Token and Login
```

### 4. Storing the Authentication Token

**Create a Game Instance Blueprint:**

1. Create new Blueprint Class based on Game Instance
2. Add variables:
   - `AuthToken` (String)
   - `AccountId` (String)
   - `IsAuthenticated` (Boolean)

3. Set in Project Settings -> Maps & Modes -> Game Instance

**Save Token:**
```
Function: SaveAuthToken
Input: Token (String), AccountId (String)
├─ Set AuthToken variable
├─ Set AccountId variable
├─ Set IsAuthenticated = true
└─ Optional: Save to disk for persistence
```

### 5. Making Authenticated Requests

**Create a helper function for authenticated requests:**

```
Function: MakeAuthenticatedRequest
Input: Endpoint (String), Method (String), Data (String)
Output: Response (String), Success (Boolean)

Nodes:
1. Get Game Instance
2. Cast to your Game Instance Blueprint
3. Get AuthToken variable
4. Create HTTP Request
5. Set URL = Base URL + Endpoint
6. Set Method
7. Add Header: "Authorization" = "Bearer " + AuthToken
8. Add Header: "Content-Type" = "application/json"
9. Set Content = Data
10. Process Request
```

**Example Usage:**
```
Event: Load Player Profile
├─ MakeAuthenticatedRequest
│  ├─ Endpoint: "/user/profile"
│  ├─ Method: "GET"
│  └─ Data: ""
├─ On Success:
│  └─ Parse JSON and display user info
└─ On Failure:
   └─ Check if token expired, re-authenticate if needed
```

### 6. Token Management

**Auto-refresh token before expiry:**

```
Event: BeginPlay (in persistent actor/game instance)
├─ Start Timer (repeat every 23 hours for 24h token)
└─ Timer Event:
   ├─ MakeAuthenticatedRequest("/auth/refresh", "POST")
   └─ Update stored token
```

**Handle expired tokens:**

```
Event: On HTTP Request Failed (401 Unauthorized)
├─ Clear stored token
├─ Set IsAuthenticated = false
├─ Show login widget
└─ Prompt user to reconnect
```

### 7. Testing Your Integration

1. **Test locally first:**
   - Run the server on localhost
   - Use http://localhost:3000 as base URL
   - Test with Hedera testnet account

2. **Test authentication flow:**
   - Request challenge
   - Verify signature (you may need to mock this initially)
   - Store token
   - Make authenticated request

3. **Test error scenarios:**
   - Invalid account ID
   - Expired challenge
   - Invalid signature
   - Expired token

## Example Blueprint Flow

### Complete Login Flow

```
WBP_HederaLogin Widget:

[Event: Construct]
├─ Hide Progress Indicator
└─ Focus Account ID Input

[Event: Connect Button Clicked]
├─ Validate Account ID format (0.0.XXXXX)
├─ If invalid: Show error and return
├─ Show Progress Indicator
├─ Set Status Text: "Requesting challenge..."
├─ Call HederaAuthLib::RequestChallenge(AccountId)
└─ Bind to OnChallengeReceived event

[Event: OnChallengeReceived]
├─ Set Status Text: "Please sign the message in your wallet..."
├─ Store Challenge in variable
├─ Open Wallet Connection (Web Browser/External/QR)
└─ Bind to OnSignatureReceived event

[Event: OnSignatureReceived]
Input: Signature (String), PublicKey (String)
├─ Set Status Text: "Verifying signature..."
├─ Call HederaAuthLib::VerifySignature(AccountId, Signature, PublicKey)
└─ Bind to OnVerificationComplete event

[Event: OnVerificationComplete]
Input: Token (String), Success (Boolean)
├─ If Success:
│  ├─ Get Game Instance
│  ├─ Call SaveAuthToken(Token, AccountId)
│  ├─ Set Status Text: "Login successful!"
│  ├─ Wait 1 second
│  ├─ Remove from Parent (close widget)
│  └─ Dispatch OnLoginSuccessful event
└─ Else:
   ├─ Set Status Text: "Authentication failed. Please try again."
   ├─ Hide Progress Indicator
   └─ Enable Connect Button
```

## Production Checklist

- [ ] Replace localhost URLs with production server URL
- [ ] Use HTTPS for production server
- [ ] Implement proper error handling
- [ ] Add loading animations/feedback
- [ ] Test on all target platforms
- [ ] Implement token refresh mechanism
- [ ] Add logout functionality
- [ ] Handle network disconnections gracefully
- [ ] Add analytics/logging for debugging
- [ ] Test with real Hedera wallets
- [ ] Add privacy policy and terms of service
- [ ] Implement rate limiting on client side

## Troubleshooting

### "Connection Failed" Error
- Check server is running and accessible
- Verify CORS is configured correctly on server
- Check firewall settings
- Ensure URL format is correct (http:// or https://)

### Widget Not Responding
- Check Event Graph is wired correctly
- Verify all bindings are set up
- Add Print String nodes for debugging
- Check Output Log for error messages

### Token Not Persisting
- Verify Game Instance is properly configured
- Check variable scope (instance vs local)
- Consider saving to disk with SaveGame system
- Ensure token is stored before changing levels

## Best Practices

1. **Always validate user input** before sending to server
2. **Show clear feedback** to users during async operations
3. **Handle all error cases** gracefully
4. **Cache authentication** to avoid repeated logins
5. **Test thoroughly** on all target platforms
6. **Use secure connections** (HTTPS) in production
7. **Implement proper timeout** handling
8. **Log errors** for debugging but don't expose sensitive data
9. **Consider offline mode** if your game supports it
10. **Follow Hedera best practices** for wallet integration

## Additional Resources

- [Unreal Engine HTTP API](https://docs.unrealengine.com/5.0/en-US/API/Runtime/HTTP/)
- [VaRest Plugin](https://github.com/ufna/VaRest)
- [Hedera Documentation](https://docs.hedera.com/)
- [HashPack Wallet](https://www.hashpack.app/)
- [Blade Wallet](https://bladewallet.io/)

---

Need help? Check the main README.md or open an issue on GitHub!
