# Getting Started - Hedera Auth Server

**Complete authentication server for Hedera wallet integration with Unreal Engine games**

Welcome! This guide will get you up and running in under 10 minutes.

---

## ⚡ SUPER QUICK: Deploy to Render Now!

**Want to skip local setup and deploy immediately?**

👉 **See [`RENDER_DEPLOY.md`](RENDER_DEPLOY.md) - Just link your GitHub repo to Render and you're live in 2 minutes!**

No configuration needed - everything is automatic! Perfect for hackathons. 🚀

---

## 🎯 What You'll Build

By following this guide, you'll have:
- ✅ A running authentication server
- ✅ Hedera wallet integration
- ✅ JWT-based session management
- ✅ Ready for Unreal Engine integration

## 📋 Prerequisites

- **Node.js 16+** installed ([download here](https://nodejs.org/))
- **A text editor** (VS Code recommended)
- **A Hedera account** ([create testnet account](https://portal.hedera.com/))
- **Basic terminal knowledge**

## 🚀 5-Minute Setup

### Step 1: Install Dependencies (2 minutes)

```bash
npm install
```

This installs all required packages including the Hedera SDK.

### Step 2: Configure Environment (1 minute)

```bash
# Copy example environment file
cp .env.example .env
```

Generate a secure JWT secret:
```bash
node scripts/generate-secret.js
```

Copy the generated secret and update your `.env` file:
```env
JWT_SECRET=<paste-your-generated-secret>
```

Your `.env` should look like:
```env
PORT=3000
NODE_ENV=development
JWT_SECRET=f2cae8f5a07ec45dc55ac41a3ef96abb7906ed1c3e4ab01fa1f33af41f009642
JWT_EXPIRES_IN=24h
HEDERA_NETWORK=testnet
CORS_ORIGINS=*
CHALLENGE_EXPIRATION=300
```

### Step 3: Start the Server (30 seconds)

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

### Step 4: Test It Works (1 minute)

Open a new terminal and run:

```bash
# Test health endpoint
curl http://localhost:3000/health
```

You should see:
```json
{"success":true,"status":"healthy","timestamp":"2024-..."}
```

Test authentication flow:
```bash
curl -X POST http://localhost:3000/auth/challenge \
  -H "Content-Type: application/json" \
  -d '{"accountId":"0.0.12345"}'
```

You should see a challenge message! 🎉

### Step 5: Try the Browser Interface (2 minutes)

1. Open `example-wallet-page.html` in your browser
2. Enter a Hedera account ID (e.g., `0.0.12345`)
3. Click "Get Challenge"
4. See the challenge message generated!

**Congratulations! Your server is running!** 🎊

## 📚 Next Steps

### For Hackathon Participants

1. ✅ Server is running ← You are here!
2. 🚀 **Deploy to Render (2 minutes!)** → See `RENDER_DEPLOY.md` - Just link your repo!
3. 📱 **Integrate with Unreal Engine** → See `UNREAL_INTEGRATION.md`
4. 🔐 **Add wallet signing** → See `hashpack-integration-example.html`

### For Developers

1. ✅ Server is running ← You are here!
2. 📖 **Read API Documentation** → See `README.md`
3. 🎨 **Explore Blueprint Examples** → See `UNREAL_BLUEPRINT_EXAMPLES.md`
4. 🧪 **Run API tests** → `node test-api.js`

## 🎮 Unreal Engine Integration Quick Guide

### In Your Widget Blueprint:

1. **Get Challenge:**
   ```
   HTTP POST to: http://localhost:3000/auth/challenge
   Body: {"accountId": "0.0.12345"}
   → Receive challenge message
   ```

2. **User Signs Challenge:**
   - Display challenge to player
   - Use HashPack/Blade wallet to sign
   - Get signature back

3. **Verify Signature:**
   ```
   HTTP POST to: http://localhost:3000/auth/verify
   Body: {
     "accountId": "0.0.12345",
     "signature": "hex_signature",
     "publicKey": "public_key"
   }
   → Receive JWT token
   ```

4. **Make Authenticated Requests:**
   ```
   HTTP GET to: http://localhost:3000/user/profile
   Header: Authorization: Bearer <your_token>
   → Get user data
   ```

**Detailed Unreal guide:** `UNREAL_INTEGRATION.md`

## 🔍 Troubleshooting

### Server won't start

**Error:** `Port 3000 already in use`
```bash
# Change port in .env
PORT=3001
```

**Error:** `Cannot find module`
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### Cannot connect from Unreal

**Check CORS settings in `.env`:**
```env
CORS_ORIGINS=*
```

**Verify server is accessible:**
```bash
curl http://localhost:3000/health
```

### Challenge expires too quickly

**Increase expiration in `.env`:**
```env
CHALLENGE_EXPIRATION=600  # 10 minutes
```

### JWT token errors

**Generate new secret:**
```bash
node scripts/generate-secret.js
```
Update `.env` with new secret.

## 📖 Documentation Structure

We have multiple guides for different needs:

| Document | Purpose | When to Use |
|----------|---------|-------------|
| **GETTING_STARTED.md** | Quick setup | You are here! Start here |
| **QUICKSTART.md** | Alternative quick guide | If you prefer different format |
| **README.md** | Complete API docs | When building integrations |
| **PROJECT_SUMMARY.md** | Project overview | Understanding the architecture |
| **UNREAL_INTEGRATION.md** | Unreal Engine guide | Integrating with your game |
| **UNREAL_BLUEPRINT_EXAMPLES.md** | Blueprint examples | Step-by-step Unreal setup |
| **DEPLOYMENT.md** | Production deployment | When ready to go live |

## 🎯 Common Use Cases

### 1. Hackathon Project (Quick & Simple)

```bash
# 1. Setup (done ✅)
npm install
cp .env.example .env
node scripts/generate-secret.js  # Update .env with secret

# 2. Start
npm start

# 3. Test in browser
open example-wallet-page.html

# 4. Integrate with Unreal
# See UNREAL_INTEGRATION.md

# 5. Deploy to Railway/Render
# See DEPLOYMENT.md - takes 10 minutes
```

### 2. Game Development (Production-Ready)

```bash
# 1. Local development
npm install
npm run dev  # Auto-reload on changes

# 2. Add custom features
# Edit src/routes/ to add game-specific endpoints

# 3. Test thoroughly
node test-api.js

# 4. Deploy with Docker
docker-compose up -d

# 5. Configure production
# Update .env with production values
# Set HEDERA_NETWORK=mainnet
```

### 3. Testing Only

```bash
# 1. Quick start
npm install && npm start

# 2. Open test page
open example-wallet-page.html

# 3. Try API calls
node test-api.js
```

## 🛠️ Development Commands

```bash
# Start server
npm start

# Start with auto-reload
npm run dev

# Run API tests
node test-api.js

# Generate JWT secret
node scripts/generate-secret.js

# Check dependencies
npm audit

# Update dependencies
npm update

# Run with Docker
docker-compose up

# Stop Docker
docker-compose down
```

## 🔐 Security Checklist

Before going to production:

- [ ] Generate strong JWT_SECRET
- [ ] Set HEDERA_NETWORK=mainnet (if using mainnet)
- [ ] Set specific CORS_ORIGINS (not `*`)
- [ ] Use HTTPS/SSL
- [ ] Set NODE_ENV=production
- [ ] Review API rate limiting
- [ ] Test with real Hedera accounts
- [ ] Secure environment variables
- [ ] Enable logging/monitoring

## 📞 Getting Help

### Quick Help
- Check `QUICKSTART.md` for 5-minute guide
- See `README.md` for API documentation
- Review `UNREAL_INTEGRATION.md` for Unreal setup

### Stuck?
1. Check the troubleshooting section above
2. Review server logs (console output)
3. Test with `curl` or Postman first
4. Verify `.env` configuration
5. Check Hedera network status

### Resources
- **Hedera Docs:** https://docs.hedera.com/
- **HashPack Wallet:** https://www.hashpack.app/
- **Unreal HTTP Docs:** https://docs.unrealengine.com/
- **Express.js:** https://expressjs.com/

## 🎉 Success Indicators

You know everything is working when:

✅ Server starts without errors  
✅ Health endpoint returns success  
✅ Challenge endpoint generates messages  
✅ Example HTML page can request challenges  
✅ Unreal Engine can make HTTP requests  
✅ JWT tokens are generated and validated  

## 🚀 Ready for Production?

When you're ready to deploy:

1. **Choose a platform:** Railway, Render, Heroku, etc.
2. **Follow deployment guide:** See `DEPLOYMENT.md`
3. **Update Unreal Engine:** Point to production URL
4. **Test thoroughly:** With real Hedera accounts
5. **Monitor:** Set up logging and alerts

## 💡 Pro Tips

1. **Development:** Use testnet Hedera network (free)
2. **Testing:** Use `example-wallet-page.html` to debug
3. **Debugging:** Check console output for detailed logs
4. **Security:** Never commit `.env` file to git
5. **Performance:** Use caching for repeated API calls
6. **Unreal:** Store auth token in Game Instance
7. **Production:** Always use HTTPS in production

## 📝 What's Next?

Choose your path:

### Path 1: Unreal Engine Developer
→ Go to `UNREAL_INTEGRATION.md`

### Path 2: API Developer
→ Go to `README.md`

### Path 3: DevOps/Deployment
→ Go to `DEPLOYMENT.md`

### Path 4: Blueprint Developer
→ Go to `UNREAL_BLUEPRINT_EXAMPLES.md`

---

## 🏆 You're All Set!

Your Hedera authentication server is running and ready to integrate with your Unreal Engine game!

**Need the complete picture?** See `PROJECT_SUMMARY.md`

**Questions or issues?** Check the documentation files or review the code in `src/`

**Happy coding!** 🎮 🚀

---

*Built for Hedera hackathons and Web3 game development*
