/**
 * 本地模拟数据
 * 包含商品分类、商品列表等静态数据
 */

// 商品分类
const categories = [
  { id: 'all', name: '全部' },
  { id: 'book', name: '教材' },
  { id: 'digital', name: '电子产品' },
  { id: 'life', name: '生活用品' },
  { id: 'sport', name: '运动器材' },
  { id: 'other', name: '其他' }
];

// 成色选项
const conditions = ['全新', '99新', '9成新', '8成新', '其他'];

// 商品列表
const goodsList = [
  {
    id: 1,
    title: '高等数学（第七版）上下册',
    category: 'book',
    price: 25,
    originalPrice: 89,
    condition: '9成新',
    location: '图书馆门口',
    description: '高等数学同济第七版，上下册一起出。书内有少量笔记，封面完好，适合大一同学使用。',
    images: [
      'https://img.alicdn.com/i4/2356231674/O1CN01sDeTCd1OEjnjB3FTP_!!2356231674.png'
    ],
    contact: '微信：math2024',
    publisher: '张同学',
    publishTime: '2026-06-01',
    status: '在售'
  },
  {
    id: 2,
    title: 'iPad Air 4 64G 天蓝色',
    category: 'digital',
    price: 2800,
    originalPrice: 4799,
    condition: '99新',
    location: '学生宿舍3栋',
    description: 'iPad Air 4 64G WiFi版，天蓝色。购买于2025年9月，一直带壳贴膜使用，无划痕无磕碰。配件齐全，含原装充电器。',
    images: [
      'https://mercrt-fd.zol-img.com.cn/t_s640x2000/g6/M00/0C/01/ChMkKV_EgYyIXWWjAACYNC228q0AAGCwQGcBDAAAJhM297.jpg',
      'https://img14.360buyimg.com/pop/jfs/t1/216544/38/32184/185309/64b3b16bFfa358ed3/3b9f9fd23d4ac7c8.png'
    ],
    contact: 'QQ：123456789',
    publisher: '李同学',
    publishTime: '2026-06-02',
    status: '在售'
  },
  {
    id: 3,
    title: '尤尼克斯羽毛球拍',
    category: 'sport',
    price: 180,
    originalPrice: 350,
    condition: '8成新',
    location: '体育馆',
    description: '尤尼克斯入门级羽毛球拍，使用一年，拍线新换的24磅。适合新手练习使用。',
    images: [
      'https://ts2.tc.mm.bing.net/th/id/OIP-C.dz-dunyC63NbtOXApDcuMwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3'
    ],
    contact: '微信：badminton88',
    publisher: '王同学',
    publishTime: '2026-06-03',
    status: '在售'
  },
  {
    id: 4,
    title: '台灯 护眼LED',
    category: 'life',
    price: 35,
    originalPrice: 99,
    condition: '9成新',
    location: '二食堂门口',
    description: '护眼LED台灯，三档调光，可折叠。使用半年，功能正常，因毕业转让。',
    images: [
      'https://img95.699pic.com/photo/60029/8353.jpg_wh860.jpg'
    ],
    contact: '微信：light2026',
    publisher: '陈同学',
    publishTime: '2026-06-04',
    status: '在售'
  },
  {
    id: 5,
    title: 'C++ Primer Plus（第6版）',
    category: 'book',
    price: 45,
    originalPrice: 128,
    condition: '99新',
    location: '计算机楼',
    description: 'C++ Primer Plus 第6版中文版，几乎全新，只翻过几次。经典编程入门书籍。',
    images: [
      'https://www0.kfzimg.com/sw/kfz-cos/kfzimg/febfaaaf/7682c1e01ea8cc28_b.jpg'
    ],
    contact: 'QQ：987654321',
    publisher: '刘同学',
    publishTime: '2026-06-05',
    status: '在售'
  },
  {
    id: 6,
    title: '罗技无线鼠标M280',
    category: 'digital',
    price: 40,
    originalPrice: 89,
    condition: '9成新',
    location: '实验楼A座',
    description: '罗技M280无线鼠标，使用一年，功能完好，送新电池。手感舒适，适合办公学习。',
    images: [
      'https://img0.pconline.com.cn/pconline/1410/13/5560417_img_4316_thumb.jpg'
    ],
    contact: '微信：mouse2026',
    publisher: '赵同学',
    publishTime: '2026-06-06',
    status: '在售'
  },
  {
    id: 7,
    title: '篮球 斯伯丁正品',
    category: 'sport',
    price: 80,
    originalPrice: 199,
    condition: '8成新',
    location: '篮球场',
    description: '斯伯丁正品篮球，7号标准球。使用一年，表皮有正常磨损，气密性好。',
    images: [
      'https://img95.699pic.com/photo/60017/5478.jpg_wh860.jpg'
    ],
    contact: '微信：basketball99',
    publisher: '孙同学',
    publishTime: '2026-06-06',
    status: '在售'
  },
  {
    id: 8,
    title: '收纳箱 大号3个装',
    category: 'life',
    price: 20,
    originalPrice: 45,
    condition: '全新',
    location: '女生宿舍5栋',
    description: '大号塑料收纳箱3个装，全新未使用。尺寸：50*35*28cm，适合收纳衣物书籍。',
    images: [
      'https://pic4.zhimg.com/v2-a26c2b93e05abcb14b99e48a0f75bf93_r.jpg'
    ],
    contact: '微信：storage66',
    publisher: '周同学',
    publishTime: '2026-06-07',
    status: '在售'
  }
];

// 轮播图数据
const banners = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    title: '毕业季大甩卖',
    category: 'all'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800',
    title: '教材低价转让',
    category: 'book'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
    title: '数码好物推荐',
    category: 'digital'
  }
];

module.exports = {
  categories,
  conditions,
  goodsList,
  banners
};
