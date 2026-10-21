import React from 'react';
import { ScreenType } from '../types';
import { LIFE_PAGE } from '../data/products/sbuConfigs';
import { SbuLandingPage } from './SbuLandingPage';

interface SbuLifeViewProps {
  onNavigate: (screen: ScreenType) => void;
}

export const SbuLifeView: React.FC<SbuLifeViewProps> = ({ onNavigate }) => (
  <SbuLandingPage config={LIFE_PAGE} onNavigate={onNavigate} />
);
