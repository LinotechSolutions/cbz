import React from 'react';
import { Country, ScreenType } from '../types';
import { INSURANCE_PAGE } from '../data/products/sbuConfigs';
import { SbuLandingPage } from './SbuLandingPage';

interface SbuInsuranceViewProps {
  country: Country;
  onNavigate: (screen: ScreenType) => void;
}

export const SbuInsuranceView: React.FC<SbuInsuranceViewProps> = ({ onNavigate }) => (
  <SbuLandingPage config={INSURANCE_PAGE} onNavigate={onNavigate} />
);
