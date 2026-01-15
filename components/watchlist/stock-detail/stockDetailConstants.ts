
export interface Trade {
  time: string;
  price: string | number;
  vol: number;
  side: 'M' | 'B';
  big?: boolean;
}

export interface ChartPoint {
  time: string;
  price: string;
  ma20: string;
  ma50: string;
  vol: number;
}

export interface FinancialData {
  periods: string[];
  ratiosTable: { name: string; values: number[]; format?: string }[];
  revenueChart: { period: string; revenue: number; profit: number; growth: number }[];
  profitChart: { period: string; gross: number; net: number; growth: number }[];
  balanceSheetChart: { period: string; shortAsset: number; longAsset: number; liabilities: number; equity: number }[];
  incomeStatement: { id: number; label: string; values: number[]; yoy: number; trend: number[]; highlight?: boolean; color?: string; subRow?: boolean; isPercent?: boolean }[];
}

export const generateChartData = (): ChartPoint[] => {
  const data: ChartPoint[] = [];
  let price = 28.0;
  for (let i = 0; i < 50; i++) {
    const change = (Math.random() - 0.45) * 0.5;
    price += change;
    data.push({
      time: `10:${i < 10 ? '0' + i : i}`,
      price: price.toFixed(2),
      ma20: (price - 0.2).toFixed(2),
      ma50: (price - 0.5).toFixed(2),
      vol: Math.floor(Math.random() * 5000) + 1000,
    });
  }
  return data;
};

export const orderBookData = {
  asks: [
    { price: 28.55, vol: 50200, percent: 80 },
    { price: 28.50, vol: 20500, percent: 40 },
    { price: 28.45, vol: 15000, percent: 30 },
    { price: 28.40, vol: 5000, percent: 10 },
    { price: 28.35, vol: 2000, percent: 5 },
  ],
  bids: [
    { price: 28.30, vol: 12000, percent: 25 },
    { price: 28.25, vol: 45000, percent: 70 },
    { price: 28.20, vol: 100000, percent: 100 },
    { price: 28.15, vol: 30000, percent: 50 },
    { price: 28.10, vol: 15000, percent: 25 },
  ]
};

export const initialLiveTape: Trade[] = [
  { time: '10:45:05', price: 28.50, vol: 100000, side: 'M', big: true },
  { time: '10:45:02', price: 28.50, vol: 10000, side: 'M', big: false },
  { time: '10:44:55', price: 28.45, vol: 5000, side: 'B', big: false },
  { time: '10:44:48', price: 28.45, vol: 60000, side: 'B', big: true },
  { time: '10:44:30', price: 28.50, vol: 2000, side: 'M', big: false },
];

export const financialDataV2: FinancialData = {
  periods: ['Q3/2023', 'Q4/2023', 'Q1/2024', 'Q2/2024', 'Q3/2024'],
  ratiosTable: [
    { name: 'P/E', values: [15.2, 14.8, 13.5, 14.1, 14.2] },
    { name: 'P/B', values: [1.8, 1.9, 2.0, 2.1, 2.1] },
    { name: 'ROE (%)', values: [16.2, 17.1, 17.5, 18.0, 18.5] },
    { name: 'Vốn hóa (Tỷ)', values: [145230, 152100, 160500, 158200, 165400], format: 'number' },
  ],
  revenueChart: [
    { period: 'Q3/23', revenue: 28700, profit: 2000, growth: 5.5 },
    { period: 'Q4/23', revenue: 29500, profit: 2200, growth: 8.2 },
    { period: 'Q1/24', revenue: 31000, profit: 2500, growth: 12.5 },
    { period: 'Q2/24', revenue: 33000, profit: 2800, growth: 15.0 },
    { period: 'Q3/24', revenue: 35000, profit: 3500, growth: 18.6 },
  ],
  profitChart: [
    { period: 'Q3/23', gross: 3800, net: 2000, growth: 10.2 },
    { period: 'Q4/23', gross: 4000, net: 2200, growth: 15.5 },
    { period: 'Q1/24', gross: 4500, net: 2500, growth: 18.2 },
    { period: 'Q2/24', gross: 5000, net: 2800, growth: 22.0 },
    { period: 'Q3/24', gross: 6000, net: 3500, growth: 25.0 },
  ],
  balanceSheetChart: [
    { period: 'Q3/23', shortAsset: 45000, longAsset: 100000, liabilities: 65000, equity: 80000 },
    { period: 'Q4/23', shortAsset: 48000, longAsset: 102000, liabilities: 68000, equity: 82000 },
    { period: 'Q1/24', shortAsset: 50000, longAsset: 105000, liabilities: 70000, equity: 85000 },
    { period: 'Q2/24', shortAsset: 55000, longAsset: 108000, liabilities: 75000, equity: 88000 },
    { period: 'Q3/24', shortAsset: 60000, longAsset: 110000, liabilities: 78000, equity: 92000 },
  ],
  incomeStatement: [
    { id: 1, label: 'Doanh thu thuần', values: [35000, 33000, 31000, 29500, 28700], yoy: 18.6, trend: [28700, 29500, 31000, 33000, 35000] },
    { id: 2, label: 'Lợi nhuận gộp', values: [6000, 5000, 4500, 4000, 3800], yoy: 20.0, trend: [3800, 4000, 4500, 5000, 6000], highlight: true },
    { id: 3, label: 'LNST (Lãi ròng)', values: [3500, 2800, 2500, 2200, 2000], yoy: 25.0, trend: [2000, 2200, 2500, 2800, 3500], highlight: true, color: 'text-emerald-400' },
  ],
};

