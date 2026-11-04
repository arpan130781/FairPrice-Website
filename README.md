# FairPrice — Bridging the Gaps: Revolutionizing Transparent Pricing

[![React 19](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite 8](https://img.shields.io/badge/Vite-8.3.5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Vitest](https://img.shields.io/badge/Vitest-Passing-34D399?logo=vitest&logoColor=white)](https://vitest.dev/)
[![Audit](https://img.shields.io/badge/Vulnerabilities-0-10B981)](#security-audit)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **Veermata Jijabai Technological Institute (VJTI), Mumbai**  
> Department of Electrical Engineering • Subject: Industrial Management and Entrepreneurship  
> **Author:** Arpan Kailash Gupta (TY Electrical, November 2026)  
> **Faculty Advisor:** Prof. Chandreshekhar  

---

## 🌟 Executive Summary

**FairPrice** is a lightweight, calm, and introvert-friendly web and mobile platform that makes retail prices of fresh fruits and vegetables in local physical markets visible to customers before they step out to buy.

Unlike existing solutions that focus on wholesale agricultural mandis (e.g., Agmarknet) or dark-store quick-commerce delivery apps with heavy service markups (e.g., Blinkit, Zepto), **FairPrice is specifically engineered for physical neighbourhood street markets across Mumbai** (such as Dadar Mandai, Vashi APMC, Bandra Pali Market, Crawford Market, Andheri Station Market, Ghatkopar East, and Borivali West).

---

## 🚀 Key Features

### 1. 📊 Daily Updated Market Rate Board
- **Three-Tier Benchmarks:** Displays daily Minimum (wholesale floor), Average (recommended fair target), and Maximum (overcharge ceiling) rates for 20+ everyday vegetables, fruits, leafy greens, and herbs.
- **Dynamic Spread Visualizer:** Visual range tracker showing where the fair price sits between floor and ceiling.
- **Daily Price Trends:** Real-time indicators showing price drops (`-₹4 (Cheaper)`), surges (`+₹3 (Rising)`), and stability.
- **Location-Based Views:** Filter prices specifically by local Mumbai markets.

### 2. ⚖️ Fair Price Checker & Introvert Bargaining Assistant
- **Quote Evaluation:** Shoppers input what a street vendor quoted (e.g. ₹50/kg for Tomatoes).
- **Instant Verdict Badge:**
  - 🟢 **Steal Deal!** (Below wholesale average)
  - 🔵 **Fair Price** (Matches market retail baseline)
  - 🟡 **Slightly High** (+15% markup)
  - 🔴 **Overpriced** (+30% to +50% markup with overcharge amount calculation)
- **Suggested Counter-Offer:** Exact mathematically sound counter-rate to propose.
- **Polite Introvert Scripts:** Pre-drafted, respectful, zero-confrontation negotiation phrases ready to copy/speak in **Hinglish/Hindi**, **Marathi**, and **English**.

### 3. 🛒 Daily Shopping Basket & Budget Estimator
- Plan your grocery list before heading to the market.
- Enter quantities (e.g., 2 kg Potatoes, 1 kg Onions, 1.5 kg Tomatoes, 1 bunch Coriander).
- Live calculation of:
  - **Wholesale / Best Deal Minimum Total**
  - **Recommended Fair Target Budget**
  - **Maximum Risk Cap**
  - **Potential Savings (₹)**
- **One-Click WhatsApp / Notes Share:** Formats your shopping list with target budget figures to share or save.

### 4. 🏪 Local Shops & Community Trust Directory
- Directory of verified stalls and street vendors.
- Highlights vendors with **FairPrice Certification**, **Honest Digital Scales**, and **UPI QR Acceptance**.
- Community feedback scoring produce freshness, price honesty, and customer service.
- Interactive modal to add new reviews.

### 5. 📝 Community Price Crowdsourcing
- Customers and vendors can report street prices in under 10 seconds.
- Automatically recalculates local market minimums, maximums, and community weighted averages.
- Persisted locally with `localStorage` so user contributions and baskets survive refreshes.

---

## 🛠️ Tech Stack & Modernization

| Component | Modern Version | Previous Legacy State | Benefit |
| :--- | :--- | :--- | :--- |
| **Framework** | React 19.2.4 | React 19 + CRA | Full React 19 compatibility |
| **Bundler / Tooling** | Vite 8.3.5 | `react-scripts 5.0.1` (Deprecated) | **Sub-second build (<450ms)**, HMR |
| **Security Audit** | **0 vulnerabilities** | **62 vulnerabilities** (3 critical) | Safe production readiness |
| **Test Runner** | Vitest 5.1.0 + JSDOM | React Scripts / Jest | Fast test execution (577ms) |
| **Icons** | Lucide React | None (placeholder CRA SVG) | Accessible, clean UI iconography |
| **Styling** | Modern CSS Variables | Unconfigured CRA CSS | Responsive, mobile-first, introvert-calm UI |

---

## 📂 Project Structure

```
FairPrice-Website-main/
├── index.html                   # Vite root HTML with FairPrice metadata
├── vite.config.js               # Vite & Vitest configuration
├── package.json                 # Modern scripts and dependencies
├── public/
│   ├── fairprice-icon.svg       # Custom FairPrice SVG emblem
│   └── manifest.json            # PWA Web App Manifest
└── src/
    ├── index.jsx                # Application root entrypoint
    ├── index.css                # Full responsive, calm design system
    ├── App.jsx                  # Main application container & tab router
    ├── App.test.jsx             # Comprehensive test suite (100% passing)
    ├── setupTests.js            # Testing Library Jest DOM setup
    ├── context/
    │   └── MarketContext.jsx    # Central state management & localStorage persistence
    ├── data/
    │   └── initialData.js       # Authentic Mumbai markets, produce rates, & vendor data
    └── components/
        ├── Header.jsx           # Navbar, market dropdown, produce search, tabs
        ├── PriceBoard.jsx       # Daily rates grid, spread bars, vendor rates
        ├── FairPriceChecker.jsx # Bargaining calculator & introvert scripts
        ├── BasketEstimator.jsx  # Shopping list calculator & WhatsApp export
        ├── VendorDirectory.jsx  # Vendor trust cards & review submission
        ├── AboutProposal.jsx    # VJTI Entrepreneurship proposal & SWOT
        ├── PriceContributionModal.jsx # Crowdsource price reporter modal
        └── Toast.jsx            # Notification toast feedback
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js `v20+` or `v26+`
- npm `v10+` or `v11+`

### Installation
```bash
# Navigate to the repository
cd FairPrice-Website-main

# Install dependencies
npm install
```

### Development Server
```bash
# Start local Vite development server at http://localhost:3000
npm start
# or
npm run dev
```

### Production Build
```bash
# Compiles optimized production bundle in dist/
npm run build
```

### Running Tests
```bash
# Runs test suite with Vitest
npm test
```

---

## 🧪 Security & Quality Verification

- **Security Audit:**
  ```bash
  npm audit
  # Output: found 0 vulnerabilities
  ```
- **Test Suite Results:**
  ```bash
  npm test
  # Output: 8 passed (8 tests), duration ~577ms
  ```
- **Production Build:**
  ```bash
  npm run build
  # Output: Built in ~447ms
  ```

---

## 📜 Academic Attribution

This project implements the working prototype described in:  
**"FairPrice — Bridging the Gaps: Revolutionizing Transparent Pricing"**  
Submitted for the course *Industrial Management and Entrepreneurship* at **Veermata Jijabai Technological Institute (VJTI), Mumbai** by **Arpan Kailash Gupta** (TY Electrical, November 2026), under the guidance of **Prof. Chandreshekhar**.
