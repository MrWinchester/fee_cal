// pages/calculator/calculator.js
const storage = require('../../utils/storage.js');
const calculator = require('../../utils/calculator.js');

Page({
  data: {
    // 价格配置
    prices: {
      cutting: { name: '', unit: '', price: 0, type: 'area' },
      processing: { name: '', unit: '', price: 0, type: 'quantity' },
      packing: { name: '', unit: '', price: 0, type: 'quantity' },
      shipping: { name: '', unit: '', price: 0, type: 'quantity' },
      unloading: { name: '', unit: '', price: 0, type: 'quantity' },
      installation: { name: '', unit: '', price: 0, type: 'area' },
      ledStrip: { name: '', unit: '', price: 0, type: 'area' },
      other: { name: '', unit: '', price: 0, type: 'direct' }
    },

    // 基础尺寸输入
    dimensions: {
      length: '',
      width: ''
    },

    // 加工项输入
    inputs: {
      cutting: '',      // 切割费（自动计算面积）
      processing: '',   // 加工费（项数）
      packing: '',      // 打包费（次数）
      shipping: '',     // 运费（公里）
      unloading: '',    // 卸货搬运（次数）
      installation: '', // 安装（自动计算面积）
      ledStrip: '',     // 灯带（自动计算面积）
      other: ''         // 其他（直接金额）
    },

    // 计算结果
    area: 0,
    areaFixed: '0.00',
    feeDetails: [],
    totalFee: 0,
    totalFeeFixed: '0.00'
  },

  onLoad() {
    // 加载价格配置
    this.loadPrices();
  },

  onShow() {
    // 每次显示页面时重新加载价格（可能在后台修改了）
    this.loadPrices();
  },

  /**
   * 加载价格配置
   */
  loadPrices() {
    const prices = storage.getPrices();
    this.setData({
      prices: prices
    });
    console.log('价格配置加载完成');
  },

  /**
   * 处理尺寸输入
   */
  onDimensionInput(e) {
    const field = e.currentTarget.dataset.field;
    const value = e.detail.value;

    this.setData({
      [`dimensions.${field}`]: value
    }, () => {
      // 尺寸改变后重新计算（影响按面积计费的项目）
      this.calculateFee();
    });
  },

  /**
   * 处理加工项输入
   */
  onItemInput(e) {
    const key = e.currentTarget.dataset.key;
    const value = e.detail.value;

    this.setData({
      [`inputs.${key}`]: value
    }, () => {
      // 输入后立即计算
      this.calculateFee();
    });
  },

  /**
   * 计算费用
   */
  calculateFee() {
    const { inputs, prices, dimensions } = this.data;

    // 使用计算工具计算总费用（传入尺寸用于计算面积）
    const result = calculator.calculateTotalFee(inputs, prices, dimensions);

    // 格式化费用显示
    const formattedFeeDetails = result.items.map(item => ({
      ...item,
      quantityFixed: item.quantity.toFixed(2),
      totalPriceFixed: item.totalPrice.toFixed(2)
    }));

    this.setData({
      area: result.area,
      areaFixed: result.area.toFixed(2),
      feeDetails: formattedFeeDetails,
      totalFee: result.total,
      totalFeeFixed: result.total.toFixed(2)
    });
  },

  /**
   * 重置所有输入
   */
  onReset() {
    tt.showModal({
      title: '确认重置',
      content: '确定要清空所有输入吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            dimensions: {
              length: '',
              width: ''
            },
            inputs: {
              cutting: '',
              processing: '',
              packing: '',
              shipping: '',
              unloading: '',
              installation: '',
              ledStrip: '',
              other: ''
            },
            area: 0,
            areaFixed: '0.00',
            feeDetails: [],
            totalFee: 0,
            totalFeeFixed: '0.00'
          });

          tt.showToast({
            title: '已重置',
            icon: 'success'
          });
        }
      }
    });
  },

  /**
   * 格式化金额显示
   */
  formatFee(fee) {
    return calculator.formatFee(fee);
  }
});
