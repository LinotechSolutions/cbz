import React, { useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Subsidiary, ScreenType } from '../types';
import { SUBSIDIARIES } from '../data/cbzData';
import { Logo } from './Logo';
import { BRAND_BY_KEY } from '../brand/logos';
import { useSiteImage } from '../context/SiteImagesContext';
import { GROUP_CLUSTERS } from '../data/groupStructure';

interface EcosystemGridProps {
  onNavigate: (screen: ScreenType) => void;
}

export const EcosystemGrid: React.FC<EcosystemGridProps> = ({ onNavigate }) => {
  const siteImage = useSiteImage();
  const [selectedSubId, setSelectedSubId] = useState<string>('bank');

  const selectedSub =
    SUBSIDIARIES.find((s) => s.id === selectedSubId) || SUBSIDIARIES[0];

  // Which of the Group's four operating clusters the selected company sits in.
  const selectedCluster = GROUP_CLUSTERS.find((c) => c.id === selectedSub.cluster);

  // Pre-load all subsidiary spotlight images into browser cache so tab switching is instantaneous
  React.useEffect(() => {
    SUBSIDIARIES.forEach((sub) => {
      if (sub.image) {
        const img = new Image();
        img.src = sub.image;
      }
    });
  }, []);

  // Helper to render official subsidiary logo badge using master SVGs
  const renderSubsidiaryLogo = (sub: Subsidiary, size: 'sm' | 'md' | 'lg' = 'md') => {
    const brand = BRAND_BY_KEY[sub.id] || BRAND_BY_KEY[sub.name.toLowerCase().replace(/^cbz\s+/, '')] || 'holdings';
    const h = size === 'lg' ? 44 : size === 'md' ? 32 : 28;
    return <Logo brand={brand} variant="full" height={h} clearSpace={false} />;
  };

  return (
    <section className="py-12 sm:py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-5 border-b border-slate-200">
          <div>
            <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-[#E4002B] mb-1.5">
              <span className="w-1.5 h-3.5 bg-[#E4002B] rounded-xs inline-block" />
              <span>Group subsidiaries</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#002554]">
              One group, nine businesses
            </h2>
            {/* The count is already made in the hero's credibility strip; this
                section leads with what the connections do instead of repeating it. */}
            <p className="text-sm text-cbz-grey mt-1 max-w-2xl">
              A mortgage that brings its own home insurance. A harvest that funds next season. Pick a business to see what it does.
            </p>
          </div>

          <button
            onClick={() => onNavigate('group')}
            className="text-xs sm:text-sm font-bold text-[#E4002B] hover:text-[#C50025] flex items-center space-x-1.5 mt-4 md:mt-0 transition-colors cursor-pointer"
          >
            <span>See Connected Group Journey</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Subsidiary Logos Strip (Prominently showcasing official logos as requested) */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 p-3.5 sm:p-4 shadow-xs mb-5">
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 sm:gap-2.5">
            {SUBSIDIARIES.map((sub) => {
              const isSelected = sub.id === selectedSubId;
              return (
                <button
                  type="button"
                  key={sub.id}
                  onClick={() => setSelectedSubId(sub.id)}
                  className={`p-2 rounded-xl border text-center flex flex-col items-center justify-center transition-all duration-150 cursor-pointer h-16 sm:h-20 ${
                    isSelected
                      ? 'bg-blue-50/50 border-[#002554] ring-2 ring-[#002554]/10 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                  title={sub.name}
                >
                  <div className="h-8 sm:h-10 flex items-center justify-center">
                    {renderSubsidiaryLogo(sub, 'sm')}
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-bold text-cbz-ink mt-0.5 sm:mt-1 truncate max-w-full">
                    {sub.category}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Subsidiary Spotlight (Clean editorial layout, not a repetitive card) */}
        <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Visual Column */}
            <div className="lg:col-span-5 relative bg-slate-900 min-h-[170px] sm:min-h-[210px] lg:min-h-full">
              <img
                {...siteImage(`ecosystem.${selectedSub.id}`, selectedSub.image, selectedSub.name)}
                loading="eager"
                decoding="async"
                fetchPriority="high"
                className="w-full h-full object-cover opacity-80"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/cbz-banking.webp';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#001736] via-[#001736]/40 to-transparent" />

              <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 text-white">
                <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider bg-[#E4002B] text-white">
                  {selectedCluster ? selectedCluster.name : `${selectedSub.category} Division`}
                </span>
                <p className="text-sm sm:text-base font-bold text-white mt-1.5 sm:mt-2 leading-snug">
                  "{selectedSub.tagline}"
                </p>
              </div>
            </div>

            {/* Profile & Capabilities Column */}
            <div className="lg:col-span-7 p-4 sm:p-6 flex flex-col justify-between">
              <div>
                {/* Official Logo Headline */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="h-10 flex items-center">
                    {renderSubsidiaryLogo(selectedSub, 'lg')}
                  </div>
                  {selectedSub.isCore && (
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#002554] text-white">
                      Core Balance Sheet Flagship
                    </span>
                  )}
                </div>

                <div className="mt-5 space-y-3">
                  <h3 className="text-xl sm:text-2xl font-black text-[#002554]">
                    {selectedSub.name}
                  </h3>
                  <p className="text-sm text-cbz-grey leading-relaxed">
                    {selectedSub.description}
                  </p>
                </div>

                {/* The four-item capability checklist that sat here was identical
                    for all nine subsidiaries, so it said nothing about the one on
                    screen and added a block of height to every switch. Removed as
                    part of shortening the homepage. */}
              </div>

              {/* Action Button Row */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                <span className="text-xs text-cbz-grey">
                  {selectedCluster ? `${selectedCluster.name} · ` : ''}Part of CBZ Holdings Limited (ZSE: CBZ)
                </span>

                <div className="w-full sm:w-auto flex items-center space-x-3">
                  {selectedSub.screen ? (
                    <button
                      onClick={() => onNavigate(selectedSub.screen!)}
                      className="w-full sm:w-auto justify-center px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-xl bg-[#002554] hover:bg-[#0A3E80] text-white text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer shadow-xs"
                    >
                      <span>Explore {selectedSub.name} Portal</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={() => onNavigate('group')}
                      className="w-full sm:w-auto justify-center px-4 py-2.5 sm:px-5 sm:py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all flex items-center space-x-2 cursor-pointer"
                    >
                      <span>Contact Corporate Advisory Desk</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
