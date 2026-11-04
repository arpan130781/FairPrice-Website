import React, { useState } from 'react';
import { useMarket } from '../context/MarketContext';
import {
  Scale,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ArrowLeftRight,
  MessageCircle,
  Sparkles,
  Copy,
  Check,
  TrendingDown,
} from 'lucide-react';

export default function FairPriceChecker({ onOpenContributeModal }) {
  const {
    produceList,
    currentMarket,
    currentMarketId,
    selectedProduceForChecker,
    setSelectedProduceForChecker,
    setSelectedProduceForCompare,
    setActiveTab,
    showToast,
  } = useMarket();

  const [quotedPrice, setQuotedPrice] = useState('50');
  const [quantity, setQuantity] = useState('1');
  const [copiedLang, setCopiedLang] = useState(null);

  const selectedItem =
    produceList.find((p) => p.id === selectedProduceForChecker) || produceList[0];

  const priceInfo =
    selectedItem?.prices[currentMarketId] || selectedItem?.prices['dadar'] || {
      min: 28,
      avg: 35,
      max: 42,
    };

  const quote = parseFloat(quotedPrice) || 0;
  const qty = parseFloat(quantity) || 1;

  const avg = priceInfo.avg;
  const min = priceInfo.min;
  const max = priceInfo.max;

  const diffFromAvg = quote - avg;
  const percentDiff = avg > 0 ? Math.round(((quote - avg) / avg) * 100) : 0;
  const totalExtraPaid = Math.max(0, Math.round(diffFromAvg * qty * 10) / 10);

  let verdict = {
    level: 'fair',
    title: 'Fair Market Rate',
    color: '#0891B2',
    bg: '#ECFEFF',
    badgeClass: 'verdict-fair',
    icon: CheckCircle,
    summary: `Quote is reasonable and closely matches today's ${currentMarket.name} average.`,
    recommendedAction: 'Fair price for street retail. Safe to buy without hesitation.',
    counterOffer: quote,
  };

  if (quote <= min) {
    verdict = {
      level: 'great',
      title: 'Steal Deal! (Wholesale Floor Rate)',
      color: '#059669',
      bg: '#ECFDF5',
      badgeClass: 'verdict-great',
      icon: Sparkles,
      summary: `Quote is ₹${Math.abs(diffFromAvg)} below retail average (${Math.abs(percentDiff)}% cheaper)!`,
      recommendedAction: 'Excellent price. Verify produce freshness before purchase.',
      counterOffer: quote,
    };
  } else if (quote <= avg * 1.06) {
    verdict = {
      level: 'fair',
      title: 'Fair & Transparent Price',
      color: '#0891B2',
      bg: '#ECFEFF',
      badgeClass: 'verdict-fair',
      icon: CheckCircle,
      summary: `Within ₹${Math.abs(diffFromAvg)} of today's average (₹${avg}/${selectedItem?.unit}).`,
      recommendedAction: 'Standard retail street rate. Buy comfortably.',
      counterOffer: Math.round(avg),
    };
  } else if (quote <= avg * 1.25) {
    verdict = {
      level: 'mild',
      title: `Slightly High (+${percentDiff}%)`,
      color: '#D97706',
      bg: '#FFFBEB',
      badgeClass: 'verdict-mild',
      icon: AlertTriangle,
      summary: `Quoted ₹${diffFromAvg} above today's average. You would pay ₹${totalExtraPaid} extra for ${qty} ${selectedItem?.unit}.`,
      recommendedAction: `Ask politely for ₹${Math.round(avg)}/${selectedItem?.unit}.`,
      counterOffer: Math.round(avg),
    };
  } else {
    verdict = {
      level: 'high',
      title: `Overpriced by +${percentDiff}%`,
      color: '#DC2626',
      bg: '#FEF2F2',
      badgeClass: 'verdict-high',
      icon: XCircle,
      summary: `High quote! Market average is ₹${avg}/${selectedItem?.unit}, ceiling is ₹${max}. You would overpay by ₹${totalExtraPaid}.`,
      recommendedAction: `Counter at ₹${Math.round(avg)} or check neighbouring stalls.`,
      counterOffer: Math.round(avg),
    };
  }

  const scripts = {
    hinglish: `Bhaiya, aaj ${currentMarket.name} mein ${selectedItem?.name.split(' ')[0]} ka rate ₹${priceInfo.min}-₹${avg} chal raha hai. ₹${verdict.counterOffer} mein de dijiye na please, regular customer hoon.`,
    marathi: `Bhau, aaja ${currentMarket.name} madhe ${selectedItem?.name.split(' ')[0]} cha rate ₹${avg} aahe. ₹${verdict.counterOffer} madhe dya na, roz yeto ithe.`,
    english: `Excuse me brother, the current market average here is around ₹${avg} per ${selectedItem?.unit}. Can we do ₹${verdict.counterOffer} for ${qty} ${selectedItem?.unit}?`,
  };

  const handleCopy = (text, lang) => {
    navigator.clipboard?.writeText(text);
    setCopiedLang(lang);
    showToast('Copied script to clipboard! Use it with your vendor.');
    setTimeout(() => setCopiedLang(null), 2500);
  };

  const handleCompareThis = () => {
    setSelectedProduceForCompare(selectedItem.id);
    setActiveTab('compare');
  };

  return (
    <div className="checker-container">
      {/* Intro Header */}
      <div className="checker-header-card">
        <div className="checker-badge">
          <Scale size={17} /> Live Quote Verifier & Introvert Guide
        </div>
        <h2>Is the Vendor's Quote Fair?</h2>
        <p>
          Type the price quoted to you by a vendor at <strong>{currentMarket.name}</strong>. We instantly verify whether it's fair, tell you the exact counter-offer, and provide polite dialogue scripts.
        </p>
      </div>

      <div className="checker-layout-grid">
        {/* Left Input Form */}
        <div className="checker-form-card">
          <h3 className="section-card-title">1. Enter Vendor's Quote</h3>

          {/* Select Produce */}
          <div className="form-group">
            <label htmlFor="produce-picker" className="form-label">
              Select Grocery / Produce Item:
            </label>
            <select
              id="produce-picker"
              className="form-select-lg"
              value={selectedProduceForChecker}
              onChange={(e) => setSelectedProduceForChecker(e.target.value)}
            >
              {produceList.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.emoji} {item.name} ({item.hindiName}) — current avg: ₹{item.prices[currentMarketId]?.avg || 30}/{item.unit}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Item Chips */}
          <div className="quick-item-chips">
            {produceList.slice(0, 6).map((item) => (
              <button
                key={item.id}
                type="button"
                className={`item-chip-btn ${selectedProduceForChecker === item.id ? 'active' : ''}`}
                onClick={() => setSelectedProduceForChecker(item.id)}
              >
                <span>{item.emoji}</span>
                <span>{item.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Quoted Price Input */}
          <div className="form-group price-input-group">
            <label htmlFor="quote-input" className="form-label">
              What did the vendor quote you?
            </label>
            <div className="input-currency-wrapper">
              <span className="currency-prefix">₹</span>
              <input
                id="quote-input"
                type="number"
                min="1"
                step="1"
                value={quotedPrice}
                onChange={(e) => setQuotedPrice(e.target.value)}
                className="input-quote-field"
                placeholder="e.g. 50"
              />
              <span className="unit-suffix">per {selectedItem?.unit}</span>
            </div>
          </div>

          {/* Quantity */}
          <div className="form-group">
            <label htmlFor="qty-input" className="form-label">
              Quantity you intend to buy:
            </label>
            <div className="qty-input-row">
              <input
                id="qty-input"
                type="number"
                min="0.25"
                step="0.25"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="input-qty-field"
              />
              <span className="unit-suffix-static">{selectedItem?.unit}</span>
            </div>
          </div>

          {/* Reference Benchmarks for this item */}
          <div className="benchmarks-box">
            <div className="benchmark-title-row">
              <span className="bench-title">Today's Benchmark in {currentMarket.name}</span>
              <span className="bench-unit">per {selectedItem?.unit}</span>
            </div>
            <div className="benchmark-stats-row">
              <div className="bench-stat">
                <span className="bench-stat-label">Floor (Min)</span>
                <span className="bench-stat-val">₹{priceInfo.min}</span>
              </div>
              <div className="bench-stat highlight">
                <span className="bench-stat-label">Fair Average</span>
                <span className="bench-stat-val">₹{priceInfo.avg}</span>
              </div>
              <div className="bench-stat">
                <span className="bench-stat-label">Ceiling (Max)</span>
                <span className="bench-stat-val">₹{priceInfo.max}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Verdict & Assistant */}
        <div className="checker-result-col">
          {/* Verdict Card */}
          <div className={`verdict-display-card ${verdict.badgeClass}`}>
            <div className="verdict-top-row">
              <div className="verdict-icon-bubble">
                <verdict.icon size={28} />
              </div>
              <div className="verdict-text-block">
                <span className="verdict-label-tag">Analysis Result</span>
                <h3 className="verdict-title">{verdict.title}</h3>
              </div>
            </div>

            <p className="verdict-summary">{verdict.summary}</p>

            <div className="verdict-stats-grid">
              <div className="verdict-stat-item">
                <span className="v-stat-label">Quoted Total ({qty} {selectedItem?.unit})</span>
                <span className="v-stat-val">₹{Math.round(quote * qty)}</span>
              </div>
              <div className="verdict-stat-item">
                <span className="v-stat-label">Fair Market Cost</span>
                <span className="v-stat-val highlight">₹{Math.round(avg * qty)}</span>
              </div>
              <div className="verdict-stat-item">
                <span className="v-stat-label">{diffFromAvg > 0 ? 'Overcharge Extra' : 'Your Savings'}</span>
                <span className={`v-stat-val ${diffFromAvg > 0 ? 'text-red' : 'text-green'}`}>
                  {diffFromAvg > 0 ? `+₹${totalExtraPaid}` : `₹${Math.abs(Math.round(diffFromAvg * qty))}`}
                </span>
              </div>
            </div>

            {/* Target Counter Offer */}
            <div className="counter-offer-highlight">
              <span className="counter-badge">Suggested Counter-Offer:</span>
              <span className="counter-val">
                ₹{verdict.counterOffer} / {selectedItem?.unit}
              </span>
              <span className="counter-total">
                (Total: ₹{Math.round(verdict.counterOffer * qty)})
              </span>
            </div>
          </div>

          {/* Introvert Scripts Card */}
          <div className="scripts-card">
            <div className="scripts-card-header">
              <MessageCircle size={18} className="script-icon" />
              <div>
                <h4>What to say to the vendor (Polite, no conflict)</h4>
                <p>Tap copy to speak with calm confidence.</p>
              </div>
            </div>

            <div className="scripts-list">
              <div className="script-item">
                <div className="script-header">
                  <span className="lang-tag">Hinglish / Hindi</span>
                  <button
                    className="btn-copy-script"
                    onClick={() => handleCopy(scripts.hinglish, 'hinglish')}
                  >
                    {copiedLang === 'hinglish' ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedLang === 'hinglish' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="script-text">"{scripts.hinglish}"</p>
              </div>

              <div className="script-item">
                <div className="script-header">
                  <span className="lang-tag">Marathi</span>
                  <button
                    className="btn-copy-script"
                    onClick={() => handleCopy(scripts.marathi, 'marathi')}
                  >
                    {copiedLang === 'marathi' ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedLang === 'marathi' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="script-text">"{scripts.marathi}"</p>
              </div>

              <div className="script-item">
                <div className="script-header">
                  <span className="lang-tag">English</span>
                  <button
                    className="btn-copy-script"
                    onClick={() => handleCopy(scripts.english, 'english')}
                  >
                    {copiedLang === 'english' ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copiedLang === 'english' ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="script-text">"{scripts.english}"</p>
              </div>
            </div>

            {/* Cross Market Link */}
            <div className="checker-actions-footer">
              <button className="btn-checker-compare-link" onClick={handleCompareThis}>
                <ArrowLeftRight size={16} />
                <span>Compare {selectedItem?.name} across other markets</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
