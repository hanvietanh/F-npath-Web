import React from 'react';
import { ProjectionTooltip } from './overlays/ProjectionTooltip';
import { FeatureHTMLOverlays } from './overlays/FeatureHTMLOverlays';

interface ChartHTMLProps {
  activeFeature: string | null;
  showProjection?: boolean;
}

export const ChartHTMLLayers: React.FC<ChartHTMLProps> = ({ activeFeature, showProjection }) => {
  return (
    <>
      {showProjection && <ProjectionTooltip />}
      {activeFeature && <FeatureHTMLOverlays activeFeature={activeFeature} />}
    </>
  );
};