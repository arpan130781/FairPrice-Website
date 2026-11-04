import React from 'react';
import { useMarket } from '../context/MarketContext';
import {
  MapPin,
  Search,
  Scale,
  ShoppingBag,
  Store,
  FileText,
  PlusCircle,
  TrendingDown,
  Sparkles,
} from 'lucide-react';

export default function Header({ onOpenContributeModal }) {
  const {
    markets,
    currentMarketId,
    setCurrentMarketId,
    currentMarket,
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
    basket,
  } = useMarket();

  const totalBasketCount = basket.reduce((acc, item) => acc + (item.quantity > 0 ? 1 : 0), 0);

  return (
    <header className="header-container">
      {/* Top Banner Notice */}
      <div className="top-announcement-bar">
        <div className="announcement-content">
          <span className="badge-vjti">VJTI Innovation Project</span>
          <span className="announcement-text">
            <strong>FairPrice:</strong> Community-driven transparent pricing for Mumbai local markets. Stop overpaying, end bargaining discomfort.
          </span>
          <span className="announcement-city">
            <span className="live-dot"></span> Mumbai Active
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="main-navbar">
        <div className="navbar-left">
          <div className="brand-logo" onClick={() => setActiveTab('board')} role="button" tabIndex={0}>
            <div className="logo-icon-wrapper">
              <span className="moneybag-emoji">🛍️</span>
              <span className="rupee-chip">₹</span>
            </div>
            <div className="brand-text">
              <div className="brand-title-row">
                <span className="brand-name">FairPrice</span>
                <span className="brand-version">v1.0</span>
              </div>
              <span className="brand-tagline">Bridging the Gaps • Transparent Pricing</span>
            </div>
          </div>

          {/* Market Selector */}
          <div className="market-selector-wrapper">
            <MapPin size={18} className="market-pin-icon" />
            <select
              id="market-select"
              aria-label="Select Market"
              className="market-select"
              value={currentMarketId}
              onChange={(e) => setCurrentMarketId(e.target.value)}
            >
              {markets.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.area})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Search Bar */}
        <div className="search-bar-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search produce (e.g. Tomato, Pyaaz, Palak, Apple)..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
            aria-label="Search produce items"
          />
          {searchTerm && (
            <button
              className="clear-search-btn"
              onClick={() => setSearchTerm('')}
              title="Clear search"
            >
              ×
            </button>
          )}
        </div>

        {/* Right Action */}
        <div className="navbar-right">
          <button
            className="btn-contribute"
            onClick={onOpenContributeModal}
            title="Report today's street price"
          >
            <PlusCircle size={17} />
            <span>Report Rate</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <nav className="nav-tabs-bar" aria-label="Main Navigation">
        <button
          className={`nav-tab-btn ${activeTab === 'board' ? 'active' : ''}`}
          onClick={() => setActiveTab('board')}
        >
          <TrendingDown size={18} />
          <span>Daily Rates</span>
        </button>

        <button
          className={`nav-tab-btn ${activeTab === 'checker' ? 'active' : ''}`}
          onClick={() => setActiveTab('checker')}
        >
          <Scale size={18} />
          <span>Fair Price Checker</span>
          <span className="tab-pill-introvert">Introvert Guide</span>
        </button>

        <button
          className={`nav-tab-btn ${activeTab === 'basket' ? 'active' : ''}`}
          onClick={() => setActiveTab('basket')}
        >
          <ShoppingBag size={18} />
          <span>My Basket</span>
          {totalBasketCount > 0 && <span className="tab-counter">{totalBasketCount}</span>}
        </button>

        <button
          className={`nav-tab-btn ${activeTab === 'vendors' ? 'active' : ''}`}
          onClick={() => setActiveTab('vendors')}
        >
          <Store size={18} />
          <span>Local Shops & Reviews</span>
        </button>

        <button
          className={`nav-tab-btn ${activeTab === 'proposal' ? 'active' : ''}`}
          onClick={() => setActiveTab('proposal')}
        >
          <FileText size={18} />
          <span>VJTI Proposal</span>
        </button>
      </nav>
    </header>
  );
}
