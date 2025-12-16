# Camera Shop

A Next.js e-commerce application for selling and renting cameras, integrated with Stripe for payments and Google Sheets for product management.

## Features

- Product Catalog (fetched from Google Sheets)
- Shopping Cart (Purchase & Rental)
- Stripe Checkout Integration
- Shipping Information Collection
- Blog (Markdown-based)

## Deployment

### Environment Variables

Required environment variables for Vercel:

- `GOOGLE_SHEETS_API_KEY`: API Key for Google Sheets
- `GOOGLE_SHEETS_ID`: Spreadsheet ID
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe Publishable Key
- `STRIPE_SECRET_KEY`: Stripe Secret Key

### Steps

1. Push to GitHub.
2. Import repository in Vercel.
3. Configure environment variables.
4. Deploy.
