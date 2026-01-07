
import { Scan, Ghost, Volume2, PieChart, AlertTriangle, PlayCircle, CloudFog, History, BookOpen } from 'lucide-react';
import { CandleData } from '../../types';

export type PrdModuleId = 'safety_scanner' | 'ghost_projection' | 'sentiment_360' | 'valuation_sector' | 'trapped_zones' | 'execution_plan' | 'consensus_cloud' | 'event_impact' | 'fundamental_insight';

export const PRD_MODULES = [
  { id: 'safety_scanner', label: '1. Máy Quét An Toàn T+', icon: Scan, color: '#f59e0b', desc: 'Tính toán xác suất lãi/lỗ T+2.5' },
  { id: 'ghost_projection', label: '2. Bóng Ma Quá Khứ', icon: Ghost, color: '#06b6d4', desc: 'Tìm mẫu hình tương đồng lịch sử' },
  { id: 'sentiment_360', label: '3. Tình Báo Tin Đồn 360°', icon: Volume2, color: '#8b5cf6', desc: 'Phân tích tin đồn & dòng tiền' },
  { id: 'valuation_sector', label: '4. Định Giá & Ngành', icon: PieChart, color: '#10b981', desc: 'Định giá 3 góc độ: P/E, PB, Peer' },
  { id: 'trapped_zones', label: '5. Vùng Kẹp Hàng', icon: AlertTriangle, color: '#ef4444', desc: 'Xác định kháng cự tâm lý' },
  { id: 'execution_plan', label: '6. Kế Hoạch Hành Động', icon: PlayCircle, color: '#3b82f6', desc: 'Setup điểm mua/bán cụ thể' },
  { id: 'consensus_cloud', label: '7. Vùng Mây Định Giá', icon: CloudFog, color: '#0ea5e9', desc: 'Kỳ vọng của các định chế tài chính' },
  { id: 'event_impact', label: '8. Tác Động Sự Kiện', icon: History, color: '#d946ef', desc: 'Backtest phản ứng giá quá khứ' },
  { id: 'fundamental_insight', label: '9. Giải Thích Chỉ Số', icon: BookOpen, color: '#ec4899', desc: 'Dịch số liệu tài chính sang ngôn ngữ đời thường' },
];

// --- 1. Safety Scanner Data ---
export const getSafetyScannerPoints = (data: CandleData[]) => {
    return [
        { id: 'p1', index: 20, result: 'win', return: '+5.2%', date: '12/10/2023', reason: 'Nổ Vol + Break nền' },
        { id: 'p2', index: 45, result: 'loss', return: '-2.1%', date: '05/11/2023', reason: 'Bull trap thị trường chung' },
        { id: 'p3', index: 60, result: 'win', return: '+3.8%', date: '22/11/2023', reason: 'Test cung thành công' },
        { id: 'p4', index: 82, result: 'win', return: '+4.8%', date: '15/12/2023', reason: 'Dòng tiền vào nhóm thép' },
    ];
};

// --- 2. Sentiment Data ---
export const getSentimentMarkers = (data: CandleData[]) => {
    return [
        { id: 's1', index: data.length - 15, type: 'bull', title: 'Tin đồn lợi nhuận', source: 'Room F189', time: '14:00' },
        { id: 's2', index: data.length - 5, type: 'bear', title: 'Áp lực bán 29.5', source: 'Broker VPS', time: '09:15' },
    ];
};

// --- 3. Valuation / P/E Bands Data ---
// UPDATED: Use stepped logic to simulate quarterly EPS changes
export const getPeBands = (data: CandleData[]) => {
    const startPrice = data[0]?.close || 50;
    
    // Simulate EPS that steps up every ~25 candles (quarterly)
    const bands = data.map((d, i) => {
        const quarter = Math.floor(i / 20); // Step every 20 candles
        // Base EPS creates the steps. 
        // We ensure EPS fits the price range (Price ~ 56, PE 15 => EPS ~ 3.7)
        const baseEps = 2.8 + (quarter * 0.15); 
        
        // Add a slight jitter or curve to the step if desired, but reference shows flat steps
        const eps = baseEps;

        return {
            eps: eps,
            pe10: eps * 10, // Green Line
            pe15: eps * 15, // Yellow Line
            pe20: eps * 20, // Red Line
            date: d.time
        };
    });
    return bands;
};

// --- 7. Consensus Cloud Data ---
export const getConsensusCloud = (currentPrice: number = 28.0) => {
    return {
        min: +(currentPrice * 1.0963).toFixed(2),
        avg: +(currentPrice * 1.1937).toFixed(2),
        max: +(currentPrice * 1.3343).toFixed(2),
        upside: '+19.37%',
        rating_bias: 'BUY',
        sources: [
            { firm: 'VCSC', price: (currentPrice * 1.33).toFixed(1), rec: 'BUY', date: '01/10/2024' },
            { firm: 'HSC', price: (currentPrice * 1.25).toFixed(1), rec: 'BUY', date: '15/10/2024' },
            { firm: 'SSI', price: (currentPrice * 1.1).toFixed(1), rec: 'OUTPERFORM', date: '10/10/2024' },
            { firm: 'VND', price: (currentPrice * 1.15).toFixed(1), rec: 'BUY', date: '12/10/2024' }
        ]
    };
};

