// app.js
App({
  onLaunch(options) {
    // 小程序启动时初始化价格数据
    const storage = require('./utils/storage.js');
    storage.initPrices();

    console.log('费用计算器启动');
  },

  onShow(options) {
    // 小程序显示时执行
  },

  onHide() {
    // 小程序隐藏时执行
  },

  globalData: {
    appName: '费用计算器',
    version: '1.0.0'
  }
});
