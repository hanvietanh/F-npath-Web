
import React from 'react';
import { TrendingUp, Activity } from 'lucide-react';
import { 
  ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Area, Cell, ReferenceLine
} from 'recharts';
import { generateChartData } from '../stockDetailConstants';

export const TechnicalChartWidget: React.FC<{ symbol: string }> = ({ symbol }) => {
  const chartData = generateChartData();

  const stats = [
    { label: '7 Ngày', val: '-0,4%', color: 'text-[#f23645]' },
    { label: '1 Tháng', val: '+91,4%', color: 'text-[#00c853]' },
    { label: '3 Tháng', val: '+122,1%', color: 'text-[#00c853]' },
    { label: '1 Năm', val: '+100,9%', color: 'text-[#00c853]' },
    { label: '5 Năm', val: '-52,4%', color: 'text-[#f23645]' },
    { label: 'Tất cả', val: '+2,845%', color: 'text-[#00c853]' },
  ];

  return (
    <section className="w-[53%] flex flex-col bg-[#0b0e11]">
        <div className="h-10 border-b border-gray-800 flex items-center px-4 gap-4 bg-[#101317]">
            <div className="flex bg-[#1e2530] rounded p-0.5">
            {['1D', '1W', '1M', '3M', '1Y'].map(t => (<button key={t} className={`px-2 py-0.5 text-[10px] rounded ${t === '1D' ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}>{t}</button>))}
            </div>
            <div className="h-4 w-px bg-gray-700"></div>
            <div className="flex gap-3 text-[11px] font-medium text-gray-400">
            <button className="hover:text-blue-400 flex items-center gap-1"><TrendingUp size={12}/> Indicators</button>
            <button className="hover:text-blue-400 flex items-center gap-1 text-blue-400"><Activity size={12}/> MA (20, 50)</button>
            <button className="hover:text-blue-400">RSI</button>
            <button className="hover:text-blue-400">So sánh</button>
            </div>
        </div>
        
        <div className="flex-1 relative p-1 flex flex-col min-h-0">
            <div className="absolute top-2 left-4 z-10 flex gap-4 text-[10px] font-mono pointer-events-none">
            <span className="text-emerald-400">{symbol}: 28.50</span><span className="text-yellow-500">MA20: 28.30</span><span className="text-purple-400">MA50: 28.00</span><span className="text-gray-500">Vol: 35M</span>
            </div>
            <div className="flex-[3] w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                    <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    </defs>
                    <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="time" hide />
                    <YAxis domain={['auto', 'auto']} orientation="right" tick={{fontSize: 10, fill: '#6b7280'}} tickLine={false} axisLine={false} />
                    <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderColor: '#374151', fontSize: '11px', color: '#fff' }} itemStyle={{ padding: 0 }} />
                    <Line type="monotone" dataKey="ma20" stroke="#eab308" dot={false} strokeWidth={1} />
                    <Line type="monotone" dataKey="ma50" stroke="#a855f7" dot={false} strokeWidth={1} strokeDasharray="5 5" />
                    <Area type="monotone" dataKey="price" stroke="#10b981" fillOpacity={1} fill="url(#colorPrice)" strokeWidth={2} />
                    <ReferenceLine y={28.50} stroke="red" strokeDasharray="3 3" label={{ position: 'left', value: 'Kháng cự', fontSize: 9, fill: 'red' }} />
                </ComposedChart>
            </ResponsiveContainer>
            </div>
            <div className="h-[60px] w-full border-t border-gray-800/50">
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} margin={{ top: 5, right: 20, bottom: 0, left: 0 }}>
                    <YAxis hide domain={[0, 'dataMax']} />
                    <Bar dataKey="vol" fill="#374151">
                    {chartData.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={Number(entry.price) > Number(entry.ma20) ? '#10b981' : '#ef4444'} fillOpacity={0.5} />
                    ))}
                    </Bar>
                </ComposedChart>
            </ResponsiveContainer>
            </div>
            <div className="h-[80px] w-full border-t border-gray-800 bg-[#101317] p-1">
            <div className="text-[9px] text-gray-500 absolute ml-2 mt-1">RSI (14)</div>
            <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData} margin={{ top: 15, right: 20, bottom: 0, left: 0 }}>
                    <CartesianGrid stroke="#1f2937" strokeDasharray="3 3" vertical={false} />
                    <YAxis orientation="right" domain={[0, 100]} tick={{fontSize: 9, fill: '#6b7280'}} tickCount={3} axisLine={false} tickLine={false} />
                    <ReferenceLine y={70} stroke="#ef4444" strokeDasharray="2 2" />
                    <ReferenceLine y={30} stroke="#10b981" strokeDasharray="2 2" />
                    <Line type="monotone" dataKey={(d) => Math.floor(Math.random() * 40) + 30} stroke="#60a5fa" dot={false} strokeWidth={1.5} />
                </ComposedChart>
            </ResponsiveContainer>
            </div>
        </div>

        {/* Footer Stats Row */}
        <div className="grid grid-cols-6 border-t border-gray-800 bg-[#0b0e11] py-3 shrink-0">
            {stats.map((s, i) => (
                <div key={i} className={`flex flex-col items-center justify-center border-r border-gray-800 last:border-0 gap-1`}>
                    <span className="text-[10px] text-gray-500 font-medium">{s.label}</span>
                    <span className={`text-[12px] font-bold tracking-tight ${s.color}`}>{s.val}</span>
                </div>
            ))}
        </div>
    </section>
  );
};
