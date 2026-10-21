import React from 'react';
import { Country, ScreenType } from '../types';
import { PROPERTIES_PAGE } from '../data/products/sbuConfigs';
import { SbuLandingPage } from './SbuLandingPage';

interface SbuPropertiesViewProps {
  country: Country;
  onNavigate: (screen: ScreenType) => void;
}

export const SbuPropertiesView: React.FC<SbuPropertiesViewProps> = ({ onNavigate }) => (
  <SbuLandingPage config={PROPERTIES_PAGE} onNavigate={onNavigate} />
);
