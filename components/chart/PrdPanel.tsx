import React from 'react';
import { PrdModuleId, PRD_MODULES, getAiAnalysisData } from './prdConstants';
import { Activity, ArrowRight, TrendingUp, ShieldAlert, ArrowLeft, CheckCircle2, XCircle } from 'lucide-react';

interface PrdPanelProps {
    activeModule: PrdModuleId;
    selectedId: string | null;
    onClose: () => void;
    onBack: () => void;
}

export const PrdPanel: React.FC<PrdPanelProps> = ({ activeModule, selectedId, onClose, onBack }) => {
    const moduleInfo = PRD_MODULES.find(m => m.id === activeModule);
    const data: any = getAiAnalysisData(activeModule, selectedId);

    if (!moduleInfo) return null;

    // --- Detail View ---
    if (data.type === 'detail') {
        return (
             <div className="h-full flex flex-col bg-[#0b0e11] border-l border-[#2c2c2e] animate-in slide-in-from-right duration-300">
                <div className="p-4 border-b border-[#2c2c2e] flex items-center gap-3 bg-[#1a1f26]">
                    <button onClick={onBack} className="p-1 hover:bg-[#2c2c2e] rounded text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft size={18} />
                    </button>
                    <h3 className="text-sm font-bold text-gray-100">{data.title}</h3>
                </div>
                <div className="flex-1 p-4 space-y-4">
                     {data.result && (
                         <div className={`text-xl font-bold ${data.result.includes('WIN') ? 'text-[#00c853]' : 'text-[#f23645]'} border-b border-[#2c2c2e] pb-2`}>
                             {data.result}
                         </div>
                     )}
                     
                     {data.source && (
                         <div className="text-xs text-[#2962ff] font-bold uppercase border border-[#2962ff]/30 bg-[#2962ff]/10 px-2 py-1 inline-block rounded">
                             {data.source}
                         </div>
                     )}

                     <div className="text-sm text-gray-300 leading-relaxed bg-[#1c1c1e] p-3 rounded-lg border border-[#2c2c2e]">
                         {data.summary || data.content}
                     </div>
                     
                     {data.reason && (
                        <div>
                            <div className="text-[10px] text-gray-500 uppercase mb-1">Lý do</div>
                            <div className="text-sm font-bold text-white">{data.reason}</div>
                        </div>
                     )}
                     
                     {data.action && (
                        <div className="bg-[#facc15]/10 border border-[#facc15]/30 p-3 rounded-lg mt-4">
                            <div className="text-xs text-[#facc15] font-bold uppercase mb-1">Hành động khuyến nghị</div>
                            <div className="text-sm text-white font-bold">{data.action}</div>
                        </div>
                     )}
                </div>
             </div>
        );
    }

    // --- Main View ---
    return (
        <div className="h-full flex flex-col bg-[#0b0e11] border-l border-[#2c2c2e] animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-4 border-b border-[#2c2c2e] flex items-center justify-between bg-[#1a1f26]">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-[#1c1c1e] border border-[#2c2c2e]" style={{ color: moduleInfo.color }}>
                        <moduleInfo.icon size={20} />
                    </div>
                    <div>
                        <h3 className="text-sm font-bold text-gray-100">{moduleInfo.label}</h3>
                        <p className="text-[10px] text-gray-500">{moduleInfo.desc}</p>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
                
                {/* 1. Summary Card */}
                <div className="bg-[#1c1c1e] p-4 rounded-xl border border-[#2c2c2e] relative overflow-hidden group hover:border-[#2962ff]/50 transition-colors">
                     <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-transparent to-white/5 rounded-bl-full -mr-4 -mt-4"></div>
                     <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                        <Activity size={12} /> AI Insight
                     </h4>
                     <p className="text-sm text-gray-200 leading-relaxed font-medium">
                        "{data.summary}"
                     </p>
                </div>

                {/* 2. Specific Module Metrics */}
                {activeModule === 'safety_scanner' && (
                    <div className="grid grid-cols-2 gap-3">
                         <div className="bg-[#1c1c1e] p-3 rounded-lg border border-[#2c2c2e] text-center">
                             <div className="text-2xl font-bold text-[#00c853]">{data.score}/10</div>
                             <div className="text-[10px] text-gray-500 uppercase mt-1">AI Score</div>
                         </div>
                         <div className="bg-[#1c1c1e] p-3 rounded-lg border border-[#2c2c2e] text-center">
                             <div className="text-2xl font-bold text-[#2962ff]">{data.survivalRate}</div>
                             <div className="text-[10px] text-gray-500 uppercase mt-1">Tỷ lệ sống sót</div>
                         </div>
                         
                         <div className="col-span-2 mt-2">
                             <p className="text-[10px] text-gray-500 italic text-center mb-2">
                                 *Click vào các điểm <span className="text-[#00c853]">Xanh</span>/<span className="text-[#f23645]">Đỏ</span> trên chart để xem chi tiết từng lệnh.
                             </p>
                             <div className="space-y-2">
                                 {data.details.map((d: any, i: number) => (
                                     <div key={i} className="flex justify-between text-xs border-b border-[#2c2c2e] pb-2 last:border-0">
                                         <span className="text-gray-400">{d.label}</span>
                                         <span className="text-white font-bold">{d.value}</span>
                                     </div>
                                 ))}
                             </div>
                         </div>
                    </div>
                )}

                {activeModule === 'ghost_projection' && (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between bg-[#1c1c1e] p-3 rounded-lg border border-[#2c2c2e]">
                             <span className="text-xs text-gray-400">Độ tương đồng</span>
                             <span className="text-lg font-bold text-[#06b6d4]">{data.similarity}</span>
                        </div>
                        <div className="bg-[#06b6d4]/10 border border-[#06b6d4]/30 p-3 rounded-lg">
                             <div className="text-xs text-[#06b6d4] font-bold mb-1">Dự phóng xu hướng</div>
                             <div className="text-sm text-white font-bold flex items-center gap-2">
                                 {data.outlook} <ArrowRight size={14} />
                             </div>
                        </div>
                    </div>
                )}

                {activeModule === 'sentiment_360' && (
                    <div className="space-y-4">
                        <div className="flex h-4 bg-[#2c2c2e] rounded-full overflow-hidden">
                            <div className="bg-[#00c853]" style={{ width: `${data.bullRatio}%` }}></div>
                            <div className="bg-[#f23645]" style={{ width: `${100 - data.bullRatio}%` }}></div>
                        </div>
                        <div className="flex justify-between text-xs font-bold">
                            <span className="text-[#00c853]">Phe Bò ({data.bullRatio}%)</span>
                            <span className="text-[#f23645]">Phe Gấu ({100 - data.bullRatio}%)</span>
                        </div>
                        
                        <p className="text-[10px] text-gray-500 italic text-center">
                            *Click vào icon tin tức trên chart để xem nguồn tin.
                        </p>

                        <div className="space-y-2 mt-2">
                            {data.sources.map((s: any, i: number) => (
                                <div key={i} className={`p-2 rounded text-xs border ${s.type === 'bull' ? 'bg-[#00c853]/10 border-[#00c853]/30 text-green-100' : 'bg-[#f23645]/10 border-[#f23645]/30 text-red-100'}`}>
                                    {s.type === 'bull' ? <TrendingUp size={12} className="inline mr-1" /> : <ShieldAlert size={12} className="inline mr-1" />}
                                    {s.text}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeModule === 'execution_plan' && (
                    <div className="space-y-4">
                        <button className="w-full py-4 bg-[#00c853] hover:bg-[#00e676] text-black font-bold text-lg rounded-xl shadow-[0_0_20px_rgba(0,200,83,0.4)] transition-all flex items-center justify-center gap-2">
                            MUA NGAY (Market)
                        </button>
                        
                        <div className="bg-[#1c1c1e] rounded-xl border border-[#2c2c2e] overflow-hidden">
                             <div className="flex border-b border-[#2c2c2e]">
                                 <div className="flex-1 p-3 border-r border-[#2c2c2e] text-center">
                                     <div className="text-[10px] text-gray-500 uppercase">Entry Zone</div>
                                     <div className="text-sm font-bold text-[#2962ff]">{data.entry}</div>
                                 </div>
                                 <div className="flex-1 p-3 text-center">
                                     <div className="text-[10px] text-gray-500 uppercase">Risk/Reward</div>
                                     <div className="text-sm font-bold text-white">{data.rr}</div>
                                 </div>
                             </div>
                             <div className="flex">
                                 <div className="flex-1 p-3 border-r border-[#2c2c2e] text-center bg-[#00c853]/10">
                                     <div className="text-[10px] text-[#00c853] uppercase font-bold">Chốt lời</div>
                                     <div className="text-sm font-bold text-[#00c853]">{data.tp}</div>
                                 </div>
                                 <div className="flex-1 p-3 text-center bg-[#f23645]/10">
                                     <div className="text-[10px] text-[#f23645] uppercase font-bold">Cắt lỗ</div>
                                     <div className="text-sm font-bold text-[#f23645]">{data.sl}</div>
                                 </div>
                             </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-[#2c2c2e] bg-[#1a1f26]">
                <button 
                    onClick={onClose}
                    className="w-full py-2 bg-[#2c2c2e] hover:bg-[#3d3d40] text-gray-300 rounded-lg text-xs font-bold transition-colors"
                >
                    Đóng Module
                </button>
            </div>
        </div>
    );
};