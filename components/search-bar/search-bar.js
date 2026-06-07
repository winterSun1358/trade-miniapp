// 搜索栏组件
Component({
  properties: {
    value: {
      type: String,
      value: ''
    },
    placeholder: {
      type: String,
      value: '搜索商品...'
    },
    isFixed: {
      type: Boolean,
      value: false
    },
    showClear: {
      type: Boolean,
      value: true
    },
    showCancel: {
      type: Boolean,
      value: false
    }
  },

  methods: {
    onInput(e) {
      this.triggerEvent('input', { value: e.detail.value });
    },

    onSearch() {
      this.triggerEvent('search', { value: this.properties.value });
    },

    onClear() {
      this.triggerEvent('clear');
    },

    onCancel() {
      this.triggerEvent('cancel');
    }
  }
});
