import React from 'react';
import { CandleData } from '../../types';
import { ProjectionLayer } from './layers/ProjectionLayer';
import { FeatureSVGLayers } from './layers/FeatureSVGLayers';

interface ChartSVGProps {
  activeFeature: string | null;
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

      {/* 2. Standard Features Layer */}
      {props.activeFeature && (
        <FeatureSVGLayers 
           {...props} 
           activeFeature={props.activeFeature}
        />
      )}
    </>
  );
};