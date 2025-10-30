# 🚀 One-Click Render Deployment

This guide shows you how to deploy your Hedera Auth Server to Render with just a few clicks!

## ✨ Automatic Deployment (Recommended)

Your repository is configured for automatic Render deployment using `render.yaml`.

### Steps:

1. **Push to GitHub** (if you haven't already):
   ```bash
   git add .
   git commit -m "Add Render configuration"
   git push origin main
   ```

2. **Go to Render Dashboard**:
   - Visit https://render.com
   - Sign up or log in (you can use GitHub)

3. **Create New Web Service**:
   - Click "New +" → "Web Service"
   - Click "Connect account" if needed to link GitHub
   - Select your repository
   - Render will **automatically detect** the `render.yaml` file!

4. **Review Configuration**:
   - Render will show you the detected settings:
     - ✅ Name: hedera-auth-server
     - ✅ Runtime: Node
     - ✅ Build Command: npm install
     - ✅ Start Command: npm start
     - ✅ Environment Variables: Auto-configured
     - ✅ Health Check: /health endpoint
   
5. **Click "Create Web Service"**:
   - Render will automatically:
     - Clone your repo
     - Install dependencies
     - Generate a secure JWT_SECRET
     - Start your server
     - Provide you with a URL (e.g., `https://hedera-auth-server.onrender.com`)

6. **Done!** 🎉
   - Your server is live!
   - Auto-deploys on every git push
   - Free SSL certificate included
   - Health checks enabled

## 🔧 What's Configured Automatically

The `render.yaml` file pre-configures:

| Setting | Value | Note |
|---------|-------|------|
| **Runtime** | Node | Automatically detected |
| **Build** | `npm install` | Installs dependencies |
| **Start** | `npm start` | Runs `node src/server.js` |
| **Port** | 3000 | Exposed automatically |
| **Plan** | Free | Perfect for hackathons! |
| **Region** | Oregon | Can be changed |
| **Health Check** | `/health` | Auto-monitoring |
| **JWT_SECRET** | Auto-generated | Secure random value |
| **CORS** | `*` (all origins) | Allows all Unreal requests |
| **Hedera Network** | Testnet | For development |

## 🎮 Using Your Deployed Server in Unreal Engine

Once deployed, Render gives you a URL like:
```
https://hedera-auth-server.onrender.com
```

### In Your Unreal Engine Widget:

Replace `http://localhost:3000` with your Render URL:

**Challenge Request:**
```
URL: https://hedera-auth-server.onrender.com/auth/challenge
Method: POST
Body: {"accountId": "0.0.12345"}
```

**Verify Signature:**
```
URL: https://hedera-auth-server.onrender.com/auth/verify
Method: POST
Body: {
  "accountId": "0.0.12345",
  "signature": "hex_signature",
  "publicKey": "public_key"
}
```

**Get Profile:**
```
URL: https://hedera-auth-server.onrender.com/user/profile
Method: GET
Headers: Authorization: Bearer <token>
```

## 🔒 Production Configuration (Optional)

For production (mainnet), update environment variables in Render Dashboard:

1. Go to your service in Render
2. Click "Environment"
3. Update variables:
   ```
   HEDERA_NETWORK=mainnet
   CORS_ORIGINS=https://yourgame.com,https://www.yourgame.com
   NODE_ENV=production
   ```
4. Save changes (auto-redeploys)

## 🌟 Features You Get with Render

- ✅ **Automatic HTTPS/SSL** - Secure by default
- ✅ **Auto-deploy on git push** - Push to main branch = auto-deploy
- ✅ **Free tier available** - Perfect for hackathons
- ✅ **Health monitoring** - Automatic server health checks
- ✅ **Persistent logs** - View logs in dashboard
- ✅ **Zero downtime deploys** - No service interruption
- ✅ **DDoS protection** - Built-in security
- ✅ **Automatic JWT_SECRET** - Securely generated
- ✅ **Custom domains** - Add your own domain (optional)

## 🎯 Quick Test After Deployment

Once deployed, test your server:

```bash
# Replace with your Render URL
curl https://hedera-auth-server.onrender.com/health
```

You should see:
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2024-..."
}
```

Test authentication:
```bash
curl -X POST https://hedera-auth-server.onrender.com/auth/challenge \
  -H "Content-Type: application/json" \
  -d '{"accountId":"0.0.12345"}'
