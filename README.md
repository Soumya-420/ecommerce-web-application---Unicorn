# Ecommerce Frontend

A lightweight, multi-page ecommerce storefront built with HTML, CSS, and Vanilla JavaScript, bundled with Vite.

## Features
- **Home Page**: Featured products and hero section.
- **Product Details**: Detailed view with image galleries, varied options (color/size), and stock status.
- **Shopping Cart**: Fully functional cart using LocalStorage with quantity controls.
- **Authentication**: Login and Sign Up forms with basic validation (mock logic/Firebase ready).

## Project Structure
- `index.html`: Home page
- `product.html`, `product-detail.html`: Product listing and details
- `cart.html`: Shopping cart
- `auth.html`: User authentication
- `styles/`: CSS files (if externalized)
- `scripts/`: JS files (if externalized)
- `vite.config.ts`: Configured for Multi-Page Application (MPA) build.

## Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```
   Output will be in `dist/` directory.

## Deployment

### Vercel
This project includes a `vercel.json` configuration.
1. Import this repository into Vercel.
2. Ensure the Framework Preset is set to **Vite**.
3. Deploy.

### Netlify / Static Hosting
The `dist/` folder contains static HTML/CSS/JS files. You can drag and drop this folder onto Netlify Drop or configure your build settings:
- **Build Command**: `npm run build`
- **Publish Directory**: `dist`
