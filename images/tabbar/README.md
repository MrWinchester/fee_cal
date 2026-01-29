# 图标文件说明

## 需要的图标文件

本项目需要以下图标文件用于不同场景：

### 1. TabBar 导航图标

放置在 `images/tabbar/` 目录下：

| 文件名 | 尺寸 | 用途 | 使用位置 |
|--------|------|------|----------|
| `calculator.png` | 81x81px | 计算器图标（未选中） | 底部TabBar |
| `calculator-active.png` | 81x81px | 计算器图标（选中） | 底部TabBar |
| `admin.png` | 81x81px | 管理图标（未选中） | 底部TabBar、未登录提示 |
| `admin-active.png` | 81x81px | 管理图标（选中） | 底部TabBar、登录页Logo |

### 2. 图标使用场景

#### TabBar（底部导航栏）
- **费用计算** 标签：
  - 未选中：`calculator.png`
  - 选中：`calculator-active.png`

- **后台管理** 标签：
  - 未选中：`admin.png`
  - 选中：`admin-active.png`

#### 登录页面
- **Logo图标**：`admin-active.png`（彩色/高亮版本）

#### 管理页面（未登录状态）
- **提示图标**：`admin.png`（灰色/未选中版本）

## 图标设计建议

### 通用要求
- **格式**：PNG（支持透明背景）
- **尺寸**：81x81像素（抖音小程序推荐尺寸）
- **背景**：透明
- **风格**：扁平化、简洁

### 计算器图标设计
**未选中状态** (`calculator.png`):
- 颜色：灰色 (#666666)
- 图案：计算器图标
- 线条粗细：2-3px

**选中状态** (`calculator-active.png`):
- 颜色：蓝色 (#3498db)
- 图案：计算器图标（与未选中相同）
- 线条粗细：2-3px

### 管理图标设计
**未选中状态** (`admin.png`):
- 颜色：灰色 (#666666)
- 图案：齿轮/设置图标或锁图标
- 线条粗细：2-3px

**选中状态** (`admin-active.png`):
- 颜色：蓝色 (#3498db) 或渐变色
- 图案：齿轮/设置图标或锁图标（与未选中相同）
- 线条粗细：2-3px

## 快速生成图标

### 方案1：使用在线工具

**阿里巴巴IconFont**
1. 访问：https://www.iconfont.cn/
2. 搜索"计算器"和"设置"图标
3. 选择合适的图标
4. 下载PNG格式（81x81px）
5. 使用图像编辑工具调整颜色

**IconPark**
1. 访问：https://iconpark.oceanengine.com/
2. 搜索所需图标
3. 自定义颜色和尺寸
4. 下载PNG格式

### 方案2：使用设计工具

**Figma / Sketch / Adobe XD**
1. 创建 81x81px 画布
2. 绘制图标（简洁的线条图标）
3. 导出PNG（2x分辨率，即162x162px）

### 方案3：临时占位图标

如果暂时没有设计好的图标，可以使用纯色方块作为占位符：

**创建占位图标**（使用任何图像编辑工具）：
1. 创建 81x81px 的图像
2. 未选中：灰色 (#666666) 圆角矩形
3. 选中：蓝色 (#3498db) 圆角矩形
4. 保存为PNG格式

## 图标文件位置

```
fee_calculator/
└── images/
    └── tabbar/
        ├── calculator.png          (81x81px, 灰色)
        ├── calculator-active.png   (81x81px, 蓝色)
        ├── admin.png               (81x81px, 灰色)
        └── admin-active.png        (81x81px, 蓝色)
```

## 代码中的引用

### TabBar配置 (app.json)
```json
{
  "tabBar": {
    "list": [
      {
        "pagePath": "pages/calculator/calculator",
        "text": "费用计算",
        "iconPath": "images/tabbar/calculator.png",
        "selectedIconPath": "images/tabbar/calculator-active.png"
      },
      {
        "pagePath": "pages/admin/admin",
        "text": "后台管理",
        "iconPath": "images/tabbar/admin.png",
        "selectedIconPath": "images/tabbar/admin-active.png"
      }
    ]
  }
}
```

### 登录页Logo (login.ttml)
```html
<image class="logo-icon" src="/images/tabbar/admin-active.png" mode="aspectFit"></image>
```

### 未登录提示 (admin.ttml)
```html
<image class="login-required-icon" src="/images/tabbar/admin.png" mode="aspectFit"></image>
```

## 图标优化建议

### 文件大小优化
- 使用 TinyPNG 压缩：https://tinypng.com/
- 目标大小：每个图标 < 10KB

### 清晰度优化
- 使用 2x 或 3x 分辨率（162x162px 或 243x243px）
- 确保在缩放时保持清晰

### 一致性
- 所有图标使用相同的设计风格
- 线条粗细保持一致
- 图标大小在视觉上保持平衡

## 临时解决方案

如果暂时无法准备图标，可以：

### 方案A：注释掉TabBar图标配置
在 `app.json` 中临时移除 `iconPath` 和 `selectedIconPath`：

```json
{
  "tabBar": {
    "list": [
      {
        "pagePath": "pages/calculator/calculator",
        "text": "费用计算"
        // "iconPath": "images/tabbar/calculator.png",
        // "selectedIconPath": "images/tabbar/calculator-active.png"
      }
    ]
  }
}
```

### 方案B：使用占位文本
暂时使用纯文本TabBar（无图标）

## 注意事项

1. **文件路径**：确保图标文件路径正确，使用相对路径
2. **文件名大小写**：注意文件名的大小写，某些系统区分大小写
3. **文件格式**：必须是PNG格式，JPG不支持透明背景
4. **颜色模式**：使用RGB颜色模式，不要使用CMYK

## 验证图标

图标准备好后，检查：
- [ ] 文件大小合理（< 10KB）
- [ ] 尺寸正确（81x81px 或更高分辨率）
- [ ] 背景透明
- [ ] 在白色和深色背景上都清晰可见
- [ ] TabBar 正常显示
- [ ] 登录页Logo正常显示
- [ ] 未登录提示图标正常显示

---

**重要**：目前图标文件缺失会导致以下问题：
- TabBar 可能显示空白或报错
- 登录页Logo区域空白
- 未登录提示图标空白

**建议**：优先准备图标文件或使用临时解决方案。