export const companyProfileData = {
  introduction: "Tổng Công ty Điện lực Dầu khí Việt Nam (POW) được thành lập vào năm 2007 theo Quyết định 1468/QĐ-DKVN của Hội đồng quản trị Tập đoàn Dầu khí Quốc gia Việt Nam. Tổng Công ty hoạt động chính trong lĩnh vực sản xuất, truyền tải, kinh doanh, xuất nhập khẩu điện năng. Tổng Công ty chính thức hoạt động theo mô hình công ty cổ phần từ tháng 07/2018. PV Power đang quản lý vận hành 7 Nhà máy điện với tổng công suất lắp đặt là 4205 MW, gồm điện khí, than và thủy điện. Hàng năm PV Power cung cấp khoảng 21 tỷ kWh điện lên lưới điện quốc gia.",
  basicInfo: [
    { label: 'Mã SIC', value: 'POW' },
    { label: 'Mã ngành ICB', value: '7535' },
    { label: 'Năm thành lập', value: '31/05/2007' },
    { label: 'Vốn điều lệ', value: '27,868 Tỷ' },
    { label: 'Số lượng nhân sự', value: '2,112' },
  ],
  listingInfo: [
    { label: 'Ngày niêm yết', value: '06/03/2018' },
    { label: 'Nơi niêm yết', value: 'HOSE' },
    { label: 'Giá chào sàn (VNĐ)', value: '14,900' },
    { label: 'Vốn hoá', value: '40,688 Tỷ' },
    { label: 'KL đang niêm yết', value: '2.79 Tỷ' },
  ],
  leaders: [
    { name: 'Hoàng Văn Quang', position: 'Chủ tịch Hội đồng Quản trị' },
    { name: 'Lê Như Linh', position: 'Tổng Giám đốc' },
    { name: 'Phạm Minh Đức', position: 'Trưởng Ban kiểm soát' },
    { name: 'Chu Quang Toản', position: 'Kế toán trưởng' },
    { name: 'Trương Việt Phương', position: 'Phó Tổng Giám đốc' },
    { name: 'Nguyễn Duy Giang', position: 'Phó Tổng Giám đốc' },
    { name: 'Nguyễn Kiên', position: 'Phó Tổng Giám đốc' },
    { name: 'Ngô Văn Chiến', position: 'Phó Tổng Giám đốc' },
    { name: 'Phan Ngọc Hiền', position: 'Phó Tổng Giám đốc' },
    { name: 'Nguyễn Thị Thanh Hường', position: 'Thành viên Ban kiểm soát' },
    { name: 'Vũ Thị Ngọc Dung', position: 'Thành viên Ban kiểm soát' },
    { name: 'Hà Thị Minh Nguyệt', position: 'Thành viên Ban kiểm soát' },
  ]
};

