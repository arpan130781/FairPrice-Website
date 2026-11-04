import React, { createContext, useContext, useState, useEffect } from 'react';
import { MARKETS, PRODUCE_ITEMS, VENDORS } from '../data/initialData';

const MarketContext = createContext();

const STORAGE_KEYS = {
  PRODUCE: 'fairprice_produce_data_v2',
  VENDORS: 'fairprice_vendors_data_v2',
  MARKET: 'fairprice_selected_market_v2',
};

export function MarketProvider({ children }) {
  const [currentMarketId, setCurrentMarketId] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.MARKET) || 'dadar';
  });

  const [produceList, setProduceList] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCE);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse saved produce data', e);
    }
    return PRODUCE_ITEMS;
  });

  const [vendorsList, setVendorsList] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.VENDORS);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse saved vendors data', e);
    }
    return VENDORS;
  });

  const [activeTab, setActiveTab] = useState('board'); // 'board' | 'compare' | 'checker' | 'vendors' | 'about'
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedProduceForChecker, setSelectedProduceForChecker] = useState('tomato');
  const [selectedProduceForCompare, setSelectedProduceForCompare] = useState('tomato');
  const [toast, setToast] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MARKET, currentMarketId);
  }, [currentMarketId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCE, JSON.stringify(produceList));
  }, [produceList]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VENDORS, JSON.stringify(vendorsList));
  }, [vendorsList]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const getMarket = (id = currentMarketId) => {
    return MARKETS.find((m) => m.id === id) || MARKETS[0];
  };

  const addPriceReport = ({ produceId, marketId, stallName, price }) => {
    const numericPrice = parseFloat(price);
    if (!numericPrice || isNaN(numericPrice) || numericPrice <= 0) {
      showToast('Please enter a valid price amount', 'error');
      return false;
    }

    setProduceList((prevList) => {
      return prevList.map((item) => {
        if (item.id !== produceId) return item;

        const currentPrices = item.prices[marketId] || {
          min: numericPrice,
          avg: numericPrice,
          max: numericPrice,
          trend: 'Updated Today',
          lastUpdated: 'Just now',
        };

        const newMin = Math.min(currentPrices.min, numericPrice);
        const newMax = Math.max(currentPrices.max, numericPrice);
        const newAvg = Math.round(((currentPrices.avg * 2 + numericPrice) / 3) * 10) / 10;

        const updatedPrices = {
          ...item.prices,
          [marketId]: {
            min: newMin,
            avg: newAvg,
            max: newMax,
            trend: numericPrice < currentPrices.avg ? 'Community Verified (Lower)' : 'Community Verified',
            lastUpdated: 'Just now (Community Reported)',
          },
        };

        let updatedShops = [...(item.shops || [])];
        if (stallName) {
          const existingShopIndex = updatedShops.findIndex(
            (s) => s.name.toLowerCase() === stallName.toLowerCase() && s.marketId === marketId
          );
          if (existingShopIndex >= 0) {
            updatedShops[existingShopIndex] = {
              ...updatedShops[existingShopIndex],
              price: numericPrice,
            };
          } else {
            updatedShops.push({
              id: 'user-shop-' + Date.now(),
              name: stallName,
              stall: 'Local Stall',
              marketId,
              price: numericPrice,
              rating: 4.5,
              honestScale: true,
              verified: false,
            });
          }
        }

        return {
          ...item,
          prices: updatedPrices,
          shops: updatedShops,
        };
      });
    });

    showToast(`✅ Today's rate of ₹${numericPrice} updated for ${getMarket(marketId).name}!`);
    return true;
  };

  const addReview = ({ vendorId, author, rating, priceFairness, freshness, comment }) => {
    setVendorsList((prevVendors) => {
      return prevVendors.map((vendor) => {
        if (vendor.id !== vendorId) return vendor;

        const newReview = {
          id: 'rev-' + Date.now(),
          author: author || 'Neighbourhood Shopper',
          date: 'Just now',
          rating: parseFloat(rating) || 5,
          priceFairness: parseFloat(priceFairness) || 5,
          freshness: parseFloat(freshness) || 5,
          comment: comment || 'Shared honest price and good produce quality.',
        };

        const existingReviews = vendor.reviews || [];
        const allReviews = [newReview, ...existingReviews];
        const newAvgRating =
          Math.round((allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length) * 10) / 10;

        return {
          ...vendor,
          rating: newAvgRating,
          reviewCount: (vendor.reviewCount || 0) + 1,
          reviews: allReviews,
        };
      });
    });

    showToast('🌟 Review posted! Thank you for supporting fair local markets.');
    return true;
  };

  const resetToFactoryData = () => {
    localStorage.removeItem(STORAGE_KEYS.PRODUCE);
    localStorage.removeItem(STORAGE_KEYS.VENDORS);
    setProduceList(PRODUCE_ITEMS);
    setVendorsList(VENDORS);
    showToast('Refreshed to latest baseline market prices', 'info');
  };

  return (
    <MarketContext.Provider
      value={{
        markets: MARKETS,
        currentMarketId,
        setCurrentMarketId,
        currentMarket: getMarket(currentMarketId),
        produceList,
        vendorsList,
        addPriceReport,
        addReview,
        activeTab,
        setActiveTab,
        searchTerm,
        setSearchTerm,
        categoryFilter,
        setCategoryFilter,
        selectedProduceForChecker,
        setSelectedProduceForChecker,
        selectedProduceForCompare,
        setSelectedProduceForCompare,
        toast,
        showToast,
        resetToFactoryData,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
}

export function useMarket() {
  const context = useContext(MarketContext);
  if (!context) {
    throw new Error('useMarket must be used within a MarketProvider');
  }
  return context;
}
