import React from 'react';
import {
  Info,
  ShieldCheck,
  TrendingDown,
  Eye,
  CheckCircle2,
  Users,
  MapPin,
  Heart,
  Activity,
  ArrowRight,
} from 'lucide-react';
import { useMarket } from '../context/MarketContext';

export default function AboutProject() {
  const { setActiveTab } = useMarket();

  return (
    <div className="about-container">
      {/* Hero Card */}
      <div className="about-hero-card">
        <div className="about-badge-row">
          <span className="badge-about-pill">
            <Activity size={14} /> Individual Open-Data Initiative
          </span>
          <span className="badge-author-pill">Created by Arpan Kailash Gupta</span>
        </div>

        <h1 className="about-hero-title">FairPrice</h1>
        <span className="about-hero-tagline">
          Real-Time Local Grocery Price Intelligence • Zero Selling, Pure Transparency
        </span>

        <p className="about-hero-intro">
          <strong>FairPrice is not a grocery store and does not sell or deliver anything.</strong> It is a free, community-powered price discovery platform created to solve a universal daily problem: knowing what fresh fruits, vegetables, and groceries should actually cost at your local physical market today.
        </p>
      </div>

      {/* The Core Concept */}
      <div className="about-two-col-grid">
        <div className="about-section-card">
          <div className="about-card-icon-bubble">
            <Eye size={22} />
          </div>
          <h3>The Problem We Address</h3>
          <p>
            Millions of households shop daily at physical neighbourhood vegetable markets and street stalls. Unlike supermarkets or online delivery apps, physical street markets:
          </p>
          <ul className="about-bullet-list">
            <li>
              <strong>Rarely display price tags:</strong> Prices must be inquired item-by-item from each vendor.
            </li>
            <li>
              <strong>Fluctuate every single morning:</strong> Rates shift daily depending on wholesale APMC arrivals, seasonal weather, and festival demand.
            </li>
            <li>
              <strong>Lead to unknowing overpayment:</strong> Shoppers who don't negotiate or don't know the morning baseline frequently overpay by 20% to 50%.
            </li>
            <li>
              <strong>Create social discomfort:</strong> Haggling is socially uncomfortable for both shoppers and vendors.
            </li>
          </ul>
        </div>

        <div className="about-section-card">
          <div className="about-card-icon-bubble highlight">
            <ShieldCheck size={22} />
          </div>
          <h3>How FairPrice Solves It</h3>
          <p>
            FairPrice acts as a neutral, shared daily price benchmark for local markets:
          </p>
          <ul className="about-bullet-list">
            <li>
              <strong>Three-Tier Dynamic Brackets:</strong> We publish daily <em>Lowest (Wholesale Floor)</em>, <em>Fair Average (Target Retail)</em>, and <em>Highest (Overcharge Limit)</em> for everyday groceries.
            </li>
            <li>
              <strong>Location-Specific Discovery:</strong> View rates specifically for your local neighbourhood market (e.g. Dadar, Bandra, Vashi, Crawford, Andheri, Ghatkopar, Borivali).
            </li>
            <li>
              <strong>Cross-Market Comparison:</strong> Compare prices of any item across all Mumbai mandais side-by-side.
            </li>
            <li>
              <strong>Instant Quote Verification:</strong> Type what a vendor quoted you to immediately verify if it's fair or overpriced.
            </li>
          </ul>
        </div>
      </div>

      {/* Why We Don't Sell Produce */}
      <div className="about-manifesto-card">
        <div className="manifesto-badge">Our Guiding Principle</div>
        <h3>Why FairPrice Will Never Sell or Deliver Anything</h3>
        <p>
          Quick-commerce delivery platforms add delivery charges, handling fees, surge pricing, and heavy product margins. Mandi wholesale portals only show bulk wholesale truck rates that don't reflect retail street realities.
        </p>
        <p>
          <strong>FairPrice remains 100% informational.</strong> By having no commercial stake in selling produce, our data stays completely impartial, honest, and dedicated solely to empowering local buyers and honest street vendors.
        </p>
      </div>

      {/* Pillars Grid */}
      <div className="about-pillars-grid">
        <div className="about-pillar-item">
          <span className="pillar-num">01</span>
          <h4>Morning Benchmark Updates</h4>
          <p>Rates are compiled fresh every morning from local physical arrivals across Mumbai markets.</p>
        </div>

        <div className="about-pillar-item">
          <span className="pillar-num">02</span>
          <h4>Crowdsourced Verification</h4>
          <p>Everyday shoppers and vendors submit real street rates to keep the database accurate throughout the day.</p>
        </div>

        <div className="about-pillar-item">
          <span className="pillar-num">03</span>
          <h4>Introvert-Friendly</h4>
          <p>Provides clear recommended rates so anyone can shop with peace of mind without awkward haggling.</p>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="about-footer-card">
        <div>
          <h4>Ready to check today's grocery rates?</h4>
          <p>Browse real-time prices across Mumbai markets right now.</p>
        </div>
        <button className="btn-about-browse" onClick={() => setActiveTab('board')}>
          View Today's Rates <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
