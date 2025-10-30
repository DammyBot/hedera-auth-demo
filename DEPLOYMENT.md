# Deployment Guide

This guide covers various deployment options for your Hedera authentication server.

## Prerequisites

Before deploying, ensure you have:
- [ ] Tested the server locally
- [ ] Configured environment variables
- [ ] Generated a strong JWT_SECRET
- [ ] Decided on Hedera network (testnet/mainnet)
- [ ] Domain name (optional but recommended)
- [ ] SSL certificate (for HTTPS)

## Quick Start - Local Testing

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env with your settings
nano .env

# Start server
npm start
```

## Deployment Options

### Option 1: Railway (Easiest - Recommended)

Railway offers free tier and automatic deployments.

1. **Create Railway Account:**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Deploy:**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login
   railway login
   
   # Initialize project
   railway init
   
   # Add environment variables
   railway variables set JWT_SECRET=your-secret-key
   railway variables set HEDERA_NETWORK=testnet
   railway variables set NODE_ENV=production
   
   # Deploy
   railway up
   ```

3. **Get your URL:**
   - Railway will provide a URL like: `your-app.railway.app`
   - Configure custom domain in Railway dashboard (optional)

4. **Automatic Deployments:**
   - Connect your GitHub repo for automatic deployments on push

### Option 2: Render

Free tier available with automatic HTTPS.

1. **Create Render Account:**
   - Go to https://render.com
   - Sign up with GitHub

2. **Deploy:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name:** hedera-auth-server
     - **Environment:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
   
3. **Environment Variables:**
   Add in Render dashboard:
   ```
   JWT_SECRET=your-secret-key
   HEDERA_NETWORK=testnet
   NODE_ENV=production
   CORS_ORIGINS=https://yourgame.com
   ```

4. **Deploy:**
   - Click "Create Web Service"
   - Render will build and deploy automatically

### Option 3: Heroku

Popular platform with easy deployment.

1. **Install Heroku CLI:**
   ```bash
   npm install -g heroku
   ```

2. **Login and Create App:**
   ```bash
   heroku login
   heroku create your-app-name
   ```

3. **Set Environment Variables:**
   ```bash
   heroku config:set JWT_SECRET=your-secret-key
   heroku config:set HEDERA_NETWORK=testnet
   heroku config:set NODE_ENV=production
   ```

4. **Deploy:**
   ```bash
   git push heroku main
   ```

5. **View Logs:**
   ```bash
   heroku logs --tail
   ```

### Option 4: DigitalOcean App Platform

1. **Create DigitalOcean Account:**
   - Go to https://digitalocean.com
   - Sign up and verify account

2. **Deploy:**
   - Go to App Platform
   - Click "Create App"
   - Connect GitHub repository
   - Configure:
     - **Name:** hedera-auth-server
     - **Build Command:** `npm install`
     - **Run Command:** `npm start`
     - **HTTP Port:** 3000

3. **Environment Variables:**
   Add in DigitalOcean dashboard

4. **Deploy:**
   - Click "Create Resources"

### Option 5: AWS (EC2)

More control but requires server management.

1. **Launch EC2 Instance:**
   - Ubuntu 22.04 LTS
   - t2.micro (free tier eligible)
   - Configure security group (allow ports 22, 80, 443, 3000)

2. **Connect to Instance:**
   ```bash
   ssh -i your-key.pem ubuntu@your-instance-ip
   ```

3. **Install Node.js:**
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   sudo apt-get install -y git
   ```

4. **Clone and Setup:**
   ```bash
   git clone your-repo-url
   cd hedera-auth-server
   npm install
   
   # Create .env file
   nano .env
   # Add your environment variables
   ```

5. **Install PM2 (Process Manager):**
   ```bash
   sudo npm install -g pm2
   pm2 start src/server.js --name hedera-auth
   pm2 save
   pm2 startup
   ```

6. **Setup Nginx (Reverse Proxy):**
   ```bash
   sudo apt-get install -y nginx
   
   # Create nginx config
   sudo nano /etc/nginx/sites-available/hedera-auth
   ```

   Add configuration:
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

   Enable site:
   ```bash
   sudo ln -s /etc/nginx/sites-available/hedera-auth /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl restart nginx
   ```

7. **Setup SSL with Let's Encrypt:**
   ```bash
   sudo apt-get install -y certbot python3-certbot-nginx
   sudo certbot --nginx -d your-domain.com
   ```

### Option 6: VPS (Linode, Vultr, etc.)

Similar to AWS EC2 option above. Follow the same steps for:
- Linode
- Vultr
- Hetzner
- Any other VPS provider

### Option 7: Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

Create `docker-compose.yml`:

```yaml
version: '3.8'

services:
  hedera-auth:
    build: .
    ports:
      - "3000:3000"
    environment:
      - JWT_SECRET=${JWT_SECRET}
      - HEDERA_NETWORK=${HEDERA_NETWORK}
      - NODE_ENV=production
    restart: unless-stopped
