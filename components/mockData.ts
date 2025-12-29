import { StockData } from '../types';

export const INDICES = [
  { id: 'VNINDEX', name: 'VNINDEX', val: '1,254.30', chg: '+12.5', color: '#00c853', vol: '540M', valTx: '15.4k Tỷ', path: 'M0,15 C10,12 20,18 30,10 S50,5 60,2' },
  { id: 'VN30', name: 'VN30', val: '1,280.10', chg: '+15.2', color: '#00c853', vol: '180M', valTx: '8.2k Tỷ', path: 'M0,18 C15,15 25,12 35,8 S50,4 60,3' },
  { id: 'HNX', name: 'HNX', val: '240.50', chg: '+1.2', color: '#00c853', vol: '85M', valTx: '1.8k Tỷ', path: 'M0,10 C15,12 25,8 35,12 S50,6 60,5' },
  { id: 'UPCOM', name: 'UPCOM', val: '90.20', chg: '-0.5', color: '#f23645', vol: '45M', valTx: '800 Tỷ', path: 'M0,5 C10,8 20,10 30,15 S50,18 60,22' },
];

export const WORLD_INDICES = [
  { id: 'DJI', name: 'Dow Jones', val: '33,800.5', chg: '+120.5', color: '#00c853', vol: '300M', valTx: '-', path: 'M0,15 C10,12 20,18 30,10 S50,5 60,2' },
  { id: 'NDX', name: 'Nasdaq', val: '13,200.1', chg: '-50.2', color: '#f23645', vol: '500M', valTx: '-', path: 'M0,5 C10,8 20,10 30,15 S50,18 60,22' },
  { id: 'SPX', name: 'S&P 500', val: '4,100.2', chg: '+10.2', color: '#00c853', vol: '400M', valTx: '-', path: 'M0,18 C15,15 25,12 35,8 S50,4 60,3' },
  { id: 'NI225', name: 'Nikkei 225', val: '28,500.0', chg: '+200.0', color: '#00c853', vol: '100M', valTx: '-', path: 'M0,10 C15,12 25,8 35,12 S50,6 60,5' },
];

export const MOCK_HEATMAP: StockData[] = [
  { symbol: 'VCB', price: 88.1, change: -0.9, changePercent: -1.01, volume: 980200 },
  { symbol: 'BID', price: 45.2, change: 0.8, changePercent: 1.8, volume: 1500000 },
  { symbol: 'FPT', price: 98.2, change: 1.2, changePercent: 1.24, volume: 1200300 },
  { symbol: 'HPG', price: 28.9, change: -0.2, changePercent: -0.69, volume: 22100500 },
  { symbol: 'TCB', price: 34.5, change: 0.0, changePercent: 0.0, volume: 5600400 },
  { symbol: 'VPB', price: 19.4, change: 0.15, changePercent: 0.78, volume: 11200900 },
  { symbol: 'MBB', price: 18.6, change: 0.05, changePercent: 0.27, volume: 8900100 },
  { symbol: 'VNM', price: 67.2, change: -0.3, changePercent: -0.44, volume: 1800600 },
  { symbol: 'VIC', price: 44.5, change: 0.1, changePercent: 0.23, volume: 2300500 },
  { symbol: 'VHM', price: 42.8, change: 0.3, changePercent: 0.71, volume: 4500100 },
  { symbol: 'MWG', price: 45.1, change: -0.5, changePercent: -1.1, volume: 3400200 },
  { symbol: 'ACB', price: 25.45, change: 0.15, changePercent: 0.59, volume: 4500000 },
  { symbol: 'STB', price: 31.2, change: 0.4, changePercent: 1.3, volume: 15600800 },
  { symbol: 'GAS', price: 75.4, change: -0.8, changePercent: -1.05, volume: 800000 },
  { symbol: 'MSN', price: 65.0, change: 1.1, changePercent: 1.72, volume: 1100000 },
  { symbol: 'SAB', price: 58.2, change: -0.1, changePercent: -0.17, volume: 400000 },
  { symbol: 'GVR', price: 21.5, change: 0.6, changePercent: 2.87, volume: 2100000 },
  { symbol: 'PLX', price: 35.8, change: 0.2, changePercent: 0.56, volume: 600000 },
  { symbol: 'POW', price: 11.2, change: 0.05, changePercent: 0.45, volume: 3500000 },
  { symbol: 'VRE', price: 22.1, change: -0.15, changePercent: -0.67, volume: 2800000 },
  { symbol: 'SSI', price: 34.2, change: 0.85, changePercent: 2.55, volume: 9500000 },
  { symbol: 'VND', price: 22.6, change: 0.4, changePercent: 1.8, volume: 7200000 },
  { symbol: 'HDB', price: 23.5, change: 0.25, changePercent: 1.08, volume: 3100000 },
  { symbol: 'TPB', price: 17.8, change: 0.1, changePercent: 0.56, volume: 4200000 },
  { symbol: 'CTG', price: 32.1, change: 0.3, changePercent: 0.94, volume: 2200000 },
  { symbol: 'VIB', price: 20.8, change: 0.1, changePercent: 0.48, volume: 1800000 },
  { symbol: 'EIB', price: 18.2, change: -0.2, changePercent: -1.09, volume: 1500000 },
  { symbol: 'LPB', price: 15.6, change: 0.2, changePercent: 1.3, volume: 3100000 },
  { symbol: 'SHB', price: 11.4, change: 0.0, changePercent: 0.0, volume: 8200000 },
  { symbol: 'SSB', price: 22.8, change: -0.1, changePercent: -0.44, volume: 500000 },
  { symbol: 'OCB', price: 13.9, change: 0.1, changePercent: 0.72, volume: 1200000 },
  { symbol: 'MSB', price: 14.2, change: 0.15, changePercent: 1.07, volume: 2500000 },
];

