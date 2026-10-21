import React from 'react';
import { Country, ScreenType } from '../types';
import { AGRO_PAGE } from '../data/products/sbuConfigs';
import { SbuLandingPage } from './SbuLandingPage';

interface SbuAgribusinessViewProps {
  country: Country;
  onNavigate: (screen: ScreenType) => void;
}

export const SbuAgribusinessView: React.FC<SbuAgribusinessViewProps> = ({ onNavigate }) => (
  <SbuLandingPage config={AGRO_PAGE} onNavigate={onNavigate} />
);
