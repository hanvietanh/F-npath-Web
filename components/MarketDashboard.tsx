import React, { useState } from "react";
import {
  Activity,
  Layers,
  Globe,
  Briefcase,
  PieChart,
  BarChart2,
  Filter,
  ChevronDown,
} from "lucide-react";
import {
  INDICES,
  NEWS_POSTS,
  INTELLIGENCE_POSTS,
  TOP_MOVERS_MOCK,
  TOP_VOLUME_MOCK,
  TOP_FOREIGN_MOCK,
} from "./mockData";
import { PostCard } from "./PostCard";
import {
  LiquidityChart,
  ImpactChart,
  ForeignMarketDashboard,
  TreemapBlock,
} from "./MarketWidgets";
import {
  IndicesTickerRow,
  MarketOverviewCard,
  MiniStockRow,
} from "./MarketCommon";

export const MarketDashboard = () => {
  const [activeDashboardTab, setActiveDashboardTab] = useState<
    "market" | "top_stocks" | "industry" | "derivatives"
  >("market");
  const [selectedIndex, setSelectedIndex] = useState("VN30");
  const [viewMode, setViewMode] = useState<"heatmap" | "impact">("heatmap");
  const [activeRightTab, setActiveRightTab] = useState<
    "news" | "intelligence" | "ai_news"
  >("intelligence");

  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const currentIndex =
    INDICES.find((i) => i.id === selectedIndex) || INDICES[0];

  const handleCardClick = (id: string) => {
    setActiveCardId((prev) => (prev === id ? null : id));
  };

  const currentPosts =
    activeRightTab === "intelligence"
      ? NEWS_POSTS
      : activeRightTab === "news"
      ? INTELLIGENCE_POSTS
      : [];

  return (
    <div className="flex h-full w-full bg-[#000000] overflow-hidden font-sans">
      {/* --- Left Column: Market Watch (65%) --- */}
      <div className="w-[65%] flex flex-col border-r border-[#1c1c1e] h-full min-w-0">
        {/* Dashboard Tabs */}
        <div className="flex h-10 border-b border-[#1c1c1e] bg-[#000000] shrink-0">
          {["THỊ TRƯỜNG", "CỔ PHIẾU NỔI BẬT", "NGÀNH", "PHÁI SINH"].map(
            (tabLabel) => {
              const tabKey =
                tabLabel === "THỊ TRƯỜNG"
                  ? "market"
                  : tabLabel === "CỔ PHIẾU NỔI BẬT"
                  ? "top_stocks"
                  : tabLabel === "NGÀNH"
                  ? "industry"
                  : "derivatives";
              const isActive = activeDashboardTab === tabKey;

              return (
                <button
                  key={tabKey}
                  onClick={() => setActiveDashboardTab(tabKey as any)}
                  className={`
                            px-4 text-xs font-bold uppercase tracking-wide transition-colors relative
                            ${
                              isActive
                                ? "text-[#2962ff] bg-[#121212]"
                                : "text-gray-500 hover:text-white hover:bg-[#121212]/50"
                            }
                        `}
                >
                  {tabLabel}
                  {isActive && (
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-[#2962ff]" />
                  )}
                </button>
              );
            }
          )}
        </div>

        {/* Content Area Based on Tab */}
        {activeDashboardTab === "market" && (
          <>
            <IndicesTickerRow
              selected={selectedIndex}
              onSelect={setSelectedIndex}
            />

            <div className="h-[110px] p-2 grid grid-cols-4 gap-2 border-b border-[#1c1c1e] bg-[#000000] shrink-0">
              <MarketOverviewCard
                title="BIẾN ĐỘNG"
                icon={Activity}
                active={activeCardId === "biendong"}
                onClick={() => handleCardClick("biendong")}
              >
                <div className="flex h-full items-center">
                  <div className="flex flex-col justify-center w-[35%] border-r border-[#1c1c1e]/50 pr-2">
                    <div className="text-[10px] text-gray-400 font-bold mb-0.5">
                      {currentIndex.name}
                    </div>
                    <div
                      className={`text-xl font-bold tracking-tight ${
                        currentIndex.color === "#00c853"
                          ? "text-[#00c853]"
                          : "text-[#f23645]"
                      }`}
                    >
                      {currentIndex.val.split(".")[0]}
                    </div>
                    <div
                      className={`text-[10px] font-medium ${
                        currentIndex.color === "#00c853"
                          ? "text-[#00c853]"
                          : "text-[#f23645]"
                      }`}
                    >
                      {currentIndex.chg}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-center pl-2 gap-1.5">
                    <div className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-sm bg-[#00c853]"></div>
                        <span className="text-gray-400">Tăng</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#00c853]">280</span>
                        <span className="text-[9px] text-gray-500 w-10 text-right">
                          8.2k tỷ
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-sm bg-yellow-500"></div>
                        <span className="text-gray-400">0 đổi</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-yellow-500">45</span>
                        <span className="text-[9px] text-gray-500 w-10 text-right">
                          ---
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[10px]">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-sm bg-[#f23645]"></div>
                        <span className="text-gray-400">Giảm</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#f23645]">115</span>
                        <span className="text-[9px] text-gray-500 w-10 text-right">
                          6.7k tỷ
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </MarketOverviewCard>

              <MarketOverviewCard
                title="THANH KHOẢN"
                icon={Layers}
                active={activeCardId === "thanhkhoan"}
                onClick={() => handleCardClick("thanhkhoan")}
              >
                <div className="flex flex-col justify-center h-full pb-2">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-2xl font-bold text-white tracking-tight">
                      15.4K tỷ
                    </span>
                    <span className="text-[10px] px-1.5 py-0.5 bg-[#00c853]/10 text-[#00c853] border border-[#00c853]/30 rounded font-bold">
                      +12%
                    </span>
                  </div>
                  <div className="text-[10px] text-gray-500">
                    So với phiên trước
                  </div>
                </div>
              </MarketOverviewCard>

              <MarketOverviewCard
                title="NƯỚC NGOÀI"
                icon={Globe}
                active={activeCardId === "nuocngoai"}
                onClick={() => handleCardClick("nuocngoai")}
              >
                <div className="flex h-full items-center">
                  <div className="w-[35%] flex flex-col justify-center border-r border-[#1c1c1e]/50 pr-2">
                    <div className="text-lg font-bold text-[#f23645]">
                      -245 Tỷ
                    </div>
                    <div className="text-[9px] text-gray-500 mt-0.5">
                      Giá trị ròng
                    </div>
                  </div>
                  <div className="flex-1 pl-2 flex flex-col justify-center gap-1">
                    <MiniStockRow symbol="HPG" value={-5.8} maxVal={6} />
                    <MiniStockRow symbol="TCB" value={3.0} maxVal={6} />
                    <MiniStockRow symbol="SSI" value={4.0} maxVal={6} />
                  </div>
                </div>
              </MarketOverviewCard>

              <MarketOverviewCard
                title="TỰ DOANH"
                icon={Briefcase}
                active={activeCardId === "tudoanh"}
                onClick={() => handleCardClick("tudoanh")}
              >
                <div className="flex h-full items-center">
                  <div className="w-[35%] flex flex-col justify-center border-r border-[#1c1c1e]/50 pr-2">
                    <div className="text-lg font-bold text-[#00c853]">
                      +54.2 Tỷ
                    </div>
                    <div className="text-[9px] text-gray-500 mt-0.5">
                      Giá trị ròng
                    </div>
                  </div>
                  <div className="flex-1 pl-2 flex flex-col justify-center gap-1">
                    <MiniStockRow symbol="TCB" value={3.1} maxVal={4} />
                    <MiniStockRow symbol="HPG" value={-1.2} maxVal={4} />
                    <MiniStockRow symbol="SST" value={0.8} maxVal={4} />
                  </div>
                </div>
              </MarketOverviewCard>
            </div>

            {activeCardId === "nuocngoai" ? (
              <ForeignMarketDashboard />
            ) : activeCardId === "thanhkhoan" ? (
              <LiquidityChart />
            ) : (
              <div className="flex-1 min-h-0 bg-[#000000] p-1 overflow-hidden relative flex flex-col">
                <div className="absolute top-2 left-3 z-20 flex bg-[#13171b]/90 backdrop-blur rounded border border-[#1c1c1e] p-0.5 shadow-sm opacity-20 hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => setViewMode("heatmap")}
                    className={`px-3 py-1 rounded text-[10px] font-bold transition-all flex items-center gap-1.5 ${
                      viewMode === "heatmap"
                        ? "bg-[#2962ff] text-white shadow"
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    <PieChart size={12} /> Heatmap
                  </button>
                  <button
                    onClick={() => setViewMode("impact")}
                    className={`px-3 py-1 rounded text-[10px] font-bold transition-all flex items-center gap-1.5 ${
                      viewMode === "impact"
                        ? "bg-[#2962ff] text-white shadow"
                        : "text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    <BarChart2 size={12} /> Tác động
                  </button>
                </div>

                {viewMode === "heatmap" ? (
                  <>
                    {/* Treemap View */}
                    <div className="flex-1 p-1 flex flex-col gap-1 min-h-0 bg-[#000000] overflow-hidden">
                      {/* Row 1 */}
                      <div className="flex-1 flex gap-1 min-h-0">
                        {/* HPG Block */}
                        <div className="w-[22%] flex flex-col">
                          <TreemapBlock
                            symbol="HPG"
                            percent="+2.48%"
                            color="#00c853"
                            className="flex-1"
                          />
                        </div>

                        {/* Real Estate (Bất động sản) */}
                        <div className="w-[43%] flex flex-col bg-[#1c1c1e] relative">
                          <div className="absolute top-0 left-0 bg-black/40 text-[9px] text-white px-1 z-10 font-bold">
                            Bất động sản
                          </div>
                          <div className="flex-1 grid grid-cols-4 grid-rows-4 gap-0.5 mt-0.5">
                            <TreemapBlock
                              symbol="CII"
                              percent="+0.44%"
                              color="#00c853"
                              className="col-span-1 row-span-1"
                            />
                            <TreemapBlock
                              symbol="DXG"
                              percent="0%"
                              color="#fbc02d"
                              className="col-span-1 row-span-1"
                            />
                            <TreemapBlock
                              symbol="VIC"
                              percent="-1.9%"
                              color="#f23645"
                              className="col-span-1 row-span-1"
                            />
                            <div className="col-span-1 row-span-1 grid grid-cols-2 gap-0.5">
                              <TreemapBlock
                                symbol="PDR"
                                percent="-0.7%"
                                color="#f23645"
                              />
                              <TreemapBlock
                                symbol="DIG"
                                percent="-1.6%"
                                color="#f23645"
                              />
                            </div>

                            <TreemapBlock
                              symbol="VRE"
                              percent="-0.78%"
                              color="#f23645"
                              className="col-span-2 row-span-1"
                            />
                            <TreemapBlock
                              symbol="NVL"
                              percent="-0.38%"
                              color="#f23645"
                              className="col-span-1 row-span-1"
                            />
                            <div className="col-span-1 row-span-1 grid grid-cols-2 gap-0.5">
                              <TreemapBlock
                                symbol="NKG"
                                percent="+2.3%"
                                color="#00c853"
                              />
                              <TreemapBlock
                                symbol="TCH"
                                percent="-0.8%"
                                color="#f23645"
                              />
                            </div>

                            <TreemapBlock
                              symbol="VHM"
                              percent="-3.76%"
                              color="#f23645"
                              className="col-span-2 row-span-2"
                            />
                            <div className="col-span-2 row-span-2 grid grid-cols-3 grid-rows-3 gap-0.5">
                              <TreemapBlock
                                symbol="KHG"
                                percent="-1.4%"
                                color="#f23645"
                                className="col-span-2"
                              />
                              <TreemapBlock
                                symbol="VCG"
                                percent="-1.2%"
                                color="#f23645"
                              />
                              <TreemapBlock
                                symbol="HQC"
                                percent="-1.9%"
                                color="#f23645"
                                className="col-span-2"
                              />
                              <TreemapBlock
                                symbol="IJC"
                                percent="-0.9%"
                                color="#f23645"
                              />
                              <TreemapBlock
                                symbol="HDC"
                                percent="-2.9%"
                                color="#f23645"
                              />
                              <TreemapBlock
                                symbol="NLG"
                                percent="-2.9%"
                                color="#f23645"
                              />
                              <TreemapBlock
                                symbol="SCR"
                                percent="+0.1%"
                                color="#00c853"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Securities (Chứng khoán) */}
                        <div className="w-[35%] flex flex-col bg-[#1c1c1e] relative">
                          <div className="absolute top-0 left-0 bg-black/40 text-[9px] text-white px-1 z-10 font-bold">
                            Chứng khoán
                          </div>
                          <div className="flex-1 grid grid-cols-3 grid-rows-3 gap-0.5 mt-0.5">
                            <TreemapBlock
                              symbol="VIX"
                              percent="-0.87%"
                              color="#f23645"
                              className="col-span-2 row-span-2"
                            />
                            <TreemapBlock
                              symbol="SSI"
                              percent="+0.82%"
                              color="#00c853"
                              className="col-span-1 row-span-2"
                            />
                            <TreemapBlock
                              symbol="VND"
                              percent="0%"
                              color="#fbc02d"
                              className="col-span-2 row-span-1"
                            />
                            <div className="col-span-1 row-span-1 grid grid-rows-2 gap-0.5">
                              <TreemapBlock
                                symbol="HCM"
                                percent="0%"
                                color="#fbc02d"
                              />
                              <TreemapBlock
                                symbol="FTS"
                                percent="+1.2%"
                                color="#00c853"
                              />
                            </div>
                            <div className="col-span-3 row-span-1 grid grid-cols-2 gap-0.5 h-8 mt-auto absolute bottom-0 w-full hidden"></div>
                            {/* Fill gaps visually */}
                            <div className="absolute bottom-0 w-full h-[25%] flex gap-0.5">
                              <TreemapBlock
                                symbol="VCI"
                                percent="+3.49%"
                                color="#00c853"
                                className="w-[70%]"
                              />
                              <div className="flex-1 bg-[#00c853] flex items-center justify-center text-[8px] font-bold text-white">
                                FTS
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Row 2 */}
                      <div className="flex-1 flex gap-1 min-h-0">
                        {/* Banks (Ngân hàng) */}
                        <div className="w-[65%] flex flex-col bg-[#1c1c1e] relative">
                          <div className="absolute top-0 left-0 bg-black/40 text-[9px] text-white px-1 z-10 font-bold">
                            Ngân hàng
                          </div>
                          <div className="flex-1 grid grid-cols-5 grid-rows-4 gap-0.5 mt-0.5">
                            {/* SHB Big Block */}
                            <TreemapBlock
                              symbol="SHB"
                              percent="-0.91%"
                              color="#f23645"
                              className="col-span-2 row-span-4"
                            />

                            {/* VPB/MBB Middle Col */}
                            <div className="col-span-2 row-span-4 grid grid-rows-4 gap-0.5">
                              <TreemapBlock
                                symbol="VPB"
                                percent="-2.09%"
                                color="#f23645"
                                className="row-span-2"
                              />
                              <TreemapBlock
                                symbol="MBB"
                                percent="+0.27%"
                                color="#00c853"
                                className="row-span-2"
                              />
                            </div>

                            {/* Last Column */}
                            <div className="col-span-1 row-span-4 grid grid-rows-4 gap-0.5">
                              <TreemapBlock
                                symbol="TCB"
                                percent="0%"
                                color="#fbc02d"
                              />
                              <TreemapBlock
                                symbol="ACB"
                                percent="+0.59%"
                                color="#00c853"
                              />
                              <TreemapBlock
                                symbol="STB"
                                percent="+1.3%"
                                color="#00c853"
                              />
                              <TreemapBlock
                                symbol="VIB"
                                percent="+0.48%"
                                color="#00c853"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <ImpactChart />
                )}
              </div>
            )}
          </>
        )}

        {/* Placeholder for other tabs (Top Stocks, Industry, Derivatives) */}
        {activeDashboardTab === "top_stocks" && (
          <div className="flex-1 grid grid-cols-3 gap-1 bg-[#000000] p-1 overflow-hidden">
            <div className="flex flex-col bg-[#000000] border border-[#1c1c1e] rounded overflow-hidden">
              <div className="px-3 py-2 flex justify-between items-center border-b border-[#1c1c1e]">
                <span className="text-sm font-bold text-white">
                  Top biến động
                </span>
                <Filter size={14} className="text-gray-500" />
              </div>
              <div className="px-3 py-2 flex justify-between items-center bg-[#000000] border-b border-[#1c1c1e]/50">
                <div className="flex gap-2">
                  <button className="px-2 py-1 bg-[#2962ff] text-white text-[10px] font-bold rounded">
                    Tăng giá
                  </button>
                  <button className="px-2 py-1 text-gray-400 hover:text-white text-[10px] font-medium transition-colors">
                    Giảm giá
                  </button>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-[#2962ff] font-medium cursor-pointer">
                  Hôm nay <ChevronDown size={12} />
                </div>
              </div>
              <div className="flex-1 overflow-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead className="text-[9px] text-gray-500 uppercase sticky top-0 bg-[#000000] z-10">
                    <tr>
                      <th className="px-3 py-2 font-medium">Mã CK</th>
                      <th className="px-2 py-2 font-medium text-right">Giá</th>
                      <th className="px-2 py-2 font-medium text-right">
                        %Hôm nay
                      </th>
                      <th className="px-2 py-2 font-medium text-right">
                        %Tuần này
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1c1c1e]/30 text-[11px] font-mono">
                    {TOP_MOVERS_MOCK.map((item, i) => (
                      <tr key={i} className="hover:bg-[#121212]">
                        <td className="px-3 py-1.5 font-bold text-white">
                          {item.s}
                        </td>
                        <td
                          className={`px-2 py-1.5 text-right font-medium ${
                            item.d > 0
                              ? "text-[#00c853]"
                              : item.d < 0
                              ? "text-[#f23645]"
                              : "text-yellow-500"
                          }`}
                        >
                          {item.p.toFixed(2)}
                        </td>
                        <td className="px-2 py-1.5 text-right">
                          <span
                            className={`inline-block px-1.5 py-0.5 rounded text-[10px] text-white font-bold w-12 text-center ${
                              item.d > 0
                                ? "bg-[#00c853]"
                                : item.d < 0
                                ? "bg-[#f23645]"
                                : "bg-yellow-500"
                            }`}
                          >
                            {item.d > 0 ? "+" : ""}
                            {item.d}%
                          </span>
                        </td>
                        <td
                          className={`px-2 py-1.5 text-right font-medium ${
                            item.w > 0
                              ? "text-[#00c853]"
                              : item.w < 0
                              ? "text-[#f23645]"
                              : "text-yellow-500"
                          }`}
                        >
                          {item.w > 0 ? "+" : ""}
                          {item.w}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-col bg-[#000000] border border-[#1c1c1e] rounded overflow-hidden">
              <div className="px-3 py-2 flex justify-between items-center border-b border-[#1c1c1e]">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-white">
                    Top đột biến khối lượng
                  </span>
                  <ChevronDown size={14} className="text-gray-500" />
                </div>
                <Filter size={14} className="text-[#f23645]" />
              </div>
              <div className="px-3 py-2 flex justify-between items-center bg-[#000000] border-b border-[#1c1c1e]/50">
                <div className="flex gap-2">
                  <button className="px-2 py-1 bg-[#2a2e39] text-white text-[10px] font-bold rounded">
                    Bùng nổ KL
                  </button>
                  <button className="px-2 py-1 text-gray-400 hover:text-white text-[10px] font-medium transition-colors">
                    Cạn cung
                  </button>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-[#2962ff] font-medium cursor-pointer">
                  Hôm nay <ChevronDown size={12} />
                </div>
              </div>
              <div className="flex-1 overflow-auto custom-scrollbar">
                <table className="w-full text-left border-collapse">
                  <thead className="text-[9px] text-gray-500 uppercase sticky top-0 bg-[#000000] z-10">
                    <tr>
                      <th className="px-3 py-2 font-medium">Mã CK</th>
                      <th className="px-2 py-2 font-medium text-right">Giá</th>
                      <th className="px-2 py-2 font-medium text-right text-gray-300">
                        % KL dự kiến
                      </th>
                      <th className="px-2 py-2 font-medium text-right">
                        %Hôm nay
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1c1c1e]/30 text-[11px] font-mono">
                    {TOP_VOLUME_MOCK.map((item, i) => (
                      <tr key={i} className="hover:bg-[#121212]">
                        <td className="px-3 py-1.5 font-bold text-white">
                          {item.s}
                        </td>
                        <td
                          className={`px-2 py-1.5 text-right font-medium ${
                            item.d > 0
                              ? "text-[#00c853]"
                              : item.d < 0
                              ? "text-[#f23645]"
                              : "text-yellow-500"
                          }`}
                        >
                          {item.p.toFixed(2)}
                        </td>
                        <td className="px-2 py-1.5 text-right text-[#dadada] font-bold">
                          {item.v.toLocaleString()}%
                        </td>
                        <td className="px-2 py-1.5 text-right">
                          <span
                            className={`inline-block px-1.5 py-0.5 rounded text-[10px] text-white font-bold w-12 text-center ${
                              item.d > 0
                                ? "bg-[#00c853]"
                                : item.d < 0
                                ? "bg-yellow-500"
                                : "bg-yellow-500"
                            }`}
                          >
                            {item.d > 0 ? "+" : ""}
                            {item.d}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex flex-col bg-[#000000] border border-[#1c1c1e] rounded overflow-hidden">
              <div className="px-3 py-2 flex justify-between items-center border-b border-[#1c1c1e]">
                <span className="text-sm font-bold text-white">
                  Top nước ngoài
                </span>
                <div className="flex bg-[#1c1c1e] rounded p-0.5">
                  <button className="px-1.5 py-0.5 text-[9px] text-gray-400 hover:text-white">
                    1D
                  </button>
                  <button className="px-1.5 py-0.5 text-[9px] bg-[#2a2e39] text-white rounded font-bold">
                    1W
                  </button>
                  <button className="px-1.5 py-0.5 text-[9px] text-gray-400 hover:text-white">
                    1M
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 px-3 py-2 border-b border-[#1c1c1e] bg-[#000000]">
                <div className="flex flex-col">
                  <span className="text-[9px] text-gray-400">
                    Tổng giá trị Mua
                  </span>
                  <span className="text-[11px] font-bold text-[#00c853]">
                    23,174.3 tỷ
                  </span>
                </div>
                <div className="flex flex-col text-center">
                  <span className="text-[9px] text-gray-400">
                    Tổng giá trị Bán
                  </span>
                  <span className="text-[11px] font-bold text-[#f23645]">
                    19,958.1 tỷ
                  </span>
                </div>
                <div className="flex flex-col text-right">
                  <span className="text-[9px] text-gray-400">Giá trị ròng</span>
                  <span className="text-[11px] font-bold text-[#00c853]">
                    3,216.2 tỷ
                  </span>
                </div>
              </div>

              <div className="px-3 py-1 flex items-center justify-between border-b border-[#1c1c1e]/50 text-[10px] font-medium text-gray-400">
                <div className="flex gap-4">
                  <span className="text-white border-b border-white pb-0.5">
                    Mua/Bán ròng
                  </span>
                  <span className="hover:text-white cursor-pointer">KLGD</span>
                  <span className="hover:text-white cursor-pointer">
                    Tổng GTGD (Tỷ)
                  </span>
                </div>
              </div>

              <div className="flex-1 overflow-auto custom-scrollbar px-2 py-1">
                <div className="space-y-1">
                  {TOP_FOREIGN_MOCK.map((row, i) => {
                    const maxVal = 900;
                    return (
                      <div
                        key={i}
                        className="flex items-center text-[10px] h-5"
                      >
                        <div className="flex-1 flex items-center justify-end gap-2">
                          <span className="text-gray-400 w-8 text-right font-mono">
                            {row.bv.toFixed(1)}
                          </span>
                          <div className="flex-1 h-3 flex justify-end">
                            <div
                              style={{ width: `${(row.bv / maxVal) * 100}%` }}
                              className="bg-[#00c853] rounded-sm h-full max-w-full"
                            ></div>
                          </div>
                          <span className="font-bold text-white w-8 text-center">
                            {row.b}
                          </span>
                        </div>

                        <div className="w-[1px] h-full bg-[#1c1c1e] mx-1"></div>

                        <div className="flex-1 flex items-center gap-2">
                          <span className="font-bold text-white w-8 text-center">
                            {row.s}
                          </span>
                          <div className="flex-1 h-3 flex justify-start">
                            <div
                              style={{ width: `${(row.sv / maxVal) * 100}%` }}
                              className="bg-[#f23645] rounded-sm h-full max-w-full"
                            ></div>
                          </div>
                          <span className="text-gray-400 w-8 text-left font-mono">
                            {row.sv.toFixed(1)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="px-3 py-1.5 border-t border-[#1c1c1e] flex justify-center gap-4 text-[9px] bg-[#000000]">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#00c853]"></div>
                  <span className="text-gray-300 font-bold">
                    Top mua ròng (Tỷ)
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-[#f23645]"></div>
                  <span className="text-gray-300 font-bold">
                    Top bán ròng (Tỷ)
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeDashboardTab === "industry" && (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Industry Content
          </div>
        )}
        {activeDashboardTab === "derivatives" && (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            Derivatives Content
          </div>
        )}
      </div>

      {/* --- Right Column: Intelligence & News (35%) --- */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#13171b]">
        <div className="flex h-10 border-b border-[#1c1c1e] shrink-0">
          <button
            onClick={() => setActiveRightTab("intelligence")}
            className={`flex-1 text-xs font-bold uppercase tracking-wide hover:bg-[#1e2329] transition-colors border-r border-[#1c1c1e] ${
              activeRightTab === "intelligence"
                ? "text-[#2962ff] bg-[#1e2329]"
                : "text-gray-500"
            }`}
          >
            Tình báo thị trường
          </button>
          <button
            onClick={() => setActiveRightTab("news")}
            className={`flex-1 text-xs font-bold uppercase tracking-wide hover:bg-[#1e2329] transition-colors ${
              activeRightTab === "news"
                ? "text-[#2962ff] bg-[#1e2329]"
                : "text-gray-500"
            }`}
          >
            Tin tức & Sự kiện
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
          {currentPosts.map((post: any) => (
            <PostCard key={post.id} post={post} />
          ))}

          {currentPosts.length === 0 && (
            <div className="text-center text-gray-500 text-xs mt-10">
              Chưa có tin tức mới
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