export const IMPACT_DATA = [
  { symbol: 'VHM', val: 8.0, type: 'inc' },
  { symbol: 'VJC', val: 1.88, type: 'inc' },
  { symbol: 'GAS', val: 1.45, type: 'inc' },
  { symbol: 'VRE', val: 1.08, type: 'inc' },
  { symbol: 'VPL', val: 0.87, type: 'inc' },
  { symbol: 'VCB', val: 0.72, type: 'inc' },
  { symbol: 'TCB', val: 0.39, type: 'inc' },
  { symbol: 'REE', val: 0.11, type: 'inc' },
  { symbol: 'PLX', val: 0.1, type: 'inc' },
  { symbol: 'VNM', val: 0.09, type: 'inc' },
  { symbol: 'HVN', val: -0.2, type: 'dec' },
  { symbol: 'SSI', val: -0.24, type: 'dec' },
  { symbol: 'VPB', val: -0.25, type: 'dec' },
  { symbol: 'MWG', val: -0.28, type: 'dec' },
  { symbol: 'LPB', val: -0.28, type: 'dec' },
  { symbol: 'HPG', val: -0.33, type: 'dec' },
  { symbol: 'TCX', val: -0.41, type: 'dec' },
  { symbol: 'HDB', val: -0.48, type: 'dec' },
  { symbol: 'STB', val: -0.71, type: 'dec' },
  { symbol: 'VIC', val: -2.94, type: 'dec' },
];

