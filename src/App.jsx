import React, { useState } from 'react';
import { MarketProvider, useMarket } from './context/MarketContext';
import Header from './components/Header';
import MobileBottomNav from './components/MobileBottomNav';
import DeviceViewSwitcher from './components/DeviceViewSwitcher';
import PriceBoard from './components/PriceBoard';
import MarketCompare from './components/MarketCompare';
import FairPriceChecker from './components/FairPriceChecker';
import VendorDirectory from './components/VendorDirectory';
import AboutProject from './components/AboutProject';
import PriceContributionModal from './components/PriceContributionModal';
import Toast from './components/Toast';
import { RotateCcw } from 'lucide-react';

function MainApp() {
  const { activeTab, resetToFactoryData } = useMarket();
  const [isContributeModalOpen, setIsContributeModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState('responsive'); // 'responsive' | 'samsung-s25'

  const isSimulated = viewMode !== 'responsive';

  const getDeviceClass = () => {
    switch (viewMode) {
      case 'galaxy-fold-inner':
        return 'device-galaxy-fold';
      case 'galaxy-flip-tall':
        return 'device-galaxy-flip';
      case 'iphone-duo':
        return 'device-iphone-duo';
      default:
        return 'device-samsung-s25';
    }
  };

  const appContent = (
    <div
      className={`app-root ${
        isSimulated ? `simulated-device ${getDeviceClass()}` : ''
      }`}
    >
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

  return (
    <>
      <DeviceViewSwitcher viewMode={viewMode} setViewMode={setViewMode} />

      {isSimulated ? (
        <div className="samsung-stage-backdrop">
          <div className="samsung-s25-wrapper">
            <div className={`samsung-s25-device ${getDeviceClass()}`}>
              {/* Top speaker & camera hole punch */}
              <div className="samsung-speaker"></div>
              <div className="samsung-camera-hole"></div>

              {/* Fold Crease / Hinge Indicator if Foldable */}
              {viewMode === 'galaxy-fold-inner' && <div className="fold-crease-guide" />}
              {viewMode === 'iphone-duo' && <div className="duo-hinge-divider" />}

              {/* Live screen */}
              <div className="samsung-screen-container">
                {appContent}
              </div>

              {/* Bottom Android gesture navigation bar */}
              <div className="samsung-nav-bar">
                <div className="samsung-nav-pill"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        appContent
      )}
    </>
  );
}

export default function App() {
  return (
    <MarketProvider>
      <MainApp />
    </MarketProvider>
  );
}
