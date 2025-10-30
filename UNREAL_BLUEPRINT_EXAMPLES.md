# Unreal Engine Blueprint Examples

Complete blueprint setups for integrating Hedera authentication into your Unreal Engine game.

## Table of Contents
1. [Basic Setup](#basic-setup)
2. [Login Widget](#login-widget)
3. [Game Instance Setup](#game-instance-setup)
4. [HTTP Request Functions](#http-request-functions)
5. [Complete Authentication Flow](#complete-authentication-flow)
6. [Advanced Features](#advanced-features)

## Basic Setup

### Prerequisites
- Unreal Engine 5.x (or 4.26+)
- Your Hedera Auth Server running and accessible

### Recommended Plugins
- **VaRest** - Makes HTTP requests easier in blueprints (optional but recommended)
  - Search for "VaRest" in Epic Marketplace
  - Or: https://github.com/ufna/VaRest

## Game Instance Setup

### Create Custom Game Instance

1. **Create Blueprint:**
   - Content Browser → Right-click → Blueprint Class
   - Parent Class: Game Instance
   - Name: `BP_GameInstance`

2. **Add Variables:**
   ```
   Variable Name: AuthToken
   Type: String
   Default: ""
   
   Variable Name: UserAccountId
   Type: String
   Default: ""
   
   Variable Name: IsAuthenticated
   Type: Boolean
   Default: false
   
   Variable Name: ServerURL
   Type: String
   Default: "http://localhost:3000"  (change for production)
   ```

3. **Set in Project Settings:**
   - Edit → Project Settings → Maps & Modes
   - Game Instance Class: BP_GameInstance

## HTTP Request Functions

### Create Blueprint Function Library

1. **Create:**
   - Blueprint Class → Blueprint Function Library
   - Name: `BPL_HederaAuth`

### Function 1: Make HTTP Request

**Function Name:** `MakeHTTPRequest`

**Inputs:**
- URL (String)
- Method (String) - "GET" or "POST"
- Content (String)
- IncludeAuth (Boolean)

**Outputs:**
- Success (Boolean)
- Response (String)

**Blueprint Logic:**
```
1. Create HTTP Request Object
2. Set URL
3. Set Verb (Method)
4. Set Header "Content-Type" = "application/json"
5. If IncludeAuth:
   - Get Game Instance
   - Cast to BP_GameInstance
   - Get AuthToken
   - Set Header "Authorization" = "Bearer " + AuthToken
6. If Content is not empty:
   - Set Content String
7. Process Request
8. Bind to OnProcessRequestComplete
9. Wait for response
10. Return Success and Response String
```

### Function 2: Request Challenge

**Function Name:** `RequestChallenge`

**Inputs:**
- AccountId (String)

**Outputs:**
- Success (Boolean)
- Challenge (String)
- ErrorMessage (String)

**Blueprint Implementation:**

```
Event Graph:

1. Get Game Instance → Cast to BP_GameInstance → Get ServerURL
2. Append String: ServerURL + "/auth/challenge"
3. Construct Json Object:
   - Add String Field "accountId" = AccountId
4. Call MakeHTTPRequest:
   - URL: Constructed URL
   - Method: "POST"
   - Content: Json Object as String
   - IncludeAuth: false
5. On Complete:
   - Parse JSON Response
   - If success = true:
     - Get "data.challenge" from JSON
     - Return Success=true, Challenge=value
   - Else:
     - Get "error" from JSON
     - Return Success=false, ErrorMessage=value
```

### Function 3: Verify Signature

**Function Name:** `VerifySignature`

**Inputs:**
- AccountId (String)
- Signature (String)
- PublicKey (String)

**Outputs:**
- Success (Boolean)
- Token (String)
- ErrorMessage (String)

**Blueprint Implementation:**

```
1. Get ServerURL from Game Instance
2. Construct URL: ServerURL + "/auth/verify"
3. Construct JSON:
   - accountId: AccountId
   - signature: Signature
   - publicKey: PublicKey
4. Make HTTP Request (POST)
5. On Response:
   - Parse JSON
   - If success:
     - Get token from data
     - Save to Game Instance:
       - Set AuthToken = token
       - Set UserAccountId = AccountId
       - Set IsAuthenticated = true
     - Return Success=true, Token=token
   - Else:
     - Return Success=false, ErrorMessage=error
```

### Function 4: Get User Profile

**Function Name:** `GetUserProfile`

**Outputs:**
- Success (Boolean)
- AccountId (String)
- Balance (String)
- ErrorMessage (String)

**Blueprint Implementation:**

```
1. Check if authenticated (from Game Instance)
2. If not authenticated → Return error
3. Get ServerURL
4. Construct URL: ServerURL + "/user/profile"
5. Make HTTP Request (GET) with IncludeAuth=true
6. On Response:
   - Parse JSON
   - Extract accountId, balance
   - Return data
```

## Login Widget

### Create Login Widget Blueprint

**Widget Name:** `WBP_HederaLogin`

### Visual Design

**Hierarchy:**
```
Canvas Panel
├─ Overlay (for centering)
│  └─ Vertical Box
│     ├─ Text Block "Login with Hedera"
│     ├─ Editable Text Box (AccountIdInput)
│     ├─ Button (ConnectButton)
│     │  └─ Text "Connect Wallet"
│     ├─ Progress Bar (LoadingBar)
│     ├─ Text Block (StatusText)
│     └─ Button (CancelButton)
│        └─ Text "Cancel"
```

### Widget Variables

```
Variable: CurrentChallenge
Type: String

Variable: IsProcessing
Type: Boolean
Default: false
```

### Widget Graph - Event Construct

```
1. Hide LoadingBar
2. Set StatusText = ""
3. Focus on AccountIdInput
4. Set IsProcessing = false
```

### Widget Graph - Connect Button Clicked

```
1. Get text from AccountIdInput → AccountId
2. If AccountId is empty:
   - Set StatusText = "Please enter your account ID"
   - Return

3. Validate format (should match 0.0.XXXXX):
   - Use Regex or simple check
   - If invalid:
     - Set StatusText = "Invalid format. Use: 0.0.12345"
     - Return

4. Set IsProcessing = true
5. Show LoadingBar (Indeterminate)
6. Set StatusText = "Requesting challenge..."
7. Disable ConnectButton

8. Call RequestChallenge(AccountId)

9. On Complete:
   - If Success:
     - Set CurrentChallenge = Challenge
     - Set StatusText = "Challenge received! Waiting for signature..."
     - Call OpenWalletSigningFlow()
   - Else:
     - Set StatusText = "Error: " + ErrorMessage
     - Hide LoadingBar
     - Enable ConnectButton
     - Set IsProcessing = false
```

### Widget Graph - OpenWalletSigningFlow

This is where you integrate wallet signing. Options:

#### Option A: Web Browser Widget

```
1. Create Web Browser Widget
2. Set URL to your wallet integration page
3. Pass challenge as URL parameter
4. Bind JavaScript interface to receive signature
5. When signature received → Call VerifySignatureFlow()
```

#### Option B: External Browser

```
1. Construct URL with challenge
2. Launch URL (opens system browser)
3. Wait for callback/polling
4. When complete → Call VerifySignatureFlow()
```

#### Option C: Manual Input (for testing)

```
1. Show input fields for:
   - Signature
   - Public Key
2. Wait for user to paste values
3. On submit → Call VerifySignatureFlow()
```

### Widget Graph - VerifySignatureFlow

```
Input Parameters:
- Signature (String)
- PublicKey (String)

1. Set StatusText = "Verifying signature..."
2. Get AccountId from AccountIdInput
3. Call VerifySignature(AccountId, Signature, PublicKey)
4. On Complete:
   - If Success:
     - Set StatusText = "Login successful!"
     - Wait 1 second
     - Call OnLoginSuccess event
     - Remove widget from parent
   - Else:
     - Set StatusText = "Verification failed: " + ErrorMessage
     - Hide LoadingBar
     - Enable ConnectButton
     - Set IsProcessing = false
```

### Widget Event Dispatcher

Create Event Dispatcher: `OnLoginSuccess`

Bind this in your level blueprint to proceed after login.

## Complete Authentication Flow

### Level Blueprint Example

```
Event BeginPlay:

1. Check Game Instance → IsAuthenticated
2. If not authenticated:
   - Create Widget: WBP_HederaLogin
   - Add to Viewport
   - Set Input Mode: UI Only
   - Bind to OnLoginSuccess event
3. If authenticated:
   - Proceed to main menu/game

OnLoginSuccess Event:
1. Set Input Mode: Game Only
2. Load main menu or game level
3. Optional: Show welcome message with UserAccountId
```

### Main Menu Widget

**After login, create main menu:**

```
Event Construct:
1. Get Game Instance
2. Get UserAccountId
3. Display: "Welcome, " + UserAccountId
4. Optional: Call GetUserProfile to show balance
```

## Advanced Features

### Auto-Login with Saved Token

**Game Instance - Event Init:**

```
1. Load saved token from SaveGame
2. If token exists:
   - Set AuthToken
   - Call ValidateToken API
   - If valid:
     - Set IsAuthenticated = true
   - Else:
     - Clear saved token
     - Set IsAuthenticated = false
```

### Token Refresh

**Game Instance - Custom Function:**

```
Function: RefreshAuthToken

1. If not authenticated → Return
2. Make HTTP POST to /auth/refresh
3. Include current token in Authorization header
4. On Success:
   - Update AuthToken with new token
   - Save to disk
5. On Failure:
   - Clear token
   - Set IsAuthenticated = false
   - Show login widget
```

**Set up periodic refresh:**

```
Event Init:
1. Set Timer by Event
2. Time: 23 hours (for 24h token)
3. Looping: true
4. Function: RefreshAuthToken
```

### Logout Function

**Create in Game Instance:**

```
Function: Logout

1. Set AuthToken = ""
2. Set UserAccountId = ""
3. Set IsAuthenticated = false
4. Clear saved token from disk
5. Open login widget
```

### Error Handling

**Create function in BPL_HederaAuth:**

```
Function: HandleAPIError

Input: Response String

Logic:
1. Parse JSON
2. If has "error" field:
   - Return error message
3. If status code specific errors:
   - 401: "Authentication expired, please login again"
   - 500: "Server error, please try again"
   - No connection: "Cannot connect to server"
4. Return generic error
```

### Network Status Check

**Before any API call:**

```
1. Check internet connection
2. If no connection:
   - Show "No internet connection" message
   - Don't attempt API call
3. Optional: Implement retry logic
```

## Blueprint Best Practices

1. **Use Blueprint Function Library** for reusable HTTP functions
2. **Store auth in Game Instance** so it persists across levels
3. **Always check IsAuthenticated** before making authenticated calls
4. **Handle all error cases** gracefully
5. **Show loading indicators** during async operations
6. **Validate user input** before sending to server
7. **Use Event Dispatchers** for async callbacks
8. **Save tokens to disk** for persistent login
9. **Implement token refresh** to avoid re-login
10. **Clear sensitive data** on logout

## Testing Checklist

- [ ] Login with valid account ID works
- [ ] Invalid account ID shows error
- [ ] Empty fields show validation error
- [ ] Challenge expires after 5 minutes
- [ ] Token persists across level changes
- [ ] Authenticated requests include token
- [ ] Expired token triggers re-login
- [ ] Logout clears all data
- [ ] Network errors handled gracefully
- [ ] UI shows loading states

## Performance Tips

1. **Cache API responses** when appropriate
2. **Don't make API calls every frame** - use timers
3. **Pool HTTP request objects** if making many calls
4. **Compress large requests** if needed
5. **Use async blueprint nodes** to avoid blocking

## Debugging Tips

1. **Print String nodes** to debug flow
2. **Log HTTP responses** to see exact data
3. **Check Output Log** for errors
4. **Use breakpoints** in blueprint graphs
5. **Test with Postman** first before blueprint
6. **Verify server is running** and accessible
7. **Check CORS settings** if requests fail
8. **Validate JSON format** before parsing

## Example Save Game System

**Create SaveGame blueprint:**

```
Class: SaveGame_HederaAuth

Variables:
- SavedAuthToken (String)
- SavedAccountId (String)
- SaveTime (DateTime)

Functions:

SaveAuthData(Token, AccountId):
1. Set SavedAuthToken = Token
2. Set SavedAccountId = AccountId
3. Set SaveTime = Now
4. Save Game to Slot "HederaAuth"

LoadAuthData():
1. Load Game from Slot "HederaAuth"
2. If exists and not expired:
   - Return SavedAuthToken, SavedAccountId
3. Else:
   - Return empty values
```

## Additional Resources

- **VaRest Documentation**: https://github.com/ufna/VaRest
- **Unreal HTTP Module**: https://docs.unrealengine.com/
- **JSON in Blueprints**: Use VaRest or native JSON parsing
- **Web Browser Widget**: For wallet integration

---

## Need Help?

1. Check server is running: `curl http://localhost:3000/health`
2. Verify CORS is configured: Check server .env file
3. Test API with Postman before Unreal integration
4. Enable verbose logging in blueprints
5. Check Unreal Output Log for errors

**Pro Tip:** Start with the manual input option for testing, then add proper wallet integration once the flow works!

---

Happy developing! 🎮 🚀
