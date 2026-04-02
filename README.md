# Mahdi Dhaker Official — Website

Official website for **Mahdi Dhaker**, international professional violinist from Tunis.

Built with Next.js 16, Tailwind CSS, and a custom dark gold design system.

---

## Tech Stack

- **Framework** — Next.js 16 (App Router)
- **Styling** — Tailwind CSS + custom CSS design system
- **Fonts** — Cormorant Garamond · Raleway · Noto Naskh Arabic (Google Fonts)
- **Languages** — English · French · Arabic (RTL support)
- **PDF Generation** — pdf-lib
- **QR Code** — qrcode
- **Payment** — Konnect (Tunisia) — integration ready
- **Deployment** — Vercel

---

## Features

- Multi-language support (EN / FR / AR) with RTL layout for Arabic
- Custom gold cursor with state-aware shape changes
- MD logo loading screen
- Scroll reveal animations
- Active nav highlighting on scroll
- Hero section with artist portrait
- Biography section with animated stat counters
- Scrolling press quote cards
- Tour section with filter tabs and past concerts toggle
- Concert poster lightbox
- YouTube video grid with fullscreen lightbox
- Draggable discography section
- Newsletter signup
- Contact form
- Full ticketing flow (selection → checkout → confirmation)
- PDF ticket generation with QR code (dark gold aesthetic)
- Custom 404 page
- `/bio` — full biography page
- `/gallery` — photo gallery with lightbox
- `/tickets` — full ticket purchase flow
- Open Graph image (auto-generated)
- Sitemap + robots.txt
- Favicon (MD monogram SVG)

---

## Project Structure
```
src/
  app/
    layout.js              # Fonts, metadata, language provider
    page.js                # Main page
    globals.css            # Full design system
    favicon.svg            # MD monogram favicon
    opengraph-image.js     # Auto-generated OG image
    sitemap.js             # /sitemap.xml
    robots.js              # /robots.txt
    not-found.jsx          # Custom 404
    bio/page.jsx           # /bio — full biography
    gallery/page.jsx       # /gallery — photo gallery
    tickets/
      page.jsx             # Ticket selection
      checkout/page.jsx    # Checkout form
      confirmation/page.jsx # Booking confirmation + PDF
  components/
    Loader.jsx             # MD logo loading screen
    Cursor.jsx             # Custom gold cursor
    Navbar.jsx             # Fixed nav + language switcher
    Hero.jsx               # Hero section
    About.jsx              # Biography + stats
    PressQuotes.jsx        # Auto-scrolling press quotes
    Tour.jsx               # Concert listing + filters
    Discography.jsx        # Album grid
    Media.jsx              # YouTube video grid + lightbox
    Newsletter.jsx         # Email signup
    Contact.jsx            # Contact form
    Footer.jsx             # Footer
    ScrollReveal.jsx       # Intersection observer reveal
  context/
    LanguageContext.jsx    # Language state provider
  translations/
    index.js               # EN / FR / AR translations
  lib/
    tickets.js             # Ticket utilities
public/
  images/
    mahdi.jpg              # Hero portrait
    logo.png               # MD monogram logo
    upcoming_concerts.jpeg # Concert poster
  favicon.svg              # Browser tab icon
```

---

## Getting Started
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values:
```bash
cp .env.example .env.local
```

Required variables:
- `NEXT_PUBLIC_BASE_URL` — Your deployed URL (e.g. `https://mahdidhaker.com`)
- `KONNECT_API_KEY` — API key from Konnect dashboard
- `KONNECT_WALLET_ID` — Wallet ID from Konnect dashboard
- `KONNECT_API_URL` — Konnect endpoint (sandbox or production)

---

## Deployment to Vercel

**⚠️ For ticketing to work after deployment, you MUST add environment variables in Vercel.**

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for complete step-by-step setup guide.

Quick steps:
1. Push this repo to GitHub
2. Import at [vercel.com/new](https://vercel.com/new)
3. **Add environment variables in Vercel Settings** (see deployment guide)
4. Deploy

Required vars for production:
- `NEXT_PUBLIC_BASE_URL` = your domain
- `KONNECT_API_KEY` = from Konnect dashboard
- `KONNECT_WALLET_ID` = from Konnect dashboard
- `KONNECT_API_URL` = Konnect endpoint

---

## Payment Integration (Konnect)

The ticketing UI is fully built. To activate real payments:

1. Mahdi creates a merchant account at [konnect.network](https://konnect.network)
2. Account gets verified (2–5 days)
3. Add API Key + Wallet ID to `.env.local`
4. Build `src/app/api/create-payment/route.js`
5. Build `src/app/api/verify-payment/route.js`

See Konnect API docs: [docs.konnect.network](https://docs.konnect.network)

---

## Client

**Mahdi Dhaker** — International Violinist  
[mahdidhaker.com](https://www.mahdidhaker.com)  
[Instagram](https://www.instagram.com/mahdi_dhaker_/) · [Facebook](https://www.facebook.com/mehdi.dhaker.7) · [YouTube](https://www.youtube.com/@mahdidhaker1)

---

## Developer

**Chahine**  
[github.com/Chahinee777](https://github.com/Chahinee777)

---

## License

All rights reserved © 2026 Mahdi Dhaker Official.  
Unauthorized use, reproduction, or distribution of this code is prohibited.