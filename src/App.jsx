import React, { useState } from 'react';
import { MarketProvider, useMarket } from './context/MarketContext';
import Header from './components/Header';
import PriceBoard from './components/PriceBoard';
import FairPriceChecker from './components/FairPriceChecker';
import BasketEstimator from './components/BasketEstimator';
import VendorDirectory from './components/VendorDirectory';
import AboutProposal from './components/AboutProposal';
import PriceContributionModal from './components/PriceContributionModal';
import Toast from './components/Toast';
import { RotateCcw, Heart, Sparkles, Scale } from 'lucide-react';

function MainApp() {
  const { activeTab, resetToFactoryData } = useMarket();
  const [isContributeModalOpen, setIsContributeModalOpen] = useState(false);

  return (
    <div className="app-root">
      <Header onOpenContributeModal={() => setIsContributeModalOpen(true)} />

      <main className="main-content-area">
        {activeTab === 'board' && (
          <PriceBoard onOpenContributeModal={() => setIsContributeModalOpen(true)} />
        )}
        {activeTab === 'checker' && (
          <FairPriceChecker onOpenContributeModal={() => setIsContributeModalOpen(true)} />
        )}
        {activeTab === 'basket' && <BasketEstimator />}
        {activeTab === 'vendors' && <VendorDirectory />}
        {activeTab === 'proposal' && <AboutProposal />}
      </main>

      {/* Global Modals & Toast */}
      <PriceContributionModal
        isOpen={isContributeModalOpen}
        onClose={() => setIsContributeModalOpen(false)}
      />
      <Toast />

      {/* Site Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-left">
            <div className="footer-brand">
              <span className="footer-logo-emoji">🛍️</span>
              <span className="footer-brand-title">FairPrice</span>
            </div>
            <p className="footer-desc">
              Bridging the Gaps: Revolutionizing Transparent Pricing for local physical markets across Mumbai.
            </p>
            <span className="footer-vjti-credit">
              Veermata Jijabai Technological Institute (VJTI), Mumbai • TY Electrical 2026
            </span>
          </div>

          <div className="footer-right">
            <div className="footer-actions">
              <button
                className="btn-footer-reset"
                onClick={resetToFactoryData}
                title="Reset local storage to original authentic Mumbai rates"
              >
                <RotateCcw size={14} />
                <span>Reset to Baseline Data</span>
              </button>
            </div>
            <span className="footer-designer">
              Designed & Developed by <strong>Arpan Kailash Gupta</strong>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <MarketProvider>
      <MainApp />
    </MarketProvider>
  );
}
