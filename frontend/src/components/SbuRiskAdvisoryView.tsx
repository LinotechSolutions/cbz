import React from 'react';
import { ScreenType } from '../types';
import { RISK_ADVISORY_PAGE } from '../data/products/sbuConfigs';
import { SbuLandingPage } from './SbuLandingPage';

interface SbuRiskAdvisoryViewProps {
  onNavigate: (screen: ScreenType) => void;
}

export const SbuRiskAdvisoryView: React.FC<SbuRiskAdvisoryViewProps> = ({ onNavigate }) => (
  <SbuLandingPage config={RISK_ADVISORY_PAGE} onNavigate={onNavigate} />
);

export default SbuRiskAdvisoryView;
