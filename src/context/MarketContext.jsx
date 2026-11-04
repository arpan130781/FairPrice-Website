import React, { createContext, useContext, useState, useEffect } from 'react';
import { MARKETS, PRODUCE_ITEMS, VENDORS } from '../data/initialData';

const MarketContext = createContext();

const STORAGE_KEYS = {
  PRODUCE: 'fairprice_produce_data_v1',
  VENDORS: 'fairprice_vendors_data_v1',
  BASKET: 'fairprice_basket_v1',
  MARKET: 'fairprice_selected_market_v1',
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

  const [basket, setBasket] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BASKET);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse saved basket data', e);
    }
    return [
      { produceId: 'potato', quantity: 2 },
      { produceId: 'onion', quantity: 1 },
      { produceId: 'tomato', quantity: 1.5 },
      { produceId: 'coriander', quantity: 1 },
    ];
  });

  const [activeTab, setActiveTab] = useState('board'); // 'board' | 'checker' | 'basket' | 'vendors' | 'proposal'
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedProduceForChecker, setSelectedProduceForChecker] = useState('tomato');
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

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BASKET, JSON.stringify(basket));
  }, [basket]);

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
        // Weighted average with new report
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

        // Add or update shop rate
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

    showToast(`✅ Thank you! Today's rate for ₹${numericPrice} recorded for ${getMarket(marketId).name}.`);
    return true;
  };

  const addToBasket = (produceId, quantity = 1) => {
    const numQty = parseFloat(quantity) || 1;
    setBasket((prevBasket) => {
      const existing = prevBasket.find((b) => b.produceId === produceId);
      if (existing) {
        return prevBasket.map((b) =>
          b.produceId === produceId ? { ...b, quantity: Math.round((b.quantity + numQty) * 10) / 10 } : b
        );
      }
      return [...prevBasket, { produceId, quantity: numQty }];
    });
    const item = produceList.find((p) => p.id === produceId);
    showToast(`🛒 Added ${numQty} ${item?.unit || 'unit'} of ${item?.name || 'produce'} to your basket`);
  };

  const updateBasketQuantity = (produceId, quantity) => {
    const num = parseFloat(quantity);
    if (isNaN(num) || num <= 0) {
      removeFromBasket(produceId);
      return;
    }
    setBasket((prev) =>
      prev.map((b) => (b.produceId === produceId ? { ...b, quantity: Math.round(num * 10) / 10 } : b))
    );
  };

  const removeFromBasket = (produceId) => {
    setBasket((prev) => prev.filter((b) => b.produceId !== produceId));
  };

  const clearBasket = () => {
    setBasket([]);
    showToast('Shopping basket cleared', 'info');
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

    showToast('🌟 Review posted! Thank you for supporting honest vendors.');
    return true;
  };

  const resetToFactoryData = () => {
    localStorage.removeItem(STORAGE_KEYS.PRODUCE);
    localStorage.removeItem(STORAGE_KEYS.VENDORS);
    localStorage.removeItem(STORAGE_KEYS.BASKET);
    setProduceList(PRODUCE_ITEMS);
    setVendorsList(VENDORS);
    setBasket([
      { produceId: 'potato', quantity: 2 },
      { produceId: 'onion', quantity: 1 },
      { produceId: 'tomato', quantity: 1.5 },
      { produceId: 'coriander', quantity: 1 },
    ]);
    showToast('Refreshed to authentic baseline market prices', 'info');
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
        basket,
        addToBasket,
        updateBasketQuantity,
        removeFromBasket,
        clearBasket,
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
