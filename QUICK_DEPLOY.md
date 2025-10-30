# ⚡ Quick Deploy Guide

**Get your Hedera Auth Server live in 2 minutes!**

## 🎯 Render One-Click Deployment

Your project is **pre-configured** for Render. Just follow these steps:

### Step 1: Push to GitHub (if not done)

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

### Step 2: Deploy to Render

1. Go to **https://render.com**
2. Click **"New +"** → **"Web Service"**
3. Connect your **GitHub** account
4. Select your **repository**
5. Render **auto-detects** the config!
6. Click **"Create Web Service"**

**That's it!** ✨

### Step 3: Get Your URL

Render gives you a URL like:
```
https://hedera-auth-server-xxxx.onrender.com
```

### Step 4: Use in Unreal Engine

In your Unreal Widget Blueprint, replace:
```
http://localhost:3000
```

With your Render URL:
```
https://hedera-auth-server-xxxx.onrender.com
```

## ✅ What's Auto-Configured

Thanks to `render.yaml`, everything is automatic:

- ✅ **Node.js runtime** detected
- ✅ **Dependencies** installed (`npm install`)
- ✅ **Server** started (`npm start`)
- ✅ **JWT_SECRET** auto-generated (secure!)
- ✅ **CORS** enabled for all origins
- ✅ **Health checks** at `/health`
- ✅ **HTTPS/SSL** certificate
- ✅ **Auto-deploys** on git push

**Zero configuration required!**

## 🚀 Features You Get

| Feature | Status |
|---------|--------|
| HTTPS | ✅ Automatic |
| SSL Certificate | ✅ Free |
| Auto-deploy | ✅ On git push |
| Health monitoring | ✅ Enabled |
| Logs | ✅ Real-time |
| Free tier | ✅ 750 hrs/month |
| Custom domain | ✅ Optional |

## 🧪 Test Your Deployment

```bash
# Replace with your Render URL
curl https://hedera-auth-server-xxxx.onrender.com/health
```

Expected response:
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2024-..."
}
```

## 🎮 Unreal Engine Example

**Challenge Request:**
```
POST https://hedera-auth-server-xxxx.onrender.com/auth/challenge
Content-Type: application/json
Body: {"accountId": "0.0.12345"}
```

**Verify Signature:**
```
POST https://hedera-auth-server-xxxx.onrender.com/auth/verify
Content-Type: application/json
Body: {
  "accountId": "0.0.12345",
  "signature": "your_hex_signature",
  "publicKey": "your_public_key"
}
```

**Get Profile:**
```
GET https://hedera-auth-server-xxxx.onrender.com/user/profile
Authorization: Bearer your_jwt_token
```

## 📊 Monitoring

### View Logs:
Render Dashboard → Your Service → **Logs** tab

### View Metrics:
Render Dashboard → Your Service → **Metrics** tab

### Auto-deploys:
Every git push to main = automatic deployment!

## 🔒 Production Settings

After deployment, optionally update in Render Dashboard → **Environment**:

```env
HEDERA_NETWORK=mainnet
CORS_ORIGINS=https://yourgame.com
NODE_ENV=production
```

Click **"Save Changes"** → Auto-redeploys with new config!

## 💡 Pro Tips

1. **Bookmark** your Render dashboard
2. **Monitor** the health check in Metrics
3. **Test** locally before pushing
4. **Keep** server awake with UptimeRobot (free)
5. **Upgrade** to paid ($7/mo) for no sleep

## 🆘 Troubleshooting

**Build failed?**
- Check Render logs
- Verify package.json is correct
- See full guide: `RENDER_DEPLOY.md`

**Can't connect?**
- Use HTTPS (not HTTP)
- Check CORS_ORIGINS
- Verify URL format

**Server sleeping?**
- Free tier sleeps after 15 min
- Use UptimeRobot to ping /health
- Or upgrade to $7/mo plan

## 📚 Full Documentation

- **Complete Render Guide:** `RENDER_DEPLOY.md`
- **API Documentation:** `README.md`
- **Unreal Integration:** `UNREAL_INTEGRATION.md`
- **All Platforms:** `DEPLOYMENT.md`

## 🎉 Success Checklist

After deployment, verify:

- [ ] Service shows "Live" in Render
- [ ] Health endpoint returns 200
- [ ] Can request challenge
- [ ] HTTPS URL works
- [ ] Logs show no errors
- [ ] Unreal can connect

## ⏱️ Timeline

- **Push to GitHub:** 1 minute
- **Deploy on Render:** 1 minute
- **Test deployment:** 30 seconds
- **Update Unreal:** 30 seconds

**Total: ~3 minutes!** ⚡

---

## 🎯 Quick Commands

```bash
# Test health
curl https://your-url.onrender.com/health

# Test challenge
curl -X POST https://your-url.onrender.com/auth/challenge \
  -H "Content-Type: application/json" \
  -d '{"accountId":"0.0.12345"}'

# View logs (after installing Render CLI)
render logs
```

---

**You're ready to go!** 🚀

Update your Unreal Engine game with the Render URL and start authenticating players with Hedera!

For detailed integration examples, see **`UNREAL_INTEGRATION.md`**