```

## 📊 Monitoring Your Server

### View Logs:
1. Go to your service in Render
2. Click "Logs" tab
3. See real-time server logs

### View Metrics:
1. Click "Metrics" tab
2. See CPU, memory, request stats

### View Events:
1. Click "Events" tab
2. See deployment history

## 🔄 Automatic Deployments

Every time you push to your main branch:
1. Render detects the change
2. Automatically pulls new code
3. Runs `npm install`
4. Restarts with `npm start`
5. Zero downtime deployment

**Disable auto-deploy:**
- Settings → "Auto-Deploy" → Toggle off

## 💰 Free Tier Limits

Render's free tier includes:
- ✅ 750 hours/month (enough for 24/7)
- ✅ Automatic SSL
- ✅ Auto-deploys
- ⚠️ Spins down after 15 min of inactivity
- ⚠️ Takes ~30 sec to spin back up

**Note:** For hackathons, this is perfect! For production with constant traffic, consider upgrading to paid plan ($7/month).

## 🚨 Keep Server Awake (Optional)

If you don't want the server to sleep on free tier:

### Option 1: Use a ping service
- **UptimeRobot** (free): https://uptimerobot.com
- Ping your `/health` endpoint every 5 minutes
- Keeps server awake

### Option 2: Upgrade to Starter plan
- $7/month
- No sleeping
- Better for production

## 🎓 Troubleshooting

### Build fails
- Check logs in Render dashboard
- Verify `package.json` is correct
- Check Node version compatibility

### Server won't start
- Check environment variables are set
- View logs for error messages
- Verify `npm start` works locally

### Can't connect from Unreal
- Check CORS_ORIGINS includes `*` or your origin
- Verify you're using HTTPS URL
- Test with curl first

### JWT_SECRET not set
- Render auto-generates this
- Check Environment tab to verify
- Regenerate if needed: Settings → Regenerate

## 📝 Environment Variables Reference

All these are auto-configured via `render.yaml`:

| Variable | Default | Description |
|----------|---------|-------------|
| NODE_ENV | production | Production mode |
| PORT | 3000 | Server port (auto-detected) |
| JWT_SECRET | [auto] | Securely generated |
| JWT_EXPIRES_IN | 24h | Token expiry |
| HEDERA_NETWORK | testnet | Hedera network |
| CORS_ORIGINS | * | Allowed origins |
| CHALLENGE_EXPIRATION | 300 | Challenge timeout (5 min) |

## 🎮 Hackathon Quick Start

**Total time: ~2 minutes!**

```bash
# 1. Push to GitHub (30 seconds)
git push origin main

# 2. Create Render service (1 minute)
- Go to render.com
- New Web Service
- Select repo
- Click Create

# 3. Get URL (30 seconds)
- Copy your Render URL
- Use in Unreal Engine
- Done!
```

## 📞 Need Help?

### Render Resources:
- **Docs**: https://render.com/docs
- **Community**: https://community.render.com
- **Status**: https://status.render.com

### Your Server Docs:
- **API Docs**: See `README.md`
- **Unreal Integration**: See `UNREAL_INTEGRATION.md`
- **Full Deployment**: See `DEPLOYMENT.md`

## 🎉 Success!

Once you see "Live" in Render dashboard:
- ✅ Server is running
- ✅ HTTPS enabled
- ✅ Auto-deploys configured
- ✅ Health checks active
- ✅ Ready for Unreal Engine!

**Your Render URL format:**
```
https://hedera-auth-server-XXXX.onrender.com
```

Use this URL in your Unreal Engine game and you're ready to submit to the hackathon! 🏆

---

**Pro Tip:** Bookmark your Render dashboard for quick access to logs and settings!
