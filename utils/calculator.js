// utils/calculator.js
// 费用计算逻辑

/**
 * 验证数字输入
 * @param {String|Number} value - 输入值
 * @returns {Number} 有效的数字值，无效则返回0
 */
function validateNumber(value) {
  const num = parseFloat(value);
  if (isNaN(num) || num < 0) {
    return 0;
  }
  return num;
}

/**
 * 计算面积
 * @param {Number} length - 长度（米）
 * @param {Number} width - 宽度（米）
 * @returns {Number} 面积（平米）
 */
function calculateArea(length, width) {
  const validLength = validateNumber(length);
  const validWidth = validateNumber(width);
  return validLength * validWidth;
}

/**
 * 计算单项费用
 * @param {Number} quantity - 数量/面积
 * @param {Number} unitPrice - 单价
 * @returns {Number} 该项费用
 */
function calculateItemFee(quantity, unitPrice) {
  const validQuantity = validateNumber(quantity);
  const validPrice = validateNumber(unitPrice);
  return validQuantity * validPrice;
}

/**
 * 计算总费用
 * @param {Object} inputs - 输入数据 { cutting: 数量, ... }
 * @param {Object} prices - 价格配置
 * @param {Object} dimensions - 尺寸数据 { length: 长, width: 宽 }
 * @returns {Object} 计算结果 { items: [...], total: 总额, area: 面积 }
 */
function calculateTotalFee(inputs, prices, dimensions) {
  const items = [];
  let total = 0;

  // 计算面积（用于按面积计费的项目）
  const area = calculateArea(dimensions.length, dimensions.width);

  // 遍历所有价格配置项
  Object.keys(prices).forEach(key => {
    const priceConfig = prices[key];
    let quantity = 0;
    let itemFee = 0;

    // 根据类型计算数量和费用
    switch (priceConfig.type) {
      case 'area':
        // 按面积计算（切割费、安装、灯带）
        quantity = area;
        itemFee = calculateItemFee(area, priceConfig.price);
        break;

      case 'quantity':
        // 按数量计算（加工费、打包费、运费、卸货搬运）
        quantity = validateNumber(inputs[key]);
        itemFee = calculateItemFee(quantity, priceConfig.price);
        break;

      case 'direct':
        // 直接填写金额（其他）
        quantity = 1;
        itemFee = validateNumber(inputs[key]);
        break;

      default:
        quantity = validateNumber(inputs[key]);
        itemFee = calculateItemFee(quantity, priceConfig.price);
    }

    // 只添加有数量/金额的项目到明细
    if (quantity > 0 && itemFee > 0) {
      items.push({
        key: key,
        name: priceConfig.name,
        quantity: quantity,
        unit: priceConfig.unit,
        unitPrice: priceConfig.price,
        totalPrice: itemFee,
        type: priceConfig.type
      });
    }

    total += itemFee;
  });

  return {
    items: items,
    total: total,
    area: area
  };
}

/**
 * 格式化金额显示
 * @param {Number} amount - 金额
 * @returns {String} 格式化后的金额字符串
 */
function formatFee(amount) {
  if (isNaN(amount)) {
    return '0.00';
  }
  return amount.toFixed(2);
}

/**
 * 格式化面积显示
 * @param {Number} area - 面积
 * @returns {String} 格式化后的面积字符串
 */
function formatArea(area) {
  if (isNaN(area) || area === 0) {
    return '0.00';
  }
  return area.toFixed(2);
}

/**
 * 生成费用明细文本
 * @param {Array} items - 费用明细数组
 * @param {Number} total - 总费用
 * @param {Number} area - 面积
 * @returns {String} 明细文本
 */
function generateFeeReport(items, total, area) {
  if (items.length === 0) {
    return '暂无费用明细';
  }

  let report = '费用明细：\n';
  report += '----------------------------------------\n';

  if (area > 0) {
    report += `面积: ${formatArea(area)} 平米\n`;
    report += '----------------------------------------\n';
  }

  items.forEach(item => {
    if (item.type === 'direct') {
      report += `${item.name}: ${formatFee(item.totalPrice)}元\n`;
    } else {
      report += `${item.name}: ${formatArea(item.quantity)}${item.unit} × ${formatFee(item.unitPrice)}元 = ${formatFee(item.totalPrice)}元\n`;
    }
  });

  report += '----------------------------------------\n';
  report += `总计: ${formatFee(total)}元`;

  return report;
}

module.exports = {
  validateNumber,
  calculateArea,
  calculateItemFee,
  calculateTotalFee,
  formatFee,
  formatArea,
  generateFeeReport
};
