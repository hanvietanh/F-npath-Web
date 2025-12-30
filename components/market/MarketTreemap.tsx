import React from 'react';
import { TreemapBlock } from './TreemapBlock';

export const MarketTreemap = () => {
    return (
        <div className="flex-1 p-1 flex flex-col gap-1 min-h-0 bg-[#000000] overflow-hidden">
            {/* Row 1 */}
            <div className="flex-1 flex gap-1 min-h-0">
                {/* HPG Block */}
                <div className="w-[22%] flex flex-col">
                <TreemapBlock symbol="HPG" percent="+2.48%" color="#00c853" className="flex-1" />
                </div>

                {/* Real Estate (Bất động sản) */}
                <div className="w-[43%] flex flex-col bg-[#1c1c1e] relative">
                <div className="absolute top-0 left-0 bg-black/40 text-[9px] text-white px-1 z-10 font-bold">Bất động sản</div>
                <div className="flex-1 grid grid-cols-4 grid-rows-4 gap-0.5 mt-0.5">
                        <TreemapBlock symbol="CII" percent="+0.44%" color="#00c853" className="col-span-1 row-span-1" />
                        <TreemapBlock symbol="DXG" percent="0%" color="#fbc02d" className="col-span-1 row-span-1" />
                        <TreemapBlock symbol="VIC" percent="-1.9%" color="#f23645" className="col-span-1 row-span-1" />
                        <div className="col-span-1 row-span-1 grid grid-cols-2 gap-0.5">
                        <TreemapBlock symbol="PDR" percent="-0.7%" color="#f23645" />
                        <TreemapBlock symbol="DIG" percent="-1.6%" color="#f23645" />
                        </div>

                        <TreemapBlock symbol="VRE" percent="-0.78%" color="#f23645" className="col-span-2 row-span-1" />
                        <TreemapBlock symbol="NVL" percent="-0.38%" color="#f23645" className="col-span-1 row-span-1" />
                        <div className="col-span-1 row-span-1 grid grid-cols-2 gap-0.5">
                        <TreemapBlock symbol="NKG" percent="+2.3%" color="#00c853" />
                        <TreemapBlock symbol="TCH" percent="-0.8%" color="#f23645" />
                        </div>

                        <TreemapBlock symbol="VHM" percent="-3.76%" color="#f23645" className="col-span-2 row-span-2" />
                        <div className="col-span-2 row-span-2 grid grid-cols-3 grid-rows-3 gap-0.5">
                            <TreemapBlock symbol="KHG" percent="-1.4%" color="#f23645" className="col-span-2" />
                            <TreemapBlock symbol="VCG" percent="-1.2%" color="#f23645" />
                            <TreemapBlock symbol="HQC" percent="-1.9%" color="#f23645" className="col-span-2" />
                            <TreemapBlock symbol="IJC" percent="-0.9%" color="#f23645" />
                            <TreemapBlock symbol="HDC" percent="-2.9%" color="#f23645" />
                            <TreemapBlock symbol="NLG" percent="-2.9%" color="#f23645" />
                            <TreemapBlock symbol="SCR" percent="+0.1%" color="#00c853" />
                        </div>
                </div>
                </div>

                {/* Securities (Chứng khoán) */}
                <div className="w-[35%] flex flex-col bg-[#1c1c1e] relative">
                <div className="absolute top-0 left-0 bg-black/40 text-[9px] text-white px-1 z-10 font-bold">Chứng khoán</div>
                <div className="flex-1 grid grid-cols-3 grid-rows-3 gap-0.5 mt-0.5">
                    <TreemapBlock symbol="VIX" percent="-0.87%" color="#f23645" className="col-span-2 row-span-2" />
                    <TreemapBlock symbol="SSI" percent="+0.82%" color="#00c853" className="col-span-1 row-span-2" />
                    <TreemapBlock symbol="VND" percent="0%" color="#fbc02d" className="col-span-2 row-span-1" />
                    <div className="col-span-1 row-span-1 grid grid-rows-2 gap-0.5">
                        <TreemapBlock symbol="HCM" percent="0%" color="#fbc02d" />
                        <TreemapBlock symbol="FTS" percent="+1.2%" color="#00c853" />
                    </div>
                    <div className="col-span-3 row-span-1 grid grid-cols-2 gap-0.5 h-8 mt-auto absolute bottom-0 w-full hidden"></div>
                    {/* Fill gaps visually */}
                    <div className="absolute bottom-0 w-full h-[25%] flex gap-0.5">
                            <TreemapBlock symbol="VCI" percent="+3.49%" color="#00c853" className="w-[70%]" />
                            <div className="flex-1 bg-[#00c853] flex items-center justify-center text-[8px] font-bold text-white">FTS</div>
                    </div>
                </div>
                </div>
            </div>

            {/* Row 2 */}
            <div className="flex-1 flex gap-1 min-h-0">
                {/* Banks (Ngân hàng) */}
                <div className="w-[65%] flex flex-col bg-[#1c1c1e] relative">
                <div className="absolute top-0 left-0 bg-black/40 text-[9px] text-white px-1 z-10 font-bold">Ngân hàng</div>
                <div className="flex-1 grid grid-cols-5 grid-rows-4 gap-0.5 mt-0.5">
                    {/* SHB Big Block */}
                    <TreemapBlock symbol="SHB" percent="-0.91%" color="#f23645" className="col-span-2 row-span-4" />
                    
                    {/* VPB/MBB Middle Col */}
                    <div className="col-span-2 row-span-4 grid grid-rows-4 gap-0.5">
                        <TreemapBlock symbol="VPB" percent="-2.09%" color="#f23645" className="row-span-2" />
                        <TreemapBlock symbol="MBB" percent="+0.27%" color="#00c853" className="row-span-2" />
                    </div>
                    
                    {/* Last Column */}
                    <div className="col-span-1 row-span-4 grid grid-rows-4 gap-0.5">
                        <TreemapBlock symbol="TCB" percent="0%" color="#fbc02d" />
                        <TreemapBlock symbol="ACB" percent="+0.59%" color="#00c853" />
                        <TreemapBlock symbol="STB" percent="+1.3%" color="#00c853" />
                        <TreemapBlock symbol="VIB" percent="+0.48%" color="#00c853" />
                    </div>
                </div>
                </div>

                {/* Consumer & Energy (Tiêu dùng & Năng lượng) - Fills the gap */}
                <div className="w-[35%] flex flex-col bg-[#1c1c1e] relative">
                    <div className="absolute top-0 left-0 bg-black/40 text-[9px] text-white px-1 z-10 font-bold">Tiêu dùng & Năng lượng</div>
                    <div className="flex-1 grid grid-cols-3 grid-rows-4 gap-0.5 mt-0.5">
                        {/* GAS */}
                        <TreemapBlock symbol="GAS" percent="-0.8%" color="#f23645" className="col-span-2 row-span-2" />
                        
                        {/* Retailers */}
                        <div className="col-span-1 row-span-2 grid grid-rows-2 gap-0.5">
                            <TreemapBlock symbol="MWG" percent="-1.1%" color="#f23645" />
                            <TreemapBlock symbol="PNJ" percent="+0.5%" color="#00c853" />
                        </div>

                        {/* Mixed */}
                        <TreemapBlock symbol="VNM" percent="-0.4%" color="#f23645" className="col-span-1 row-span-2" />
                        <TreemapBlock symbol="MSN" percent="+1.7%" color="#00c853" className="col-span-1 row-span-2" />
                        
                        <div className="col-span-1 row-span-2 grid grid-rows-2 gap-0.5">
                            <TreemapBlock symbol="PLX" percent="+0.5%" color="#00c853" />
                            <TreemapBlock symbol="SAB" percent="-0.1%" color="#f23645" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};