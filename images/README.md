# 图标资源目录

本目录用于存放小程序所需的图标资源。

## 目录结构

```
images/
├── tabbar/              # TabBar导航图标（必需）
│   ├── calculator.png          # 计算器图标（未选中）
│   ├── calculator-active.png   # 计算器图标（选中）
│   ├── admin.png               # 管理图标（未选中）
│   ├── admin-active.png        # 管理图标（选中）
│   └── README.md               # 详细说明
└── README.md            # 本文件
```

## 快速开始

### 当前状态：⚠️ 缺少图标文件

项目代码已配置使用图标，但图标文件尚未添加。请按照以下步骤添加图标：

### 步骤1：准备图标文件

**必需的4个图标文件**：
1. `tabbar/calculator.png` - 81x81px
2. `tabbar/calculator-active.png` - 81x81px
3. `tabbar/admin.png` - 81x81px
4. `tabbar/admin-active.png` - 81x81px

### 步骤2：快速获取图标

**方案A：使用在线工具（推荐）**
1. 访问 https://www.iconfont.cn/
2. 搜索"计算器"和"设置"
3. 下载PNG格式，调整为81x81px
4. 复制到 `images/tabbar/` 目录

**方案B：使用占位图标**
暂时使用纯色方块作为占位符：
- 创建4个 81x81px 的纯色PNG图片
- 未选中：灰色 (#666666)
- 选中：蓝色 (#3498db)

### 步骤3：放置文件

将准备好的图标文件复制到：
```
/Users/goseiryuu/Downloads/fee_calculator/images/tabbar/
```

### 步骤4：重新编译

在抖音开发者工具中重新编译项目。

## 图标使用位置

| 文件 | 使用位置 |
|------|---------|
| `calculator.png` | 底部TabBar - 费用计算（未选中） |
| `calculator-active.png` | 底部TabBar - 费用计算（选中） |
| `admin.png` | 底部TabBar - 后台管理（未选中）<br>管理页面 - 未登录提示 |
| `admin-active.png` | 底部TabBar - 后台管理（选中）<br>登录页面 - Logo |

## 临时解决方案

如果暂时无法准备图标，可以：

### 方案1：移除TabBar图标（推荐）

编辑 `app.json`，注释掉图标配置：
```json
{
  "pagePath": "pages/calculator/calculator",
  "text": "费用计算"
  // "iconPath": "images/tabbar/calculator.png",
  // "selectedIconPath": "images/tabbar/calculator-active.png"
}
```

这样TabBar将只显示文字，不显示图标。

### 方案2：修改为使用CSS图标

恢复之前的CSS绘制图标方式（参考 `EMOJI_FIX.md`）。

## 详细说明

更多详细信息请查看：
- `tabbar/README.md` - 图标详细说明和设计建议
- `EMOJI_FIX.md` - CSS图标绘制方案（备选）

## 注意事项

1. **文件必须存在**：如果配置了图标路径但文件不存在，可能导致页面报错
2. **路径正确**：确保文件路径与配置一致
3. **格式要求**：必须是PNG格式，支持透明背景
4. **尺寸建议**：81x81px（或更高分辨率如162x162px）

---

**当前状态**：⚠️ 需要添加图标文件
**优先级**：高
**预计耗时**：5-10分钟
