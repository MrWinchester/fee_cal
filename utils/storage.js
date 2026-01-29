// utils/storage.js
// 本地存储封装

const { DEFAULT_PRICES, STORAGE_KEYS } = require('./constants.js');

/**
 * 初始化价格数据
 * 首次启动时将默认价格写入本地存储
 */
function initPrices() {
  try {
    const existingPrices = tt.getStorageSync(STORAGE_KEYS.PRICES);
    if (!existingPrices) {
      tt.setStorageSync(STORAGE_KEYS.PRICES, DEFAULT_PRICES);
      console.log('价格数据初始化成功');
    }
  } catch (e) {
    console.error('初始化价格数据失败:', e);
    tt.setStorageSync(STORAGE_KEYS.PRICES, DEFAULT_PRICES);
  }
}

/**
 * 获取价格配置
 * @returns {Object} 价格配置对象
 */
function getPrices() {
  try {
    const prices = tt.getStorageSync(STORAGE_KEYS.PRICES);
    return prices || DEFAULT_PRICES;
  } catch (e) {
    console.error('获取价格数据失败:', e);
    return DEFAULT_PRICES;
  }
}

/**
 * 更新价格配置
 * @param {Object} newPrices - 新的价格配置
 * @returns {Boolean} 是否更新成功
 */
function updatePrices(newPrices) {
  try {
    tt.setStorageSync(STORAGE_KEYS.PRICES, newPrices);
    console.log('价格数据更新成功');
    return true;
  } catch (e) {
    console.error('更新价格数据失败:', e);
    return false;
  }
}

/**
 * 更新单个价格项
 * @param {String} key - 价格项的键名
 * @param {Number} newPrice - 新价格
 * @returns {Boolean} 是否更新成功
 */
function updateSinglePrice(key, newPrice) {
  try {
    const prices = getPrices();
    if (prices[key]) {
      prices[key].price = parseFloat(newPrice);
      return updatePrices(prices);
    }
    return false;
  } catch (e) {
    console.error('更新单个价格失败:', e);
    return false;
  }
}

/**
 * 检查登录状态
 * @returns {Boolean} 是否已登录
 */
function isLoggedIn() {
  try {
    const status = tt.getStorageSync(STORAGE_KEYS.LOGIN_STATUS);
    return status === true || status === 'true';
  } catch (e) {
    console.error('获取登录状态失败:', e);
    return false;
  }
}

/**
 * 设置登录状态
 * @param {Boolean} status - 登录状态
 */
function setLoginStatus(status) {
  try {
    tt.setStorageSync(STORAGE_KEYS.LOGIN_STATUS, status);
    console.log('登录状态更新:', status);
  } catch (e) {
    console.error('设置登录状态失败:', e);
  }
}

/**
 * 清除所有存储数据（用于测试）
 */
function clearStorage() {
  try {
    tt.clearStorageSync();
    console.log('存储数据已清除');
  } catch (e) {
    console.error('清除存储数据失败:', e);
  }
}

module.exports = {
  initPrices,
  getPrices,
  updatePrices,
  updateSinglePrice,
  isLoggedIn,
  setLoginStatus,
  clearStorage
};
