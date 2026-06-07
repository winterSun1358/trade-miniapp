// 商品卡片组件
Component({
  data: {
    imageError: false
  },

  properties: {
    id: {
      type: Number,
      value: 0
    },
    image: {
      type: String,
      value: ''
    },
    title: {
      type: String,
      value: ''
    },
    price: {
      type: String,
      value: '0'
    },
    originalPrice: {
      type: String,
      value: '0'
    },
    condition: {
      type: String,
      value: ''
    },
    categoryName: {
      type: String,
      value: ''
    },
    location: {
      type: String,
      value: ''
    },
    publishTime: {
      type: String,
      value: ''
    },
    showTags: {
      type: Boolean,
      value: true
    },
    showMeta: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    onTap() {
      this.triggerEvent('cardtap', { id: this.properties.id });
    },

    onImageError() {
      this.setData({ imageError: true });
    }
  }
});