```

Deploy:
```bash
docker-compose up -d
```

## Post-Deployment Checklist

### Security
- [ ] Enable HTTPS (SSL/TLS)
- [ ] Set strong JWT_SECRET
- [ ] Configure proper CORS_ORIGINS
- [ ] Enable rate limiting
- [ ] Set up firewall rules
- [ ] Regular security updates

### Monitoring
- [ ] Set up logging
- [ ] Configure error tracking (Sentry, etc.)
- [ ] Monitor uptime
- [ ] Set up alerts
- [ ] Track API usage

### Performance
- [ ] Enable compression
- [ ] Configure caching
- [ ] Set up CDN (optional)
- [ ] Monitor response times
- [ ] Scale as needed

### Backup
- [ ] Database backups (if using database)
- [ ] Configuration backups
- [ ] Regular code backups

## Environment Variables for Production

```env
# Server
PORT=3000
NODE_ENV=production

# Security
JWT_SECRET=<generate-strong-random-secret>
JWT_EXPIRES_IN=24h

# Hedera
HEDERA_NETWORK=mainnet  # or testnet for testing

# CORS - Set specific origins
CORS_ORIGINS=https://yourgame.com,https://www.yourgame.com

# Challenge
CHALLENGE_EXPIRATION=300

# Optional: Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
```

## Generating a Strong JWT Secret

```bash
# Option 1: Using openssl
openssl rand -base64 64

# Option 2: Using Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('base64'))"

# Option 3: Using online generator
# Visit: https://www.grc.com/passwords.htm
```

## Custom Domain Setup

### DNS Configuration

Add these DNS records:

```
Type    Name    Value                   TTL
A       @       your-server-ip          300
A       www     your-server-ip          300
```

Or for platforms like Railway/Render:

```
Type     Name    Value                       TTL
CNAME    @       your-app.railway.app        300
CNAME    www     your-app.railway.app        300
```

### SSL Certificate

Most platforms (Railway, Render, Heroku) provide automatic SSL.

For manual setup:
```bash
# Let's Encrypt (free)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## Monitoring and Logs

### View Logs

**Railway:**
```bash
railway logs
```

**Render:**
- View in dashboard under "Logs" tab

**Heroku:**
```bash
heroku logs --tail
```

**PM2 (VPS):**
```bash
pm2 logs hedera-auth
pm2 monit
```

### Set Up Monitoring

**UptimeRobot (Free):**
1. Go to https://uptimerobot.com
2. Add new monitor
3. Set URL: `https://your-domain.com/health`
4. Configure alerts

**Sentry (Error Tracking):**
```bash
npm install @sentry/node
```

Add to `src/server.js`:
```javascript
const Sentry = require('@sentry/node');

Sentry.init({
  dsn: 'your-sentry-dsn',
  environment: process.env.NODE_ENV
});
```

## Scaling

### Horizontal Scaling

Add load balancer and multiple instances:

```
         Load Balancer
              |
    +---------+---------+
    |                   |
  Server 1          Server 2
```

### Vertical Scaling

Upgrade instance size:
- Railway: Change plan in dashboard
- Heroku: `heroku ps:resize web=standard-2x`
- VPS: Upgrade instance

## Troubleshooting

### Server Won't Start
```bash
# Check logs
npm start

# Check port availability
lsof -i :3000

# Check environment variables
printenv | grep JWT_SECRET
```

### Connection Issues
- Verify firewall rules
- Check CORS configuration
- Ensure HTTPS is properly configured
- Verify DNS propagation: `dig yourdomain.com`

### Performance Issues
- Monitor CPU and memory usage
- Check for slow database queries
- Enable caching
- Consider CDN for static assets

## Maintenance

### Regular Updates
```bash
# Update dependencies
npm update

# Check for vulnerabilities
npm audit
npm audit fix

# Update Node.js
# Follow platform-specific instructions
```

### Backup Strategy
```bash
# Backup code
git push origin main

# Backup environment variables
# Store securely (1Password, AWS Secrets Manager, etc.)

# Document your configuration
# Keep this deployment guide updated
```

## Cost Comparison

| Platform | Free Tier | Paid Plans | Pros | Cons |
|----------|-----------|------------|------|------|
| Railway | 500 hrs/month | From $5/mo | Easy, auto-deploy | Limited free tier |
| Render | 750 hrs/month | From $7/mo | Free SSL, easy | Spins down on free |
| Heroku | 550 hrs/month | From $7/mo | Popular, plugins | Expensive for scale |
| DigitalOcean | - | From $5/mo | Good value | Manual setup |
| AWS EC2 | 750 hrs/month | From $3.50/mo | Flexible | Complex |

## Support

Need help with deployment?
- Check server logs
- Review error messages
- Consult platform documentation
- Open an issue on GitHub

---

Happy deploying! 🚀
