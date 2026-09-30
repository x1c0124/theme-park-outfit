# What Should I Wear to the Theme Park? 🎢

去主题乐园穿什么：根据奥兰多和洛杉矶的实时天气预报，按你在园内的时段，给出女生和男生的穿搭建议，并解释为什么这样穿。

**在线体验：https://x1c0124.github.io/theme-park-outfit/**

> A static web app that turns the live forecast for Orlando and Los Angeles theme parks into outfit ideas for women and men, with the reasoning behind each pick. Chinese and English UI.

## 运行

纯静态网页，没有构建步骤，也不需要 API key。在项目目录里启动一个本地服务器：

```bash
python3 -m http.server 5173
```

然后打开 http://localhost:5173 。需要通过服务器打开（直接双击 `index.html` 可能加载不出图片和天气数据）。

## 功能

- **天气**：[Open-Meteo](https://open-meteo.com/) 免费接口，最多可查未来 16 天。只统计入园到离园这几个小时，包括体感温度、降雨概率和降雨量、紫外线、湿度、风速。
- **城市**：奥兰多（Walt Disney World、Universal Orlando）、洛杉矶（Disneyland Resort、Universal Studios Hollywood）。每个城市用一个坐标点查天气。
- **穿搭**：按当天体感温度分到炎热、温暖、凉、冷四档；热天遇到大雨会换成雨天穿搭。每档有多套造型，点「🔄 换一个」循环切换，女生、男生各自独立。
- **为什么这样穿**：每套穿搭下面有两部分理由。一部分是这套自己的理由；另一部分根据当天天气自动生成，比如紫外线、湿度、晚上降温、室内空调温差、温暖天的面料提醒。
- **雨天选择**：热天大雨时，可以选「雨天穿搭」或「我会带伞，按温度穿」。
- **背包清单和小贴士**：根据天气和城市生成。
- **中英文**：按浏览器语言自动选择，也可以在右上角切换；°C / °F 同样可以切换。两个选择都会被记住。
- **界面**：iOS 天气风格，背景是随天气变化的天空渐变，卡片是毛玻璃效果，适配手机屏幕。

## 温度分档

按园内时段的**最高体感温度**分档：

| 档位 | 体感温度 | 说明 |
|---|---|---|
| 炎热 | ≥ 27°C | 内搭写吊带或背心，面料优先亚麻、速干、网眼 |
| 温暖 | 22–27°C | 面料比炎热天稍厚（纯棉、薄针织、牛仔）；提醒去环球带件薄外套，迪士尼可以不带 |
| 凉 | 10–22°C | 能穿能脱的叠穿 |
| 冷 | < 10°C | 奥兰多和洛杉矶一般只冷一个早上，外套选中午能塞进包里的 |
| 雨天 | 热天且大雨或雷雨 | 雨衣加速干短打；也可以选「带伞」按温度穿 |

## 室内温度

乐园不公开室内温度，页面上的是估算值（`weather.js` 里的 `INDOOR_C`）：环球 19–21°C，迪士尼 21–23°C，环球通常更冷。

## 文件结构

```
index.html     页面结构
style.css      样式
app.js         界面交互：城市、日期、入园时段、单位、语言、换一个、雨天选择
weather.js     调用 Open-Meteo，汇总园内时段的天气；城市坐标和室内估算温度
outfit.js      规则引擎：分档、选穿搭、生成「为什么这样穿」、背包清单和小贴士
i18n.js        全部中英文文案，包括每一套穿搭的描述
avatar.js      显示 avatar 图片；图片缺失时用 SVG 占位
avatars/       每套穿搭的人物插画（透明底 PNG）
```

## 穿搭数据

所有穿搭都写在 `i18n.js` 的 `looks` 里，按 `f`（女生）/ `m`（男生）和档位（`hot`、`warm`、`cool`、`cold`、`rain`）分组，中英文各一份。每一套：

```js
{
  id: '0546',                       // 对应图片 avatars/female-0546.png（男生是 male-<id>.png）
  name: '吊带 + 短袖衬衫 + 百慕大短裤',
  top: '…', bottom: '…', shoes: '…', layer: '…', acc: '…',
  why: ['这套自己的理由 1', '这套自己的理由 2'],
}
```

文案写法：只写单品类型和大概材质，不写具体颜色；鞋子只写大类（运动鞋、凉鞋、平底鞋、靴子、休闲鞋）；每条都说明为什么适合这个天气。

**新增一套穿搭**：
1. 在 `i18n.js` 对应档位的中文和英文里各加一条，两边的 `id` 要一样。
2. 把透明底的人物图放进 `avatars/`，命名为 `female-<id>.png` 或 `male-<id>.png`。
3. 在 `index.html` 里把 CSS、JS 引用后面的 `?v=` 版本号加 1，避免浏览器继续用旧的缓存。

## 数据来源

天气数据来自 [Open-Meteo](https://open-meteo.com/)。穿搭建议由规则自动生成，仅供参考。

## 许可证

**代码**使用 [MIT License](LICENSE)，可以自由使用、修改和分发。

**图片不在 MIT 许可范围内。** `avatars/` 里的人物插画仅作个人学习和演示用途：

- 插画由 AI 生成，穿搭和姿势参考了社交媒体上公开分享的穿搭照片，整体画风参考了潮玩公仔风格；原始照片、角色和画风的相关权利归各自的原作者或权利人所有。
- 请勿将这些图片用于商业用途，或脱离本项目单独使用、再分发。
- 如果你是相关内容的权利人，希望调整或删除，请提交 Issue，我会尽快处理。

**Images:** the illustrations in `avatars/` are **not** covered by the MIT License. They are AI-generated for personal learning and demo purposes only, with outfits and poses based on publicly shared outfit photos and a designer-toy art style; all rights in the original works belong to their respective owners. Please don't use them commercially or redistribute them outside this project. If you own related content and want it changed or removed, please open an issue.
