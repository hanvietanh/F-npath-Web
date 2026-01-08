
import React from 'react';

interface SparklineProps {
    data: number[];
    color: string;
}

export const Sparkline: React.FC<SparklineProps> = ({ data, color }) => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const width = 80;
    const height = 24;

    const points = data.map((val, i) => {
        const x = (i / (data.length - 1)) * width;
        const y = height - ((val - min) / range) * height;
        return `${x},${y}`;
    }).join(' ');

    return (
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="overflow-visible">
            <path d={`M ${points}`} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            {/* Optional glow effect */}
            <path d={`M ${points}`} fill="none" stroke={color} strokeWidth="4" strokeOpacity="0.1" />
        </svg>
    );
};
