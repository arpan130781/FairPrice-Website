import React from 'react';
import { useMarket } from '../context/MarketContext';
import {
  MapPin,
  Search,
  Scale,
  ArrowLeftRight,
  Store,
  Info,
  PlusCircle,
  TrendingDown,
  Activity,
} from 'lucide-react';

export default function Header({ onOpenContributeModal }) {
  const {
    markets,
    currentMarketId,
    setCurrentMarketId,
    searchTerm,
    setSearchTerm,
    activeTab,
    setActiveTab,
  } = useMarket();

  return (
    <header className="header-container">
      {/* Top Notice Bar */}
      <div className="top-announcement-bar">
        <div className="announcement-content">
          <span className="badge-pure-info">
            <Activity size={12} /> 100% Non-Commercial Price Tracker
          </span>
          <span className="announcement-text">
            <strong>FairPrice</strong> does not sell anything — we track live daily grocery prices across local street markets to prevent overpaying.
          </span>
          <span className="announcement-city">
            <span className="live-dot"></span> Mumbai Markets Live
          </span>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="main-navbar">
        <div className="navbar-left">
          <div className="brand-logo" onClick={() => setActiveTab('board')} role="button" tabIndex={0}>
            <div className="logo-icon-wrapper">
              <span className="brand-icon-symbol">₹</span>
            </div>
            <div className="brand-text">
              <div className="brand-title-row">
                <span className="brand-name">FairPrice</span>
                <span className="brand-tag">Live Rates</span>
              </div>
              <span className="brand-tagline">Local Grocery Price Intelligence</span>
            </div>
          </div>

          {/* Market Selector */}
          <div className="market-selector-wrapper">
            <MapPin size={17} className="market-pin-icon" />
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
            placeholder="Search groceries (e.g. Tomato, Onion, Potato, Palak, Apple)..."
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
          <TrendingDown size={17} />
          <span>Dynamic Rates</span>
        </button>

        <button
          className={`nav-tab-btn ${activeTab === 'compare' ? 'active' : ''}`}
          onClick={() => setActiveTab('compare')}
        >
          <ArrowLeftRight size={17} />
          <span>Compare Markets</span>
          <span className="tab-pill-highlight">Side-by-Side</span>
        </button>

        <button
          className={`nav-tab-btn ${activeTab === 'checker' ? 'active' : ''}`}
          onClick={() => setActiveTab('checker')}
        >
          <Scale size={17} />
          <span>Fair Price Verifier</span>
        </button>

        <button
          className={`nav-tab-btn ${activeTab === 'vendors' ? 'active' : ''}`}
          onClick={() => setActiveTab('vendors')}
        >
          <Store size={17} />
          <span>Local Stalls & Feedback</span>
        </button>

        <button
          className={`nav-tab-btn ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          <Info size={17} />
          <span>About Project</span>
        </button>
      </nav>
    </header>
  );
}
