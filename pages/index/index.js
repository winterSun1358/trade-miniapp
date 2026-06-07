// 首页
const mockData = require('../../data/mock.js');
const { db, COLLECTIONS } = require('../../utils/db.js');

Page({
  data: {
    banners: [],
    categories: [],
    currentCategory: 'all',
    goodsList: [],
    allGoods: [],
    searchKeyword: '',
    sortType: 'default',
    isRefreshing: false,
    hasMore: true
  },

  onLoad() {
    this.setData({
      banners: mockData.banners,
      categories: mockData.categories
    });
    this.loadGoodsList();
  },

  onShow() {
    this.loadGoodsList();
  },

  // 加载商品列表
  loadGoodsList() {
    const categoryMap = {
      'book': '教材', 'digital': '电子产品',
      'life': '生活用品', 'sport': '运动器材', 'other': '其他'
    };

    const allGoods = db.findAll(COLLECTIONS.GOODS).map(item => ({
      ...item,
      categoryName: categoryMap[item.category] || '其他'
    }));

    this.setData({ allGoods });
    this.filterAndSortGoods();
  },

  // 筛选和排序
  filterAndSortGoods() {
    let { allGoods, currentCategory, searchKeyword, sortType } = this.data;
    let filtered = [...allGoods];

    if (currentCategory !== 'all') {
      filtered = filtered.filter(item => item.category === currentCategory);
    }

    if (searchKeyword.trim()) {
      const keyword = searchKeyword.trim().toLowerCase();
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(keyword) ||
        item.description.toLowerCase().includes(keyword)
      );
    }

    switch (sortType) {
      case 'price_asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'time':
        filtered.sort((a, b) => new Date(b.publishTime) - new Date(a.publishTime));
        break;
      default:
        filtered.sort((a, b) => {
          if (a.status === '在售' && b.status !== '在售') return -1;
          if (a.status !== '在售' && b.status === '在售') return 1;
          return new Date(b.publishTime) - new Date(a.publishTime);
        });
    }

    this.setData({ goodsList: filtered, hasMore: false });
  },

  // 分类点击
  onCategoryTap(e) {
    this.setData({ currentCategory: e.currentTarget.dataset.id });
    this.filterAndSortGoods();
  },

  // 搜索输入
  onSearchInput(e) {
    this.setData({ searchKeyword: e.detail.value });
  },

  // 搜索
  onSearch() {
    this.filterAndSortGoods();
    if (this.data.searchKeyword.trim()) {
      wx.showToast({ title: '搜索完成', icon: 'success' });
    }
  },

  // 清除搜索
  onSearchClear() {
    this.setData({ searchKeyword: '' });
    this.filterAndSortGoods();
  },

  // 排序切换
  onSortChange(e) {
    this.setData({ sortType: e.currentTarget.dataset.type });
    this.filterAndSortGoods();
  },

  // 轮播图切换
  onBannerChange(e) {
    this.setData({ bannerCurrent: e.detail.current });
  },

  // 轮播图点击 — 按分类筛选
  onBannerTap(e) {
    const category = e.currentTarget.dataset.category;
    if (category) {
      this.setData({ currentCategory: category });
      this.filterAndSortGoods();
    }
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.setData({ isRefreshing: true });
    this.loadGoodsList();
    this.setData({ isRefreshing: false });
    wx.showToast({ title: '刷新成功', icon: 'success' });
  },

  // 跳转到详情页
  goToDetail(e) {
    const id = e.detail?.id || e.currentTarget?.dataset?.id;
    if (!id) return;

    // 记录浏览历史
    let history = db.findAll(COLLECTIONS.HISTORY);
    history = history.filter(item => item !== id);
    history.unshift(id);
    if (history.length > 50) history = history.slice(0, 50);
    wx.setStorageSync(COLLECTIONS.HISTORY, history);

    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}`
    });
  }
});
