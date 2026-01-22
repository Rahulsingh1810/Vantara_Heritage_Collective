# The Heritage Collective

An elegant e-commerce platform for selling traditional artifacts and cultural treasures from artisans worldwide.

## Features

### Customer Features

- **Product Catalog**: Browse handcrafted artifacts with detailed descriptions
- **Advanced Filtering**: Filter by vendor, category, and price range
- **Shopping Cart**: Add items with quantity management and persistence
- **Secure Checkout**: Stripe-powered payment processing
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop

### Pages

- **Home**: Hero section with featured products and value propositions
- **Products**: Full catalog with advanced filtering
- **Product Details**: Individual product pages with stock information
- **About**: Company mission and artisan support information
- **Transforming Spaces**: Design inspiration and styling tips
- **Contact**: Contact form and FAQ

### Admin Panel

- **Product Management**: Create, update, delete products
- **Vendor Management**: Manage artisan vendors
- **Order Management**: Track and update order statuses
- **Analytics**: Revenue charts and order distribution
- **Dashboard**: Real-time statistics and key metrics

## Technology Stack

- **Frontend**: Next.js 16, React, TypeScript
- **Styling**: Tailwind CSS v4, shadcn/ui
- **Database**: PostgreSQL (Neon)
- **Payments**: Stripe
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- PostgreSQL database
- Stripe account

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd heritage-collective
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in your database and Stripe credentials.

4. Initialize the database

```bash
# Run the SQL schema from scripts/01_init_schema.sql
```

5. Run the development server

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## Project Structure

```
├── app/
│   ├── (routes)
│   ├── api/
│   ├── admin/
│   ├── products/
│   ├── about/
│   ├── contact/
│   └── ...
├── components/
│   ├── ui/
│   ├── admin/
│   └── ...
├── lib/
│   ├── db.ts
│   ├── types.ts
│   └── cart.ts
├── scripts/
│   └── 01_init_schema.sql
└── public/
```

## Database Schema

### Tables

- **vendors**: Artisan information
- **categories**: Product categories
- **products**: Product listings
- **orders**: Customer orders
- **order_items**: Order line items

See `scripts/01_init_schema.sql` for complete schema.

## API Routes

### Products

- `GET /api/products` - List all products
- `GET /api/products/[id]` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/[id]` - Update product (admin)
- `DELETE /api/products/[id]` - Delete product (admin)

### Vendors

- `GET /api/vendors` - List vendors
- `POST /api/vendors` - Create vendor (admin)
- `PUT /api/vendors/[id]` - Update vendor (admin)
- `DELETE /api/vendors/[id]` - Delete vendor (admin)

### Orders

- `GET /api/orders` - List orders (admin)
- `POST /api/orders` - Create order
- `PUT /api/orders/[id]` - Update order status (admin)

### Checkout

- `POST /api/checkout` - Create Stripe checkout session
- `GET /api/health` - Health check

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

```bash
npm run build
# Commit and push to GitHub
# Deploy via Vercel dashboard
```

## Admin Access

Visit `/admin` to access the admin dashboard. Features include:

- Product inventory management
- Vendor relationship management
- Order tracking and status updates
- Revenue analytics and charts

## Payment Testing

Use Stripe test cards during development:

- **Successful payment**: 4242 4242 4242 4242
- **Declined card**: 4000 0000 0000 0002

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues or questions, please open an issue on GitHub or contact support@heritagecollective.com
