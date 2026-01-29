// pages/login/login.js
const storage = require('../../utils/storage.js');
const { ADMIN_CREDENTIALS } = require('../../utils/constants.js');

Page({
  data: {
    username: '',
    password: ''
  },

  /**
   * 处理用户名输入
   */
  onUsernameInput(e) {
    this.setData({
      username: e.detail.value
    });
  },

  /**
   * 处理密码输入
   */
  onPasswordInput(e) {
    this.setData({
      password: e.detail.value
    });
  },

  /**
   * 处理登录
   */
  onLogin() {
    const { username, password } = this.data;

    // 验证输入
    if (!username || !password) {
      tt.showToast({
        title: '请输入账号和密码',
        icon: 'none'
      });
      return;
    }

    // 验证账号密码
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // 登录成功
      storage.setLoginStatus(true);

      tt.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1500
      });

      // 延迟跳转到管理页面
      setTimeout(() => {
        tt.switchTab({
          url: '/pages/admin/admin'
        });
      }, 1500);
    } else {
      // 登录失败
      tt.showToast({
        title: '账号或密码错误',
        icon: 'none',
        duration: 2000
      });

      // 清空密码
      this.setData({
        password: ''
      });
    }
  },

  /**
   * 返回首页
   */
  onBackHome() {
    tt.switchTab({
      url: '/pages/calculator/calculator'
    });
  }
});
