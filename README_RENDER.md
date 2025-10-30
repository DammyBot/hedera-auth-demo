# 🚀 Deploy to Render - One Click!

This repository is **pre-configured** for automatic Render deployment!

## ⚡ Quick Deploy (2 minutes)

1. **Fork or push this repo to GitHub**
2. **Go to [Render](https://render.com)**
3. **Click "New +" → "Web Service"**
4. **Select this repository**
5. **Click "Create Web Service"**

✨ **Done!** Everything is auto-configured via `render.yaml`

## 🎯 What You Get

Your deployed server will have:

- ✅ **Automatic HTTPS/SSL**
- ✅ **Auto-generated JWT secret** (secure)
- ✅ **Health monitoring** at `/health`
- ✅ **Auto-deploy** on every git push
- ✅ **Free tier** (750 hours/month)
- ✅ **Ready for Unreal Engine**

## 🌐 Your Server URL

After deployment, you'll get a URL like:
```
https://hedera-auth-server.onrender.com
```

Use this in your Unreal Engine game!

## 📚 Documentation

| Guide | Purpose |
|-------|---------|
| **[RENDER_DEPLOY.md](RENDER_DEPLOY.md)** | Complete Render deployment guide |
| **[QUICK_DEPLOY.md](QUICK_DEPLOY.md)** | Ultra-fast deployment reference |
| **[GETTING_STARTED.md](GETTING_STARTED.md)** | Local development setup |
| **[UNREAL_INTEGRATION.md](UNREAL_INTEGRATION.md)** | Integrate with Unreal Engine |

## 🎮 Using in Unreal Engine

**Challenge Request:**
```
POST https://your-app.onrender.com/auth/challenge
Body: {"accountId": "0.0.12345"}
```

**Verify Signature:**
```
POST https://your-app.onrender.com/auth/verify
Body: {
  "accountId": "0.0.12345",
  "signature": "hex_signature",
  "publicKey": "public_key"
}
```

**Get Profile:**
```
GET https://your-app.onrender.com/user/profile
Header: Authorization: Bearer <token>
```

See **[UNREAL_INTEGRATION.md](UNREAL_INTEGRATION.md)** for complete Blueprint examples!

## 🔧 Configuration

All environment variables are **auto-configured**:

| Variable | Default | Description |
|----------|---------|-------------|
| NODE_ENV | production | Production mode |
| JWT_SECRET | [auto-generated] | Secure token secret |
| HEDERA_NETWORK | testnet | Hedera network |
| CORS_ORIGINS | * | All origins allowed |
| PORT | 3000 | Server port |

### Change Settings

Update in Render Dashboard → Environment → Add/Edit variables → Save (auto-redeploys)

## 🧪 Test Your Deployment

```bash
curl https://your-app.onrender.com/health
```

Expected:
```json
{"success":true,"status":"healthy","timestamp":"2024-..."}
```

## 💡 Pro Tips

1. **Free tier sleeps** after 15 min inactivity
   - Use [UptimeRobot](https://uptimerobot.com) to ping `/health` every 5 min
   - Or upgrade to $7/month (no sleeping)

2. **Monitor your app** in Render Dashboard
   - View logs in real-time
   - Check metrics and CPU usage
   - See deployment history

3. **Auto-deploys** on every git push to main
   - Push changes → Render automatically deploys
   - Zero configuration needed!

## 🏗️ Project Structure

```
hedera-auth-server/
├── render.yaml           # 🎯 Render configuration (auto-setup)
├── src/
│   ├── server.js        # Main Express server
│   ├── routes/          # API endpoints
│   ├── middleware/      # JWT authentication
│   └── utils/           # Hedera integration
├── RENDER_DEPLOY.md     # Full deployment guide
├── QUICK_DEPLOY.md      # Quick reference
└── UNREAL_INTEGRATION.md # Unreal Engine guide
```

## 🎯 Next Steps

1. ✅ Deploy to Render (you just did this!)
2. 📋 Copy your Render URL
3. 🎮 Follow [UNREAL_INTEGRATION.md](UNREAL_INTEGRATION.md)
4. 🎨 Build your login widget
5. 🏆 Submit to hackathon!

## 🆘 Need Help?

- **Full Guide:** See [RENDER_DEPLOY.md](RENDER_DEPLOY.md)
- **API Docs:** See [README.md](README.md)
- **Unreal Help:** See [UNREAL_INTEGRATION.md](UNREAL_INTEGRATION.md)
- **All Docs:** See [DOCUMENTATION_INDEX.md](DOCUMENTATION_INDEX.md)

---

**Built for Hedera Hackathons** 🎮 | **Deploy in 2 minutes** ⚡ | **Zero configuration** ✨
