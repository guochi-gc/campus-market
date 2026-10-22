// 学院 / 专业 / 课程 用于教材类商品的多级筛选；非教材类留空
const items = [
  // ===== 计算机与通信工程学院 · 网络工程（云计算）=====
  { id:1,  title:"计算机网络（第 8 版）", price:28, category:"教材", college:"计算机与通信工程学院", major:"网络工程（云计算）", course:"计算机网络", condition:"九成新", desc:"谢希仁版，只翻过前六章，无笔记。", seller:"计算机与通信工程学院 · 大三", location:"三教楼", emoji:"🌐", keywords:"计算机网络 网络 谢希仁 教材", time:"2 小时前" },
  { id:2,  title:"操作系统概念（第 9 版）", price:35, category:"教材", college:"计算机与通信工程学院", major:"网络工程（云计算）", course:"操作系统", condition:"八成新", desc:"有少量划线，重点章节贴了标签。", seller:"计算机与通信工程学院 · 大三", location:"图书馆", emoji:"💻", keywords:"操作系统 OS 教材", time:"5 小时前" },
  { id:3,  title:"数据库系统概论（第 6 版）", price:22, category:"教材", college:"计算机与通信工程学院", major:"网络工程（云计算）", course:"数据库原理", condition:"九成新", desc:"王珊版第 6 版，几乎全新，无笔记。", seller:"计算机与通信工程学院 · 大三", location:"计算机楼", emoji:"🗄️", img:"img/db-6.jpg", keywords:"数据库 DB SQL 王珊 教材", time:"昨天" },
  { id:4,  title:"Linux 系统管理与运维", price:26, category:"教材", college:"计算机与通信工程学院", major:"网络工程（云计算）", course:"Linux 系统管理", condition:"八成新", desc:"实验课用的，附一张命令速查表。", seller:"计算机与通信工程学院 · 大三", location:"12 号楼", emoji:"🐧", keywords:"Linux 运维 shell 教材", time:"3 小时前" },
  { id:5,  title:"云计算导论", price:18, category:"教材", college:"计算机与通信工程学院", major:"网络工程（云计算）", course:"云计算导论", condition:"九成新", desc:"专业方向课，书角有小折痕。", seller:"计算机与通信工程学院 · 大四", location:"8 号楼", emoji:"☁️", keywords:"云计算 云 虚拟化 教材", time:"6 小时前" },
  { id:6,  title:"通信网络安全与防护", price:20, category:"教材", college:"计算机与通信工程学院", major:"网络工程（云计算）", course:"网络安全", condition:"七成新", desc:"郭文普版，做过课后题，答案用铅笔写的。", seller:"计算机与通信工程学院 · 大三", location:"计算机楼", emoji:"🔐", img:"img/network-security.jpg", keywords:"网络安全 安全 防护 通信 教材", time:"1 天前" },
  { id:7,  title:"Python 程序设计（第 3 版）", price:15, category:"教材", college:"计算机与通信工程学院", major:"网络工程（云计算）", course:"Python 程序设计", condition:"九成新", desc:"只看了前四章，附课程实验代码。", seller:"计算机与通信工程学院 · 大二", location:"三教楼", emoji:"🐍", keywords:"Python 编程 教材", time:"4 小时前" },

  // ===== 计算机与通信工程学院 · 软件工程 =====
  { id:8,  title:"软件工程导论（第 6 版）", price:20, category:"教材", college:"计算机与通信工程学院", major:"软件工程", course:"软件工程导论", condition:"八成新", desc:"张海藩版，笔记完整。", seller:"计算机与通信工程学院 · 大三", location:"图书馆", emoji:"📘", keywords:"软件工程 需求 教材", time:"昨天" },
  { id:9,  title:"Java 程序设计（第 10 版）", price:18, category:"教材", college:"计算机与通信工程学院", major:"软件工程", course:"Java 程序设计", condition:"九成新", desc:"附配套实验指导书一本。", seller:"计算机与通信工程学院 · 大二", location:"1 号楼", emoji:"☕", keywords:"Java 编程 教材", time:"2 天前" },
  { id:10, title:"Web 前端开发实战", price:25, category:"教材", college:"计算机与通信工程学院", major:"软件工程", course:"Web 前端开发", condition:"八成新", desc:"HTML/CSS/JS 一本通，代码都能跑。", seller:"计算机与通信工程学院 · 大四", location:"8 号楼", emoji:"🖥️", keywords:"前端 HTML CSS JS 教材", time:"3 天前" },

  // ===== 计算机与通信工程学院 · 人工智能 =====
  { id:11, title:"机器学习（西瓜书）", price:45, category:"教材", college:"计算机与通信工程学院", major:"人工智能", course:"机器学习", condition:"九成新", desc:"周志华版，只读了前五章。", seller:"计算机与通信工程学院 · 大四", location:"计算机楼", emoji:"🍉", keywords:"机器学习 ML 西瓜书 教材", time:"昨天" },
  { id:12, title:"深度学习（花书）", price:60, category:"教材", college:"计算机与通信工程学院", major:"人工智能", course:"深度学习", condition:"全新", desc:"买重复了，塑封都没拆。", seller:"计算机与通信工程学院 · 大四", location:"15 号楼", emoji:"🧠", keywords:"深度学习 DL 神经网络 教材", time:"5 小时前" },

  // ===== 数学与信息科学学院 =====
  { id:13, title:"高等数学（同济版）上下册", price:20, category:"教材", college:"数学与信息科学学院", major:"信息与计算科学", course:"高等数学", condition:"七成新", desc:"有部分笔记，重点都标出来了。", seller:"数学与信息科学学院 · 大三", location:"图书馆", emoji:"📖", keywords:"高数 数学 同济 上册 下册 教材", time:"5 小时前" },
  { id:14, title:"线性代数（第 6 版）", price:12, category:"教材", college:"数学与信息科学学院", major:"信息与计算科学", course:"线性代数", condition:"九成新", desc:"几乎全新，无笔记。", seller:"数学与信息科学学院 · 大二", location:"三教楼", emoji:"📐", keywords:"线代 线性代数 矩阵 教材", time:"昨天" },
  { id:15, title:"概率论与数理统计（浙大版）", price:16, category:"教材", college:"数学与信息科学学院", major:"信息与计算科学", course:"概率论与数理统计", condition:"八成新", desc:"课后题做过一半，答案完整。", seller:"数学与信息科学学院 · 大三", location:"一号教学楼", emoji:"📊", keywords:"概率 统计 概率论 教材", time:"2 天前" },

  // ===== 外国语学院 =====
  { id:16, title:"大学英语四级真题", price:8, category:"教材", college:"外国语学院", major:"英语", course:"大学英语", condition:"八成新", desc:"只做了前 3 套，答案完整。", seller:"外国语学院 · 大三", location:"一号教学楼", emoji:"📝", keywords:"四级 英语 CET4 真题 教材", time:"昨天" },
  { id:17, title:"新视野大学英语 读写教程 2", price:15, category:"教材", college:"外国语学院", major:"英语", course:"大学英语", condition:"九成新", desc:"附听力音频二维码，未刮开。", seller:"外国语学院 · 大二", location:"外语楼", emoji:"🗣️", keywords:"英语 新视野 读写 教材", time:"4 小时前" },

  // ===== 电气信息工程学院 =====
  { id:18, title:"电路（第 6 版）", price:30, category:"教材", college:"电气信息工程学院", major:"电气工程及其自动化", course:"电路分析", condition:"八成新", desc:"邱关源版，笔记整齐。", seller:"电气信息工程学院 · 大三", location:"电气楼", emoji:"⚡", keywords:"电路 电工 邱关源 教材", time:"1 天前" },
  { id:19, title:"模拟电子技术基础", price:25, category:"教材", college:"电气信息工程学院", major:"电气工程及其自动化", course:"模拟电子技术", condition:"七成新", desc:"童诗白版，书页有折角。", seller:"电气信息工程学院 · 大二", location:"12 号楼", emoji:"🔌", keywords:"模电 模拟电子 教材", time:"3 天前" },

  // ===== 能源与动力工程学院 =====
  { id:20, title:"工程热力学（第 5 版）", price:28, category:"教材", college:"能源与动力工程学院", major:"能源与动力工程", course:"工程热力学", condition:"八成新", desc:"沈维道版，附课堂笔记复印。", seller:"能源与动力工程学院 · 大三", location:"能动楼", emoji:"🔥", keywords:"热力学 工程热力学 教材", time:"2 天前" },

  // ===== 非教材：通用物品，不属于任何学院 =====
  { id:21, title:"罗技 G102 鼠标", price:45, category:"数码", college:"", major:"", course:"", condition:"八成新", desc:"换了无线所以出，功能正常，附原装线。", seller:"电气信息工程学院 · 大三", location:"12 号楼", emoji:"🖱️", keywords:"罗技 鼠标 G102 数码", time:"3 小时前" },
  { id:22, title:"机械键盘 87 键 红轴", price:120, category:"数码", college:"", major:"", course:"", condition:"九成新", desc:"手感好，声音不大，宿舍可用。", seller:"计算机与通信工程学院 · 大三", location:"8 号楼", emoji:"⌨️", img:"img/keyboard.jpg", keywords:"键盘 机械键盘 红轴 87键 AULA 数码", time:"6 小时前" },
  { id:23, title:"24 寸显示器", price:280, category:"数码", college:"", major:"", course:"", condition:"七成新", desc:"毕业清仓，无坏点，送 HDMI 线。", seller:"计算机与通信工程学院 · 大四", location:"15 号楼", emoji:"🖥️", keywords:"显示器 屏幕 24寸 数码", time:"1 天前" },
  { id:24, title:"LED 护眼台灯", price:25, category:"生活", college:"", major:"", course:"", condition:"九成新", desc:"三档亮度，可调色温，宿舍必备。", seller:"材料与化学工程学院 · 大二", location:"6 号楼", emoji:"💡", keywords:"台灯 护眼 LED 灯 生活", time:"4 小时前" },
  { id:25, title:"折叠收纳箱 60L", price:18, category:"生活", college:"", major:"", course:"", condition:"全新", desc:"买多了，未拆封。", seller:"材料与化学工程学院 · 大一", location:"9 号楼", emoji:"📦", keywords:"收纳箱 收纳 箱子 60L 生活", time:"8 小时前" },
  { id:26, title:"小米吹风机", price:35, category:"生活", college:"", major:"", course:"", condition:"八成新", desc:"功率正常，带风嘴。", seller:"外国语学院 · 大三", location:"3 号楼", emoji:"💨", keywords:"吹风机 小米 电吹风 生活", time:"2 天前" },
  { id:27, title:"篮球 斯伯丁 7 号", price:50, category:"运动", college:"", major:"", course:"", condition:"八成新", desc:"打了一个学期，气足。", seller:"体育学院 · 大二", location:"篮球场", emoji:"🏀", keywords:"篮球 斯伯丁 球 运动", time:"1 天前" },
  { id:28, title:"二手自行车 变速 26 寸", price:180, category:"其他", college:"", major:"", course:"", condition:"七成新", desc:"毕业出，刹车和变速都正常。", seller:"机械工程学院 · 大四", location:"校门口", emoji:"🚲", keywords:"自行车 单车 变速 26寸 其他", time:"3 天前" },

  // ===== 有实拍图片的商品 =====
  { id:29, title:"信息安全概论", price:25, category:"教材", college:"计算机与通信工程学院", major:"网络工程（云计算）", course:"信息安全概论", condition:"九成新", desc:"邱晓红版，清华社，只翻了前三章。", seller:"计算机与通信工程学院 · 大三", location:"三教楼", emoji:"🛡️", img:"img/infosec.jpg", keywords:"信息安全 安全 概论 教材", time:"3 小时前" },
  { id:30, title:"计算机专业英语（新视野职业英语）", price:18, category:"教材", college:"计算机与通信工程学院", major:"网络工程（云计算）", course:"计算机专业英语", condition:"八成新", desc:"吕云翔主编，书里的生词表做过标注。", seller:"计算机与通信工程学院 · 大三", location:"外语楼", emoji:"🔤", img:"img/english-cs.jpg", keywords:"计算机专业英语 专业英语 英语 吕云翔 教材", time:"昨天" },
  { id:31, title:"人机交互（第 3 版，Dix）", price:55, category:"教材", college:"计算机与通信工程学院", major:"网络工程（云计算）", course:"人机交互", condition:"九成新", desc:"Alan Dix 原版，我的专业参考书，内页干净。", seller:"计算机与通信工程学院 · 大三", location:"计算机楼", emoji:"🖱️", img:"img/hci.jpg", keywords:"人机交互 HCI Dix 交互设计 教材", time:"5 小时前" },
  { id:32, title:"毛泽东思想和中国特色社会主义理论体系概论（2023 年版）", price:12, category:"教材", college:"", major:"", course:"", condition:"九成新", desc:"思政课教材，只划过目录。", seller:"计算机与通信工程学院 · 大三", location:"三教楼", emoji:"📕", img:"img/maogai.jpg", keywords:"毛概 思政 公共课 教材", time:"昨天" },
  { id:33, title:"马克思主义基本原理（2023 年版）", price:12, category:"教材", college:"", major:"", course:"", condition:"八成新", desc:"思政课教材，有少量荧光笔标记。", seller:"计算机与通信工程学院 · 大三", location:"三教楼", emoji:"📗", img:"img/mayuan.jpg", keywords:"马原 马克思主义 思政 公共课 教材", time:"2 天前" }
];
