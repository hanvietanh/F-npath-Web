
import React from 'react';

export const SignalChart = () => {
  // Mock data to simulate the specific chart look in the screenshot
  const candles = [
    { h: 40, y: 150, c: '#f23645' },
    { h: 20, y: 140, c: '#00c853' },
    { h: 60, y: 110, c: '#00c853' },
    { h: 30, y: 120, c: '#f23645' },
    { h: 50, y: 90, c: '#00c853' },
    { h: 25, y: 100, c: '#00c853' },
    { h: 45, y: 70, c: '#00c853' }, // Big green one
    { h: 15, y: 65, c: '#f23645' },
    { h: 35, y: 75, c: '#00c853' },
    { h: 20, y: 80, c: '#f23645' },
    { h: 55, y: 50, c: '#00c853' }, // Current trend
    { h: 30, y: 60, c: '#00c853' },
    { h: 40, y: 40, c: '#00c853' },
    { h: 20, y: 45, c: '#f23645' },
    { h: 10, y: 42, c: '#00c853' }, // Last active
  ];

  return (
    <div className="w-full h-full bg-[#0b0e11] rounded-lg border border-[#2c2c2e] p-4 relative overflow-hidden flex flex-col">
      {/* Chart Toolbar */}
      <div className="flex gap-2 mb-6 z-10">
        <span className="text-[10px] font-medium text-gray-400 bg-[#1c1c1e] border border-[#2c2c2e] px-2 py-1 rounded cursor-pointer hover:text-white transition-colors">D1</span>
        <span className="text-[10px] font-medium text-gray-400 bg-[#1c1c1e] border border-[#2c2c2e] px-2 py-1 rounded cursor-pointer hover:text-white transition-colors">MA 20</span>
        <span className="text-[10px] font-medium text-gray-400 bg-[#1c1c1e] border border-[#2c2c2e] px-2 py-1 rounded cursor-pointer hover:text-white transition-colors">RSI 68</span>
      </div>

      {/* Grid Lines (Dashed) */}
      <div className="absolute inset-0 top-16 bottom-8 left-0 right-0 pointer-events-none flex flex-col justify-between px-4">
         <div className="border-t border-[#2c2c2e] border-dashed w-full h-px"></div>
         <div className="border-t border-[#2c2c2e] border-dashed w-full h-px"></div>
         <div className="border-t border-[#2c2c2e] border-dashed w-full h-px"></div>
         <div className="border-t border-[#2c2c2e] border-dashed w-full h-px"></div>
      </div>

      {/* Candles */}
      <div className="flex-1 flex items-end px-4 gap-3 relative z-0 pb-8">
          {candles.map((c, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center justify-end h-full relative group">
                  {/* Wick */}
                  <div 
                    className="w-[1px] absolute opacity-80"
                    style={{ 
                        backgroundColor: c.c,
                        height: `${c.h + 20}px`, 
                        bottom: `${c.y - 10}px` 
                    }}
                  ></div>
                  {/* Body */}
                  <div 
                    className="w-full max-w-[14px] rounded-[1px] relative z-10"
                    style={{ 
                        backgroundColor: c.c,
                        height: `${c.h}px`,
                        marginBottom: `${c.y}px`
                    }}
                  ></div>
              </div>
          ))}
          
          {/* Active Price Indicator Line */}
          <div className="absolute left-0 right-0 bottom-[145px] flex items-center pointer-events-none z-20">
              <div className="flex-1 border-t border-[#00c853] border-dashed opacity-50"></div>
              {/* Price Tag not needed here if it's in the header, but screenshot shows it on chart sometimes. 
                  In this design, price is prominent in header. I'll add a small tag on axis. */}
          </div>
      </div>
    </div>
  );
};
