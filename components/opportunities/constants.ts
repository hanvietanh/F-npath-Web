
import { StockData } from '../../types';

export interface ExpertProfile {
  name: string;
  avatar: string;
  role: string;
  isVerified?: boolean;
}

export interface SignalData {
  id: number;
  expert: ExpertProfile;
  time: string;
  action: 'Mua' | 'Bán';
  symbol: string;
  price: number;
  expectedProfit: number;
  holdingTime: string;
  isSell?: boolean;
}

export interface ExpertCardData {
  id: number;
  name: string;
  avatar: string;
  isVerified: boolean;
  followers: string;
  rating: number;
  isFollowing: boolean;
  rooms: {
    name: string;
    members: string;
    action: string;
  }[];
  return30d: string;
}

export const SIGNALS: SignalData[] = [
  {
    id: 1,
    expert: {
      name: 'Dương Văn Duy',
      avatar: 'https://i.pravatar.cc/150?u=duy',
      role: 'Chuyên gia nổi bật',
      isVerified: true
    },
    time: '1 phút trước',
    action: 'Mua',
    symbol: 'VND',
    price: 126.02,
    expectedProfit: 17.68,
    holdingTime: '45 ngày'
  },
  {
    id: 2,
    expert: {
      name: 'VnDirect Research',
      avatar: 'https://ui-avatars.com/api/?name=VnDirect&background=f97316&color=fff',
      role: 'Công ty Chứng Khoán',
      isVerified: true
    },
    time: '1 phút trước',
    action: 'Mua',
    symbol: 'VND',
    price: 126.02,
    expectedProfit: 17.68,
    holdingTime: '3-6 tháng'
  },
  {
    id: 3,
    expert: {
      name: 'Dương Văn Duy',
      avatar: 'https://i.pravatar.cc/150?u=duy',
      role: 'Chuyên gia nổi bật',
      isVerified: true
    },
    time: '1 phút trước',
    action: 'Bán',
    symbol: 'VND',
    price: 126.02,
    expectedProfit: 17.68,
    holdingTime: '---',
    isSell: true
  },
  {
    id: 4,
    expert: {
      name: 'Alpha Seekers',
      avatar: 'https://ui-avatars.com/api/?name=Alpha+Seekers&background=a855f7&color=fff',
      role: 'Quỹ đầu tư',
      isVerified: true
    },
    time: '5 phút trước',
    action: 'Mua',
    symbol: 'FPT',
    price: 96.50,
    expectedProfit: 24.50,
    holdingTime: '6-12 tháng'
  },
  {
    id: 5,
    expert: {
      name: 'Finpath AI',
      avatar: 'https://ui-avatars.com/api/?name=AI&background=2962ff&color=fff',
      role: 'AI Signal',
      isVerified: true
    },
    time: '10 phút trước',
    action: 'Mua',
    symbol: 'HPG',
    price: 28.10,
    expectedProfit: 12.50,
    holdingTime: '30 ngày'
  },
  {
    id: 6,
    expert: {
      name: 'Dragon Capital',
      avatar: 'https://ui-avatars.com/api/?name=Dragon&background=00c853&color=fff',
      role: 'Quỹ ngoại',
      isVerified: true
    },
    time: '15 phút trước',
    action: 'Mua',
    symbol: 'MWG',
    price: 45.20,
    expectedProfit: 15.00,
    holdingTime: '3 tháng'
  },
  {
    id: 7,
    expert: {
      name: 'SSI Research',
      avatar: 'https://ui-avatars.com/api/?name=SSI&background=f23645&color=fff',
      role: 'Công ty Chứng Khoán',
      isVerified: true
    },
    time: '20 phút trước',
    action: 'Bán',
    symbol: 'NVL',
    price: 16.50,
    expectedProfit: 8.50,
    holdingTime: '---',
    isSell: true
  },
  {
    id: 8,
    expert: {
      name: 'MBS Research',
      avatar: 'https://ui-avatars.com/api/?name=MBS&background=0ea5e9&color=fff',
      role: 'Công ty Chứng Khoán',
      isVerified: true
    },
    time: '30 phút trước',
    action: 'Mua',
    symbol: 'PVS',
    price: 36.80,
    expectedProfit: 21.00,
    holdingTime: '6 tháng'
  }
];

