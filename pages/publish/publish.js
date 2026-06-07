// 发布页
const app = getApp();
const { db, COLLECTIONS } = require('../../utils/db.js');

Page({
  data: {
    form: {
      title: '', category: '', price: '', originalPrice: '',
      condition: '', location: '', contact: '', description: ''
    },
    images: [],
    categories: [],
    categoryNames: [],
    categoryIndex: 0,
    conditions: ['全新', '99新', '9成新', '8成新', '其他'],
    conditionIndex: 0,
    isFormValid: false,
    submitting: false
  },

  onLoad() {
    const categories = app.globalData.categories.filter(item => item.id !== 'all');
    this.setData({
      categories,
      categoryNames: categories.map(item => item.name)
    });
  },

  chooseImage() {
    const maxCount = 9 - this.data.images.length;
    if (maxCount <= 0) return;

    wx.chooseImage({
      count: maxCount,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({ images: this.data.images.concat(res.tempFilePaths) });
        this.checkFormValid();
      }
    });
  },

  removeImage(e) {
    const images = this.data.images;
    images.splice(e.currentTarget.dataset.index, 1);
    this.setData({ images });
    this.checkFormValid();
  },

  onInputChange(e) {
    this.setData({ [`form.${e.currentTarget.dataset.field}`]: e.detail.value });
    this.checkFormValid();
  },

  onCategoryChange(e) {
    const idx = parseInt(e.detail.value);
    this.setData({ categoryIndex: idx, 'form.category': this.data.categories[idx].id });
    this.checkFormValid();
  },

  onConditionChange(e) {
    const idx = parseInt(e.detail.value);
    this.setData({ conditionIndex: idx, 'form.condition': this.data.conditions[idx] });
    this.checkFormValid();
  },

  checkFormValid() {
    const { form } = this.data;
    this.setData({
      isFormValid: !!(form.title.trim() && form.category && form.price &&
        form.condition && form.location.trim() && form.contact.trim() && form.description.trim())
    });
  },

  formatDate(date) {
    return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
  },

  onSubmit() {
    if (!this.data.isFormValid) {
      return wx.showToast({ title: '请填写完整信息', icon: 'none' });
    }

    const { form, images } = this.data;
    const price = parseFloat(form.price);
    if (isNaN(price) || price <= 0) {
      return wx.showToast({ title: '请输入有效的价格', icon: 'none' });
    }

    this.setData({ submitting: true });

    // 使用 db.insert() — 自动生成 id
    const newGoods = db.insert(COLLECTIONS.GOODS, {
      title: form.title.trim(),
      category: form.category,
      price: price,
      originalPrice: form.originalPrice ? parseFloat(form.originalPrice) : price,
      condition: form.condition,
      location: form.location.trim(),
      description: form.description.trim(),
      images: images.length > 0 ? images : ['/images/goods/default.png'],
      contact: form.contact.trim(),
      publisher: '我',
      publishTime: this.formatDate(new Date()),
      status: '在售'
    });

    // 记录到"我的发布"
    if (newGoods) {
      const publishes = db.findAll(COLLECTIONS.PUBLISHES);
      publishes.unshift(newGoods.id);
      wx.setStorageSync(COLLECTIONS.PUBLISHES, publishes);
    }

    wx.showToast({ title: '发布成功', icon: 'success', duration: 2000 });

    this.setData({
      form: { title: '', category: '', price: '', originalPrice: '', condition: '', location: '', contact: '', description: '' },
      images: [],
      categoryIndex: 0, conditionIndex: 0, isFormValid: false, submitting: false
    });

    setTimeout(() => wx.switchTab({ url: '/pages/index/index' }), 1500);
  }
});
