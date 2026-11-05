import React from 'react';
import { useMarket } from '../context/MarketContext';
import {
  TrendingDown,
  ArrowLeftRight,
  Scale,
  Store,
  Info,
} from 'lucide-react';

export default function MobileBottomNav() {
  const { activeTab, setActiveTab } = useMarket();

  const navItems = [
    { id: 'board', label: 'Rates', icon: TrendingDown },
    { id: 'compare', label: 'Compare', icon: ArrowLeftRight },
    { id: 'checker', label: 'Verifier', icon: Scale, highlight: true },
    { id: 'vendors', label: 'Stalls', icon: Store },
    { id: 'about', label: 'About', icon: Info },
  ];

  return (
    <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
      <div className="mobile-bottom-nav-inner">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              className={`mobile-nav-btn ${isActive ? 'active' : ''} ${item.highlight ? 'highlight-item' : ''}`}
              onClick={() => {
                setActiveTab(item.id);
                if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="mobile-nav-icon-wrap">
                <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                {item.highlight && <span className="verifier-dot" />}
              </div>
              <span className="mobile-nav-label">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
