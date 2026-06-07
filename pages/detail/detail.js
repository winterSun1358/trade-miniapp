// 商品详情页
const { db, COLLECTIONS } = require('../../utils/db.js');

Page({
  data: {
    goods: {},
    isFavorite: false,
    isWishlist: false,
    swiperCurrent: 0,
    imageErrors: {}
  },

  onLoad(options) {
    const id = parseInt(options.id);
    if (id) {
      this.loadGoodsDetail(id);
    } else {
      wx.showToast({ title: '商品不存在', icon: 'error' });
      setTimeout(() => wx.navigateBack(), 1500);
    }
  },

  loadGoodsDetail(id) {
    const categoryMap = {
      'book': '教材', 'digital': '电子产品',
      'life': '生活用品', 'sport': '运动器材', 'other': '其他'
    };

    const goods = db.findById(COLLECTIONS.GOODS, id);
    if (!goods) {
      wx.showToast({ title: '商品不存在', icon: 'error' });
      setTimeout(() => wx.navigateBack(), 1500);
      return;
    }

    this.setData({
      goods: { ...goods, categoryName: categoryMap[goods.category] || '其他' }
    });

    const favorites = db.findAll(COLLECTIONS.FAVORITES);
    const wishlist = db.findAll(COLLECTIONS.WISHLIST);
    this.setData({
      isFavorite: favorites.includes(id),
      isWishlist: wishlist.includes(id)
    });
  },

  toggleFavorite() {
    const { goods, isFavorite } = this.data;
    let favorites = db.findAll(COLLECTIONS.FAVORITES);

    if (isFavorite) {
      favorites = favorites.filter(id => id !== goods.id);
      wx.setStorageSync(COLLECTIONS.FAVORITES, favorites);
      this.setData({ isFavorite: false });
      wx.showToast({ title: '已取消收藏', icon: 'success' });
    } else {
      favorites.push(goods.id);
      wx.setStorageSync(COLLECTIONS.FAVORITES, favorites);
      this.setData({ isFavorite: true });
      wx.showToast({ title: '收藏成功', icon: 'success' });
    }
  },

  toggleWishlist() {
    const { goods, isWishlist } = this.data;
    let wishlist = db.findAll(COLLECTIONS.WISHLIST);

    if (isWishlist) {
      wishlist = wishlist.filter(id => id !== goods.id);
      wx.setStorageSync(COLLECTIONS.WISHLIST, wishlist);
      this.setData({ isWishlist: false });
      wx.showToast({ title: '已移出意向清单', icon: 'success' });
    } else {
      wishlist.push(goods.id);
      wx.setStorageSync(COLLECTIONS.WISHLIST, wishlist);
      this.setData({ isWishlist: true });
      wx.showToast({ title: '已加入意向清单', icon: 'success' });
    }
  },

  onSwiperChange(e) {
    this.setData({ swiperCurrent: e.detail.current });
  },

  previewImage(e) {
    const { goods } = this.data;
    const index = e.currentTarget.dataset.index !== undefined ? parseInt(e.currentTarget.dataset.index) : 0;

    if (!goods.images || goods.images.length === 0) {
      wx.showToast({ title: '暂无图片', icon: 'none' });
      return;
    }

    wx.previewImage({
      current: goods.images[index] || goods.images[0],
      urls: goods.images
    });
  },

  onImageError(e) {
    const index = e.currentTarget.dataset.index;
    if (index !== undefined) {
      this.setData({ [`imageErrors.${index}`]: true });
    }
  },

  copyContact() {
    const { goods } = this.data;
    wx.setClipboardData({
      data: goods.contact,
      success: () => wx.showToast({ title: '已复制联系方式', icon: 'success' })
    });
  }
});
