# 📚 Documentation Index

Welcome to the Hedera Auth Server documentation! This guide helps you find the right documentation for your needs.

## 🎯 Start Here

**New to the project?**
→ Read [`GETTING_STARTED.md`](GETTING_STARTED.md) - Get running in 5 minutes!

**Need a quick overview?**
→ Read [`PROJECT_SUMMARY.md`](PROJECT_SUMMARY.md) - Understand what this project does

**Want a different quick start?**
→ Read [`QUICKSTART.md`](QUICKSTART.md) - Alternative 5-minute guide

## 📖 Complete Documentation

### For All Users

| Document | Description | When to Read |
|----------|-------------|--------------|
| [**GETTING_STARTED.md**](GETTING_STARTED.md) | Complete beginner guide with troubleshooting | First time setup |
| [**PROJECT_SUMMARY.md**](PROJECT_SUMMARY.md) | Overview of features and architecture | Understanding the project |
| [**QUICKSTART.md**](QUICKSTART.md) | Fast-track setup guide | Quick reference |
| [**README.md**](README.md) | Complete API documentation | API integration |

### For Unreal Engine Developers

| Document | Description | When to Read |
|----------|-------------|--------------|
| [**UNREAL_INTEGRATION.md**](UNREAL_INTEGRATION.md) | Complete Unreal Engine integration guide | Integrating with your game |
| [**UNREAL_BLUEPRINT_EXAMPLES.md**](UNREAL_BLUEPRINT_EXAMPLES.md) | Step-by-step Blueprint examples | Building login widgets |

### For Deployment

| Document | Description | When to Read |
|----------|-------------|--------------|
| [**DEPLOYMENT.md**](DEPLOYMENT.md) | Production deployment guide | Going live |
| [**Dockerfile**](Dockerfile) | Docker container configuration | Docker deployment |
| [**docker-compose.yml**](docker-compose.yml) | Docker Compose setup | Local Docker testing |

### For Testing

| File | Description | How to Use |
|------|-------------|------------|
| [**test-api.js**](test-api.js) | API test script | `node test-api.js` |
| [**example-wallet-page.html**](example-wallet-page.html) | Simple test UI | Open in browser |
| [**hashpack-integration-example.html**](hashpack-integration-example.html) | HashPack wallet example | Open in browser |

### Configuration

| File | Description | Purpose |
|------|-------------|---------|
| [**.env.example**](.env.example) | Environment variables template | Copy to `.env` |
| [**package.json**](package.json) | Node.js dependencies | Project configuration |

## 🎯 Quick Navigation by Goal

### Goal: "I want to get started quickly"
1. [`GETTING_STARTED.md`](GETTING_STARTED.md) - 5-minute setup
2. Open `example-wallet-page.html` - Test in browser
3. Done! ✅

### Goal: "I want to integrate with Unreal Engine"
1. [`GETTING_STARTED.md`](GETTING_STARTED.md) - Setup server
2. [`UNREAL_INTEGRATION.md`](UNREAL_INTEGRATION.md) - Integration concepts
3. [`UNREAL_BLUEPRINT_EXAMPLES.md`](UNREAL_BLUEPRINT_EXAMPLES.md) - Blueprint examples
4. Build your login widget! 🎮

### Goal: "I want to understand the API"
1. [`README.md`](README.md) - Complete API documentation
2. Run `node test-api.js` - Test all endpoints
3. Use `example-wallet-page.html` - Visual testing

### Goal: "I want to deploy to production"
1. [`DEPLOYMENT.md`](DEPLOYMENT.md) - Choose your platform
2. Follow platform-specific guide
3. Configure environment variables
4. Deploy! 🚀

### Goal: "I want to add wallet integration"
1. Open `hashpack-integration-example.html` - See example
2. [`UNREAL_INTEGRATION.md`](UNREAL_INTEGRATION.md) - Section on wallet methods
3. Implement in your game

### Goal: "I want to customize the server"
1. [`PROJECT_SUMMARY.md`](PROJECT_SUMMARY.md) - Understand architecture
2. Review `src/` folder structure
3. Add your custom endpoints
4. Test with `test-api.js`

### Goal: "I'm building for a hackathon"
1. [`GETTING_STARTED.md`](GETTING_STARTED.md) - 5-minute setup ⏱️
2. `example-wallet-page.html` - Quick testing 🧪
3. [`UNREAL_INTEGRATION.md`](UNREAL_INTEGRATION.md) - Game integration 🎮
4. [`DEPLOYMENT.md`](DEPLOYMENT.md) - Deploy in 10 minutes 🚀
5. Submit your project! 🏆

## 📁 Source Code Structure

```
src/
├── server.js              # Main Express server
├── routes/
│   ├── auth.js           # Authentication endpoints
│   └── user.js           # User profile endpoints
├── middleware/
│   └── auth.js           # JWT verification middleware
└── utils/
    └── hedera.js         # Hedera blockchain utilities
```

**Want to modify the server?** Start by reading:
1. `src/server.js` - Main entry point
2. `src/routes/auth.js` - Authentication logic
3. `src/utils/hedera.js` - Hedera integration

## 🔍 Find by Topic

### Authentication
- Challenge-response flow: [`README.md`](README.md) → Authentication Endpoints
- JWT tokens: [`README.md`](README.md) → API Endpoints
- Signature verification: `src/utils/hedera.js`

### Hedera Integration
- SDK usage: `src/utils/hedera.js`
- Network configuration: [`.env.example`](.env.example)
- Account validation: `src/utils/hedera.js`

### Unreal Engine
- HTTP requests: [`UNREAL_INTEGRATION.md`](UNREAL_INTEGRATION.md)
- Blueprints: [`UNREAL_BLUEPRINT_EXAMPLES.md`](UNREAL_BLUEPRINT_EXAMPLES.md)
- Game Instance: [`UNREAL_BLUEPRINT_EXAMPLES.md`](UNREAL_BLUEPRINT_EXAMPLES.md) → Game Instance Setup

