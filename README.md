# FairPrice — Dynamic Local Market Grocery Rates

[![React 19](https://img.shields.io/badge/React-19.2.4-0891B2?logo=react&logoColor=white)](https://react.dev/)
[![Vite 8](https://img.shields.io/badge/Vite-8.3.5-06B6D4?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-Passing-10B981?logo=vitest&logoColor=white)](https://vitest.dev/)
[![Audit](https://img.shields.io/badge/Vulnerabilities-0-10B981)](#security-audit)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **FairPrice** is an independent, non-commercial price intelligence platform created by **Arpan Kailash Gupta**.  
> **Core Concept:** We do **NOT** sell or deliver anything. We provide real-time dynamic prices of fresh vegetables, fruits, and groceries across neighbourhood physical markets in Mumbai to empower everyday shoppers against overpaying.

---

## 🌟 The Core Mission

Physical neighbourhood street markets and mandais (like Dadar, Vashi APMC, Bandra Pali, Crawford Market, Andheri West, Ghatkopar, and Borivali) rarely have price tags, and rates fluctuate every morning based on farm arrivals. 

Shoppers who don't know the morning baseline frequently overpay by 20% to 50% or face the social friction of haggling.

**FairPrice solves this by providing a neutral, real-time shared price reference for local physical markets.**

---

## 🚀 Key Features

### 1. 📊 Dynamic Daily Rates Board
- **Three-Tier Brackets:** Real-time Minimum (wholesale floor), Fair Target (reasonable retail average), and Maximum (overcharge ceiling) for everyday groceries.
- **Trend Indicators:** Live badges showing price drops (`-₹4 Cheaper`), surges (`+₹3 Rising`), and stable items.
- **Physical Stall Tracking:** View recorded rates at nearby physical stalls and landmark locations.

### 2. 🔄 Cross-Market Price Comparison
- Select any grocery item (e.g. Tomato, Onion, Potato, Apples, Bananas, Spinach) to compare prices side-by-side across all 7 major Mumbai markets.
- Spot which market has the lowest rate today and track the inter-market price spread.

### 3. ⚖️ Fair Price Verifier & Introvert Guide
- Enter what a vendor quoted you (e.g. ₹55/kg) to instantly see whether it's fair or overpriced.
- Suggested fair counter-offer calculated dynamically.
- Zero-confrontation polite dialogue scripts in **Hinglish/Hindi**, **Marathi**, and **English**.

### 4. 🏪 Local Stalls & Transparency Feedback
- Directory of verified stalls and vendors with *Honest Electronic Scales* and *UPI QR Acceptance*.
- Community reviews scoring produce freshness and price transparency.

### 5. 📝 Community Price Crowdsourcing
- Everyday shoppers and vendors can report street prices in 10 seconds.
- Automatically updates market averages and price ranges, persisted in `localStorage`.

---

## 🛠️ Architecture & Tech Stack

- **Framework:** React 19.2.4
- **Bundler:** Vite 8.3.5 (Build time: ~280ms)
- **Styling:** Custom eye-pleasing Cyan, Oceanic Teal, Mint & Deep Navy design system
- **Icons:** Lucide React
- **Test Runner:** Vitest 5.1.0 + Testing Library (100% passing)
- **Security:** 0 npm vulnerabilities

---

## 📂 Project Structure

```
FairPrice-Website-main/
├── index.html                   # Root entry with FairPrice metadata
├── vite.config.js               # Vite & Vitest configuration
├── package.json                 # Scripts and dependencies
├── public/
│   ├── fairprice-icon.svg       # Cyan/Teal dynamic price SVG emblem
│   └── manifest.json            # Web App Manifest
└── src/
    ├── index.jsx                # Application root entrypoint
    ├── index.css                # Eye-pleasing Cyan/Teal design system
    ├── App.jsx                  # Main tab router & container
    ├── App.test.jsx             # Comprehensive test suite (100% passing)
    ├── setupTests.js            # Testing Library Jest DOM setup
    ├── context/
    │   └── MarketContext.jsx    # State management & localStorage sync
    ├── data/
    │   └── initialData.js       # Authentic Mumbai markets, grocery rates & stalls
    └── components/
        ├── Header.jsx           # Navbar, market dropdown, grocery search, tabs
        ├── PriceBoard.jsx       # Dynamic rates grid, spread bars, stall rates
        ├── MarketCompare.jsx    # Cross-market side-by-side comparison matrix
        ├── FairPriceChecker.jsx # Quote verifier & introvert dialogue scripts
        ├── VendorDirectory.jsx  # Vendor trust cards & community feedback
        ├── AboutProject.jsx     # Non-commercial project mission & author credits
        ├── PriceContributionModal.jsx # Crowdsource price reporter modal
        └── Toast.jsx            # Notification toast feedback
```

---

## ⚡ Getting Started

```bash
cd FairPrice-Website-main

# Install dependencies
npm install

# Start development server at http://localhost:3000
npm start

# Run unit & integration tests
npm test

# Build for production
npm run build
```

---

## 👤 Author

Developed by **Arpan Kailash Gupta** as an individual open-data initiative for consumer price transparency.
