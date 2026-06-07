// app.js
const mockData = require('./data/mock.js');
const { db, COLLECTIONS } = require('./utils/db.js');

App({
  onLaunch() {
    this.initStorage();
  },

  // 初始化本地存储
  initStorage() {
    // 使用 db.seed() — 只有第一次启动时写入模拟数据
    db.seed(COLLECTIONS.GOODS, mockData.goodsList);
    db.seed(COLLECTIONS.FAVORITES, []);
    db.seed(COLLECTIONS.HISTORY, []);
    db.seed(COLLECTIONS.PUBLISHES, []);
    db.seed(COLLECTIONS.WISHLIST, []);

    // 用户信息单独处理
    if (!wx.getStorageSync('user_info')) {
      wx.setStorageSync('user_info', {
        nickName: '校园用户',
        avatarUrl: '/images/default-avatar.png'
      });
    }
  },

  globalData: {
    categories: mockData.categories,
    conditions: mockData.conditions
  }
});
