import React, { useState } from 'react';
import { useMarket } from '../context/MarketContext';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Share2,
  Check,
  TrendingDown,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

export default function BasketEstimator() {
  const {
    basket,
    produceList,
    currentMarket,
    currentMarketId,
    updateBasketQuantity,
    removeFromBasket,
    clearBasket,
    addToBasket,
    showToast,
    setActiveTab,
  } = useMarket();

  const [selectedProduceToAdd, setSelectedProduceToAdd] = useState('');
  const [copiedShare, setCopiedShare] = useState(false);

  // Calculate detailed totals
  let totalMin = 0;
  let totalAvg = 0;
  let totalMax = 0;

  const basketDetails = basket
    .map((bItem) => {
      const produce = produceList.find((p) => p.id === bItem.produceId);
      if (!produce) return null;

      const prices =
        produce.prices[currentMarketId] || produce.prices['dadar'] || { min: 20, avg: 30, max: 40 };

      const itemMin = Math.round(prices.min * bItem.quantity);
      const itemAvg = Math.round(prices.avg * bItem.quantity);
      const itemMax = Math.round(prices.max * bItem.quantity);

      totalMin += itemMin;
      totalAvg += itemAvg;
      totalMax += itemMax;

      return {
        ...bItem,
        produce,
        prices,
        itemMin,
        itemAvg,
        itemMax,
      };
    })
    .filter(Boolean);

  const potentialSavings = Math.max(0, totalMax - totalAvg);

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!selectedProduceToAdd) return;
    addToBasket(selectedProduceToAdd, 1);
    setSelectedProduceToAdd('');
  };

  const handleShareList = () => {
    if (basketDetails.length === 0) return;

    let text = `🛒 *My FairPrice Shopping List (${currentMarket.name})*\n`;
    text += `📅 Date: ${new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}\n\n`;

    basketDetails.forEach((item, index) => {
      text += `${index + 1}. ${item.produce.emoji} ${item.produce.name}: ${item.quantity} ${item.produce.unit} ~ ₹${item.itemAvg} (₹${item.prices.avg}/${item.produce.unit})\n`;
    });

    text += `\n🎯 *Fair Target Budget:* ₹${totalAvg}`;
    text += `\n💡 *Price Range:* ₹${totalMin} to ₹${totalMax}`;
    text += `\n🛡️ Avoid paying above ₹${totalMax}!`;
    text += `\n\n_Generated via FairPrice Mumbai App • Bridging the Gaps_`;

    navigator.clipboard?.writeText(text);
    setCopiedShare(true);
    showToast('Shopping list copied for WhatsApp / Notes!');
    setTimeout(() => setCopiedShare(false), 3000);
  };

  return (
    <div className="basket-container">
      {/* Banner */}
      <div className="basket-header-card">
        <div className="basket-title-left">
          <div className="basket-icon-bubble">
            <ShoppingBag size={24} />
          </div>
          <div>
            <h2>Daily Shopping Basket & Budget Estimator</h2>
            <p>
              Plan your produce run before leaving home for <strong>{currentMarket.name}</strong>. Know your exact fair bill and prevent overcharging.
            </p>
          </div>
        </div>

        {basket.length > 0 && (
          <div className="basket-actions-top">
            <button className="btn-share-basket" onClick={handleShareList}>
              {copiedShare ? <Check size={16} /> : <Share2 size={16} />}
              <span>{copiedShare ? 'Copied to WhatsApp!' : 'Copy / Share List'}</span>
            </button>
            <button className="btn-clear-basket" onClick={clearBasket} title="Clear all items">
              <Trash2 size={16} />
              <span>Clear</span>
            </button>
          </div>
        )}
      </div>

      <div className="basket-layout-grid">
        {/* Left: Items List */}
        <div className="basket-items-col">
          {/* Quick Add Bar */}
          <form className="quick-add-form" onSubmit={handleAddItem}>
            <label htmlFor="quick-add-select" className="visually-hidden">
              Add Produce Item
            </label>
            <select
              id="quick-add-select"
              className="quick-add-select"
              value={selectedProduceToAdd}
              onChange={(e) => setSelectedProduceToAdd(e.target.value)}
            >
              <option value="">+ Choose produce to add...</option>
              {produceList.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.emoji} {p.name} ({p.hindiName}) — ₹{p.prices[currentMarketId]?.avg || 30}/{p.unit}
                </option>
              ))}
            </select>
            <button type="submit" className="btn-quick-add" disabled={!selectedProduceToAdd}>
              <Plus size={16} /> Add Item
            </button>
          </form>

          {basketDetails.length === 0 ? (
            <div className="empty-basket-card">
              <span className="empty-emoji">🧺</span>
              <h3>Your basket is empty</h3>
              <p>Add vegetables and fruits from the daily price board to calculate your estimated market bill.</p>
              <button className="btn-go-to-board" onClick={() => setActiveTab('board')}>
                Browse Daily Rates <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <div className="basket-items-list">
              {basketDetails.map((item) => (
                <div key={item.produceId} className="basket-item-row">
                  <div className="item-main-info">
                    <span className="item-emoji">{item.produce.emoji}</span>
                    <div className="item-names">
                      <span className="item-title">{item.produce.name}</span>
                      <span className="item-hindi">{item.produce.hindiName}</span>
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="qty-stepper-box">
                    <button
                      type="button"
                      className="btn-step"
                      onClick={() => updateBasketQuantity(item.produceId, Math.max(0, item.quantity - 0.5))}
                      aria-label="Decrease quantity"
                    >
                      <Minus size={14} />
                    </button>
                    <div className="qty-value-label">
                      <strong>{item.quantity}</strong> {item.produce.unit}
                    </div>
                    <button
                      type="button"
                      className="btn-step"
                      onClick={() => updateBasketQuantity(item.produceId, item.quantity + 0.5)}
                      aria-label="Increase quantity"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Price Breakdown */}
                  <div className="item-price-col">
                    <div className="item-fair-total">
                      ₹{item.itemAvg}
                      <span className="rate-sub">(@ ₹{item.prices.avg}/{item.produce.unit})</span>
                    </div>
                    <span className="item-spread-sub">
                      Range: ₹{item.itemMin} – ₹{item.itemMax}
                    </span>
                  </div>

                  {/* Remove Button */}
                  <button
                    className="btn-remove-item"
                    onClick={() => removeFromBasket(item.produceId)}
                    title="Remove item"
                    aria-label={`Remove ${item.produce.name}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Summary Cost Card */}
        <div className="basket-summary-col">
          <div className="summary-budget-card">
            <h3 className="summary-card-title">Market Bill Estimate</h3>
            <span className="summary-market-tag">📍 {currentMarket.name}</span>

            <div className="summary-price-tiers">
              <div className="tier-row min-tier">
                <div className="tier-left">
                  <span className="tier-dot min-dot"></span>
                  <div>
                    <span className="tier-name">Wholesale / Best Deal</span>
                    <span className="tier-desc">Early morning bargain rates</span>
                  </div>
                </div>
                <span className="tier-price">₹{totalMin}</span>
              </div>

              <div className="tier-row avg-tier highlight">
                <div className="tier-left">
                  <span className="tier-dot avg-dot"></span>
                  <div>
                    <span className="tier-name">Recommended Fair Target</span>
                    <span className="tier-desc">Target amount to pay vendors</span>
                  </div>
                </div>
                <span className="tier-price highlight-price">₹{totalAvg}</span>
              </div>

              <div className="tier-row max-tier">
                <div className="tier-left">
                  <span className="tier-dot max-dot"></span>
                  <div>
                    <span className="tier-name">Maximum Risk Limit</span>
                    <span className="tier-desc">If paying top unnegotiated quotes</span>
                  </div>
                </div>
                <span className="tier-price">₹{totalMax}</span>
              </div>
            </div>

            {/* Potential Savings Banner */}
            {potentialSavings > 0 && (
              <div className="savings-highlight-box">
                <div className="savings-sparkle">
                  <Sparkles size={18} />
                </div>
                <div>
                  <span className="savings-amount">Save up to ₹{potentialSavings}</span>
                  <p className="savings-desc">
                    By quoting FairPrice recommended rates instead of paying maximum vendor quotes.
                  </p>
                </div>
              </div>
            )}

            {/* Quick Share list */}
            {basketDetails.length > 0 && (
              <button className="btn-whatsapp-share" onClick={handleShareList}>
                <Share2 size={16} />
                <span>Copy Summary for WhatsApp</span>
              </button>
            )}

            {/* Introvert reminder */}
            <div className="introvert-tip-box">
              <span className="tip-badge">💡 Introvert Tip</span>
              <p>
                Have this target budget (₹{totalAvg}) ready in cash or UPI. Show vendors your list and politely ask: <em>"Bhaiya, is poore basket ka ₹{totalAvg} theek hai na?"</em> Most vendors happily agree for bundled purchases!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
