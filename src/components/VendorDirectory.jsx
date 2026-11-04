import React, { useState } from 'react';
import { useMarket } from '../context/MarketContext';
import {
  Store,
  Star,
  CheckCircle2,
  ShieldCheck,
  Smartphone,
  MapPin,
  MessageSquare,
  PlusCircle,
  ThumbsUp,
  User,
  X,
} from 'lucide-react';

export default function VendorDirectory() {
  const { vendorsList, currentMarket, currentMarketId, addReview, showToast } = useMarket();

  const [filterMarket, setFilterMarket] = useState(currentMarketId);
  const [activeVendorForReview, setActiveVendorForReview] = useState(null);

  // Review form state
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState('5');
  const [priceFairness, setPriceFairness] = useState('5');
  const [freshness, setFreshness] = useState('5');
  const [comment, setComment] = useState('');

  const filteredVendors = vendorsList.filter((v) => {
    if (filterMarket === 'all') return true;
    return v.marketId === filterMarket;
  });

  const handleOpenReviewModal = (vendor) => {
    setActiveVendorForReview(vendor);
    setAuthor('');
    setRating('5');
    setPriceFairness('5');
    setFreshness('5');
    setComment('');
  };

  const handleCloseReviewModal = () => {
    setActiveVendorForReview(null);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      showToast('Please enter a brief review comment', 'error');
      return;
    }

    addReview({
      vendorId: activeVendorForReview.id,
      author: author.trim() || 'Local Shopper',
      rating: parseFloat(rating),
      priceFairness: parseFloat(priceFairness),
      freshness: parseFloat(freshness),
      comment: comment.trim(),
    });

    handleCloseReviewModal();
  };

  return (
    <div className="vendors-container">
      {/* Hero Header */}
      <div className="vendors-header-card">
        <div className="vendors-title-block">
          <div className="vendors-icon-bubble">
            <Store size={24} />
          </div>
          <div>
            <h2>Local Vendors & Fair-Price Trust Directory</h2>
            <p>
              Rewarding local vendors who sell fresh produce at fair, transparent rates with honest scales.
            </p>
          </div>
        </div>

        {/* Filter Toggle */}
        <div className="vendor-filter-toggle">
          <label htmlFor="vendor-market-filter" className="filter-label">
            Market:
          </label>
          <select
            id="vendor-market-filter"
            className="vendor-select-market"
            value={filterMarket}
            onChange={(e) => setFilterMarket(e.target.value)}
          >
            <option value="all">All Mumbai Markets</option>
            <option value="dadar">Dadar Market</option>
            <option value="vashi-apmc">Vashi APMC</option>
            <option value="bandra-pali">Bandra Pali Market</option>
            <option value="crawford">Crawford Market</option>
            <option value="andheri-west">Andheri West</option>
            <option value="ghatkopar-east">Ghatkopar East</option>
            <option value="borivali-west">Borivali West</option>
          </select>
        </div>
      </div>

      {/* Vendors Grid */}
      <div className="vendors-grid">
        {filteredVendors.map((vendor) => (
          <div key={vendor.id} className="vendor-card">
            {/* Card Header */}
            <div className="vendor-card-header">
              <div className="vendor-title-col">
                <div className="vendor-name-row">
                  <h3 className="vendor-name">{vendor.name}</h3>
                  {vendor.fairPriceCertified && (
                    <span className="badge-fair-certified" title="FairPrice Certified Vendor">
                      <ShieldCheck size={14} /> Certified Fair
                    </span>
                  )}
                </div>
                <span className="vendor-stall-loc">
                  <MapPin size={13} /> {vendor.stallNumber} ({vendor.marketId})
                </span>
                <span className="vendor-owner-sub">Owner: {vendor.owner}</span>
              </div>

              <div className="vendor-rating-box">
                <span className="star-score">★ {vendor.rating}</span>
                <span className="reviews-sub">({vendor.reviewCount} reviews)</span>
              </div>
            </div>

            {/* Badges / Features */}
            <div className="vendor-features-row">
              {vendor.upiAccepted && (
                <span className="feature-pill">
                  <Smartphone size={13} /> UPI QR Accepted
                </span>
              )}
              {vendor.fairPriceCertified && (
                <span className="feature-pill">
                  <CheckCircle2 size={13} /> Digital Honest Scale
                </span>
              )}
              {vendor.badge && <span className="feature-pill badge-highlight">{vendor.badge}</span>}
            </div>

            {/* Specialties */}
            {vendor.specialties && (
              <div className="vendor-specialties-row">
                <span className="spec-label">Specialties:</span>
                {vendor.specialties.map((spec, i) => (
                  <span key={i} className="spec-tag">
                    {spec}
                  </span>
                ))}
              </div>
            )}

            {/* Recent Reviews Preview */}
            <div className="vendor-reviews-preview">
              <div className="reviews-preview-header">
                <span className="rev-head-title">Customer Feedback</span>
                <button
                  className="btn-add-review-link"
                  onClick={() => handleOpenReviewModal(vendor)}
                >
                  <PlusCircle size={14} /> Add Review
                </button>
              </div>

              {(vendor.reviews || []).slice(0, 2).map((rev) => (
                <div key={rev.id} className="review-quote-bubble">
                  <div className="review-user-row">
                    <span className="rev-user-name">
                      <User size={13} /> {rev.author}
                    </span>
                    <span className="rev-stars">★ {rev.rating}</span>
                  </div>
                  <p className="rev-text">"{rev.comment}"</p>
                </div>
              ))}
            </div>

            {/* Action Bar */}
            <div className="vendor-card-footer">
              <span className="vendor-phone-tag">📞 {vendor.phone}</span>
              <button
                className="btn-card-review"
                onClick={() => handleOpenReviewModal(vendor)}
              >
                Rate This Shop
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Review Modal */}
      {activeVendorForReview && (
        <div className="modal-backdrop" onClick={handleCloseReviewModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-col">
                <span className="modal-pre-title">Write a Shop Review</span>
                <h3>{activeVendorForReview.name}</h3>
                <span className="modal-stall-sub">{activeVendorForReview.stallNumber}</span>
              </div>
              <button className="btn-close-modal" onClick={handleCloseReviewModal} aria-label="Close modal">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="review-form">
              <div className="form-group">
                <label htmlFor="rev-author" className="form-label">
                  Your Name:
                </label>
                <input
                  id="rev-author"
                  type="text"
                  placeholder="e.g. Ananya, Regular Shopper"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="form-input"
                />
              </div>

              <div className="ratings-form-grid">
                <div className="form-group">
                  <label htmlFor="rev-overall" className="form-label">
                    Overall Experience:
                  </label>
                  <select
                    id="rev-overall"
                    className="form-select"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="5">⭐⭐⭐⭐⭐ (5 - Outstanding)</option>
                    <option value="4.5">⭐⭐⭐⭐½ (4.5 - Very Good)</option>
                    <option value="4">⭐⭐⭐⭐ (4 - Good)</option>
                    <option value="3">⭐⭐⭐ (3 - Average)</option>
                    <option value="2">⭐⭐ (2 - Poor)</option>
                    <option value="1">⭐ (1 - Terrible)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="rev-fairness" className="form-label">
                    Price Fairness:
                  </label>
                  <select
                    id="rev-fairness"
                    className="form-select"
                    value={priceFairness}
                    onChange={(e) => setPriceFairness(e.target.value)}
                  >
                    <option value="5">Fair & Transparent (No overcharging)</option>
                    <option value="4">Reasonable Rates</option>
                    <option value="3">Slightly Negotiable</option>
                    <option value="2">Tends to quote high</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="rev-freshness" className="form-label">
                    Produce Freshness:
                  </label>
                  <select
                    id="rev-freshness"
                    className="form-select"
                    value={freshness}
                    onChange={(e) => setFreshness(e.target.value)}
                  >
                    <option value="5">Farm Fresh Morning Batch</option>
                    <option value="4">Good Freshness</option>
                    <option value="3">Moderate</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="rev-comment" className="form-label">
                  Your Feedback / Tips for Other Shoppers:
                </label>
                <textarea
                  id="rev-comment"
                  rows="3"
                  className="form-textarea"
                  placeholder="e.g. Always gives exact weight, accepts UPI without fuss, fresh tomatoes in morning..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="modal-footer-actions">
                <button type="button" className="btn-cancel" onClick={handleCloseReviewModal}>
                  Cancel
                </button>
                <button type="submit" className="btn-submit-review">
                  Post Public Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