export const INTELLIGENCE_POSTS = [
  {
    id: 'intro',
    type: 'hot_event',
    title: 'Sự kiện nóng hôm nay',
    content: 'Tất cả những gì bạn cần đọc về NÂNG HẠNG, cập nhật liên tục'
  },
  {
    id: 1,
    author: 'Dương Văn Duy',
    avatar: 'https://i.pravatar.cc/150?u=duy',
    verified: true,
    role: 'Chuyên gia nổi bật',
    tag: 'Theo dõi',
    time: '1 giờ trước',
    title: 'Tại Sao 90% Nhà Đầu Tư Mắc Kẹt Ở Mức Hòa Vốn?',
    content: 'Giấc mơ nâng hạng đã chính thức trở thành hiện thực, Việt Nam sẽ thoát bỏ chiếc áo chật chội và bước... Xem thêm',
    likes: 112,
    comments: 26,
    saves: 12,
    hasImage: false
  },
  {
    id: 2,
    author: 'Xuân Tiệp Vision',
    avatar: 'https://i.pravatar.cc/150?u=tiep',
    verified: true,
    role: null,
    tag: 'Theo dõi',
    time: '1 giờ trước',
    title: 'Làm Thế Nào Để Tìm Ra Cổ Phiếu Chất Lượng Sau Mùa Báo Cáo Kết Quả Kinh Doanh?',
    content: 'Giấc mơ nâng hạng đã chính thức trở thành hiện thực, Việt Nam sẽ thoát bỏ chiếc áo chật chội và bước... Xem thêm',
    likes: 112,
    comments: 26,
    saves: 12,
    hasImage: false
  },
  {
    id: 3,
    author: 'Quỳnh Anh _ Canslim',
    avatar: 'https://i.pravatar.cc/150?u=quynhanh',
    verified: true,
    role: 'Chuyên gia nổi bật',
    tag: 'Theo dõi',
    time: '1h',
    isQuote: true,
    content: 'Dự báo Vnindex có thể sẽ tiếp tục đà tăng trong những phiên tới. Dòng tiền lan tỏa mạnh mẽ sang nhóm Midcap và Penny, xác nhận xu hướng uptrend bền vững. Nhà đầu tư nên tập trung vào các mã có câu chuyện tăng trưởng lợi nhuận đột biến trong Q4 sắp tới.',
    likes: 112,
    comments: 26,
    saves: 12,
    hasImage: false
  }
];