// --- 8. Event Impact Data ---
export const getEventImpactHistory = (data: CandleData[]) => {
    return [
        { 
            id: 'evt_q3', index: data.length - 25, type: 'EARNINGS', 
            label: '-2.1% (T+3)', result: 'loss', 
            insight: 'Tin ra là bán (Sell the news)',
            season: 'BCTC Q3/24',
            date: '20/10/2024'
        },
        { 
            id: 'evt_q2', index: data.length - 55, type: 'EARNINGS', 
            label: '+4.5% (T+3)', result: 'win',
            insight: 'Lợi nhuận vượt kỳ vọng 20%',
            season: 'BCTC Q2/24',
            date: '20/07/2024'
        },
        { 
            id: 'evt_q1', index: data.length - 85, type: 'EARNINGS', 
            label: '-1.5% (T+3)', result: 'loss',
            insight: 'Biên lãi gộp suy giảm',
            season: 'BCTC Q1/24',
            date: '20/04/2024'
        }
    ];
};

// --- 9. Fundamental Insight Data ---
export const getFundamentalInsights = (data: CandleData[]) => {
    return [
        {
            id: 'fund_1',
            index: data.length - 10,
            type: 'NEGATIVE', // Red
            title: 'KQKD Q3/2024: Kém Khả Quan',
            summary: 'Biên lãi gộp thủng đáy do giá vốn tăng cao.',
            reasoning: 'Giá than cốc thế giới tăng 15% trong kỳ bào mòn lợi nhuận.',
            metric: 'Gross Margin',
            valPrev: '15%',
            valCurr: '10%'
        }
    ];
};

