# Vandanya Heritage Collective - Deployment Guide

## Prerequisites

- Node.js 18+ and npm/yarn
- PostgreSQL database (via Neon)
- Stripe account with API keys
- Vercel account (optional, for deployment)

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
# Database (Neon)
DATABASE_URL=postgresql://user:password@host:port/database
POSTGRES_URL=postgresql://user:password@host:port/database
POSTGRES_PRISMA_URL=postgresql://user:password@host:port/database

# Stripe Keys
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# App URLs
NEXT_PUBLIC_BASE_URL=http://localhost:3000 (for development)
NEXT_PUBLIC_BASE_URL=https://yourdomain.com (for production)
```

## Setup Steps

### 1. Install Dependencies

```bash
npm install
# or
yarn install
```

### 2. Database Setup

The database schema is defined in `scripts/01_init_schema.sql`. You can either:

**Option A: Run the SQL script directly in Neon Dashboard**

- Go to your Neon project dashboard
- Open the SQL editor
- Copy and paste the contents of `scripts/01_init_schema.sql`
- Execute the script

**Option B: Use a database client**

```bash
psql -U username -h host -d database_name -f scripts/01_init_schema.sql
```

### 3. Running Locally

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

### 4. Testing the Application

**Admin Panel**: Visit `http://localhost:3000/admin`

- Manage products, vendors, and orders
- View analytics and sales data

**Shopping Flow**:

1. Browse products at `/products`
2. Filter by category, vendor, or price
3. Add items to cart
4. Complete checkout at `/checkout`
5. Process payment with Stripe test card: `4242 4242 4242 4242`

### 5. Deployment to Vercel

#### Step 1: Push Code to GitHub

```bash
git add .
git commit -m "Initial Heritage Collective setup"
git push origin main
```

#### Step 2: Create Vercel Project

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Select your GitHub repository
4. Click "Import"

#### Step 3: Set Environment Variables

In the Vercel dashboard:

1. Go to Settings → Environment Variables
2. Add all variables from your `.env.local` file
3. Make sure to add them to all environments (Production, Preview, Development)

#### Step 4: Deploy

Click "Deploy" to start the deployment process.

## Stripe Configuration

### Test Mode

Use test API keys during development. Test card: `4242 4242 4242 4242`

### Production Mode

1. Switch to live API keys in Stripe dashboard
2. Update environment variables in Vercel
3. Update `NEXT_PUBLIC_BASE_URL` to your production domain
4. Test payment flow before going live

## Database Backup

For production, regularly backup your Neon database:

```bash
# Export database
pg_dump -U username -h host -d database_name > backup.sql

# Restore database
psql -U username -h host -d database_name < backup.sql
```

## Monitoring

### Health Check

Monitor your application health at `/api/health`

```bash
curl https://yourdomain.com/api/health
```

### Error Tracking

Set up error tracking with services like:

- Sentry
- LogRocket
- Vercel Analytics

## Scaling Considerations

1. **Database**: Neon handles auto-scaling
2. **Images**: Use Vercel Image Optimization
3. **CDN**: Enable Vercel's global CDN
4. **Caching**: Configure ISR (Incremental Static Regeneration) for product pages

## Security Best Practices

1. Never expose API keys in client-side code
2. Use HTTPS in production (automatic with Vercel)
3. Implement rate limiting on API routes
4. Validate all user inputs server-side
5. Keep dependencies updated: `npm audit fix`

## Support & Troubleshooting

### Database Connection Issues

- Verify DATABASE_URL is correct
- Check IP whitelist in Neon dashboard
- Ensure SSL is enabled

### Stripe Issues

- Verify API keys are in environment variables
- Check Stripe dashboard for webhook logs
- Test with Stripe test cards

### Build Errors

- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node version: `node --version`

## Production Checklist

- [ ] All environment variables configured
- [ ] Database backup strategy in place
- [ ] Stripe switched to production keys
- [ ] Domain configured and SSL enabled
- [ ] Email notifications set up (optional)
- [ ] Error tracking configured
- [ ] Analytics enabled
- [ ] Performance monitoring active
