import React from 'react';
import { useMarket } from '../context/MarketContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function Toast() {
  const { toast } = useMarket();

  if (!toast) return null;

  const isError = toast.type === 'error';
  const isInfo = toast.type === 'info';

  return (
    <div className={`toast-container ${isError ? 'toast-error' : isInfo ? 'toast-info' : 'toast-success'}`}>
      <div className="toast-icon">
        {isError ? <AlertCircle size={18} /> : isInfo ? <Info size={18} /> : <CheckCircle2 size={18} />}
      </div>
      <span className="toast-message">{toast.message}</span>
    </div>
  );
}
