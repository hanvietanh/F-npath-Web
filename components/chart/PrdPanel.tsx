import React, { useState, useEffect, useRef } from 'react';
import { PrdModuleId, PRD_MODULES, getAiAnalysisData } from './prdConstants';
import { Activity, TrendingUp, ShieldAlert, ArrowLeft, X, Move } from 'lucide-react';

interface PrdPanelProps {
    activeModule: PrdModuleId;
    selectedId: string | null;
    onClose: () => void;
    onBack: () => void;
}

export const PrdPanel: React.FC<PrdPanelProps> = ({ activeModule, selectedId, onClose, onBack }) => {
    const moduleInfo = PRD_MODULES.find(m => m.id === activeModule);
    const data: any = getAiAnalysisData(activeModule, selectedId);

    // Draggable Logic
    const panelRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
        if (e.button !== 0) return;
        setIsDragging(true);
        setDragOffset({
            x: e.clientX - offset.x,
            y: e.clientY - offset.y
        });
        e.preventDefault();
    };

    useEffect(() => {
        if (isDragging) {
            const onMouseMove = (e: MouseEvent) => {
                setOffset({
                    x: e.clientX - dragOffset.x,
                    y: e.clientY - dragOffset.y
                });
            };
            const onMouseUp = () => setIsDragging(false);
            
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
            return () => {
                window.removeEventListener('mousemove', onMouseMove);
                window.removeEventListener('mouseup', onMouseUp);
            };
        }
    }, [isDragging, dragOffset]);

    if (!moduleInfo) return null;

    // --- Common Wrapper Style ---
    const wrapperStyle: React.CSSProperties = {
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        right: '20px',
        top: '60px',
    };

    // --- Detail View (Specific Marker Clicked) ---
    if (data.type === 'detail') {
        return (
             <div 
                ref={panelRef}
                style={wrapperStyle}
                className="absolute w-[300px] bg-[#13171b]/95 backdrop-blur-md border border-[#2c2c2e] rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
             >
                {/* Header */}
                <div 
                    className="h-8 px-3 border-b border-[#2c2c2e] flex items-center justify-between bg-[#1a1f26]/90 cursor-grab active:cursor-grabbing"
                    onMouseDown={handleMouseDown}
                >
                    <div className="flex items-center gap-2 text-gray-300">
                        <button onClick={onBack} className="hover:text-white"><ArrowLeft size={14} /></button>
                        <span className="text-xs font-bold truncate max-w-[200px]">{data.title}</span>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-white"><X size={14} /></button>
                </div>

                <div className="p-3 max-h-[400px] overflow-y-auto custom-scrollbar">
                     {data.result && (
                         <div className={`text-base font-bold ${data.result.includes('WIN') ? 'text-[#00c853]' : 'text-[#f23645]'} border-b border-[#2c2c2e] pb-2 mb-2`}>
                             {data.result}
                         </div>
                     )}
                     <div className="text-xs text-gray-300 bg-[#1c1c1e] p-2 rounded border border-[#2c2c2e] mb-2 leading-relaxed">
                         {data.summary || data.content}
                     </div>
                     {data.reason && (
                        <div>
                            <div className="text-[9px] text-gray-500 uppercase mb-0.5">Lý do</div>
                            <div className="text-xs font-bold text-white">{data.reason}</div>
                        </div>
                     )}
                </div>
             </div>
        );
    }

    // --- Main Overview (Default) ---
    return (
        <div 
            ref={panelRef}
            style={wrapperStyle}
            className="absolute w-[300px] bg-[#0b0e11]/95 backdrop-blur-md border border-[#2c2c2e] rounded-lg shadow-2xl z-50 flex flex-col overflow-hidden animate-in slide-in-from-right-5 duration-300"
        >
            {/* Compact Header */}
            <div 
                className="h-9 px-3 border-b border-[#2c2c2e] flex items-center justify-between bg-[#1a1f26]/90 cursor-grab active:cursor-grabbing group"
                onMouseDown={handleMouseDown}
            >
                <div className="flex items-center gap-2">
                    <moduleInfo.icon size={16} style={{ color: moduleInfo.color }} />
                    <span className="text-xs font-bold text-gray-200">{moduleInfo.label}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Move size={12} className="text-gray-600 group-hover:text-gray-400 transition-colors" />
                    <button onClick={onClose} className="text-gray-500 hover:text-white p-1 rounded hover:bg-[#2c2c2e] transition-colors">
                        <X size={14} />
                    </button>
                </div>
            </div>

            {/* Compact Body */}
            <div className="p-3 space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar">
                
                {/* Insight - Condensed */}
                <div className="bg-[#1c1c1e]/50 p-2 rounded border-l-2 border-[#eab308]">
                     <p className="text-[11px] text-gray-300 leading-snug font-medium italic">
                        "{data.summary}"
                     </p>
                </div>

                {/* Module Specifics */}
                {activeModule === 'safety_scanner' && (
                    <>
                        <div className="flex gap-2">
                             <div className="flex-1 bg-[#1c1c1e] py-2 rounded border border-[#2c2c2e] flex flex-col items-center">
                                 <div className="text-lg font-bold text-[#00c853]">{data.score}/10</div>
                                 <div className="text-[8px] text-gray-500 uppercase font-bold">AI Score</div>
                             </div>
                             <div className="flex-1 bg-[#1c1c1e] py-2 rounded border border-[#2c2c2e] flex flex-col items-center">
                                 <div className="text-lg font-bold text-[#2962ff]">{data.survivalRate}</div>
                                 <div className="text-[8px] text-gray-500 uppercase font-bold">Tỷ lệ sống</div>
                             </div>
                        </div>

                        <div className="space-y-0.5">
                             {data.details.map((d: any, i: number) => (
                                 <div key={i} className="flex justify-between items-center py-1.5 border-b border-[#2c2c2e] last:border-0 text-[11px]">
                                     <span className="text-gray-400">{d.label}</span>
                                     <span className="text-white font-bold">{d.value}</span>
                                 </div>
                             ))}
                        </div>
                    </>
                )}

                {activeModule === 'sentiment_360' && (
                    <div className="space-y-3">
                        <div className="flex h-5 bg-[#2c2c2e] rounded relative overflow-hidden">
                            <div className="bg-[#00c853]" style={{ width: `${data.bullRatio}%` }}></div>
                            <div className="bg-[#f23645]" style={{ width: `${100 - data.bullRatio}%` }}></div>
                            <div className="absolute inset-0 flex justify-between px-2 items-center text-[9px] font-bold text-white uppercase">
                                <span>Bull {data.bullRatio}%</span>
                                <span>Bear {100 - data.bullRatio}%</span>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            {data.sources.map((s: any, i: number) => (
                                <div key={i} className={`p-1.5 rounded text-[10px] border leading-tight ${s.type === 'bull' ? 'bg-[#00c853]/10 border-[#00c853]/30 text-green-100' : 'bg-[#f23645]/10 border-[#f23645]/30 text-red-100'}`}>
                                    {s.type === 'bull' ? <TrendingUp size={10} className="inline mr-1" /> : <ShieldAlert size={10} className="inline mr-1" />}
                                    {s.text}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                
                {activeModule === 'execution_plan' && (
                    <div className="space-y-2">
                        <button className="w-full py-2 bg-[#00c853] hover:bg-[#00e676] text-black font-bold text-xs rounded shadow transition-all">
                            MUA NGAY (Market)
                        </button>
                        <div className="bg-[#1c1c1e] rounded border border-[#2c2c2e] p-2 space-y-1.5">
                             <div className="flex justify-between text-[11px]">
                                 <span className="text-gray-400">Vùng mua</span>
                                 <span className="text-[#2962ff] font-bold">{data.entry}</span>
                             </div>
                             <div className="flex justify-between text-[11px]">
                                 <span className="text-gray-400">Chốt lời</span>
                                 <span className="text-[#00c853] font-bold">{data.tp}</span>
                             </div>
                             <div className="flex justify-between text-[11px]">
                                 <span className="text-gray-400">Cắt lỗ</span>
                                 <span className="text-[#f23645] font-bold">{data.sl}</span>
                             </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};