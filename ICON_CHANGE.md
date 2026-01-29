# Logo图标改用图片方式

## 变更说明

**变更时间**: 2026-01-28
**变更原因**: 使用图片方式比CSS绘制更灵活，便于更换和自定义

### 变更前
- 登录页Logo：使用CSS伪元素绘制锁图标
- 未登录提示：使用CSS伪元素绘制锁图标

### 变更后
- 登录页Logo：使用图片 `images/tabbar/admin-active.png`
- 未登录提示：使用图片 `images/tabbar/admin.png`

## 修改的文件

### 1. pages/login/login.ttml
```html
<!-- 修改前 -->
<view class="logo-icon"></view>

<!-- 修改后 -->
<image class="logo-icon" src="/images/tabbar/admin-active.png" mode="aspectFit"></image>
```

### 2. pages/login/login.ttss
移除了CSS伪元素绘制的锁图标样式，只保留基本尺寸。

### 3. pages/admin/admin.ttml
```html
<!-- 修改前 -->
<view class="login-required-icon"></view>

<!-- 修改后 -->
<image class="login-required-icon" src="/images/tabbar/admin.png" mode="aspectFit"></image>
```

### 4. pages/admin/admin.ttss
移除了CSS伪元素绘制的锁图标样式，只保留基本尺寸。

### 5. app.json
恢复了TabBar的图标配置：
```json
{
  "iconPath": "images/tabbar/calculator.png",
  "selectedIconPath": "images/tabbar/calculator-active.png"
}
```

## 图标文件要求

### 必需的图标文件

需要在 `images/tabbar/` 目录下准备4个图标：

| 文件名 | 尺寸 | 颜色建议 | 用途 |
|--------|------|---------|------|
| calculator.png | 81x81px | 灰色 #666666 | TabBar计算器（未选中） |
| calculator-active.png | 81x81px | 蓝色 #3498db | TabBar计算器（选中） |
| admin.png | 81x81px | 灰色 #666666 | TabBar管理（未选中）+ 未登录提示 |
| admin-active.png | 81x81px | 蓝色 #3498db 或渐变 | TabBar管理（选中）+ 登录页Logo |

### 图标设计建议

**计算器图标**：
- 简洁的计算器轮廓
- 可包含数字按键网格
- 扁平化设计

**管理图标**：
- 齿轮图标（设置/管理）
- 或锁图标（安全/权限）
- 扁平化设计

## 获取图标的方法

### 方法1：使用IconFont（推荐）

1. 访问 https://www.iconfont.cn/
2. 搜索关键词：
   - "计算器" 或 "calculator"
   - "设置" 或 "齿轮" 或 "gear"
3. 选择合适的图标
4. 下载PNG格式
5. 使用图像编辑工具调整为81x81px并设置颜色

### 方法2：使用IconPark

1. 访问 https://iconpark.oceanengine.com/
2. 搜索所需图标
3. 自定义颜色和尺寸
4. 直接下载PNG

### 方法3：使用在线Icon生成器

1. 访问 https://www.flaticon.com/
2. 搜索免费图标
3. 下载PNG格式
4. 调整尺寸和颜色

### 方法4：临时占位图标

如果暂时无法设计图标，可以创建简单的占位符：

**使用任何图像编辑工具**（如Photoshop、Sketch、Figma）：
1. 创建 81x81px 画布
2. 画一个圆角矩形（灰色或蓝色）
3. 添加简单的文字或符号
4. 导出PNG格式

## 当前状态

✅ **代码已更新** - 所有引用图片的代码已修改完成
⚠️ **图标文件缺失** - 需要手动添加图标文件到 `images/tabbar/` 目录

## 下一步操作

### 立即执行

1. **准备4个图标文件**（参考上述方法）
2. **放置到正确位置**：
   ```
   /Users/goseiryuu/Downloads/fee_calculator/images/tabbar/
   ├── calculator.png
   ├── calculator-active.png
   ├── admin.png
   └── admin-active.png
   ```
3. **重新编译项目**

### 临时方案（如果暂时无法准备图标）

#### 方案A：移除TabBar图标
编辑 `app.json`，注释掉TabBar的图标配置：
```json
{
  "pagePath": "pages/calculator/calculator",
  "text": "费用计算"
  // "iconPath": "images/tabbar/calculator.png",
  // "selectedIconPath": "images/tabbar/calculator-active.png"
}
```

#### 方案B：使用占位图片
创建4个纯色的81x81px PNG图片作为占位符。

## 验证清单

图标添加后，检查以下项目：

- [ ] TabBar的"费用计算"标签显示图标
- [ ] TabBar的"后台管理"标签显示图标
- [ ] 点击TabBar，选中和未选中状态图标正确切换
- [ ] 登录页面显示Logo图标
- [ ] 未登录访问管理页面时显示提示图标
- [ ] 图标在不同背景色下都清晰可见
- [ ] 图标大小合适，不会被裁切或变形

## 优势对比

### CSS绘制图标
- ✅ 不需要额外的图片文件
- ✅ 可以通过CSS灵活调整颜色和大小
- ❌ 复杂图标难以实现
- ❌ 跨平台兼容性可能有问题

### 图片图标（当前方案）
- ✅ 设计灵活，可以使用任何复杂图标
- ✅ 跨平台兼容性好
- ✅ 易于更换和自定义
- ❌ 需要准备图片文件
- ❌ 修改颜色需要编辑图片

## 相关文档

- `images/tabbar/README.md` - 详细的图标说明
- `images/README.md` - 图标资源总览
- `EMOJI_FIX.md` - CSS图标方案（已废弃）

---

**状态**: ✅ 代码已完成，⚠️ 需要添加图标文件
**优先级**: 高
**建议**: 尽快准备图标文件或使用临时方案
