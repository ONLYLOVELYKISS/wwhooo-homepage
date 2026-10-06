export const categories = [
  { id: 'all', label: '全部', note: '所有入口' },
  { id: 'work', label: '工作台', note: '项目与协作' },
  { id: 'build', label: '构建', note: '代码与部署' },
  { id: 'learn', label: '学习', note: '文档与参考' },
  { id: 'tools', label: '工具', note: '快速解决问题' },
  { id: 'inspiration', label: '灵感', note: '观察与收集' },
];

export const intents = [
  { id: 'make', label: '开始构建', query: 'github vite mdn' },
  { id: 'deploy', label: '部署网站', query: 'cloudflare nginx docker' },
  { id: 'learn', label: '查找资料', query: 'docs reference learn' },
  { id: 'shape', label: '处理素材', query: 'json color image design' },
];

export const focus = [
  { index: '01', title: 'wwhooo.com', text: '把个人主页重构成可以每天使用的项目工作台。', meta: 'ONGOING / 2026' },
  { index: '02', title: 'TOY', text: '用 Python 做 AI 与互联网方向的小型实验。', meta: 'EXPLORING / 2025—' },
  { index: '03', title: 'STATIC DELIVERY', text: '保持低成本、可回滚的静态站发布链路。', meta: 'MAINTAINING / 2026' },
];

export const projects = [
  { id: 'wwhooo', number: '01', title: 'wwhooo.com', eyebrow: 'PERSONAL WORKSPACE', description: '个人主页、项目档案与私人导航工作台。', status: '正在构建', year: '2026', proof: '持续迭代', tags: ['Vite', 'Static', 'UX'], source: 'https://github.com/ONLYLOVELYKISS/wwhooo-homepage', live: 'https://wwhooo.com/' },
  { id: 'toy', number: '02', title: 'TOY', eyebrow: 'PYTHON / AI + INTERNET', description: '从真实需求出发，把想法变成可以运行的小工具。', status: '阶段迭代', year: '2025—', proof: '多阶段提交', tags: ['Python', 'AI', 'Experiments'], source: 'https://github.com/ONLYLOVELYKISS/TOY' },
  { id: 'chaoxing', number: '03', title: 'chaoxing-sign-cli', eyebrow: 'AUTOMATION / CLI', description: '围绕签到、监测与推送的自动化工具探索。', status: '工具实验', year: '—', proof: '场景驱动', tags: ['TypeScript', 'CLI', 'Automation'], source: 'https://github.com/ONLYLOVELYKISS/chaoxing-sign-cli' },
];

export const timeline = [
  { year: '2025', text: 'TOY 开始多轮 Python / AI 实验。' },
  { year: '2026', text: '个人网站持续更新，wwhooo.com 形成工作台方向。' },
  { year: 'NOW', text: '让展示、探索和日常使用发生在同一个入口。' },
];

export const links = [
  { id: 'github', title: 'GitHub', description: '代码、项目与开源记录', category: 'work', tags: ['代码', '开源'], url: 'https://github.com/ONLYLOVELYKISS', featured: true },
  { id: 'wwhooo-repo', title: 'wwhooo.com', description: '当前主页的源码与迭代记录', category: 'work', tags: ['网站', 'Vite'], url: 'https://github.com/ONLYLOVELYKISS/wwhooo-homepage', featured: true },
  { id: 'toy', title: 'TOY', description: 'AI 与互联网实验场', category: 'work', tags: ['Python', 'AI'], url: 'https://github.com/ONLYLOVELYKISS/TOY', featured: true },
  { id: 'cloudflare', title: 'Cloudflare', description: 'DNS、Tunnel 与边缘服务', category: 'build', tags: ['部署', 'DNS'], url: 'https://dash.cloudflare.com/' },
  { id: 'docker', title: 'Docker', description: '容器、镜像与本地环境', category: 'build', tags: ['容器', '部署'], url: 'https://docs.docker.com/' },
  { id: 'nginx', title: 'NGINX Docs', description: '反向代理与静态服务参考', category: 'build', tags: ['Nginx', 'Server'], url: 'https://nginx.org/en/docs/' },
  { id: 'mdn', title: 'MDN Web Docs', description: 'Web 平台的可靠参考资料', category: 'learn', tags: ['Web', '文档'], url: 'https://developer.mozilla.org/zh-CN/' },
  { id: 'github-docs', title: 'GitHub Docs', description: 'GitHub 工作流与工程文档', category: 'learn', tags: ['GitHub', '文档'], url: 'https://docs.github.com/zh' },
  { id: 'vite', title: 'Vite', description: '现代前端构建工具文档', category: 'learn', tags: ['Vite', '前端'], url: 'https://cn.vitejs.dev/' },
  { id: 'regex', title: 'RegExr', description: '在线编写和验证正则表达式', category: 'tools', tags: ['正则', '调试'], url: 'https://regexr.com/' },
  { id: 'json', title: 'JSON Crack', description: '把 JSON 转成可视化结构', category: 'tools', tags: ['JSON', '可视化'], url: 'https://jsoncrack.com/' },
  { id: 'color', title: 'Realtime Colors', description: '快速预览颜色系统与主题', category: 'tools', tags: ['颜色', '设计'], url: 'https://www.realtimecolors.com/' },
  { id: 'arena', title: 'Are.na', description: '收集和连接视觉与知识碎片', category: 'inspiration', tags: ['研究', '灵感'], url: 'https://www.are.na/' },
  { id: 'awwwards', title: 'Awwwards', description: '观察网页设计与交互趋势', category: 'inspiration', tags: ['设计', '网站'], url: 'https://www.awwwards.com/' },
  { id: 'dribbble', title: 'Dribbble', description: '界面与视觉设计灵感库', category: 'inspiration', tags: ['UI', '视觉'], url: 'https://dribbble.com/' },
];

export const categoryLabels = Object.fromEntries(categories.map(({ id, label }) => [id, label]));