export const NEWS_POSTS = [
  {
    id: 4,
    author: 'Finpath Master',
    avatar: 'logo',
    verified: false,
    role: null,
    time: '10:48',
    title: 'Với VIC, định giá căng nhất chỉ khoảng 70',
    subtitle: 'Team tư vấn Tvi',
    content: `• Nhìn vào bản chất, VIC với lợi nhuận toàn từ các khoản đột biến, lợi nhuận ngoài lề thì không đáng để đầu tư dài hạn.
• Khi Vin không làm đường sắt nữa, kỳ vọng đã hết - tất cả dự án đã khởi công, bây giờ phải đi thực hiện.
• Dòng tiền sẽ khó vào VIC khi câu chuyện không còn gì vĩ đại để kể.
• Ngày mai VIC khó dư sàn vì hàng bên ngoài không nhiều, nhưng sẽ đi ngang và tìm vùng cân bằng mới.
• Nhà đầu tư nhỏ lẻ nên tránh xa nhóm này - ai đu đỉnh nhóm Vin mới cần lo lắng, còn lại cứ bám theo cổ phiếu tăng trưởng định giá hấp dẫn như ngân hàng, chứng khoán, bán lẻ và Hòa Phát.`,
    disclaimer: 'Thông tin chỉ sử dụng với mục đích tham khảo, KHÔNG phải khuyến nghị đầu tư.',
    likes: 28,
    comments: 0,
    saves: 0,
    hasImage: false
  },
  {
    id: 5,
    author: 'Finpath Master',
    avatar: 'logo',
    verified: false,
    role: null,
    time: '13:25',
    title: 'VIN KHÔNG LÀM ĐSCT, KHÔNG PHẢI LÀ THIÊN NGA ĐEN',
    subtitle: 'Chuyên gia Long Lãng tử buôn nước mắm.',
    content: `Thị trường có nhịp giảm mạnh do 4 cp Vin nằm sau tiếp sau tin bỏ làm dsct bắc nam hôm qua, Tuy nhiên đây là ảnh hưởng mang tính tâm lí là chủ yếu bởi vì :
• Xét về thiệt hại vs nhóm vin : gần như ko có , thậm chí còn có lợi khi đường sắt cao tốc phải bỏ rất nhiều vốn mà bài toán lỗ là rất cao
• Xét về ảnh hưởng đến vĩ mô và các cổ phiếu khác dẫn đến thị trường chứng khoán : gần như không có sự liên can lắm .

Do vậy em thấy 1-2 phiên có thể tâm lí, nhưng đến phiên thứ 3 gần như chắc chắn ttck sẽ hồi (thậm chí sớm nhất là chiều nay).

Mọi người nếu còn sức mua thì nhập các cổ phiếu tốt, triển vọng dài hạn như mwg hpg pvs ctg mbb ctd hhv nt2 hah dgw, còn nếu đang cầm nhiều rồi thì cứ bình tĩnh.
Đây là sự kiến rất nhỏ theo kinh nghiệm em thấy ko ảnh hưởng quá 2 phiên đâu ạ

Em gặp khá nhiều sự kiến mang tính thiên nga đen rồi , có thể khẳng định luôn là sự kiện này rất rất nhỏ, sang tuần sau có khi ndt quên luôn`,
    likes: 37,
    comments: 0,
    saves: 0,
    hasImage: false,
    highlightLinks: true
  },
  {
    id: 6,
    author: 'Finpath Master',
    avatar: 'logo',
    verified: false,
    role: null,
    time: '10:07',
    title: 'ĐỪNG CÓ HAM BẮT ĐÁY GIÁ SÀN VỚI CỔ PHIẾU VIN',
    subtitle: 'Chuyên gia Hùng Canslim',
    content: `• Kinh nghiệm cho thấy nên né các mã mới có tin xấu vĩ mô sau khi tăng cực mạnh ra, như họ nhà V thì phải né thật xa ra, khi đã có tin xấu như vậy là cú đảo chiều lớn rồi, nó như kiểu FPT năm ngoái ấy, khi giá tăng dài, ai cũng kỳ vọng lớn, thì có tin xấu cái là giảm giá cả năm luôn, thì V cũng đang là như vậy
• Đừng ham giá sàn mà tưởng ngon, cp đã tăng 8 lần, thì việc giảm 40-50 % là bình thường luôn, như vậy còn là quá đắt
• Năm mới phải tìm dòng mới, bỏ hẳn dòng V luôn đi

Nguồn: bản quyền thuộc về team chuyên gia trong bài. Chúng tôi chỉ tổng hợp/ trích dẫn 1 phần, quý vị có thể đăng ký dịch vụ với chuyên gia để sử dụng được full quyền lợi.`,
    disclaimer: 'Thông tin chỉ mang tính THAM KHẢO, không phải khuyến nghị đầu tư.',
    likes: 7,
    comments: 0,
    saves: 0,
    hasImage: false
  }
];

export const TOP_MOVERS_MOCK = [
  { s: 'HPG', p: 27.40, d: 4.38, w: 2.62 },
  { s: 'PVS', p: 32.90, d: 1.54, w: 1.86 },
  { s: 'BSR', p: 16.20, d: 1.89, w: 1.57 },
  { s: 'HUT', p: 16.20, d: 1.25, w: -4.71 },
  { s: 'PVD', p: 26.80, d: 1.13, w: -2.90 },
  { s: 'NVL', p: 13.50, d: 1.50, w: -2.53 },
  { s: 'CII', p: 22.50, d: 0.00, w: -4.05 },
  { s: 'POW', p: 12.70, d: 0.79, w: 4.10 },
  { s: 'HVN', p: 25.90, d: 0.78, w: 0.78 },
  { s: 'VCG', p: 23.35, d: 0.65, w: -2.10 },
  { s: 'NLG', p: 31.20, d: 0.65, w: -1.58 },
  { s: 'SAB', p: 48.40, d: 0.41, w: -2.62 },
  { s: 'TCB', p: 34.20, d: 0.59, w: 1.79 },
  { s: 'TPB', p: 17.10, d: 0.59, w: 1.48 },
  { s: 'VCI', p: 34.55, d: 0.44, w: -0.58 },
  { s: 'VHC', p: 53.40, d: 0.75, w: -2.02 },
  { s: 'VNM', p: 61.60, d: 0.49, w: -3.75 },
  { s: 'GVR', p: 25.75, d: 0.39, w: -2.65 },
];

