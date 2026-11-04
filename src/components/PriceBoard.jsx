import React, { useState } from 'react';
import { useMarket } from '../context/MarketContext';
import {
  TrendingDown,
  TrendingUp,
  Minus,
  Plus,
  Scale,
  ShoppingBag,
  Store,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Clock,
  Sparkles,
  Info,
} from 'lucide-react';

export default function PriceBoard({ onOpenContributeModal }) {
  const {
    produceList,
    currentMarket,
    currentMarketId,
    categoryFilter,
    setCategoryFilter,
    searchTerm,
    addToBasket,
    setActiveTab,
    setSelectedProduceForChecker,
  } = useMarket();

  const [expandedItemId, setExpandedItemId] = useState(null);

  const categories = [
    { id: 'all', label: 'All Items', icon: '🧺' },
    { id: 'vegetables', label: 'Vegetables', icon: '🥕' },
    { id: 'fruits', label: 'Fresh Fruits', icon: '🍎' },
    { id: 'leafy', label: 'Leafy Greens', icon: '🥬' },
    { id: 'herbs', label: 'Herbs & Seasoning', icon: '🧄' },
  ];

  // Filter items
  const filteredItems = produceList.filter((item) => {
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const search = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !search ||
      item.name.toLowerCase().includes(search) ||
      (item.hindiName && item.hindiName.toLowerCase().includes(search)) ||
      item.category.toLowerCase().includes(search);

    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id) => {
    setExpandedItemId(expandedItemId === id ? null : id);
  };

  const handleCheckQuote = (item) => {
    setSelectedProduceForChecker(item.id);
    setActiveTab('checker');
  };

  return (
    <div className="price-board-container">
      {/* Market Hero Banner */}
      <section className="market-hero-card">
        <div className="market-hero-main">
          <div className="market-badge-row">
            <span className="live-status-pill">
              <span className="pulse-indicator"></span> Verified Today's Mandai Rates
            </span>
            <span className="city-pill">📍 {currentMarket.city}</span>
          </div>
          <h1 className="market-hero-title">{currentMarket.name}</h1>
          <p className="market-hero-desc">{currentMarket.description}</p>
          <div className="market-meta-row">
            <span className="market-meta-item">
              <Store size={16} /> {currentMarket.totalVendors} physical retail stalls covered
            </span>
            <span className="market-meta-item">
              <Clock size={16} /> Rates refreshed daily between 6:00 AM – 8:30 AM
            </span>
          </div>
        </div>

        <div className="market-hero-stats">
          <div className="hero-stat-box">
            <span className="stat-label">Produce Tracked</span>
            <span className="stat-value">{produceList.length} items</span>
            <span className="stat-sub">Updated morning batch</span>
          </div>
          <div className="hero-stat-box highlight-stat">
            <span className="stat-label">Avg Overcharge Avoided</span>
            <span className="stat-value">22% – 35%</span>
            <span className="stat-sub">By checking before buying</span>
          </div>
        </div>
      </section>

      {/* Categories Bar */}
      <div className="category-chips-bar">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`cat-chip-btn ${categoryFilter === cat.id ? 'active' : ''}`}
            onClick={() => setCategoryFilter(cat.id)}
          >
            <span className="cat-emoji">{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Produce Grid Header */}
      <div className="board-results-header">
        <div className="results-count-text">
          Showing <strong>{filteredItems.length}</strong> items in <strong>{currentMarket.name}</strong>
          {searchTerm && <span> matching "{searchTerm}"</span>}
        </div>
        <div className="legend-pills">
          <span className="legend-chip min-pill">Min = Wholesale floor</span>
          <span className="legend-chip avg-pill">Avg = Recommended Fair Price</span>
          <span className="legend-chip max-pill">Max = Overprice threshold</span>
        </div>
      </div>

      {/* Produce Cards Grid */}
      {filteredItems.length === 0 ? (
        <div className="empty-state-card">
          <div className="empty-icon">🔍</div>
          <h3>No produce found matching your search</h3>
          <p>Try searching for common names like "Tomato", "Aloo", "Palak", or switch categories.</p>
          <button
            className="btn-reset-filters"
            onClick={() => {
              setCategoryFilter('all');
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="produce-cards-grid">
          {filteredItems.map((item) => {
            const priceInfo = item.prices[currentMarketId] || item.prices['dadar'] || {
              min: 30,
              avg: 35,
              max: 42,
              trend: 'Stable',
              lastUpdated: 'Today',
            };

            const isExpanded = expandedItemId === item.id;
            const relevantShops = (item.shops || []).filter(
              (s) => s.marketId === currentMarketId || s.marketId === 'dadar'
            );

            // Calculate percentage range
            const spread = priceInfo.max - priceInfo.min;
            const avgPosition = spread > 0 ? Math.round(((priceInfo.avg - priceInfo.min) / spread) * 100) : 50;

            const isDown = priceInfo.trend && (priceInfo.trend.includes('-') || priceInfo.trend.includes('Dropping') || priceInfo.trend.includes('Cheaper'));
            const isUp = priceInfo.trend && (priceInfo.trend.includes('+') || priceInfo.trend.includes('Rising') || priceInfo.trend.includes('High'));

            return (
              <div key={item.id} className="produce-card">
                {/* Top Card Bar */}
                <div className="card-top-row">
                  <div className="produce-avatar-wrapper">
                    <span className="produce-emoji">{item.emoji}</span>
                  </div>
                  <div className="produce-title-col">
                    <div className="produce-name-row">
                      <h3 className="produce-name">{item.name}</h3>
                      <span className="produce-unit-tag">per {item.unit}</span>
                    </div>
                    <span className="produce-hindi-name">{item.hindiName}</span>
                  </div>
                </div>

                <p className="produce-desc">{item.description}</p>

                {/* Trend Badge */}
                <div className="trend-row">
                  <span className={`trend-badge ${isDown ? 'trend-down' : isUp ? 'trend-up' : 'trend-stable'}`}>
                    {isDown ? <TrendingDown size={14} /> : isUp ? <TrendingUp size={14} /> : <Minus size={14} />}
                    {priceInfo.trend || 'Daily Stable'}
                  </span>
                  <span className="update-time-tag">
                    <Clock size={12} /> {priceInfo.lastUpdated}
                  </span>
                </div>

                {/* 3 Price Benchmarks */}
                <div className="price-matrix-card">
                  <div className="price-metric-box min-metric">
                    <span className="metric-tag">Lowest</span>
                    <span className="metric-price">₹{priceInfo.min}</span>
                    <span className="metric-sub">Wholesale rate</span>
                  </div>

                  <div className="price-metric-box avg-metric">
                    <span className="metric-badge-fair">Fair Price</span>
                    <span className="metric-price fair-price-highlight">₹{priceInfo.avg}</span>
                    <span className="metric-sub">Target quote</span>
                  </div>

                  <div className="price-metric-box max-metric">
                    <span className="metric-tag">High</span>
                    <span className="metric-price">₹{priceInfo.max}</span>
                    <span className="metric-sub">Don't pay above</span>
                  </div>
                </div>

                {/* Spread Visualizer */}
                <div className="price-spread-container">
                  <div className="spread-bar-track">
                    <div
                      className="spread-avg-marker"
                      style={{ left: `${Math.min(95, Math.max(5, avgPosition))}%` }}
                      title={`Target fair average: ₹${priceInfo.avg}`}
                    >
                      <span className="marker-tooltip">₹{priceInfo.avg}</span>
                    </div>
                  </div>
                  <div className="spread-labels-row">
                    <span>Floor ₹{priceInfo.min}</span>
                    <span className="spread-center-label">Fair Average ₹{priceInfo.avg}</span>
                    <span>Cap ₹{priceInfo.max}</span>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="card-actions-row">
                  <button
                    className="btn-action-checker"
                    onClick={() => handleCheckQuote(item)}
                    title="Check vendor quote with introvert bargaining guide"
                  >
                    <Scale size={16} />
                    <span>Check Quote</span>
                  </button>

                  <button
                    className="btn-action-basket"
                    onClick={() => addToBasket(item.id, 1)}
                    title="Add 1 unit to shopping basket"
                  >
                    <Plus size={16} />
                    <span>Add to Basket</span>
                  </button>
                </div>

                {/* Expandable Shops Dropdown */}
                {relevantShops.length > 0 && (
                  <div className="vendor-expand-section">
                    <button
                      className="btn-toggle-shops"
                      onClick={() => toggleExpand(item.id)}
                      aria-expanded={isExpanded}
                    >
                      <Store size={15} />
                      <span>{relevantShops.length} nearby stalls with recorded prices</span>
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    {isExpanded && (
                      <div className="shops-dropdown-list">
                        {relevantShops.map((shop) => (
                          <div key={shop.id} className="shop-price-row">
                            <div className="shop-info-col">
                              <span className="shop-name">
                                {shop.name} {shop.verified && <CheckCircle2 size={13} className="check-verified" />}
                              </span>
                              <span className="shop-stall-sub">{shop.stall}</span>
                            </div>
                            <div className="shop-rate-col">
                              <span className="shop-quoted-rate">₹{shop.price}/{item.unit}</span>
                              <span className="shop-star-rating">★ {shop.rating}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Floating Call-to-action for Reporting Rate */}
      <div className="crowdsource-cta-banner">
        <div className="cta-left">
          <div className="cta-spark-badge">
            <Sparkles size={16} /> Community Driven
          </div>
          <h3>Bought veggies today at {currentMarket.name}?</h3>
          <p>
            Help fellow shoppers and college students know the honest price. Report today's rate in 10 seconds!
          </p>
        </div>
        <button className="btn-cta-submit" onClick={onOpenContributeModal}>
          Report Today's Rate
        </button>
      </div>
    </div>
  );
}
