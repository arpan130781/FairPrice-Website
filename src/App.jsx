import React, { useState } from 'react';
import { MarketProvider, useMarket } from './context/MarketContext';
import Header from './components/Header';
import MobileBottomNav from './components/MobileBottomNav';
import PriceBoard from './components/PriceBoard';
import MarketCompare from './components/MarketCompare';
import FairPriceChecker from './components/FairPriceChecker';
import VendorDirectory from './components/VendorDirectory';
import AboutProject from './components/AboutProject';
import PriceContributionModal from './components/PriceContributionModal';
import Toast from './components/Toast';
import { RotateCcw, Activity } from 'lucide-react';

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
        {activeTab === 'compare' && <MarketCompare />}
        {activeTab === 'checker' && (
          <FairPriceChecker onOpenContributeModal={() => setIsContributeModalOpen(true)} />
        )}
        {activeTab === 'vendors' && <VendorDirectory />}
        {activeTab === 'about' && <AboutProject />}
      </main>

      {/* Global Modals & Toast */}
      <PriceContributionModal
        isOpen={isContributeModalOpen}
        onClose={() => setIsContributeModalOpen(false)}
      />
      <Toast />

      {/* Mobile Fixed Bottom Navigation */}
      <MobileBottomNav />

      {/* Site Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-left">
            <div className="footer-brand">
              <span className="footer-icon-symbol">₹</span>
              <span className="footer-brand-title">FairPrice</span>
            </div>
            <p className="footer-desc">
              Dynamic grocery price intelligence across physical local markets in Mumbai. We do not sell anything — pure transparent market rates.
            </p>
            <span className="footer-author-credit">
              An individual open-data initiative created by <strong>Arpan Kailash Gupta</strong>
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
            <span className="footer-copyright">
              © {new Date().getFullYear()} FairPrice • All rights reserved
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
