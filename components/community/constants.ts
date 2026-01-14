
export const GROUP_INFO = {
  name: 'Đầu cơ theo sóng',
  type: 'Cộng đồng',
  members: '2,213 thành viên',
  avatar: 'https://ui-avatars.com/api/?name=Dau+Co&background=eab308&color=fff&size=150',
  admin: {
    name: 'Dương Văn Duy',
    avatar: 'https://i.pravatar.cc/150?u=duy',
    role: 'Trưởng nhóm',
    isVerified: true,
    desc: 'Là nhà đầu tư chuyên nghiệp theo trường phái đầu tư tăng trưởng theo dòng tiền, giá...'
  },
  portfolioReturn: '+6.31%',
  vipExpiry: '20/08/2026'
};

// Left Sidebar Data
export const SIDEBAR_ITEMS = {
  pinned: [
    {
      id: 1,
      title: 'Tình báo chứng khoán',
      subtitle: 'Khuyến nghị bán VND vì...',
      time: '09:42',
      unread: 15,
      avatarColor: 'bg-blue-600',
      icon: 'zap'
    },
    {
      id: 2,
      title: 'Room cộng đồng Finpath',
      subtitle: 'Vui lòng tích hợp AI...',
      time: '13/07',
      unread: 5,
      avatarColor: 'bg-purple-600',
      icon: 'users'
    },
    {
      id: 3,
      title: 'Hỏi đáp chuyên gia',
      subtitle: 'Chuyên gia nhận định...',
      time: '13/07',
      unread: 0,
      avatarColor: 'bg-indigo-600',
      icon: 'headphones'
    }
  ],
  community: [
    {
      id: 4,
      title: 'Đầu cơ theo sóng',
      subtitle: 'Thị trường tăng kịch trần...',
      time: '14:31',
      unread: 12,
      avatar: 'https://ui-avatars.com/api/?name=Dau+Co&background=eab308&color=fff&size=150',
      active: true
    },
    {
      id: 5,
      title: 'Dương Văn Duy',
      subtitle: 'Bán VND giá 126.02...',
      time: 'Just now',
      unread: 0,
      hasDot: true, // Red dot indicator
      avatar: 'https://i.pravatar.cc/150?u=duy'
    },
    {
      id: 6,
      title: 'Phạm Thị Lý',
      subtitle: 'Vào HPG chưa bồ?',
      time: '13:48',
      unread: 0,
      hasDot: true, // Blue dot indicator
      avatar: 'https://i.pravatar.cc/150?u=lypham'
    }
  ]
};

// Middle Column Chat Data
export const CHAT_MESSAGES = [
  {
    id: 1,
    author: 'Dương Văn Duy',
    avatar: 'https://i.pravatar.cc/150?u=duy',
    isVerified: true,
    role: 'Trưởng nhóm',
    time: '09:50',
    type: 'signal_card',
    action: 'Mua',
    actionColor: 'text-[#00c853]',
    symbol: 'VND',
    price: '126.02',
    statusLabel: 'ĐÃ ĐÓNG',
    rows: [
      { label: 'Giá chốt lời', value: '142.20 (+34.9%)', valueColor: 'text-[#00c853]' },
      { label: 'Giá cắt lỗ', value: '140.10 (-8.9%)', valueColor: 'text-[#f23645]' },
      { label: 'Tỉ lệ sử dụng vốn', value: '20%', valueColor: 'text-white' },
      { label: 'Lí do khuyến nghị', value: 'Xem ngay ->', valueColor: 'text-[#2962ff]', isLink: true }
    ],
    reactions: { likes: 4, icons: ['❤️', '😂', '🔥'] }
  },
  {
    id: 2,
    author: 'Dương Văn Duy',
    avatar: 'https://i.pravatar.cc/150?u=duy',
    isVerified: true,
    role: 'Trưởng nhóm',
    time: '09:50',
    type: 'signal_card',
    action: 'Bán',
    actionColor: 'text-[#f23645]',
    symbol: 'VND',
    price: '124.54',
    rows: [
      { label: 'Lãi/Lỗ', value: '(-8.9%)', valueColor: 'text-[#f23645]' },
      { label: 'Khối lượng bán', value: '20%', valueColor: 'text-white' },
      { label: 'Lí do khuyến nghị', value: 'Xem ngay ->', valueColor: 'text-[#2962ff]', isLink: true }
    ],
    isLocked: true,
    reactions: { likes: 4, icons: ['❤️', '😂', '🔥'] }
  },
  {
    id: 3,
    author: 'Dương Văn Duy',
    avatar: 'https://i.pravatar.cc/150?u=duy',
    isVerified: true,
    role: 'Trưởng nhóm',
    time: '09:50',
    type: 'signal_card',
    action: 'Bán sớm',
    actionColor: 'text-[#f23645]',
    symbol: 'VND',
    price: '124.54',
    rows: [
      { label: 'Lãi/Lỗ', value: '+34.9%', valueColor: 'text-[#00c853]' }
    ],
    isLocked: true,
    reactions: { likes: 4, icons: ['❤️', '😂', '🔥'] }
  },
  {
    id: 4,
    author: 'Dương Văn Duy',
    avatar: 'https://i.pravatar.cc/150?u=duy',
    isVerified: true,
    role: 'Trưởng nhóm',
    time: '09:50',
    type: 'signal_card',
    action: 'Cắt lỗ',
    actionColor: 'text-[#f23645]',
    symbol: '***',
    price: '***',
    rows: [
      { label: 'Lãi/Lỗ', value: '+34.9%', valueColor: 'text-[#00c853]' }
    ],
    isLocked: true,
    reactions: { likes: 4, icons: ['❤️', '😂', '🔥'] }
  },
  {
    id: 5,
    author: 'Dương Văn Duy',
    avatar: 'https://i.pravatar.cc/150?u=duy',
    isVerified: true,
    role: 'Trưởng nhóm',
    time: '09:50',
    type: 'signal_card',
    customTitle: 'Chuyên gia vừa Bán toàn bộ danh mục.',
    highlightText: 'Bán toàn bộ danh mục.',
    rows: [
      { label: 'Lãi/Lỗ', value: '+34.9%', valueColor: 'text-[#00c853]' }
    ],
    isLocked: true,
    reactions: { likes: 4, icons: ['❤️', '😂', '🔥'] }
  },
  {
    id: 6,
    author: 'Dương Văn Duy',
    avatar: 'https://i.pravatar.cc/150?u=duy',
    isVerified: true,
    role: 'Trưởng nhóm',
    time: '09:50',
    type: 'text_card',
    title: 'Phiên hôm nay nên hành động như thế nào?',
    contentLines: [
      'Tuyệt đối không mua thêm các cổ phiếu sau trong phiên này bao gồm:',
      '• Ngân hàng: 60-80% (trọng tâm)',
      '• Chứng khoán: 10-15%'
    ],
    footer: 'Thông tin chỉ mang tính THAM KHẢO, không phải khuyến nghị đầu tư.',
    isLocked: true,
    reactions: { likes: 4, icons: ['❤️', '😂', '🔥'] }
  }
];
