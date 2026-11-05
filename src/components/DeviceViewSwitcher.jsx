import React from 'react';
import { Smartphone, Laptop } from 'lucide-react';

export default function DeviceViewSwitcher({ viewMode, setViewMode }) {
  return (
    <div className="device-switcher-container" aria-label="Device Preview Switcher">
      <div className="device-switcher-pill">
        <span className="switcher-label">View Aspect Ratio:</span>
        <button
          className={`switcher-btn ${viewMode === 'responsive' ? 'active' : ''}`}
          onClick={() => setViewMode('responsive')}
          title="Full widescreen laptop view"
        >
          <Laptop size={14} />
          <span>Laptop (16:9)</span>
        </button>
        <button
          className={`switcher-btn ${viewMode === 'samsung-s25' ? 'active' : ''}`}
          onClick={() => setViewMode('samsung-s25')}
          title="Samsung Galaxy S25 mobile view (19.5:9 aspect ratio)"
        >
          <Smartphone size={14} />
          <span>Samsung S25 (19.5:9)</span>
        </button>
      </div>
    </div>
  );
}
