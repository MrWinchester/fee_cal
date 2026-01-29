// utils/constants.js
// 默认价格配置

const DEFAULT_PRICES = {
  cutting: {
    name: '切割费',
    unit: '平米',
    price: 50,
    key: 'cutting',
    type: 'area'  // 按面积计算
  },
  processing: {
    name: '加工费',
    unit: '项',
    price: 100,
    key: 'processing',
    type: 'quantity'  // 按数量计算
  },
  packing: {
    name: '打包费',
    unit: '次',
    price: 30,
    key: 'packing',
    type: 'quantity'
  },
  shipping: {
    name: '运费',
    unit: '公里',
    price: 5,
    key: 'shipping',
    type: 'quantity'
  },
  unloading: {
    name: '卸货搬运',
    unit: '次',
    price: 80,
    key: 'unloading',
    type: 'quantity'
  },
  installation: {
    name: '安装',
    unit: '平米',
    price: 60,
    key: 'installation',
    type: 'area'  // 按面积计算
  },
  ledStrip: {
    name: '灯带(含灯带安装)',
    unit: '平米',
    price: 40,
    key: 'ledStrip',
    type: 'area'  // 按面积计算
  },
  other: {
    name: '其他',
    unit: '元',
    price: 0,
    key: 'other',
    type: 'direct'  // 直接填写金额
  }
};

// 存储键名
const STORAGE_KEYS = {
  PRICES: 'stone_prices',
  LOGIN_STATUS: 'is_logged_in'
};

// 管理员账号
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'Shuitou128'
};

module.exports = {
  DEFAULT_PRICES,
  STORAGE_KEYS,
  ADMIN_CREDENTIALS
};
