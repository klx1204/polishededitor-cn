# 抛光水晶编辑器（中文版）

> Pokémon Polished Crystal 存档修改器 · 中英双语界面 · 支持中文存档名

在线使用：<https://klx1204.github.io/polishededitor-cn/>

本项目是 [KohKaiSern/polishededitor](https://github.com/KohKaiSern/polishededitor) 的 fork，针对《宝可梦 抛光水晶》简体中文版（EVAMARK6 汉化）做了完整汉化与适配。

## 功能

- **中英双语界面**：右上角「中文 / EN」一键切换，选择会保存在浏览器本地。
- **数据中文名**：招式、道具、宝可梦、特性、地点、性格、盒子主题、属性等全部显示中文，并在中文名下方保留英文原名（参考 `showdown-pmh1` 的展示风格）。
- **中文存档名**：自动识别并读写汉化版使用的 2 字节中文名字编码；主角名、劲敌名、宝可梦昵称、初训家名、盒子名都支持中文。
- **完整编辑能力**：队伍、盒子、背包（道具/药品/精灵球/招式学习器/树果/重要物品/其他）、玩家信息、图鉴。
- **抛光版 / 原典版**：切换后自动重新解析存档，兼容两个版本的名称差异（例如「劈瓦 / 碎岩」）。
- **纯前端**：存档只在浏览器内存中解析，不会上传到服务器。

## 使用

1. 打开 <https://klx1204.github.io/polishededitor-cn/>。
2. 根据你的 ROM 选择「抛光版」或「原典版」。
3. 上传电池存档（`.sav` / `.srm` / `.SaveRAM`，约 32 KB），不要上传模拟器即时存档。
4. 修改队伍、背包、玩家或图鉴数据。
5. 点击「下载存档」，得到 `原文件名_EDITED.sav`。
6. **先备份原存档**，再把修改后的存档改名为原文件名并替换。

> 修改前请务必备份。存档损坏、坏蛋等问题请自行承担风险。

## 中文名字支持说明

汉化版把中文名字存成 **2 字节大端字形码**，和英文版的单字节 charmap 不同。本项目从中文 ROM 的宝可梦名、道具名、招式名三张未压缩名称表中交叉对齐，提取了 **825 个汉字的码表**，并补入主角名用字，因此可以正确解码和写回大部分中文名。

- 已支持：主角名「柯霖雄」、宝可梦昵称「火球鼠」、道具/招式名等。
- 码表之外的生僻字会显示为 `〔?〕`，保存时会保留原始编码，不会被破坏；在中文输入框中输入码表外的字符会被提示并忽略。
- 中文名按字节数限制长度：11 字节字段最多 5 个汉字，9 字节盒子名最多 4 个汉字。

## 数据来源

| 数据                              | 来源                                                                                                    |
| --------------------------------- | ------------------------------------------------------------------------------------------------------- |
| 招式 / 道具 / 宝可梦 / 性格中文名 | 汉化版附带的 `代码表.txt`（v0.6 金手指代码表，按游戏内编号对齐）                                        |
| 宝可梦 / 特性 / 地点中文名        | [itsVicOC/polishedDexCN](https://github.com/itsVicOC/polishedDexCN) 的 `public/data/*-zh.json`          |
| 属性、性格等补充译名              | [pkhex-web-cn](https://github.com/klx1204/pkhex-web-cn) 的 `zh-Hans.json`                               |
| 汉字码表                          | 从 `polishedcrystal-zh-3.2.3.gbc` 的名称表反推（宝可梦名 289 条、道具名 255 条、招式名 255 条交叉校验） |
| 原版数据与解析逻辑                | [KohKaiSern/polishededitor](https://github.com/KohKaiSern/polishededitor)                               |

英文招式/道具的**效果说明**目前仍保留英文：汉化 ROM 的效果文本是压缩存储的，公开资料里也没有完整的中文效果说明。名称、属性、分类、威力、命中、PP 等结构化数据均已中文化。

## 本地开发

需要 Node.js 20+。

```bash
npm install
npm run dev
# 打开 http://localhost:5173/polishededitor-cn/
```

构建静态站点：

```bash
npm run build
npm run preview
```

构建产物在 `build/`，使用 `@sveltejs/adapter-static`，并配置了 `base = /polishededitor-cn` 以适配 GitHub Pages 项目页。

## 部署到 GitHub Pages

仓库已包含 `.github/workflows/deploy.yml`：

1. 推送到 `main` 分支。
2. 在仓库 **Settings → Pages → Build and deployment** 中选择 **GitHub Actions**。
3. Actions 会构建并发布到 `https://klx1204.github.io/polishededitor-cn/`。

## 目录

```
src/lib/i18n.svelte.ts          # 语言状态、UI 文案、数据名查询
src/lib/components/ui/data-label.svelte  # 中文名 + 英文原名展示
src/data/i18n/                  # 中文名称表与汉字码表
src/parsers/utils.ts            # 中英文名字读写（自动识别 2 字节中文码）
src/parsers/                    # 队伍/盒子/背包/玩家/图鉴解析
```

## 致谢

- 原编辑器：Rev3lation、KohKaiSern
- Polished Crystal：Rangi42 及贡献者
- 简体中文汉化：EVAMARK6
- 中文图鉴数据：itsVicOC / PolishedDex CN
- 中文译名补充：PKHeX Web CN、Pokémon Showdown 中文文本

宝可梦名称、游戏数据及相关商标归任天堂 / Game Freak / The Pokémon Company 所有。本项目是非官方粉丝工具，与上述公司无关联。
