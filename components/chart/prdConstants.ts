import { Scan, Ghost, Volume2, PieChart, AlertTriangle, PlayCircle } from 'lucide-react';
import { CandleData } from '../../types';

export type PrdModuleId = 'safety_scanner' | 'ghost_projection' | 'sentiment_360' | 'valuation_sector' | 'trapped_zones' | 'execution_plan';

export const PRD_MODULES = [
  { id: 'safety_scanner', label: '1. Máy Quét An Toàn T+', icon: Scan, color: '#f59e0b', desc: 'Tính toán xác suất lãi/lỗ T+2.5' },
  { id: 'ghost_projection', label: '2. Bóng Ma Quá Khứ', icon: Ghost, color: '#06b6d4', desc: 'Tìm mẫu hình tương đồng lịch sử' },
  { id: 'sentiment_360', label: '3. Tình Báo Tin Đồn 360°', icon: Volume2, color: '#8b5cf6', desc: 'Phân tích tin đồn & dòng tiền' },
  { id: 'valuation_sector', label: '4. Định Giá & Ngành', icon: PieChart, color: '#10b981', desc: 'Định giá 3 góc độ: P/E, PB, Peer' },
  { id: 'trapped_zones', label: '5. Vùng Kẹp Hàng', icon: AlertTriangle, color: '#ef4444', desc: 'Xác định kháng cự tâm lý' },
  { id: 'execution_plan', label: '6. Kế Hoạch Hành Động', icon: PlayCircle, color: '#3b82f6', desc: 'Setup điểm mua/bán cụ thể' },
];

export const getSafetyScannerPoints = (data: CandleData[]) => {
    return [
        { id: 'p1', index: 20, result: 'win', return: '+5.2%', date: '12/10/2023', reason: 'Nổ Vol + Break nền' },
        { id: 'p2', index: 45, result: 'loss', return: '-2.1%', date: '05/11/2023', reason: 'Bull trap thị trường chung' },
        { id: 'p3', index: 60, result: 'win', return: '+3.8%', date: '22/11/2023', reason: 'Test cung thành công' },
        { id: 'p4', index: 82, result: 'win', return: '+4.8%', date: '15/12/2023', reason: 'Dòng tiền vào nhóm thép' },
    ];
};

export const getSentimentMarkers = (data: CandleData[]) => {
    return [
        { id: 's1', index: data.length - 15, type: 'bull', title: 'Tin đồn lợi nhuận', source: 'Room F189', time: '14:00' },
        { id: 's2', index: data.length - 5, type: 'bear', title: 'Áp lực bán 29.5', source: 'Broker VPS', time: '09:15' },
    ];
};

export const getPeBands = (data: CandleData[]) => {
    // Simulate "Earnings" trend using a moving average of price to create smooth bands
    // In a real app, this would use actual EPS data.
    const lookback = 30;
    const bands = data.map((d, i) => {
        // Calculate simple moving average as a proxy for "Fair Value" baseline
        let sum = 0;
        let count = 0;
        for (let j = Math.max(0, i - lookback); j <= i; j++) {
            sum += data[j].close;
            count++;
        }
        const avgPrice = count > 0 ? sum / count : d.close;
        
        // Assume the Avg Price roughly correlates to P/E 15 for this stock
        const impliedEps = avgPrice / 15;

        return {
            pe10: impliedEps * 10,
            pe15: impliedEps * 15,
            pe20: impliedEps * 20
        };
    });
    return bands;
};

