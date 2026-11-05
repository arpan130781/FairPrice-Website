import React, { useState } from 'react';
import {
  Laptop,
  Smartphone,
  Tablet,
  Columns,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

export const DEVICE_PRESETS = [
  {
    id: 'responsive',
    label: 'Laptop (16:9)',
    tag: 'Widescreen',
    desc: 'Standard desktop & laptop monitor layout',
    icon: Laptop,
  },
  {
    id: 'samsung-s25',
    label: 'Samsung S25 Base',
    tag: '19.5:9 Phone',
    desc: '6.2" Dynamic AMOLED (1080×2340)',
    icon: Smartphone,
  },
  {
    id: 'galaxy-fold-inner',
    label: 'Galaxy Fold 8 / Ultra',
    tag: 'Foldable (6:5)',
    desc: 'Inner expansive foldable screen (768×860)',
    icon: Tablet,
  },
  {
    id: 'galaxy-flip-tall',
    label: 'Galaxy Flip 8 / Fold Cover',
    tag: 'Ultra-Tall (22:9)',
    desc: 'Tall compact foldable (340×860)',
    icon: Smartphone,
  },
  {
    id: 'iphone-duo',
    label: 'iPhone Duo / Dual-Screen',
    tag: 'Dual Screen (3:2)',
    desc: 'Dual-panel posture view (680×740)',
    icon: Columns,
  },
];

export default function DeviceViewSwitcher({ viewMode, setViewMode }) {
  const [isOpen, setIsOpen] = useState(false);

  const activePreset = DEVICE_PRESETS.find((p) => p.id === viewMode) || DEVICE_PRESETS[0];
  const ActiveIcon = activePreset.icon;

  return (
    <div className="device-switcher-container" aria-label="Device Preview Switcher">
      <div className="device-switcher-dropdown-wrap">
        <button
          className="device-switcher-pill-trigger"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          title="Switch device aspect ratio (Laptop, Samsung S25, Fold 8, Flip 8, iPhone Duo)"
        >
          <span className="switcher-icon-wrap">
            <ActiveIcon size={15} />
          </span>
          <div className="switcher-text-col">
            <span className="switcher-active-label">{activePreset.label}</span>
            <span className="switcher-active-tag">{activePreset.tag}</span>
          </div>
          <ChevronDown size={14} className={`switcher-arrow ${isOpen ? 'open' : ''}`} />
        </button>

        {isOpen && (
          <>
            <div className="device-switcher-backdrop" onClick={() => setIsOpen(false)} />
            <div className="device-menu-card">
              <div className="device-menu-header">
                <Sparkles size={13} className="menu-sparkle-icon" />
                <span>Test Any Phone / Foldable / Laptop</span>
              </div>
              <div className="device-menu-list">
                {DEVICE_PRESETS.map((preset) => {
                  const Icon = preset.icon;
                  const isSelected = viewMode === preset.id;
                  return (
                    <button
                      key={preset.id}
                      className={`device-menu-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => {
                        setViewMode(preset.id);
                        setIsOpen(false);
                      }}
                    >
                      <div className="menu-item-icon">
                        <Icon size={16} />
                      </div>
                      <div className="menu-item-info">
                        <div className="menu-item-top">
                          <span className="menu-item-title">{preset.label}</span>
                          <span className="menu-item-tag">{preset.tag}</span>
                        </div>
                        <span className="menu-item-desc">{preset.desc}</span>
                      </div>
                      {isSelected && <span className="menu-check-pill">Active</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
