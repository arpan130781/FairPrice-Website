import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, beforeEach } from 'vitest';
import App from './App';

describe('FairPrice Application Suite', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('renders brand title, tagline, and default Dadar market view', () => {
    render(<App />);

    expect(screen.getAllByText('FairPrice').length).toBeGreaterThan(0);
    expect(screen.getByText(/Local Grocery Price Intelligence/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Dadar Market/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Real-Time Mandai & Street Rates/i)).toBeInTheDocument();
    expect(screen.getByText(/does not sell anything/i)).toBeInTheDocument();
  });

  test('allows searching for produce by name', () => {
    render(<App />);

    const searchInput = screen.getByPlaceholderText(/Search groceries/i);
    fireEvent.change(searchInput, { target: { value: 'Tomato' } });

    expect(screen.getByText(/Tomato \(Hybrid \/ Local\)/i)).toBeInTheDocument();
  });

  test('filters produce when category chips are clicked', () => {
    render(<App />);

    const fruitsButton = screen.getByRole('button', { name: /Fresh Fruits/i });
    fireEvent.click(fruitsButton);

    expect(screen.getByText(/Apple \(Shimla \/ Kinnaur\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Banana \(Robusta \/ Elaichi\)/i)).toBeInTheDocument();
  });

  test('switches to Compare Markets tab and displays side-by-side comparison', () => {
    render(<App />);

    const compareTab = screen.getAllByRole('button', { name: /Compare Markets/i })[0];
    fireEvent.click(compareTab);

    expect(screen.getByText(/Cross-Market Price Comparison/i)).toBeInTheDocument();
    expect(screen.getByText(/Lowest Market Today/i)).toBeInTheDocument();
    expect(screen.getByText(/Mumbai City Average/i)).toBeInTheDocument();
  });

  test('switches to Fair Price Verifier tab and calculates quote verdict', () => {
    render(<App />);

    const checkerTab = screen.getByRole('button', { name: /Fair Price Verifier/i });
    fireEvent.click(checkerTab);

    expect(screen.getByText(/Is the Vendor's Quote Fair\?/i)).toBeInTheDocument();
    expect(screen.getByText(/Live Quote Verifier & Introvert Guide/i)).toBeInTheDocument();
    expect(screen.getByText(/What did the vendor quote you\?/i)).toBeInTheDocument();

    expect(screen.getByText(/Hinglish \/ Hindi/i)).toBeInTheDocument();
    expect(screen.getByText(/Marathi/i)).toBeInTheDocument();
    expect(screen.getByText(/English/i)).toBeInTheDocument();
  });

  test('switches to Local Stalls & Feedback tab', () => {
    render(<App />);

    const vendorsTab = screen.getByRole('button', { name: /Local Stalls & Feedback/i });
    fireEvent.click(vendorsTab);

    expect(screen.getByText(/Local Vendors & Fair-Price Trust Directory/i)).toBeInTheDocument();
    expect(screen.getByText(/Rameshwar Vegetable Stall/i)).toBeInTheDocument();
  });

  test('switches to About Project tab and shows Arpan Kailash Gupta individual credits with zero VJTI mention', () => {
    render(<App />);

    const aboutTab = screen.getByRole('button', { name: /About Project/i });
    fireEvent.click(aboutTab);

    expect(screen.getAllByText(/Individual Open-Data Initiative/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Arpan Kailash Gupta/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Why FairPrice Will Never Sell or Deliver Anything/i)).toBeInTheDocument();

    // Verify VJTI, TY Electrical, and Chandreshekhar are completely absent
    expect(screen.queryByText(/VJTI/i)).toBeNull();
    expect(screen.queryByText(/TY Electrical/i)).toBeNull();
    expect(screen.queryByText(/Chandreshekhar/i)).toBeNull();
  });

  test('allows changing selected market from dropdown', () => {
    render(<App />);

    const marketSelect = screen.getByLabelText(/Select Market/i);
    fireEvent.change(marketSelect, { target: { value: 'bandra-pali' } });

    expect(screen.getAllByText(/Bandra Pali Market/i).length).toBeGreaterThan(0);
  });
});