export const TOP_VOLUME_MOCK = [
  { s: 'HPG', p: 27.40, v: 1884.7, d: 4.38 },
  { s: 'VRE', p: 30.15, v: 1280.5, d: -6.51 },
  { s: 'MSR', p: 24.50, v: 1095.2, d: -2.39 },
  { s: 'VHM', p: 106.30, v: 995.2, d: -7.00 },
  { s: 'TCH', p: 18.60, v: 332.0, d: -1.33 },
  { s: 'HCM', p: 22.90, v: 617.0, d: 0.00 },
  { s: 'IDC', p: 36.60, v: 674.3, d: -0.54 },
  { s: 'GVR', p: 25.75, v: 581.4, d: 0.39 },
  { s: 'PVS', p: 32.90, v: 450.7, d: 1.54 },
  { s: 'KDH', p: 31.95, v: 601.9, d: -0.62 },
  { s: 'TCB', p: 34.20, v: 523.2, d: 0.59 },
  { s: 'PVD', p: 26.80, v: 423.8, d: 1.13 },
  { s: 'ABB', p: 15.80, v: 515.3, d: 0.00 }, 
  { s: 'VIC', p: 147.00, v: 462.4, d: -6.96 }, 
  { s: 'EIB', p: 21.85, v: 461.2, d: -0.68 },
  { s: 'MBB', p: 24.95, v: 446.5, d: -0.20 },
  { s: 'REE', p: 61.40, v: 445.2, d: 0.00 },
  { s: 'VPB', p: 28.65, v: 404.5, d: -0.35 },
];

export const TOP_FOREIGN_MOCK = [
  { b: 'MWG', bv: 618.1, s: 'DGC', sv: 843.3 },
  { b: 'SSI', bv: 491.2, s: 'VIC', sv: 647.5 },
  { b: 'STB', bv: 440.0, s: 'FPT', sv: 412.5 },
  { b: 'HPG', bv: 322.6, s: 'GMD', sv: 134.9 },
  { b: 'VIX', bv: 298.2, s: 'DGW', sv: 108.0 },
  { b: 'VPB', bv: 287.3, s: 'DIG', sv: 93.4 },
  { b: 'MBB', bv: 269.6, s: 'LPB', sv: 82.7 },
  { b: 'VND', bv: 266.8, s: 'CII', sv: 79.1 },
  { b: 'GEX', bv: 263.8, s: 'MBS', sv: 77.5 },
  { b: 'VJC', bv: 262.6, s: 'HDB', sv: 76.6 },
  { b: 'VPL', bv: 239.8, s: 'ACB', sv: 71.6 },
  { b: 'BSR', bv: 238.2, s: 'NLG', sv: 71.3 },
  { b: 'VHM', bv: 236.9, s: 'HCM', sv: 62.2 },
  { b: 'GAS', bv: 189.1, s: 'HVN', sv: 58.5 },
  { b: 'MSN', bv: 179.1, s: 'ACV', sv: 55.8 },
  { b: 'KDH', bv: 124.6, s: 'VPX', sv: 44.0 },
  { b: 'POW', bv: 123.3, s: 'CEO', sv: 33.8 },
  { b: 'VRE', bv: 116.7, s: 'SAB', sv: 28.1 },
  { b: 'PVD', bv: 112.5, s: 'PC1', sv: 27.1 },
  { b: 'TPB', bv: 108.5, s: 'NVL', sv: 26.6 },
  { b: 'MCH', bv: 100.3, s: 'SHS', sv: 24.5 },
  { b: 'CTG', bv: 98.6, s: 'BSI', sv: 19.2 },
  { b: 'TAL', bv: 91.1, s: 'DBC', sv: 16.8 },
];
