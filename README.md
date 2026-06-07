# 🏪 校园二手物品交易小程序

> 广州商学院 · 现代信息产业学院 · 《微信小程序开发》课程设计  
> 选题三：校园二手物品交易小程序

---

## 📋 项目简介

校园二手物品交易小程序是一个面向高校学生的二手交易平台。学生可以在平台上浏览、搜索二手商品，查看商品详情，收藏感兴趣的商品，发布自己的闲置物品，管理个人交易信息。

### 核心功能

| 功能 | 说明 |
|------|------|
| 🏠 **首页** | 轮播图推荐、分类浏览、关键词搜索、价格/时间排序、下拉刷新 |
| 📄 **商品详情** | 图片轮播预览、商品信息展示、收藏/取消收藏、加入意向清单、复制联系方式 |
| ✏️ **发布商品** | 从相册选择真实图片、填写商品信息、表单校验、模拟发布 |
| 👤 **我的** | 修改头像/昵称、收藏商品管理、浏览历史、我的发布、意向清单、清除缓存 |

### 页面结构

```
pages/
├── index/      首页（轮播图 + 分类 + 搜索 + 商品列表）
├── detail/     商品详情页（图片预览 + 收藏 + 意向清单）
├── publish/    发布页（图片上传 + 表单填写 + 发布）
└── profile/    我的页面（用户信息 + 数据管理 + 缓存管理）
```

---

## 🛠️ 技术栈

- **开发工具**：微信开发者工具
- **框架**：原生微信小程序框架（WXML + WXSS + JS）
- **数据存储**：本地存储（`wx.setStorageSync` / `wx.getStorageSync`）
- **自定义组件**：`goods-card`（商品卡片）、`search-bar`（搜索栏）
- **UI 设计**：Flex / Grid 布局、CSS 变量主题系统

### 使用到的微信 API

| API | 用途 |
|-----|------|
| `wx.showToast` | 操作成功/失败提示 |
| `wx.showModal` | 确认弹窗（删除、清除缓存） |
| `wx.showLoading` | 加载等待提示 |
| `wx.navigateTo` | 跳转到详情页 |
| `wx.switchTab` | tabBar 页面切换 |
| `wx.setStorageSync` | 本地存储写入 |
| `wx.getStorageSync` | 本地存储读取 |
| `wx.removeStorageSync` | 本地存储删除 |
| `wx.previewImage` | 图片全屏预览 |
| `wx.chooseImage` | 从相册/相机选择图片 |
| `wx.setClipboardData` | 复制联系方式 |

---

## 🚀 快速开始

### 1. 下载项目

```bash
git clone https://github.com/winterSun1358/trade-miniapp.git
```

### 2. 导入微信开发者工具

1. 打开 **微信开发者工具**
2. 点击 **导入项目**
3. 选择项目目录 `trade-miniapp/`
4. 填入你的 **AppID**（如果没有可申请测试号）
5. 点击 **导入**

### 3. 编译运行

- 点击开发者工具顶部的 **编译** 按钮
- 如果遇到编译缓存问题，点击 **工具 → 清除 → 全部清除** 后重新编译

---

## 📁 项目目录结构

```
trade/
├── app.js                    # 全局逻辑（初始化本地数据）
├── app.json                  # 全局配置（页面路由、tabBar）
├── app.wxss                  # 全局样式（主题变量、通用类）
├── data/
│   └── mock.js               # 模拟数据（商品列表、分类、轮播图）
├── components/
│   ├── goods-card/           # 商品卡片自定义组件
│   └── search-bar/           # 搜索栏自定义组件
├── pages/
│   ├── index/                # 首页
│   ├── detail/               # 商品详情页
│   ├── publish/              # 发布页
│   └── profile/              # 我的页面
├── utils/
│   └── db.js                 # 本地数据库封装（CRUD + 分页）
├── images/
│   └── tabbar/               # tabBar 图标
├── project.config.json       # 项目配置文件
└── sitemap.json              # 站点地图
```

---

## 🔧 本地数据库工具

项目封装了 `utils/db.js` 本地数据库工具，提供类似数据库的 CRUD 操作接口：

```javascript
const { db, COLLECTIONS } = require('../../utils/db.js');

// 查询全部
db.findAll('goods_list');

// 按ID查询
db.findById('goods_list', 1);

// 条件查询
db.findWhere('goods_list', g => g.price < 50);

// 新增（自动生成id）
db.insert('goods_list', { title: '新商品', price: 99 });

// 更新
db.update('goods_list', 1, { price: 20 });

// 删除
db.remove('goods_list', 1);

// 分页查询
db.page('goods_list', { page: 1, pageSize: 10 });

// 统计数量
db.count('favorites');
```

---

## 📝 自定义模拟数据

编辑 `data/mock.js` 文件，修改 `goodsList` 数组即可自定义商品数据：

```javascript
{
  id: 1,                    // 商品ID
  title: '商品名称',         // 商品标题
  category: 'book',         // 分类（book/digital/life/sport/other）
  price: 25,                // 价格
  originalPrice: 89,        // 原价
  condition: '9成新',       // 成色
  location: '交易地点',     // 交易地点
  description: '商品描述',  // 商品描述
  images: ['图片URL'],      // 图片链接数组
  contact: '联系方式',       // 联系方式
  publisher: '发布者',       // 发布者名称
  publishTime: '2026-06-01', // 发布时间
  status: '在售'            // 状态（在售/已售出）
}
```

---

## ✅ 课程设计要求完成情况

| 要求 | 状态 |
|------|------|
| 4个可运行页面（首页、详情页、发布页、我的页） | ✅ |
| tabBar 导航 | ✅ |
| 页面跳转（navigator / wx.navigateTo） | ✅ |
| swiper / scroll-view / image / input / picker / textarea 等组件 | ✅ |
| Flex / Grid 布局 | ✅ |
| 数据绑定 / wx:if / wx:for / setData | ✅ |
| 搜索、筛选、排序 | ✅ |
| 收藏 / 取消收藏 | ✅ |
| 新增、删除、查询（CRUD） | ✅ |
| 本地存储（setStorage / getStorage） | ✅ |
| 常用 API（showToast / showModal / previewImage 等 10+ 个） | ✅ |
| 下拉刷新 | ✅ |
| 自定义组件（goods-card / search-bar） | ✅ |
| 图片预览 | ✅ |
| 操作提示和确认弹窗 | ✅ |
| 修改用户信息（头像 / 昵称） | ✅ |
| 错误处理（图片加载失败兜底） | ✅ |

---

## 📄 课程设计文档

> 以下为提交课程设计报告时的参考小标题

1. **项目背景** — 校园二手交易的需求分析
2. **功能设计** — 页面结构 + 功能模块图
3. **页面设计** — 首页、详情页、发布页、我的页的布局说明
4. **技术实现**
   - 数据绑定与列表渲染
   - 页面路由与参数传递
   - 本地数据持久化
   - 常用 API 调用
   - 自定义组件封装
5. **运行效果** — 各页面截图
6. **总结** — 开发过程与心得体会

---

## 👥 小组成员及分工参考

| 成员 | 分工 |
|------|------|
| xx | 首页 + 商品列表 |
| xx | 商品详情页 + 收藏功能 |
| xx | 发布页 + 表单校验 |
| xx | 我的页面 + 本地存储 + 文档 |

---

*项目生成于 2026年6月 · 广州商学院 现代信息产业学院*
