// 我的页面
const { db, COLLECTIONS } = require('../../utils/db.js');
const mockData = require('../../data/mock.js');

Page({
  data: {
    userInfo: {},
    currentTab: 'favorites',
    goodsList: [],
    stats: { favorites: 0, history: 0, publishes: 0, wishlist: 0 },
    emptyIcon: '❤️',
    emptyText: '暂无收藏商品'
  },

  onLoad() {
    this.loadUserInfo();
  },

  onShow() {
    this.loadData();
  },

  loadUserInfo() {
    this.setData({ userInfo: wx.getStorageSync('user_info') || {} });
  },

  // 加载统计数据
  loadData() {
    this.setData({
      stats: {
        favorites: db.count(COLLECTIONS.FAVORITES),
        history: db.count(COLLECTIONS.HISTORY),
        publishes: db.count(COLLECTIONS.PUBLISHES),
        wishlist: db.count(COLLECTIONS.WISHLIST)
      }
    });
    this.loadGoodsByTab(this.data.currentTab);
  },

  // 切换 Tab
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab;
    this.setData({ currentTab: tab });
    this.loadGoodsByTab(tab);
  },

  // 根据 Tab 加载商品
  loadGoodsByTab(tab) {
    const allGoods = db.findAll(COLLECTIONS.GOODS);
    let ids = [];
    const emptyMap = {
      favorites: ['❤️', '暂无收藏商品'],
      history: ['👀', '暂无浏览记录'],
      publishes: ['📝', '暂无发布商品'],
      wishlist: ['📋', '暂无意向商品']
    };

    switch (tab) {
      case 'favorites': ids = db.findAll(COLLECTIONS.FAVORITES); break;
      case 'history': ids = db.findAll(COLLECTIONS.HISTORY); break;
      case 'publishes': ids = db.findAll(COLLECTIONS.PUBLISHES); break;
      case 'wishlist': ids = db.findAll(COLLECTIONS.WISHLIST); break;
    }

    const items = ids.map(id => allGoods.find(g => g.id === id)).filter(Boolean);

    this.setData({
      goodsList: items,
      emptyIcon: emptyMap[tab][0],
      emptyText: emptyMap[tab][1]
    });
  },

  // 跳转到详情页
  goToDetail(e) {
    wx.navigateTo({ url: `/pages/detail/detail?id=${e.currentTarget.dataset.id}` });
  },

  // 取消收藏
  removeFavorite(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定取消收藏该商品吗？',
      success: (res) => {
        if (res.confirm) {
          let favorites = db.findAll(COLLECTIONS.FAVORITES);
          favorites = favorites.filter(item => item !== id);
          wx.setStorageSync(COLLECTIONS.FAVORITES, favorites);
          this.loadData();
          wx.showToast({ title: '已取消收藏', icon: 'success' });
        }
      }
    });
  },

  // 删除浏览记录
  removeHistory(e) {
    const id = e.currentTarget.dataset.id;
    let history = db.findAll(COLLECTIONS.HISTORY);
    history = history.filter(item => item !== id);
    wx.setStorageSync(COLLECTIONS.HISTORY, history);
    this.loadData();
    wx.showToast({ title: '已删除记录', icon: 'success' });
  },

  // 删除发布（同时从所有集合中移除）
  deletePublish(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定删除该发布吗？删除后不可恢复',
      success: (res) => {
        if (!res.confirm) return;

        // 从商品集合删除
        db.remove(COLLECTIONS.GOODS, id);

        // 从各ID列表中移除
        ['FAVORITES', 'HISTORY', 'PUBLISHES', 'WISHLIST'].forEach(key => {
          let list = db.findAll(COLLECTIONS[key]);
          list = list.filter(item => item !== id);
          wx.setStorageSync(COLLECTIONS[key], list);
        });

        this.loadData();
        wx.showToast({ title: '删除成功', icon: 'success' });
      }
    });
  },

  // 移出意向清单
  removeWishlist(e) {
    const id = e.currentTarget.dataset.id;
    let wishlist = db.findAll(COLLECTIONS.WISHLIST);
    wishlist = wishlist.filter(item => item !== id);
    wx.setStorageSync(COLLECTIONS.WISHLIST, wishlist);
    this.loadData();
    wx.showToast({ title: '已移出清单', icon: 'success' });
  },

  // 修改头像
  changeAvatar() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempPath = res.tempFilePaths[0];
        const userInfo = this.data.userInfo;
        userInfo.avatarUrl = tempPath;
        wx.setStorageSync('user_info', userInfo);
        this.setData({ userInfo });
        wx.showToast({ title: '头像已更新', icon: 'success' });
      }
    });
  },

  // 修改昵称
  editNickname() {
    wx.showModal({
      title: '修改昵称',
      content: '',
      editable: true,
      placeholderText: '请输入新昵称',
      confirmText: '保存',
      success: (res) => {
        if (res.confirm && res.content && res.content.trim()) {
          const userInfo = this.data.userInfo;
          userInfo.nickName = res.content.trim();
          wx.setStorageSync('user_info', userInfo);
          this.setData({ userInfo });
          wx.showToast({ title: '昵称已更新', icon: 'success' });
        }
      }
    });
  },

  // 清除所有缓存
  clearAllCache() {
    wx.showModal({
      title: '警告',
      content: '确定要清除所有本地数据吗？此操作不可恢复！',
      confirmColor: '#ff6b6b',
      success: (res) => {
        if (!res.confirm) return;

        // 清空所有集合
        Object.values(COLLECTIONS).forEach(key => db.clear(key));

        // 重新写入模拟数据
        db.seed(COLLECTIONS.GOODS, mockData.goodsList);

        this.loadData();
        wx.showToast({ title: '清除成功', icon: 'success' });
      }
    });
  }
});
