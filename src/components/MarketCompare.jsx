import React from 'react';
import { useMarket } from '../context/MarketContext';
import {
  ArrowLeftRight,
  TrendingDown,
  TrendingUp,
  MapPin,
  Sparkles,
  CheckCircle,
  Clock,
  Scale,
} from 'lucide-react';

export default function MarketCompare() {
  const {
    produceList,
    markets,
    selectedProduceForCompare,
    setSelectedProduceForCompare,
    setCurrentMarketId,
    currentMarketId,
    setActiveTab,
    setSelectedProduceForChecker,
  } = useMarket();

  const selectedItem =
    produceList.find((p) => p.id === selectedProduceForCompare) || produceList[0];

  // Compute market comparisons
  const marketComparisons = markets.map((market) => {
    const priceInfo = selectedItem.prices[market.id] || {
      min: 30,
      avg: 35,
      max: 42,
      trend: 'Stable',
      lastUpdated: 'Today',
    };
    return {
      market,
      priceInfo,
    };
  });

  // Find lowest and highest avg price
  const sortedByAvg = [...marketComparisons].sort((a, b) => a.priceInfo.avg - b.priceInfo.avg);
  const cheapest = sortedByAvg[0];
  const mostExpensive = sortedByAvg[sortedByAvg.length - 1];
  const maxPriceDiff = Math.round((mostExpensive.priceInfo.avg - cheapest.priceInfo.avg) * 10) / 10;
  const overallAvg =
    Math.round((marketComparisons.reduce((sum, m) => sum + m.priceInfo.avg, 0) / marketComparisons.length) * 10) / 10;

  const handleSelectForChecker = () => {
    setSelectedProduceForChecker(selectedItem.id);
    setActiveTab('checker');
  };

  return (
    <div className="compare-container">
      {/* Header Banner */}
      <div className="compare-header-card">
        <div className="compare-header-left">
          <div className="compare-icon-bubble">
            <ArrowLeftRight size={24} />
          </div>
          <div>
            <h2>Cross-Market Price Comparison</h2>
            <p>
              Compare real-time rates of any grocery side-by-side across all local markets in Mumbai. Spot who has the lowest price today.
            </p>
          </div>
        </div>

        {/* Quick Produce Selector */}
        <div className="compare-select-wrapper">
          <label htmlFor="compare-produce-select" className="form-label">
            Select Grocery Item:
          </label>
          <select
            id="compare-produce-select"
            className="form-select compare-dropdown"
            value={selectedProduceForCompare}
            onChange={(e) => setSelectedProduceForCompare(e.target.value)}
          >
            {produceList.map((p) => (
              <option key={p.id} value={p.id}>
                {p.emoji} {p.name} ({p.hindiName}) — per {p.unit}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Item Spotlight Header */}
      <div className="compare-item-spotlight">
        <div className="spotlight-left">
          <span className="spotlight-emoji">{selectedItem.emoji}</span>
          <div>
            <div className="spotlight-title-row">
              <h3>{selectedItem.name}</h3>
              <span className="spotlight-hindi">{selectedItem.hindiName}</span>
              <span className="spotlight-unit">per {selectedItem.unit}</span>
            </div>
            <p className="spotlight-desc">{selectedItem.description}</p>
          </div>
        </div>

        <button className="btn-verify-this-item" onClick={handleSelectForChecker}>
          <Scale size={16} />
          <span>Verify a Vendor Quote</span>
        </button>
      </div>

      {/* Comparison Highlights */}
      <div className="compare-insights-row">
        <div className="insight-card cheapest-card">
          <span className="insight-tag">Lowest Market Today</span>
          <h4 className="insight-market-name">{cheapest.market.name}</h4>
          <div className="insight-price-row">
            <span className="insight-price">₹{cheapest.priceInfo.avg}</span>
            <span className="insight-unit">/ {selectedItem.unit}</span>
          </div>
          <span className="insight-sub">{cheapest.market.area} • Floor ₹{cheapest.priceInfo.min}</span>
        </div>

        <div className="insight-card avg-city-card">
          <span className="insight-tag">Mumbai City Average</span>
          <h4 className="insight-market-name">Across all 7 Mandais</h4>
          <div className="insight-price-row">
            <span className="insight-price">₹{overallAvg}</span>
            <span className="insight-unit">/ {selectedItem.unit}</span>
          </div>
          <span className="insight-sub">Benchmark retail baseline</span>
        </div>

        <div className="insight-card spread-card">
          <span className="insight-tag">Inter-Market Spread</span>
          <h4 className="insight-market-name">Max Difference</h4>
          <div className="insight-price-row">
            <span className="insight-price">₹{maxPriceDiff}</span>
            <span className="insight-unit">/ {selectedItem.unit}</span>
          </div>
          <span className="insight-sub">
            Difference between {cheapest.market.name.split(' ')[0]} & {mostExpensive.market.name.split(' ')[0]}
          </span>
        </div>
      </div>

      {/* Market Cards Grid */}
      <h3 className="section-title-bar">Today's Rates by Local Market</h3>
      <div className="markets-compare-grid">
        {marketComparisons.map(({ market, priceInfo }) => {
          const isCheapest = market.id === cheapest.market.id;
          const isCurrent = market.id === currentMarketId;
          const diffFromCityAvg = Math.round((priceInfo.avg - overallAvg) * 10) / 10;

          return (
            <div
              key={market.id}
              className={`market-compare-card ${isCheapest ? 'border-cheapest' : ''} ${
                isCurrent ? 'current-active-market' : ''
              }`}
            >
              <div className="m-card-header">
                <div>
                  <div className="m-title-row">
                    <h4 className="m-name">{market.name}</h4>
                    {isCheapest && <span className="pill-lowest">Cheapest</span>}
                    {isCurrent && <span className="pill-current">Selected Market</span>}
                  </div>
                  <span className="m-area">
                    <MapPin size={13} /> {market.area}
                  </span>
                </div>
              </div>

              {/* Price Triad */}
              <div className="m-price-triad">
                <div className="m-triad-item">
                  <span className="triad-label">Floor (Min)</span>
                  <span className="triad-val">₹{priceInfo.min}</span>
                </div>
                <div className="m-triad-item highlight-triad">
                  <span className="triad-label">Fair Average</span>
                  <span className="triad-val text-cyan">₹{priceInfo.avg}</span>
                </div>
                <div className="m-triad-item">
                  <span className="triad-label">Ceiling (Max)</span>
                  <span className="triad-val">₹{priceInfo.max}</span>
                </div>
              </div>

              {/* Difference vs City Average */}
              <div className="m-diff-bar">
                <span className="diff-text">
                  vs Mumbai Avg:{' '}
                  <strong className={diffFromCityAvg <= 0 ? 'text-green' : 'text-red'}>
                    {diffFromCityAvg <= 0 ? `-₹${Math.abs(diffFromCityAvg)}` : `+₹${diffFromCityAvg}`}
                  </strong>
                </span>
                <span className="m-updated">
                  <Clock size={12} /> {priceInfo.lastUpdated}
                </span>
              </div>

              {/* Action Button */}
              <div className="m-card-footer">
                {!isCurrent ? (
                  <button
                    className="btn-select-market"
                    onClick={() => {
                      setCurrentMarketId(market.id);
                      setActiveTab('board');
                    }}
                  >
                    View All Rates in {market.name}
                  </button>
                ) : (
                  <span className="current-market-indicator">
                    <CheckCircle size={15} /> Currently viewing this market
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