export const shareholderData = {
  structure: [
    { name: 'Ban lãnh đạo', value: 40, color: '#10b981' },
    { name: 'Nước ngoài', value: 25, color: '#3b82f6' },
    { name: 'Khác', value: 35, color: '#6b7280' },
  ],
  majorHolders: [
    { id: 1, name: 'Trần Đình Long', shares: '1,516,320,000', percent: '26.08%', date: '30/06/2024' },
    { id: 2, name: 'Dragon Capital', shares: '350,200,000', percent: '6.02%', date: '15/07/2024' },
    { id: 3, name: 'VinaCapital', shares: '120,500,000', percent: '2.07%', date: '20/06/2024' },
    { id: 4, name: 'Vũ Thị Hiền', shares: '426,500,000', percent: '7.34%', date: '30/06/2024' },
    { id: 5, name: 'Trần Tuấn Dương', shares: '134,800,000', percent: '2.32%', date: '30/06/2024' },
  ],
  insiderDeals: [
    { id: 1, person: 'Nguyễn Văn A', position: 'Thành viên HĐQT', type: 'Bán khớp lệnh', vol: '200,000', price: '28,500', date: '12/01/2025', color: 'text-red-400' },
    { id: 2, person: 'Lê Thị B', tag: 'Vợ CT HĐQT', position: 'Người có lquan', type: 'Mua thỏa thuận', vol: '5,000,000', price: '27,000', date: '05/01/2025', color: 'text-emerald-400' },
    { id: 3, person: 'Quỹ Đầu tư X', position: 'Cổ đông lớn', type: 'Bán khớp lệnh', vol: '1,500,000', price: '28,200', date: '28/12/2024', color: 'text-red-400' },
  ],
  dividends: [
    { year: '2023', type: 'Tiền mặt', ratio: '10%', exDate: '25/05/2024' },
    { year: '2022', type: 'Cổ phiếu', ratio: '30%', exDate: '10/06/2023' },
    { year: '2022', type: 'Tiền mặt', ratio: '5%', exDate: '10/06/2023' },
    { year: '2021', type: 'Cổ phiếu', ratio: '40%', exDate: '01/06/2022' },
    { year: '2020', type: 'Tiền mặt', ratio: '5%', exDate: '15/05/2021' },
  ]
};

// --- FEED DATA FOR ANALYSIS TAB ---

export const stockAnalysisFeed = [
  {
    id: 1,
    type: 'post',
    author: {
      name: 'Dương Văn Duy',
      avatar: 'https://i.pravatar.cc/150?u=duy',
      verified: true,
      role: 'Chuyên gia nổi bật',
      isFollowing: false
    },
    time: '1 giờ trước',
    title: 'HPG tăng trần 3 phiên liên tiếp, động lực tăng trưởng là gì?',
    content: 'Giấc mơ nâng hạng đã chính thức trở thành hiện thực, Việt Nam sẽ thoát bỏ chiếc áo chật chội và bước vào sân chơi lớn hơn. Dòng tiền ngoại đang quay trở lại mạnh mẽ...',
    stats: { likes: 112, comments: 26, shares: 12 }
  },
  {
    id: 2,
    type: 'signal',
    author: {
      name: 'Dương Văn Duy',
      avatar: 'https://i.pravatar.cc/150?u=duy',
      verified: true,
      role: 'Chuyên gia nổi bật',
      isFollowing: false
    },
    time: '1 giờ trước',
    signal: {
      action: 'Mua',
      symbol: 'HPG',
      price: 28.50,
      profit: 17.68,
      duration: '45 ngày'
    },
    stats: { likes: 85, comments: 14, shares: 5 }
  },
  {
    id: 3,
    type: 'post',
    author: {
      name: 'Lý Phạm',
      avatar: 'https://i.pravatar.cc/150?u=lypham',
      verified: true,
      role: null,
      isFollowing: false
    },
    time: '1 giờ trước',
    title: '5 lí do bạn nên mua HPG ở giá này',
    content: 'Ngành thép đang phục hồi mạnh mẽ từ đáy. HPG với lợi thế quy mô và chuỗi giá trị khép kín sẽ là doanh nghiệp hưởng lợi đầu tiên khi cầu xây dựng tăng trở lại...',
    stats: { likes: 112, comments: 26, shares: 12 }
  },
  {
    id: 4,
    type: 'post',
    author: {
      name: 'Dương Văn Duy',
      avatar: 'https://i.pravatar.cc/150?u=duy',
      verified: true,
      role: 'Chuyên gia nổi bật',
      isFollowing: false
    },
    time: '2 giờ trước',
    title: 'Cập nhật nhanh phiên sáng: HPG tiếp tục dẫn sóng',
    content: 'Thanh khoản bùng nổ ngay từ ATO cho thấy dòng tiền lớn đang quyết liệt gom hàng. Kháng cự 28.0 đã bị phá vỡ...',
    stats: { likes: 45, comments: 8, shares: 2 }
  }
];
