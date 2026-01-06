import React from 'react';
import { CandleData } from '../../types';
import { ProjectionLayer } from './layers/ProjectionLayer';
import { FeatureSVGLayers } from './layers/FeatureSVGLayers';
import { PrdSVGLayer } from './layers/PrdSVGLayer';
import { PrdModuleId } from './prdConstants';

interface ChartSVGProps {
  activeFeature: string | null;
  activePrdModule?: PrdModuleId | null;
  data: CandleData[];
  dimensions: { width: number; height: number };
  getX: (i: number) => number;
  getY: (p: number) => number;
  padding: { top: number; bottom: number; right: number };
  effectiveHeight: number;
  barWidth: number;
  minPrice: number;
  maxPrice: number;
  priceRange: number;
  lastCandle: CandleData;
  showProjection?: boolean;
  onPrdSelect?: (id: string) => void;
  selectedPrdItem?: string | null;
}

export const ChartSVGLayers: React.FC<ChartSVGProps> = (props) => {
  return (
    <>
      {/* 1. Future Projection Layer */}
      {props.showProjection && (
        <ProjectionLayer 
           data={props.data}
           dimensions={props.dimensions}
           getX={props.getX}
           getY={props.getY}
           padding={props.padding}
           lastCandle={props.lastCandle}
        />
      )}

      {/* 2. Standard Features Layer (Old) */}
      {props.activeFeature && (
        <FeatureSVGLayers 
           {...props} 
           activeFeature={props.activeFeature}
        />
      )}

      {/* 3. New PRD Module Layer */}
      {props.activePrdModule && (
        <PrdSVGLayer 
           activeModule={props.activePrdModule}
           data={props.data}
           dimensions={props.dimensions}
           getX={props.getX}
           getY={props.getY}
           lastCandle={props.lastCandle}
           minPrice={props.minPrice}
           maxPrice={props.maxPrice}
           priceRange={props.priceRange}
           onSelect={props.onPrdSelect || (() => {})}
           selectedId={props.selectedPrdItem || null}
        />
      )}
    </>
  );
};