export const FEATURED_EXPERTS: ExpertCardData[] = [
  {
    id: 1,
    name: 'Duy Uptrend',
    avatar: 'https://i.pravatar.cc/150?u=duy',
    isVerified: true,
    followers: '3,289',
    rating: 4.9,
    isFollowing: false,
    rooms: [
      { name: 'Room tín hiệu giao dịch', members: '8,289', action: 'Tham gia' }
    ],
    return30d: '+223.8%'
  }
];

export const RECOMMENDED_EXPERTS: ExpertCardData[] = [
  {
    id: 2,
    name: 'Ngô Minh Đức LCTV',
    avatar: 'https://i.pravatar.cc/150?u=duc',
    isVerified: true,
    followers: '3,289',
    rating: 4.9,
    isFollowing: true,
    rooms: [
      { name: 'Nhóm đầu tư tăng trưởng dài...', members: '8,289', action: 'Tham gia' }
    ],
    return30d: '+223.8%'
  }
];

export const TOP_PL_EXPERTS: ExpertCardData[] = [
  {
    id: 3,
    name: 'Dương Văn Chung',
    avatar: 'https://i.pravatar.cc/150?u=chung',
    isVerified: true,
    followers: '3,289',
    rating: 4.9,
    isFollowing: false,
    rooms: [
      { name: 'AlphaStock Tư Vấn', members: '1,067', action: 'Tham gia' }
    ],
    return30d: '+15.4%'
  },
  {
    id: 4,
    name: 'Team TVI',
    avatar: 'https://i.pravatar.cc/150?u=tvi',
    isVerified: true,
    followers: '15,200',
    rating: 4.8,
    isFollowing: false,
    rooms: [
      { name: 'Tư vấn VIP TVI', members: '12,500', action: 'Tham gia' }
    ],
    return30d: '+18.2%'
  },
  {
    id: 5,
    name: 'Lý Phạm Stock',
    avatar: 'https://i.pravatar.cc/150?u=lypham',
    isVerified: true,
    followers: '5,100',
    rating: 4.7,
    isFollowing: false,
    rooms: [
      { name: 'Cộng đồng Lý Phạm', members: '3,200', action: 'Tham gia' }
    ],
    return30d: '+45.6%'
  },
  {
    id: 6,
    name: 'Cộng đồng Lý Phạm',
    avatar: 'https://i.pravatar.cc/150?u=lypham2',
    isVerified: false,
    followers: '3,200',
    rating: 4.5,
    isFollowing: false,
    rooms: [
       { name: 'Cộng đồng Lý Phạm', members: '3,200', action: 'Tham gia' }
    ],
    return30d: '+45.6%'
  }
];

export const EXPERTS = [
  { id: 1, name: 'Dương Văn Duy', return: '+134.5%', avatar: 'https://i.pravatar.cc/150?u=duy' },
  { id: 2, name: 'VnDirect Research', return: '+89.2%', avatar: 'https://ui-avatars.com/api/?name=VnDirect&background=f97316&color=fff' },
  { id: 3, name: 'Alpha Seekers', return: '+112.0%', avatar: 'https://ui-avatars.com/api/?name=Alpha+Seekers&background=a855f7&color=fff' },
];

export const TRENDING = [
  { symbol: 'VIC', change: '+4.5%', color: '#00c853' },
  { symbol: 'VHM', change: '-1.2%', color: '#f23645' },
  { symbol: 'FPT', change: '+2.1%', color: '#00c853' },
  { symbol: 'HPG', change: '0.0%', color: '#eab308' },
];
