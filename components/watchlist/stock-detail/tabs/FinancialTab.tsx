
import React, { useState } from 'react';
import { Sparkles, Activity, BarChart2, DollarSign, Scale, LineChart as LineChartIcon, ShieldCheck, FileText, PieChart as PieIcon } from 'lucide-react';
import { ResponsiveContainer, ComposedChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar, BarChart } from 'recharts';
import { financialDataV2 } from '../stockDetailConstants';
import { DetailedFinancialTable } from './DetailedFinancialTable';

interface FinancialTabProps {
    symbol: string;
    onAskCopilot: (type: string | null, query?: string) => void;
}

export const FinancialTab: React.FC<FinancialTabProps> = ({ symbol, onAskCopilot }) => {
  const [financeView, setFinanceView] = useState<'quarter' | 'year'>('quarter');
  const [viewMode, setViewMode] = useState<'dashboard' | 'report'>('dashboard');
  const [reportType, setReportType] = useState<'balance' | 'income' | 'cashflow'>('balance');

  return (
    <div className="h-full w-full bg-[#0b0e11] flex flex-col overflow-hidden">
        {/* Main View Switcher Toolbar */}
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-800 shrink-0 bg-[#0b0e11]">
            <div className="flex gap-6 items-center">
                <button 
                    onClick={() => setViewMode('dashboard')}
                    className={`text-xs font-bold uppercase transition-colors relative pb-1 ${viewMode === 'dashboard' ? 'text-blue-400' : 'text-gray-500 hover:text-white'}`}
                >
                    Phân tích tài chính
                    {viewMode === 'dashboard' && <div className="absolute bottom-[-13px] left-0 w-full h-[2px] bg-blue-500"></div>}
                </button>
                <button 
                    onClick={() => setViewMode('report')}
                    className={`text-xs font-bold uppercase transition-colors relative pb-1 flex items-center gap-1 ${viewMode === 'report' ? 'text-blue-400' : 'text-gray-500 hover:text-white'}`}
                >
                    <FileText size={14} />
                    Báo cáo tài chính
                    {viewMode === 'report' && <div className="absolute bottom-[-13px] left-0 w-full h-[2px] bg-blue-500"></div>}
                </button>

                {/* Report Type Sub-tabs (Only visible in Report Mode) */}
                {viewMode === 'report' && (
                    <div className="flex bg-[#1e2329] rounded-lg p-1 ml-4 border border-[#2c2c2e]">
                        <button 
                            onClick={() => setReportType('balance')}
                            className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${reportType === 'balance' ? 'bg-[#2962ff] text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                        >
                            Cân đối kế toán
                        </button>
                        <button 
                            onClick={() => setReportType('income')}
                            className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${reportType === 'income' ? 'bg-[#2962ff] text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                        >
                            Kết quả kinh doanh
                        </button>
                        <button 
                            onClick={() => setReportType('cashflow')}
                            className={`px-3 py-1 text-[10px] font-bold rounded-md transition-all ${reportType === 'cashflow' ? 'bg-[#2962ff] text-white shadow-md' : 'text-gray-400 hover:text-white'}`}
                        >
                            Lưu chuyển tiền tệ
                        </button>
                    </div>
                )}
            </div>

            {/* Common Actions */}
            <div className="flex gap-2">
                <div className="flex bg-[#1e2530] rounded p-0.5 border border-gray-700/50">
                    <button onClick={() => setFinanceView('quarter')} className={`px-3 py-1 text-[10px] font-medium rounded transition ${financeView === 'quarter' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}>Theo Quý</button>
                    <button onClick={() => setFinanceView('year')} className={`px-3 py-1 text-[10px] font-medium rounded transition ${financeView === 'year' ? 'bg-blue-600 text-white shadow' : 'text-gray-400 hover:text-white'}`}>Theo Năm</button>
                </div>
                <div className="h-6 w-px bg-gray-700 mx-1"></div>
                <button 
                    onClick={() => onAskCopilot(null, `Phân tích tình hình tài chính quý gần nhất của ${symbol} có điểm gì nổi bật?`)}
                    className="flex items-center gap-1 px-3 py-1 bg-purple-900/30 hover:bg-purple-800/50 rounded text-[10px] text-purple-300 border border-purple-500/30 transition"
                >
                    <Sparkles size={10}/> AI Phân tích
                </button>
            </div>
        </div>

        {/* CONTENT AREA */}
        <div className="flex-1 overflow-hidden relative">
            
            {/* VIEW 1: DASHBOARD (Existing) */}
            {viewMode === 'dashboard' && (
                <div className="h-full w-full overflow-y-auto custom-scrollbar p-4 space-y-4">
                    
                    {/* TOP SECTION: CHỈ SỐ TÀI CHÍNH TABLE */}
                    <div className="bg-[#151a21] border border-gray-800 rounded-lg overflow-hidden shrink-0">
                        <div className="p-3 border-b border-gray-800 flex justify-between items-center bg-[#1a2029]">
                        <div className="flex items-center gap-2">
                            <Activity size={16} className="text-purple-400"/>
                            <h3 className="text-sm font-bold text-white uppercase">Chỉ số tài chính</h3>
                        </div>
                        {/* TRIGGER 1: VALUATION */}
                        <button 
                            onClick={() => onAskCopilot('valuation')}
                            className="flex items-center gap-1 px-3 py-1 bg-purple-900/30 hover:bg-purple-800/50 rounded text-[10px] text-purple-300 border border-purple-500/30 transition animate-pulse"
                        >
                            <Sparkles size={10}/> ✨ Định giá đắt hay rẻ?
                        </button>
                        </div>
                        <div className="overflow-x-auto">
                        <table className="w-full text-xs">
                            <thead>
                            <tr className="bg-[#1e2530] text-gray-400 border-b border-gray-800">
                                <th className="py-3 px-4 text-left font-semibold w-[20%]">Chỉ số</th>
                                {financialDataV2.periods.map(p => (<th key={p} className="py-3 px-4 text-right font-semibold">{p}</th>))}
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                            {financialDataV2.ratiosTable.map((row, idx) => (
                                <tr key={idx} className="hover:bg-[#1f2937] transition">
                                <td className="py-3 px-4 text-gray-300 font-medium">{row.name}</td>
                                {row.values.map((val, i) => (<td key={i} className="py-3 px-4 text-right font-mono text-white">{row.format === 'number' ? val.toLocaleString() : val}</td>))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        </div>
                    </div>

                    {/* MIDDLE SECTION: 2 CARDS (REVENUE & PROFIT) */}
                    <div className="grid grid-cols-2 gap-4 h-[320px]">
                        {/* LEFT CARD: DOANH THU */}
                        <div className="bg-[#151a21] border border-gray-800 rounded-lg flex flex-col">
                        <div className="p-3 border-b border-gray-800 flex justify-between items-center">
                            <h3 className="text-sm font-bold text-white uppercase flex items-center gap-2"><BarChart2 size={16} className="text-blue-400"/> Doanh thu</h3>
                            {/* TRIGGER 2: GROWTH */}
                            <button 
                                onClick={() => onAskCopilot('growth')}
                                className="flex items-center gap-1 px-2 py-1 bg-blue-900/30 hover:bg-blue-800/50 rounded text-[10px] text-blue-300 border border-blue-500/30 transition"
                            >
                                <LineChartIcon size={10}/> ✨ Soi động lực tăng trưởng
                            </button>
                        </div>
                        <div className="flex-1 w-full p-2">
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={financialDataV2.revenueChart} margin={{ top: 10, right: 0, bottom: 0, left: 0 }}>
                                    <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="period" tick={{fontSize: 10, fill: '#9ca3af'}} axisLine={false} tickLine={false} />
                                    <YAxis yAxisId="left" orientation="left" tick={{fontSize: 10, fill: '#9ca3af'}} axisLine={false} tickLine={false} tickFormatter={(val) => val/1000 + 'k'}/>
                                    <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', fontSize: '11px', color: '#fff' }} />
                                    <Bar yAxisId="left" dataKey="revenue" fill="#2563eb" barSize={30} radius={[4, 4, 0, 0]} name="Doanh thu" />
                                    <Bar yAxisId="left" dataKey="profit" fill="#a855f7" barSize={30} radius={[4, 4, 0, 0]} name="Lợi nhuận" />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                        </div>

                        {/* RIGHT CARD: LỢI NHUẬN */}
                        <div className="bg-[#151a21] border border-gray-800 rounded-lg flex flex-col">
                        <div className="p-3 border-b border-gray-800 flex justify-between items-center">
                            <h3 className="text-sm font-bold text-white uppercase flex items-center gap-2"><DollarSign size={16} className="text-emerald-400"/> Lợi nhuận</h3>
                        </div>
                        <div className="flex-1 w-full p-2">
                            <ResponsiveContainer width="100%" height="100%">
                                <ComposedChart data={financialDataV2.profitChart} margin={{ top: 10, right: 0, bottom: 0, left: 0 }}>
                                    <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" vertical={false} />
                                    <XAxis dataKey="period" tick={{fontSize: 10, fill: '#9ca3af'}} axisLine={false} tickLine={false} />
                                    <YAxis yAxisId="left" orientation="left" tick={{fontSize: 10, fill: '#9ca3af'}} axisLine={false} tickLine={false} tickFormatter={(val) => val/1000 + 'k'}/>
                                    <YAxis yAxisId="right" orientation="right" tick={{fontSize: 10, fill: '#9ca3af'}} axisLine={false} tickLine={false} unit="%" />
                                    <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', fontSize: '11px', color: '#fff' }} />
                                    <Bar yAxisId="left" dataKey="gross" stackId="a" fill="#3b82f6" barSize={30} radius={[0, 0, 0, 0]} name="LN gộp" />
                                    <Bar yAxisId="left" dataKey="net" stackId="a" fill="#22d3ee" barSize={30} radius={[4, 4, 0, 0]} name="LN ròng" />
                                </ComposedChart>
                            </ResponsiveContainer>
                        </div>
                        </div>
                    </div>

                    {/* BOTTOM SECTION: BALANCE SHEET CHART */}
                    <div className="bg-[#151a21] border border-gray-800 rounded-lg flex flex-col h-[350px]">
                        <div className="p-3 border-b border-gray-800 flex justify-between items-center">
                            <h3 className="text-sm font-bold text-white uppercase flex items-center gap-2">
                            <Scale size={16} className="text-yellow-500"/> Cơ cấu Tài sản & Nguồn vốn
                            </h3>
                            {/* TRIGGER 3: HEALTH */}
                            <button 
                            onClick={() => onAskCopilot('health')}
                            className="flex items-center gap-1 px-2 py-1 bg-yellow-900/20 hover:bg-yellow-800/40 rounded text-[10px] text-yellow-500 border border-yellow-600/30 transition"
                            >
                            <ShieldCheck size={10}/> ✨ Check sức khỏe tài chính
                            </button>
                        </div>
                        <div className="flex-1 w-full p-4">
                            <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={financialDataV2.balanceSheetChart} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                                <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="period" tick={{fontSize: 10, fill: '#9ca3af'}} axisLine={false} tickLine={false} />
                                <YAxis tick={{fontSize: 10, fill: '#9ca3af'}} axisLine={false} tickLine={false} tickFormatter={(val) => val/1000 + 'k'}/>
                                <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', fontSize: '11px', color: '#fff' }} cursor={{fill: '#2a3441'}}/>
                                {/* Stack 1: Assets */}
                                <Bar dataKey="shortAsset" stackId="a" fill="#3b82f6" name="TS Ngắn hạn" barSize={40} />
                                <Bar dataKey="longAsset" stackId="a" fill="#1e40af" name="TS Dài hạn" radius={[4, 4, 0, 0]} barSize={40} />
                                {/* Stack 2: Resources */}
                                <Bar dataKey="liabilities" stackId="b" fill="#ef4444" name="Nợ phải trả" barSize={40} />
                                <Bar dataKey="equity" stackId="b" fill="#10b981" name="Vốn chủ sở hữu" radius={[4, 4, 0, 0]} barSize={40} />
                            </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            )}

            {/* VIEW 2: DETAILED REPORT (New) */}
            {viewMode === 'report' && (
                <DetailedFinancialTable reportType={reportType} />
            )}

        </div>
    </div>
  );
};
