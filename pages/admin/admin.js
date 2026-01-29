// pages/admin/admin.js
const storage = require('../../utils/storage.js');

Page({
  data: {
    prices: {},
    priceList: [],
    isLoggedIn: false  // 添加登录状态标记
  },

  onShow() {
    // 检查登录状态
    const loggedIn = storage.isLoggedIn();

    this.setData({
      isLoggedIn: loggedIn
    });

    if (loggedIn) {
      // 已登录，加载价格配置
      this.loadPrices();
    }
  },

  /**
   * 跳转到登录页
   */
  goToLogin() {
    tt.reLaunch({
      url: '/pages/login/login'
    });
  },

  /**
   * 加载价格配置
   */
  loadPrices() {
    const prices = storage.getPrices();

    // 转换为数组格式方便渲染
    const priceList = Object.keys(prices).map(key => {
      return {
        key: key,
        name: prices[key].name,
        unit: prices[key].unit,
        price: prices[key].price
      };
    });

    this.setData({
      prices: prices,
      priceList: priceList
    });

    console.log('价格配置加载完成:', priceList);
  },

  /**
   * 编辑单价
   */
  onEditPrice(e) {
    const key = e.currentTarget.dataset.key;
    const item = this.data.prices[key];

    tt.showModal({
      title: `修改${item.name}单价`,
      editable: true,
      placeholderText: `当前单价: ${item.price}元`,
      content: '',
      success: (res) => {
        if (res.confirm && res.content) {
          const newPrice = parseFloat(res.content);

          // 验证输入
          if (isNaN(newPrice) || newPrice < 0) {
            tt.showToast({
              title: '请输入有效的价格',
              icon: 'none'
            });
            return;
          }

          // 更新价格
          if (storage.updateSinglePrice(key, newPrice)) {
            tt.showToast({
              title: '更新成功',
              icon: 'success'
            });

            // 重新加载价格列表
            this.loadPrices();
          } else {
            tt.showToast({
              title: '更新失败',
              icon: 'none'
            });
          }
        }
      }
    });
  },

  /**
   * 重置为默认价格
   */
  onResetPrices() {
    tt.showModal({
      title: '确认重置',
      content: '确定要将所有价格重置为默认值吗？',
      success: (res) => {
        if (res.confirm) {
          const { DEFAULT_PRICES } = require('../../utils/constants.js');

          if (storage.updatePrices(DEFAULT_PRICES)) {
            tt.showToast({
              title: '重置成功',
              icon: 'success'
            });

            this.loadPrices();
          } else {
            tt.showToast({
              title: '重置失败',
              icon: 'none'
            });
          }
        }
      }
    });
  },

  /**
   * 退出登录
   */
  onLogout() {
    tt.showModal({
      title: '确认退出',
      content: '确定要退出登录吗？',
      success: (res) => {
        if (res.confirm) {
          storage.setLoginStatus(false);

          tt.showToast({
            title: '已退出登录',
            icon: 'success',
            duration: 1500
          });

          setTimeout(() => {
            tt.switchTab({
              url: '/pages/calculator/calculator'
            });
          }, 1500);
        }
      }
    });
  }
});
