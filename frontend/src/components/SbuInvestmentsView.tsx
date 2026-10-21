import React from 'react';
import { Country, ScreenType } from '../types';
import { DATVEST_PAGE } from '../data/products/sbuConfigs';
import { SbuLandingPage } from './SbuLandingPage';

interface SbuInvestmentsViewProps {
  country: Country;
  onNavigate: (screen: ScreenType) => void;
}

export const SbuInvestmentsView: React.FC<SbuInvestmentsViewProps> = ({ onNavigate }) => (
  <SbuLandingPage config={DATVEST_PAGE} onNavigate={onNavigate} />
);
