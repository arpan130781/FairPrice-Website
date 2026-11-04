import React from 'react';
import {
  FileText,
  Award,
  CheckCircle,
  HelpCircle,
  AlertCircle,
  TrendingUp,
  ShieldCheck,
  Heart,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export default function AboutProposal() {
  return (
    <div className="proposal-container">
      {/* VJTI Banner */}
      <div className="vjti-academic-card">
        <div className="vjti-crest-col">
          <div className="vjti-logo-badge">VJTI</div>
          <span className="estd-tag">Estd. 1887</span>
        </div>

        <div className="vjti-details-col">
          <span className="vjti-institute-title">
            VEERMATA JIJABAI TECHNOLOGICAL INSTITUTE, MUMBAI
          </span>
          <span className="vjti-dept">Department of Electrical Engineering</span>
          <h2 className="proposal-main-title">
            FairPrice: Bridging the Gaps
          </h2>
          <span className="proposal-subtitle">
            Revolutionizing Transparent Pricing in Local Retail Markets
          </span>

          <div className="proposal-meta-tags">
            <span className="meta-pill">
              <strong>Author:</strong> Arpan Kailash Gupta (TY Electrical)
            </span>
            <span className="meta-pill">
              <strong>Course:</strong> Industrial Management & Entrepreneurship
            </span>
            <span className="meta-pill">
              <strong>Faculty:</strong> Prof. Chandreshekhar
            </span>
            <span className="meta-pill">
              <strong>Date:</strong> November 2026
            </span>
          </div>
        </div>
      </div>

      {/* Abstract & Motivation */}
      <div className="proposal-section-card">
        <h3 className="section-title">1. Abstract & Executive Summary</h3>
        <p className="section-paragraph">
          <strong>FairPrice</strong> is a mobile and web application that makes the prices of fresh fruits and vegetables in local physical markets visible to customers before they buy. Customers who shop at neighbourhood vendors rarely know what a fair price is on a given day because prices change daily and are rarely displayed.
        </p>
        <p className="section-paragraph">
          FairPrice publishes daily minimum, average, and maximum price ranges, shows which shops sell at which price on a location-based view, and lets customers review shops for quality and price fairness. The aim is to reduce unknowing overpayment, remove the discomfort of bargaining, and build trust between customers and vendors in the informal retail market.
        </p>
      </div>

      {/* Problem Statement & Limitations */}
      <div className="proposal-two-col-grid">
        <div className="proposal-section-card">
          <h3 className="section-title">2. Problem Statement</h3>
          <ul className="proposal-bullet-list">
            <li>
              <strong>1. No Transparent Pricing:</strong> Without visible price tags, both customers and vendors waste time and energy on repetitive inquiry and uncomfortable negotiation.
            </li>
            <li>
              <strong>2. High Price Fluctuations:</strong> Daily seasonal shifts make it difficult for working professionals, students, and households to track what produce should cost.
            </li>
            <li>
              <strong>3. Bargaining Discomfort:</strong> Bargaining is socially uncomfortable for both parties, creating hesitation and friction—especially for introverts.
            </li>
            <li>
              <strong>4. Unknowingly Overpaying:</strong> Customers frequently overpay by 20% to 50% without realizing the current market floor.
            </li>
          </ul>
        </div>

        <div className="proposal-section-card">
          <h3 className="section-title">3. Limitations of Existing Solutions</h3>
          <div className="comparison-table-wrapper">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Existing Solution</th>
                  <th>Core Limitation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Mandi Price Apps (Agmarknet)</strong></td>
                  <td>Only show wholesale APMC rates, not retail street shop prices.</td>
                </tr>
                <tr>
                  <td><strong>Newspaper Columns</strong></td>
                  <td>Lack real-time updates and localized suburban coverage.</td>
                </tr>
                <tr>
                  <td><strong>Quick Commerce (Blinkit/Zepto)</strong></td>
                  <td>Platform-specific prices with heavy service markups and delivery fees.</td>
                </tr>
                <tr className="highlight-row">
                  <td><strong>FairPrice</strong></td>
                  <td><strong>Specifically built for physical neighborhood street markets!</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Innovation Pillars */}
      <div className="proposal-section-card">
        <h3 className="section-title">4. Proposed Innovation & Core Pillars</h3>
        <div className="pillars-grid">
          <div className="pillar-card">
            <div className="pillar-icon">📍</div>
            <h4>Focus on the Local Market</h4>
            <p>Built exclusively for shoppers who physically visit local street vendors in Mumbai.</p>
          </div>
          <div className="pillar-card">
            <div className="pillar-icon">📊</div>
            <h4>Daily Updated Price Ranges</h4>
            <p>Shows clear Minimum, Average (Fair), and Maximum caps so buyers know exactly what to pay.</p>
          </div>
          <div className="pillar-card">
            <div className="pillar-icon">💬</div>
            <h4>Reduced Need to Bargain</h4>
            <p>Introvert-friendly scripts and fair counter-offers eliminate awkward haggling.</p>
          </div>
          <div className="pillar-card">
            <div className="pillar-icon">🛡️</div>
            <h4>Shop-Level Trust Reviews</h4>
            <p>Rewards honest vendors with community certification and digital transparency.</p>
          </div>
        </div>
      </div>

      {/* SWOT Analysis */}
      <div className="proposal-section-card">
        <h3 className="section-title">5. SWOT Analysis (from VJTI Report)</h3>
        <div className="swot-grid">
          <div className="swot-card swot-s">
            <span className="swot-letter">S</span>
            <h4>Strengths</h4>
            <ul>
              <li>Clear gap in the market</li>
              <li>Focus on physical local markets</li>
              <li>Daily crowdsourced updates</li>
              <li>Calm, minimal, introvert-friendly UI</li>
              <li>Zero-friction web access</li>
            </ul>
          </div>

          <div className="swot-card swot-w">
            <span className="swot-letter">W</span>
            <h4>Weaknesses</h4>
            <ul>
              <li>Depends on regular daily price contributions</li>
              <li>Informal street vendors may not be digitally active initially</li>
              <li>Early utility relies on community density</li>
            </ul>
          </div>

          <div className="swot-card swot-o">
            <span className="swot-letter">O</span>
            <h4>Opportunities</h4>
            <ul>
              <li>Massive base of daily local market shoppers</li>
              <li>Growing smartphone & UPI penetration in India</li>
              <li>Scope to extend to other cities (Pune, Delhi, Bangalore)</li>
              <li>Partnerships with local market associations</li>
            </ul>
          </div>

          <div className="swot-card swot-t">
            <span className="swot-letter">T</span>
            <h4>Threats</h4>
            <ul>
              <li>Existing delivery apps adding local discovery</li>
              <li>Inaccurate or manipulated price entries (mitigated by range caps)</li>
              <li>Vendor resistance to price visibility</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Future Scope */}
      <div className="proposal-section-card">
        <h3 className="section-title">6. Future Scope & Roadmap</h3>
        <div className="future-scope-grid">
          <div className="future-item">
            <span className="future-dot"></span>
            <span>Expansion to more markets across Thane, Navi Mumbai, and Pune</span>
          </div>
          <div className="future-item">
            <span className="future-dot"></span>
            <span>Vendor-side QR stands to display verified daily rates in a few taps</span>
          </div>
          <div className="future-item">
            <span className="future-dot"></span>
            <span>Historical price trend charts and "Best Day to Buy" predictive alerts</span>
          </div>
          <div className="future-item">
            <span className="future-dot"></span>
            <span>Full regional language localization (Marathi, Hindi, Gujarati)</span>
          </div>
        </div>
      </div>

      {/* Footer Acknowledgement */}
      <div className="proposal-footer-card">
        <Heart size={20} className="heart-icon" />
        <p>
          Developed as the working prototype for the <strong>FairPrice Business Idea Proposal</strong> by <strong>Arpan Kailash Gupta</strong>, Department of Electrical Engineering, VJTI Mumbai.
        </p>
      </div>
    </div>
  );
}
