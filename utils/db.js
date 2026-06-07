/**
 * 本地数据库工具 - 对 wx.setStorageSync 的封装
 * 提供类似数据库的 CRUD 操作接口
 */

// 集合名称（相当于数据库的表名）
const COLLECTIONS = {
  GOODS: 'goods_list',
  FAVORITES: 'favorites',
  HISTORY: 'history',
  PUBLISHES: 'my_publishes',
  WISHLIST: 'wishlist'
};

const db = {
  /**
   * 查询全部文档
   * @param {string} collection - 集合名
   * @returns {Array}
   */
  findAll(collection) {
    try {
      return wx.getStorageSync(collection) || [];
    } catch (e) {
      console.error(`[DB] findAll ${collection} 失败:`, e);
      return [];
    }
  },

  /**
   * 按 ID 查询单个文档
   */
  findById(collection, id) {
    const list = this.findAll(collection);
    return list.find(item => item.id === id) || null;
  },

  /**
   * 条件查询（支持条件函数）
   * @param {string} collection
   * @param {Function} predicate - item => boolean
   */
  findWhere(collection, predicate) {
    const list = this.findAll(collection);
    return list.filter(predicate);
  },

  /**
   * 添加文档（自动生成 id）
   * @param {string} collection
   * @param {object} data - 要添加的数据
   * @returns {object} 添加后的完整文档（含 id）
   */
  insert(collection, data) {
    const list = this.findAll(collection);
    const maxId = list.reduce((max, item) => Math.max(max, item.id || 0), 0);
    const doc = {
      id: maxId + 1,
      ...data,
      _createTime: Date.now()
    };
    list.unshift(doc);
    try {
      wx.setStorageSync(collection, list);
      return doc;
    } catch (e) {
      console.error(`[DB] insert ${collection} 失败:`, e);
      return null;
    }
  },

  /**
   * 更新文档（按 id 合并）
   * @param {string} collection
   * @param {number} id
   * @param {object} data - 要更新的字段
   * @returns {boolean}
   */
  update(collection, id, data) {
    const list = this.findAll(collection);
    const index = list.findIndex(item => item.id === id);
    if (index === -1) return false;

    list[index] = {
      ...list[index],
      ...data,
      _updateTime: Date.now()
    };
    try {
      wx.setStorageSync(collection, list);
      return true;
    } catch (e) {
      console.error(`[DB] update ${collection} 失败:`, e);
      return false;
    }
  },

  /**
   * 删除文档
   */
  remove(collection, id) {
    const list = this.findAll(collection);
    const newList = list.filter(item => item.id !== id);
    if (newList.length === list.length) return false;
    try {
      wx.setStorageSync(collection, newList);
      return true;
    } catch (e) {
      console.error(`[DB] remove ${collection} 失败:`, e);
      return false;
    }
  },

  /**
   * 分页查询
   * @param {string} collection
   * @param {object} params - { page, pageSize, sort, filter }
   */
  page(collection, { page = 1, pageSize = 10, sort = {}, filter = () => true } = {}) {
    let list = this.findAll(collection).filter(filter);

    // 排序：{ field: 'publishTime', order: 'desc' }
    if (sort.field) {
      list.sort((a, b) => {
        const av = a[sort.field] || '';
        const bv = b[sort.field] || '';
        const cmp = typeof av === 'number' ? av - bv : String(av).localeCompare(String(bv));
        return sort.order === 'desc' ? -cmp : cmp;
      });
    }

    const total = list.length;
    const start = (page - 1) * pageSize;
    const items = list.slice(start, start + pageSize);

    return {
      items,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
      hasMore: start + pageSize < total
    };
  },

  /**
   * 统计文档数量
   */
  count(collection) {
    return this.findAll(collection).length;
  },

  /**
   * 清除整个集合
   */
  clear(collection) {
    try {
      wx.setStorageSync(collection, []);
      return true;
    } catch (e) {
      console.error(`[DB] clear ${collection} 失败:`, e);
      return false;
    }
  },

  /**
   * 批量初始化（只有集合为空时才写入）
   */
  seed(collection, data) {
    const list = this.findAll(collection);
    if (list.length === 0) {
      try {
        wx.setStorageSync(collection, data);
        return true;
      } catch (e) {
        console.error(`[DB] seed ${collection} 失败:`, e);
        return false;
      }
    }
    return false;
  }
};

module.exports = { db, COLLECTIONS };
