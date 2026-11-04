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
    expect(screen.getAllByText(/Bridging the Gaps/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/Dadar Market/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Verified Today's Mandai Rates/i)).toBeInTheDocument();
  });

  test('allows searching for produce by name', () => {
    render(<App />);

    const searchInput = screen.getByPlaceholderText(/Search produce/i);
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

  test('switches to Fair Price Checker tab and calculates quote verdict', () => {
    render(<App />);

    const checkerTab = screen.getByRole('button', { name: /Fair Price Checker/i });
    fireEvent.click(checkerTab);

    expect(screen.getByText(/Instant Fair Price Checker/i)).toBeInTheDocument();
    expect(screen.getByText(/Introvert-Friendly Bargaining Guide/i)).toBeInTheDocument();
    expect(screen.getByText(/What did the vendor quote you\?/i)).toBeInTheDocument();

    // Verify script suggestions exist
    expect(screen.getByText(/Hinglish \/ Hindi/i)).toBeInTheDocument();
    expect(screen.getByText(/Marathi/i)).toBeInTheDocument();
    expect(screen.getByText(/English/i)).toBeInTheDocument();
  });

  test('switches to My Basket tab and shows total budget estimate', () => {
    render(<App />);

    const basketTab = screen.getByRole('button', { name: /My Basket/i });
    fireEvent.click(basketTab);

    expect(screen.getByText(/Daily Shopping Basket & Budget Estimator/i)).toBeInTheDocument();
    expect(screen.getByText(/Market Bill Estimate/i)).toBeInTheDocument();
    expect(screen.getByText(/Recommended Fair Target/i)).toBeInTheDocument();
  });

  test('switches to Local Shops & Reviews tab', () => {
    render(<App />);

    const vendorsTab = screen.getByRole('button', { name: /Local Shops & Reviews/i });
    fireEvent.click(vendorsTab);

    expect(screen.getByText(/Local Vendors & Fair-Price Trust Directory/i)).toBeInTheDocument();
    expect(screen.getByText(/Rameshwar Vegetable Stall/i)).toBeInTheDocument();
  });

  test('switches to VJTI Proposal tab and displays Arpan Gupta academic credits', () => {
    render(<App />);

    const proposalTab = screen.getByRole('button', { name: /VJTI Proposal/i });
    fireEvent.click(proposalTab);

    expect(
      screen.getByText(/VEERMATA JIJABAI TECHNOLOGICAL INSTITUTE, MUMBAI/i)
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Arpan Kailash Gupta/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/Prof. Chandreshekhar/i)).toBeInTheDocument();
    expect(screen.getByText(/SWOT Analysis \(from VJTI Report\)/i)).toBeInTheDocument();
  });

  test('allows changing selected market from dropdown', () => {
    render(<App />);

    const marketSelect = screen.getByLabelText(/Select Market/i);
    fireEvent.change(marketSelect, { target: { value: 'bandra-pali' } });

    expect(screen.getAllByText(/Bandra Pali Market/i).length).toBeGreaterThan(0);
  });
});
