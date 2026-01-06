import React from 'react';
import { ProjectionTooltip } from './overlays/ProjectionTooltip';
import { FeatureHTMLOverlays } from './overlays/FeatureHTMLOverlays';
import { PrdHtmlLayer } from './overlays/PrdHtmlLayer';
import { PrdModuleId } from './prdConstants';

interface ChartHTMLProps {
  activeFeature: string | null;
  showProjection?: boolean;
  activePrdModule?: PrdModuleId | null;
}

export const ChartHTMLLayers: React.FC<ChartHTMLProps> = ({ activeFeature, showProjection, activePrdModule }) => {
  return (
    <>
      {showProjection && <ProjectionTooltip />}
      {activeFeature && <FeatureHTMLOverlays activeFeature={activeFeature} />}
      {activePrdModule && <PrdHtmlLayer activeModule={activePrdModule} />}
    </>
  );
};