export const getAiAnalysisData = (moduleId: PrdModuleId, selectedId?: string | null) => {
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
        if (selectedId === 's1') {
            return {
                type: 'detail',
                title: 'Tin đồn tích cực',
                source: 'Room F189 (Uy tín: Cao)',
                content: 'Rò rỉ tin lợi nhuận Quý này của HPG vượt 20% so với cùng kỳ. Cá mập đang gom hàng vùng 27.x.',
                action: 'Dòng tiền lớn đang vào'
            }
        }
        if (selectedId === 's2') {
             return {
                type: 'detail',
                title: 'Cảnh báo rủi ro',
                source: 'Room Broker VPS',
                content: 'Vùng 29.5 là kháng cự mạnh (đỉnh tháng 9). Áp lực chốt lời T+ rất lớn. Khuyến nghị hạ tỷ trọng.',
                action: 'Cẩn trọng Bull trap'
            }
        }
    }

    switch(moduleId) {
        case 'safety_scanner':
            return {
                score: 8.5,
                survivalRate: '82%',
                signal: 'MUA (An toàn)',
                summary: 'Dữ liệu lịch sử cho thấy 82% các phiên bùng nổ của HPG đều mang lại lợi nhuận T+. Độ an toàn cao.',
                details: [
                    { label: 'Số lần Win', value: '18/22' },
                    { label: 'Avg Return T+3', value: '+4.5%' },
                    { label: 'Vol Đột biến', value: '> 1.5x TB 20 phiên' }
                ]
            };
        case 'ghost_projection':
            return {
                similarity: '85%',
                patternCount: 8,
                outlook: 'Tăng giá',
                summary: 'Cấu trúc tích lũy 60 phiên hiện tại rất giống giai đoạn trước sóng tăng tháng 5/2021. Lịch sử cho thấy 70% xác suất giá sẽ bứt phá sau nhịp rũ bỏ này.',
                details: [
                    { label: 'Mẫu hình', value: 'Sideway Up' },
                    { label: 'Độ lệch chuẩn', value: '0.45' },
                    { label: 'Khung thời gian', value: '60 Phiên' }
                ]
            };
        case 'sentiment_360':
            return {
                sentiment: 'Bullish (Tích cực)',
                bullRatio: 75,
                summary: 'Tin tốt ra nhưng dòng tiền lớn đang bán chủ động. Cẩn trọng bẫy tăng giá.',
                sources: [
                    { type: 'bull', text: 'Tin đồn lợi nhuận đột biến (Nguồn: F189)' },
                    { type: 'bull', text: 'KOL Long Lãng khuyến nghị Mua' },
                    { type: 'bear', text: 'Áp lực bán vùng 29.5 (Nguồn: Room Broker VPS)' }
                ]
            };
        case 'valuation_sector':
            return {
                status: 'UNDERVALUED (Rẻ)',
                targetPrice: '34,000',
                gap: '+17%',
                summary: 'Giá hiện tại đang nằm trong vùng P/E 10.x - Đây là vùng định giá RẺ nhất trong 3 năm qua. Cơ hội tích sản.',
                metrics: [
                    { label: 'P/E Hiện tại', value: '10.2x', eval: 'Rẻ' },
                    { label: 'P/E Trung bình', value: '15.0x', eval: '' },
                    { label: 'Định giá', value: 'Hấp dẫn', eval: 'Mua' }
                ]
            };
        case 'trapped_zones':
            return {
                zonePrice: '29.5 - 30.0',
                volume: '15.4M',
                status: 'Kháng cự mạnh',
                summary: 'Phát hiện vùng kẹp hàng lớn tại 29.5. Khoảng 15 triệu cổ phiếu đang chờ "về bờ". Áp lực bán sẽ gia tăng mạnh khi giá tiệm cận vùng này.',
                action: 'Canh chốt lời ngắn hạn'
            };
        case 'execution_plan':
            return {
                action: 'MUA',
                entry: '28.0 - 28.2',
                tp: '30.0 - 32.0',
                sl: '27.0',
                rr: '1:2.5',
                summary: 'Dựa trên dữ liệu: Hỗ trợ cứng 27.0, Kháng cự kẹp hàng 29.5. Setup mua tại nền giá, cược break đỉnh ngắn hạn.'
            };
        default: return {};
    }
};

export const getGhostMatchRange = (dataLength: number) => {
    return {
        start: 30,
        end: 55,
        similarity: '92%'
    };
};

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

export const getTrappedZone = (maxPrice: number, priceRange: number) => {
    const top = maxPrice - (priceRange * 0.15);
    const bottom = top - (priceRange * 0.08);
    return { top, bottom, volume: '15.4M' };
};

export const getExecutionPlan = (lastClose: number) => {
    return {
        entry: lastClose * 0.99, 
        tp: lastClose * 1.07,    
        sl: lastClose * 0.96     
    };
};