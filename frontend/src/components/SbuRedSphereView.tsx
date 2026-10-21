import React from 'react';
import { ScreenType } from '../types';
import { RED_SPHERE_PAGE } from '../data/products/sbuConfigs';
import { SbuLandingPage } from './SbuLandingPage';

interface SbuRedSphereViewProps {
  onNavigate: (screen: ScreenType) => void;
}

export const SbuRedSphereView: React.FC<SbuRedSphereViewProps> = ({ onNavigate }) => (
  <SbuLandingPage config={RED_SPHERE_PAGE} onNavigate={onNavigate} />
);
