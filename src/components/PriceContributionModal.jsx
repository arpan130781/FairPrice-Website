import React, { useState } from 'react';
import { useMarket } from '../context/MarketContext';
import { PlusCircle, X, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

export default function PriceContributionModal({ isOpen, onClose }) {
  const { produceList, markets, currentMarketId, addPriceReport } = useMarket();

  const [produceId, setProduceId] = useState('tomato');
  const [marketId, setMarketId] = useState(currentMarketId);
  const [stallName, setStallName] = useState('');
  const [price, setPrice] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = addPriceReport({
      produceId,
      marketId,
      stallName: stallName.trim(),
      price,
    });
    if (success) {
      setStallName('');
      setPrice('');
      onClose();
    }
  };

  const selectedProduce = produceList.find((p) => p.id === produceId) || produceList[0];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card contribute-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-col">
            <span className="modal-pre-title">Community Crowdsource</span>
            <h3>Report Today's Street Rate</h3>
            <p className="modal-subtext">
              Keep prices transparent. Help students and families buy at fair rates.
            </p>
          </div>
          <button className="btn-close-modal" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="contribute-form">
          {/* Select Market */}
          <div className="form-group">
            <label htmlFor="contrib-market" className="form-label">
              Market / Location:
            </label>
            <div className="select-with-icon">
              <MapPin size={16} className="input-inner-icon" />
              <select
                id="contrib-market"
                className="form-select icon-padded"
                value={marketId}
                onChange={(e) => setMarketId(e.target.value)}
                required
              >
                {markets.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.area})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Select Produce */}
          <div className="form-group">
            <label htmlFor="contrib-produce" className="form-label">
              Produce Item:
            </label>
            <select
              id="contrib-produce"
              className="form-select"
              value={produceId}
              onChange={(e) => setProduceId(e.target.value)}
              required
            >
              {produceList.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.emoji} {p.name} ({p.hindiName}) — current avg: ₹{p.prices[marketId]?.avg || 30}/{p.unit}
                </option>
              ))}
            </select>
          </div>

          {/* Price Input */}
          <div className="form-group">
            <label htmlFor="contrib-price" className="form-label">
              Price You Paid / Quoted Today (₹):
            </label>
            <div className="input-currency-wrapper">
              <span className="currency-prefix">₹</span>
              <input
                id="contrib-price"
                type="number"
                min="1"
                step="0.5"
                placeholder="e.g. 35"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input-quote-field"
                required
                autoFocus
              />
              <span className="unit-suffix">per {selectedProduce.unit}</span>
            </div>
          </div>

          {/* Optional Stall Name */}
          <div className="form-group">
            <label htmlFor="contrib-stall" className="form-label">
              Stall / Vendor Name or Landmark (Optional):
            </label>
            <input
              id="contrib-stall"
              type="text"
              placeholder="e.g. Ramesh Veggies, Stall #14 near West Gate"
              value={stallName}
              onChange={(e) => setStallName(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="contribution-notice-box">
            <Sparkles size={16} className="notice-icon" />
            <span>
              Your contribution will immediately update the local daily price range for this market and recalculate community averages.
            </span>
          </div>

          <div className="modal-footer-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit-review">
              Submit Rate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
