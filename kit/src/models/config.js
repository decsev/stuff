const nav = [
  {
    name: '首页',
    url: '/home',
    mark: ''
  },
  {
    name: 'CCR策略',
    url: '/home/ccr',
    mark: 'hot'
  },
  {
    name: '期现套利',
    url: '/home/fs',
    mark: 'hot'
  },
  {
    name: '策略委托',
    url: '/home/fs',
    mark: 'hot',
    icon: 'down',
    sub: [
      {
        name: '打新宝',
        url: '/home/dxb',
        mark: ''
      },
      {
        name: '计划委托',
        url: '/home/plan',
        mark: ''
      },
      {
        name: '冰山委托',
        url: '/home/ice',
        mark: ''
      }
    ]
  },
  {
    name: '云矿机',
    url: '',
    mark: 'hot',
    icon: 'down',
    sub: [
      {
        name: '暴力矿机',
        url: '/home/coinex/force',
        mark: ''
      },
      {
        name: '智能矿机',
        url: '/home/coinex/ai',
        mark: ''
      },
      {
        name: '搬砖套利',
        url: '/home/ia',
        mark: ''
      }
    ]
  },
  {
    name: '关于我们',
    key: 'aboutus',
    url: '',
    mark: 'hot',
    icon: 'down',
    sub: [
      {
        name: '团队介绍',
        url: '/home/index/team',
        mark: ''
      },
      {
        name: '生态系统',
        url: '/home/index/eco',
        mark: ''
      },
      {
        name: '数字财经',
        url: 'https://www.blockex.ai/',
        mark: ''
      }
    ]
  }
];
const loginModalFormData = [
  {
    col: 24,
    type: 'text',
    unrewriteable: true,
    text: '手机号',
    name: 'phone',
    required: true
  },
  {
    col: 24,
    type: 'password',
    unrewriteable: true,
    text: '密码',
    name: 'password',
    required: true
  }
]
export {
  nav,
  loginModalFormData
}