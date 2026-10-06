export const navItems = [
  { id: 'all', label: '全部' },
  { id: 'work', label: '工作台' },
  { id: 'learn', label: '学习与参考' },
  { id: 'tools', label: '工具箱' },
  { id: 'inspiration', label: '灵感收藏' },
];

export const links = [
  { id: 'github', title: 'GitHub', description: '代码、项目与开源记录', category: 'work', tags: ['代码', '开源'], url: 'https://github.com/ONLYLOVELYKISS', featured: true },
  { id: 'site', title: '个人网站仓库', description: '公开表达与网站迭代记录', category: 'work', tags: ['网站', 'HTML'], url: 'https://github.com/ONLYLOVELYKISS/onlylovelykiss.github.io', featured: true },
  { id: 'toy', title: 'TOY', description: 'AI 与互联网实验场', category: 'work', tags: ['Python', 'AI'], url: 'https://github.com/ONLYLOVELYKISS/TOY', featured: true },
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

export const categoryLabels = Object.fromEntries(navItems.map((item) => [item.id, item.label]));
