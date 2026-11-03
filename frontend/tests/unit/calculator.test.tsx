import { describe, expect, it } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Calculator } from '../../src/islands/Calculator';
import { CALCULATORS } from '../../src/data/calculators';

describe('<Calculator>', () => {
  it('shows a repayment once price, term and rate are entered', () => {
    render(<Calculator variant="mortgage" config={CALCULATORS.mortgage} />);
    fireEvent.change(screen.getByLabelText('Property price'), { target: { value: '100000' } });
    fireEvent.change(screen.getByLabelText('Term in years'), { target: { value: '10' } });
    fireEvent.change(screen.getByLabelText('Interest rate per year'), { target: { value: '12' } });
    expect(screen.getByText('Monthly repayment')).toBeInTheDocument();
    // The figure appears in the visible result and in the polite live region.
    expect(screen.getAllByText(/1,434\.71/).length).toBeGreaterThan(0);
  });
  it('says rates are coming soon when no table is configured', () => {
    render(<Calculator variant="carInsurance" config={CALCULATORS.carInsurance} />);
    expect(screen.getByText('Indicative rates coming soon')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Get a car insurance quote' })).toBeInTheDocument();
  });
  it('flags a deposit that covers the price', () => {
    render(<Calculator variant="carFinance" config={CALCULATORS.carFinance} />);
    fireEvent.change(screen.getByLabelText('Vehicle price'), { target: { value: '5000' } });
    fireEvent.change(screen.getByLabelText('Deposit'), { target: { value: '6000' } });
    fireEvent.change(screen.getByLabelText('Term in years'), { target: { value: '3' } });
    fireEvent.change(screen.getByLabelText('Interest rate per year'), { target: { value: '10' } });
    expect(screen.getByText(/covers the full price/)).toBeInTheDocument();
  });
});