### Security
- JWT secrets: [`GETTING_STARTED.md`](GETTING_STARTED.md) → Step 2
- CORS: [`.env.example`](.env.example)
- Production checklist: [`DEPLOYMENT.md`](DEPLOYMENT.md) → Post-Deployment Checklist

### Testing
- API tests: `node test-api.js`
- Browser testing: `example-wallet-page.html`
- Wallet testing: `hashpack-integration-example.html`

### Deployment
- Railway: [`DEPLOYMENT.md`](DEPLOYMENT.md) → Option 1
- Docker: [`Dockerfile`](Dockerfile) and [`docker-compose.yml`](docker-compose.yml)
- VPS: [`DEPLOYMENT.md`](DEPLOYMENT.md) → Option 5

## 💡 Tips for Navigation

1. **Just starting?** → Always begin with [`GETTING_STARTED.md`](GETTING_STARTED.md)
2. **Building something?** → Use the "Quick Navigation by Goal" section above
3. **Need specifics?** → Use "Find by Topic" section
4. **Stuck?** → Check troubleshooting in [`GETTING_STARTED.md`](GETTING_STARTED.md)

## 📞 Still Can't Find What You Need?

Try these resources:

### Internal Documentation
- **API Reference:** [`README.md`](README.md)
- **Code Comments:** Check `src/` files
- **Examples:** `example-wallet-page.html` and `hashpack-integration-example.html`

### External Resources
- **Hedera Docs:** https://docs.hedera.com/
- **HashPack:** https://www.hashpack.app/
- **Unreal HTTP:** https://docs.unrealengine.com/
- **Express.js:** https://expressjs.com/

## 🗂️ All Documents at a Glance

### Documentation Files (Read these)
- `DOCUMENTATION_INDEX.md` ← You are here
- `GETTING_STARTED.md` - Quick setup guide
- `PROJECT_SUMMARY.md` - Project overview
- `QUICKSTART.md` - Alternative quick start
- `README.md` - Complete API documentation
- `UNREAL_INTEGRATION.md` - Unreal Engine guide
- `UNREAL_BLUEPRINT_EXAMPLES.md` - Blueprint examples
- `DEPLOYMENT.md` - Deployment guide
- `LICENSE` - MIT License

### Configuration Files (Configure these)
- `.env.example` - Environment variables template
- `package.json` - Node.js configuration
- `docker-compose.yml` - Docker setup
- `Dockerfile` - Container configuration
- `.gitignore` - Git ignore rules
- `.dockerignore` - Docker ignore rules

### Code Files (Modify these)
- `src/server.js` - Main server
- `src/routes/auth.js` - Auth endpoints
- `src/routes/user.js` - User endpoints
- `src/middleware/auth.js` - Auth middleware
- `src/utils/hedera.js` - Hedera utilities

### Testing Files (Run these)
- `test-api.js` - API tests
- `example-wallet-page.html` - Test UI
- `hashpack-integration-example.html` - Wallet example

### Utility Files (Use these)
- `scripts/generate-secret.js` - Generate JWT secret

## 🎓 Learning Path

**Recommended order for learning:**

1. **Day 1: Setup & Understanding**
   - Read [`PROJECT_SUMMARY.md`](PROJECT_SUMMARY.md)
   - Follow [`GETTING_STARTED.md`](GETTING_STARTED.md)
   - Test with `example-wallet-page.html`

2. **Day 2: API Integration**
   - Read [`README.md`](README.md)
   - Run `node test-api.js`
   - Test all endpoints with Postman/curl

3. **Day 3: Unreal Integration**
   - Read [`UNREAL_INTEGRATION.md`](UNREAL_INTEGRATION.md)
   - Follow [`UNREAL_BLUEPRINT_EXAMPLES.md`](UNREAL_BLUEPRINT_EXAMPLES.md)
   - Build login widget

4. **Day 4: Wallet Integration**
   - Study `hashpack-integration-example.html`
   - Implement wallet connection
   - Test full authentication flow

5. **Day 5: Deployment**
   - Read [`DEPLOYMENT.md`](DEPLOYMENT.md)
   - Choose hosting platform
   - Deploy and test production

## ✅ Documentation Checklist

Use this to track your progress:

- [ ] Read [`GETTING_STARTED.md`](GETTING_STARTED.md)
- [ ] Server running locally
- [ ] Tested with `example-wallet-page.html`
- [ ] Read [`README.md`](README.md) API docs
- [ ] Understand authentication flow
- [ ] Read [`UNREAL_INTEGRATION.md`](UNREAL_INTEGRATION.md)
- [ ] Created login widget in Unreal
- [ ] Integrated wallet signing
- [ ] Tested end-to-end flow
- [ ] Read [`DEPLOYMENT.md`](DEPLOYMENT.md)
- [ ] Deployed to production
- [ ] Configured production environment

## 🎯 Your Next Action

Based on where you are:

**Haven't started yet?**
→ Open [`GETTING_STARTED.md`](GETTING_STARTED.md) right now!

**Server is running?**
→ Go to [`UNREAL_INTEGRATION.md`](UNREAL_INTEGRATION.md) or [`README.md`](README.md)

**Ready to integrate?**
→ Open [`UNREAL_BLUEPRINT_EXAMPLES.md`](UNREAL_BLUEPRINT_EXAMPLES.md)

**Ready to deploy?**
→ Open [`DEPLOYMENT.md`](DEPLOYMENT.md)

---

**Happy building!** 🚀 Start with [`GETTING_STARTED.md`](GETTING_STARTED.md) if this is your first time!
