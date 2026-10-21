import React from 'react';
import { ScreenType } from '../types';
import { CAPITAL_PAGE } from '../data/products/sbuConfigs';
import { SbuLandingPage } from './SbuLandingPage';

interface SbuCapitalViewProps {
  onNavigate: (screen: ScreenType) => void;
}

export const SbuCapitalView: React.FC<SbuCapitalViewProps> = ({ onNavigate }) => (
  <SbuLandingPage config={CAPITAL_PAGE} onNavigate={onNavigate} />
);

export default SbuCapitalView;