// --- Main AI Analysis Data Router ---
export const getAiAnalysisData = (moduleId: PrdModuleId, selectedId?: string | null) => {
    
    // 4. Valuation Logic (P/E Bands)
    if (moduleId === 'valuation_sector') {
         return {
                status: 'ATTRACTIVE (Hấp dẫn)',
                targetPrice: '20.x',
                gap: '+17%',
                summary: 'Giá cổ phiếu đã điều chỉnh về vùng P/E 10x (Vùng Mua Dài Hạn). Dữ liệu lịch sử 5 năm cho thấy đây là đáy định giá cứng.',
                metrics: [
                    { label: 'P/E Hiện tại', value: '10.2x', eval: 'Rất rẻ' },
                    { label: 'P/E Trung bình', value: '15.0x', eval: 'Mục tiêu' },
                    { label: 'EPS TTM', value: '3,200đ', eval: 'Tăng trưởng' }
                ]
         };
    }

    if (moduleId === 'consensus_cloud') {
         return {
                status: 'UNDERVALUED (Rẻ)',
                targetPrice: 'Dynamic',
                gap: '+19.37%',
                summary: 'Giá hiện tại đang thấp hơn 19% so với định giá trung bình của 8 công ty chứng khoán (Consensus). Vùng Mây Định Giá màu xanh cho thấy dư địa tăng lớn. Khuyến nghị chung là MUA.',
                metrics: [
                    { label: 'Consensus Avg', value: '+19.37%', eval: 'Hấp dẫn' },
                    { label: 'Rating Bias', value: 'BUY (6/8)', eval: 'Tích cực' },
                    { label: 'Highest', value: '+33.43%', eval: 'VCSC' }
                ]
         };
    }

    // ... (Keep existing logic for other modules)
    // 8. Event Impact Logic
    if (moduleId === 'event_impact') {
        if (selectedId && selectedId.startsWith('evt_')) {
            const history = getEventImpactHistory(Array(100).fill(0));
            const evt = history.find(e => e.id === selectedId);
            if (evt) {
                return {
                    type: 'detail',
                    title: `Sự kiện: ${evt.season}`,
                    result: evt.result === 'win' ? 'TĂNG GIÁ' : 'GIẢM GIÁ',
                    returnVal: evt.label,
                    reason: evt.insight,
                    summary: `Lịch sử ghi nhận vào ngày ${evt.date}, giá cổ phiếu đã ${evt.result === 'win' ? 'tăng' : 'giảm'} mạnh. Hành vi giá: ${evt.insight}.`
                };
            }
        }
        return {
            summary: 'Lịch sử cảnh báo: HPG thường chịu áp lực chốt lời ngắn hạn ngay sau khi công bố BCTC (Sell the news).',
            winRate: '30%',
            avgReturn: '-1.2%',
            trend: 'BEARISH (Tiêu cực ngắn hạn)',
            details: [
                { label: 'Số lần tin ra', value: '10 lần' },
                { label: 'Số lần tăng', value: '3 lần' },
                { label: 'Số lần giảm', value: '7 lần' }
            ]
        };
    }

    // 9. Fundamental Insight Logic
    if (moduleId === 'fundamental_insight') {
         if (selectedId && selectedId.startsWith('fund_')) {
             const funds = getFundamentalInsights(Array(100).fill(0));
             const f = funds.find(item => item.id === selectedId);
             if (f) {
                return {
                    type: 'detail',
                    title: f.title,
                    result: 'TIÊU CỰC',
                    summary: f.summary,
                    reason: f.reasoning
                };
             }
         }
         return {
             overall: 'KÉM KHẢ QUAN',
             period: 'Q3/2024',
             summary: 'Bức tranh tài chính suy yếu nhẹ do áp lực chi phí đầu vào. Tuy nhiên doanh thu vẫn duy trì ổn định.',
             metrics: [
                 { label: 'Biên lãi gộp', value: '10% (Giảm)', eval: 'Tiêu cực' },
                 { label: 'Doanh thu', value: '10.2k Tỷ (Ngang)', eval: 'Trung tính' }
             ]
         }
    }

    if (moduleId === 'safety_scanner' && selectedId) {
        const points = getSafetyScannerPoints([]); 
        const pt = points.find(p => p.id === selectedId);
        if (pt) {
            return {
                type: 'detail',
                title: `Chi tiết tín hiệu ${pt.date}`,
                result: pt.result === 'win' ? 'CHIẾN THẮNG (WIN)' : 'THẤT BẠI (LOSS)',
                returnVal: pt.return,
                reason: pt.reason,
                summary: `Tín hiệu tại phiên ${pt.date} được kích hoạt bởi ${pt.reason}. Kết quả T+2.5 đạt ${pt.return}.`
            };
        }
    }

    if (moduleId === 'sentiment_360' && selectedId) {
        if (selectedId === 's1') return { type: 'detail', title: 'Tin đồn tích cực', source: 'Room F189', content: 'Rò rỉ tin lợi nhuận Quý này vượt 20%.', action: 'Dòng tiền vào' };
        if (selectedId === 's2') return { type: 'detail', title: 'Cảnh báo rủi ro', source: 'VPS Broker', content: 'Vùng 29.5 là kháng cự mạnh.', action: 'Cẩn trọng Bull trap' };
    }

    switch(moduleId) {
        case 'safety_scanner':
            return {
                score: 8.5, survivalRate: '82%', signal: 'MUA (An toàn)',
                summary: 'Dữ liệu lịch sử cho thấy 82% các phiên bùng nổ của HPG đều mang lại lợi nhuận T+. Độ an toàn cao.',
                details: [{ label: 'Số lần Win', value: '18/22' }, { label: 'Avg Return T+3', value: '+4.5%' }]
            };
        case 'ghost_projection':
            return {
                similarity: '85%', outlook: 'Tăng giá',
                summary: 'Cấu trúc tích lũy 60 phiên hiện tại rất giống giai đoạn trước sóng tăng tháng 5/2021.',
                details: [{ label: 'Mẫu hình', value: 'Sideway Up' }, { label: 'Độ lệch chuẩn', value: '0.45' }]
            };
        case 'sentiment_360':
            return {
                sentiment: 'Bullish (Tích cực)', bullRatio: 75,
                summary: 'Tin tốt ra nhưng dòng tiền lớn đang bán chủ động. Cẩn trọng bẫy tăng giá.',
                sources: [{ type: 'bull', text: 'Tin đồn lợi nhuận đột biến' }, { type: 'bear', text: 'Áp lực bán vùng 29.5' }]
            };
        case 'trapped_zones':
            return {
                zonePrice: '29.5 - 30.0', volume: '15.4M', status: 'Kháng cự mạnh',
                summary: 'Phát hiện vùng kẹp hàng lớn tại 29.5. Khoảng 15 triệu cổ phiếu đang chờ "về bờ".',
                action: 'Canh chốt lời ngắn hạn'
            };
        case 'execution_plan':
            return {
                action: 'MUA', entry: '28.0 - 28.2', tp: '30.0 - 32.0', sl: '27.0', rr: '1:2.5',
                summary: 'Setup mua tại nền giá, cược break đỉnh ngắn hạn.'
            };
        default: return {};
    }
};

// ... existing helpers ...
export const getGhostMatchRange = (dataLength: number) => ({ start: 30, end: 55, similarity: '92%' });
export const getGhostPath = (data: CandleData[], dimensions: { width: number; height: number }, getX: (i:number)=>number, getY: (p:number)=>number) => {
    const lastCandle = data[data.length - 1];
    const lastIndex = data.length - 1;
    const startX = getX(lastIndex);
    const startY = getY(lastCandle.close);
    const dipIndex = lastIndex + 10;
    const endIndex = lastIndex + 25;
    const dipX = getX(dipIndex);
    const dipY = getY(lastCandle.close * 0.95);
    const endX = getX(endIndex);
    const endY = getY(lastCandle.close * 1.08);
    return `M ${startX} ${startY} L ${dipX} ${dipY} L ${endX} ${endY}`;
};
export const getTrappedZone = (maxPrice: number, priceRange: number) => ({ top: maxPrice - (priceRange * 0.15), bottom: maxPrice - (priceRange * 0.15) - (priceRange * 0.08), volume: '15.4M' });
export const getExecutionPlan = (lastClose: number) => ({ entry: lastClose * 0.99, tp: lastClose * 1.07, sl: lastClose * 0.96 });
