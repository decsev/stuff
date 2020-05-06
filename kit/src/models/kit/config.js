// 我的持仓列表
const gridData = {
  stockCodesList: 'sh000001,sz000002,sh502012,sz150172,sh512150,sh601318,sz000333,sh512000,sz000568',
  closeCodeList: 'sz002955,sh600741,sz000069,sz002751,sh512880,sh512000,sz002027,sh601069',
  strategyList: [
    {
      strategyName: 'wka', // 策略名
      isOpen: false, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sz000002', // 股票代码 
      dealList: [
        {
          b_price: 26.96,
          s_price: 26.98,
          amount: 400,
          b_time: '2020-03-18',
          s_time: '2020-04-13'
        },
        {
          b_price: 26.52,
          s_price: 27.21,
          amount: 400,
          b_time: '2020-03-18',
          s_time: '2020-04-10'
        },
        {
          b_price: 26.99,
          s_price: 26.98,
          amount: 800,
          b_time: '2020-04-07',
          s_time: '2020-04-13'
        },
        {
          b_price: 26.88,
          s_price: 26.98,
          amount: 400,
          b_time: '2020-04-10',
          s_time: null
        },
        {
          b_price: 26.41,
          s_price: 27.13,
          amount: 400,
          b_time: '2020-03-18',
          s_time: '2020-04-07'
        },
        {
          b_price: 26.31,
          s_price: 27.11,
          amount: 400,
          b_time: '2020-03-18',
          s_time: '2020-04-07'
        },
        {
          b_price: 26.21,
          s_price: 26.92,
          amount: 600,
          b_time: '2020-03-18',
          s_time: '2020-04-01'
        },
        {
          b_price: 25.59,
          s_price: 26.2,
          amount: 1000,
          b_time: '2020-03-19',
          s_time: '2019-03-26'
        },
        {
          b_price: 25.47,
          s_price: 26.41,
          amount: 100,
          b_time: '2020-03-19',
          s_time: '2020-03-25'
        },
        {
          b_price: 25.19,
          s_price: 26.41,
          amount: 1500,
          b_time: '2020-03-19',
          s_time: '2020-03-25'
        },
        {
          b_price: 25.13,
          s_price: 25.77,
          amount: 1000,
          b_time: '2020-03-19',
          s_time: '2020-03-25'
        },
        {
          b_price: 25.03,
          s_price: 25.21,
          amount: 1000,
          b_time: '2020-03-19',
          s_time: '2020-03-19'
        },
        {
          b_price: 24.4,
          s_price: 24.8,
          amount: 400,
          b_time: '2020-03-19',
          s_time: '2020-03-19'
        },
        {
          b_price: 24.84,
          s_price: 25.54,
          amount: 500,
          b_time: '2020-03-23',
          s_time: '2020-03-25'
        },
        {
          b_price: 24.61,
          s_price: 25.54,
          amount: 300,
          b_time: '2020-03-23',
          s_time: '2020-03-25'
        },
        {
          b_price: 24.5,
          s_price: 25.1,
          amount: 500,
          b_time: '2020-03-23',
          s_time: '2020-03-24'
        },
        {
          b_price: 25.56,
          s_price: 26.44,
          amount: 400,
          b_time: '2020-03-31',
          s_time: '2020-04-01'
        }
      ]
    },
    {
      strategyName: 'A50ETF', // 策略名
      isOpen: false, // 是否当前持仓
      needstampFree: false, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sh512150', // 股票代码 
      // dividend: 10451.02, // 分红
      dealList: [
        {
          b_price: 1.202,
          s_price: 1.223,
          amount: 10000,
          b_time: '2020-03-17',
          s_time: '2020-04-13'
        },
        {
          b_price: 1.222,
          s_price: 1.223,
          amount: 10000,
          b_time: '2020-04-10',
          s_time: '2020-04-13'
        },
        {
          b_price: 1.187,
          s_price: 1.239,
          amount: 10000,
          b_time: '2020-03-17',
          s_time: '2020-03-18'
        },
        {
          b_price: 1.181,
          s_price: 1.23,
          amount: 10000,
          b_time: '2020-03-17',
          s_time: '2020-04-07'
        },
        {
          b_price: 1.177,
          s_price: 1.213,
          amount: 10000,
          b_time: '2020-03-18',
          s_time: '2020-04-01'
        },
        {
          b_price: 1.160,
          s_price: 1.207,
          amount: 20000,
          b_time: '2020-03-19',
          s_time: '2020-03-25'
        },
        {
          b_price: 1.151,
          s_price: 1.207,
          amount: 2000,
          b_time: '2020-03-19',
          s_time: '2020-03-25'
        },
        {
          b_price: 1.142,
          s_price: 1.173,
          amount: 1600,
          b_time: '2020-03-19',
          s_time: '2020-03-24'
        },
        {
          b_price: 1.131,
          s_price: 1.140,
          amount: 9100,
          b_time: '2020-03-19',
          s_time: '2020-03-19'
        },
        {
          b_price: 1.132,
          s_price: 1.173,
          amount: 18800,
          b_time: '2020-03-23',
          s_time: '2020-03-24'
        }
      ]
    },
    {
      strategyName: '万科', // 策略名
      isOpen: true, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sz000002', // 股票代码 
      dealList: [
        {
          b_price: 26.95,
          s_price: null,
          amount: 800,
          b_time: '2020-04-15',
          s_time: null
        },
        {
          b_price: 26.85,
          s_price: null,
          amount: 800,
          b_time: '2020-04-15',
          s_time: null
        },
        {
          b_price: 26.59,
          s_price: null,
          amount: 800,
          b_time: '2020-04-15',
          s_time: null
        },
        {
          b_price: 26.22,
          s_price: 26.53,
          amount: 800,
          b_time: '2020-04-20',
          s_time: '2020-04-20'
        },
        {
          b_price: 26,
          s_price: null,
          amount: 800,
          b_time: '2020-05-06',
          s_time: null
        },
        {
          b_price: 25.96,
          s_price: null,
          amount: 800,
          b_time: '2020-05-06',
          s_time: null
        },
        {
          b_price: 26.11,
          s_price: 26.80,
          amount: 800,
          b_time: '2020-04-21',
          s_time: '2020-04-30'
        },
        {
          b_price: 26.01,
          s_price: 26.80,
          amount: 800,
          b_time: '2020-04-21',
          s_time: '2020-04-30'
        },
        {
          b_price: 25.91,
          s_price: 26.50,
          amount: 800,
          b_time: '2020-04-21',
          s_time: '2020-04-28'
        },
        {
          b_price: 25.75,
          s_price: 26.37,
          amount: 800,
          b_time: '2020-04-24',
          s_time: '2020-04-28'
        },
        {
          b_price: 25.60,
          s_price: 26.29,
          amount: 400,
          b_time: '2020-04-24',
          s_time: '2020-04-28'
        },
        {
          b_price: 25.57,
          s_price: 26.29,
          amount: 400,
          b_time: '2020-04-24',
          s_time: '2020-04-28'
        }
      ]
    },
    {
      strategyName: '卢总', // 策略名
      isOpen: false, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sz000568', // 股票代码 
      dealList: [
        {
          b_price: 74.54,
          s_price: 78.06,
          amount: 400,
          b_time: '2020-04-21',
          s_time: '2020-04-23'
        }
      ]
    },
    {
      strategyName: '券商etf', // 策略名
      isOpen: true, // 是否当前持仓
      needstampFree: false, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sh512000', // 股票代码 
      // dividend: 10451.02, // 分红
      dealList: [
        {
          b_price: 0.888,
          s_price: 0.893,
          amount: 25000,
          b_time: '2020-04-14',
          s_time: '2020-04-21'
        },
        {
          b_price: 0.888,
          s_price: null,
          amount: 25000,
          b_time: '2020-04-21',
          s_time: null
        },
        {
          b_price: 0.882,
          s_price: null,
          amount: 25000,
          b_time: '2020-04-24',
          s_time: null
        },
        {
          b_price: 0.873,
          s_price: 0.894,
          amount: 25000,
          b_time: '2020-04-24',
          s_time: '2020-04-30'
        },
        {
          b_price: 0.869,
          s_price: 0.888,
          amount: 25000,
          b_time: '2020-04-24',
          s_time: '2020-04-30'
        }
      ]
    },
    {
      strategyName: '分众', // 策略名
      isOpen: false, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sz002027', // 股票代码 
      // dividend: 10451.02, // 分红
      dealList: [
        {
          b_price: 4.19,
          s_price: 4.37,
          amount: 5200,
          b_time: '2020-04-07',
          s_time: '2020-04-15'
        },
        {
          b_price: 4.12,
          s_price: 4.21,
          amount: 5200,
          b_time: '2020-04-08',
          s_time: '2020-04-15'
        },
        {
          b_price: 4.04,
          s_price: 4.09,
          amount: 5200,
          b_time: '2020-04-10',
          s_time: '2020-04-14'
        },
        {
          b_price: 4.06,
          s_price: 4.13,
          amount: 5200,
          b_time: '2020-04-08',
          s_time: '2020-04-09'
        },
        {
          b_price: 3.94,
          s_price: 4.03,
          amount: 5200,
          b_time: '2020-04-13',
          s_time: '2020-04-14'
        },
        {
          b_price: 3.91,
          s_price: 3.92,
          amount: 3800,
          b_time: '2020-04-13',
          s_time: '2020-04-13'
        },
        {
          b_price: 3.88,
          s_price: 3.92,
          amount: 6300,
          b_time: '2020-04-13',
          s_time: '2020-04-13'
        }
      ]
    },
    {
      strategyName: '美的', // 策略名
      isOpen: false, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sz000333', // 股票代码 
      // dividend: 10451.02, // 分红
      dealList: [
        {
          b_price: 48.06,
          s_price: 50.25,
          amount: 200,
          b_time: '2020-04-08',
          s_time: '2020-04-13'
        }
      ]
    },
    {
      strategyName: 'pingan', // 策略名
      isOpen: false, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sh601318', // 股票代码 
      dealList: [
        {
          b_price: 68.88,
          s_price: 70.20,
          amount: 100,
          b_time: '2020-03-30',
          s_time: '2020-03-31'
        },
        {
          b_price: 69.19,
          s_price: 70,
          amount: 200,
          b_time: '2020-03-31',
          s_time: '2020-04-01'
        }
      ]
    }
    
  ]
}

// 网格配置
const gridFromData = [{
  title: '参数设置',
  col: 24,
  // cats: ['基础配置', '高级配置'],
  form: [
    {
      col: 12,
      type: 'number',
      text: '投入资金',
      name: 'capital',
      required: true,
      pattern: '^[+]{0,1}(\\d+)$|^[+]{0,1}(\\d+\\.\\d+)$',
      patternMsg: '请填写大于零的数字',
      value: 100000
    },
    {
      type: 'select',
      text: '仓位模式',
      name: 'type',
      options: [
        {label: '等量开仓', value: '1'},
        {label: '2倍量开仓', value: '2'}
      ],
      required: true,
      value: '1'
    },
    {
      col: 12,
      type: 'number',
      text: '买入幅度(%)',
      name: 'buyChange',
      required: true,
      pattern: '^[+]{0,1}(\\d+)$|^[+]{0,1}(\\d+\\.\\d+)$',
      patternMsg: '请填写大于零的数字',
      value: 2
    },
    {
      col: 12,
      type: 'number',
      text: '卖出幅度(%)',
      name: 'sellChange',
      required: true,
      pattern: '^[+]{0,1}(\\d+)$|^[+]{0,1}(\\d+\\.\\d+)$',
      patternMsg: '请填写大于零的数字',
      value: 2
    },
    {
      col: 12,
      type: 'number',
      text: '底仓价格',
      name: 'firstPrice',
      required: true,
      pattern: '^[+]{0,1}(\\d+)$|^[+]{0,1}(\\d+\\.\\d+)$',
      patternMsg: '请填写大于零的数字',
      value: 30
    },
    // {
    //   col: 12,
    //   type: 'number',
    //   text: '当前价格',
    //   name: 'realPrice',
    //   required: true,
    //   pattern: '^[+]{0,1}(\\d+)$|^[+]{0,1}(\\d+\\.\\d+)$',
    //   patternMsg: '请填写大于零的数字',
    //   value: 29.39
    // },
    {
      col: 12,
      type: 'number',
      text: '底仓数量',
      name: 'firstAmount',
      required: true,
      pattern: '^[1-9]\\d*$',
      patternMsg: '请填写大于零的整数',
      value: 400
    },
    {
      col: 12,
      type: 'number',
      text: '首次加仓数量',
      name: 'firstAddAmount',
      required: true,
      pattern: '^[1-9]\\d*$',
      patternMsg: '请填写大于零的整数',
      value: 400
    },
    {
      col: 12,
      type: 'text',
      text: '网格名称',
      name: 'myGridName',
      value: '惠风和畅',
      required: false
    }
  ]
}
]
// 我的持仓显示配置
const stockFromData = [{
  title: '显示设置',
  col: 24,
  // cats: ['基础配置', '高级配置'],
  form: [
    {
      type: 'switch',
      text: '自动获取实时价格',
      name: 'isAuto',
      forceRender: false,
      value: true,
      checked: '是',
      unchecked: '否'
    },
    {
      col: 12,
      type: 'number',
      text: '设置当前价格',
      description: '当自动获取实时价格值为否的时候生效',
      name: 'realPrice',
      required: true,
      pattern: '^[+]{0,1}(\\d+)$|^[+]{0,1}(\\d+\\.\\d+)$',
      patternMsg: '请填写大于零的数字',
      value: null
    },
    {
      type: 'radio',
      text: '显示',
      name: 'showType',
      description: null,
      value: 2,
      options: [
        {label: '全部', value: 1},
        {label: '未了结', value: 2},
        {label: '已了结', value: 3}
      ]
    },
    {
      col: 12,
      type: 'number',
      text: '请求时间间隔',
      name: 'span',
      required: true,
      pattern: '^[1-9]\\d*$',
      patternMsg: '请填写大于零的整数',
      value: 1
    },
    {
      col: 12,
      type: 'number',
      text: '上涨(%)',
      description: '基于买入价上涨多个点卖出',
      name: 'upRatio',
      required: true,
      pattern: '^[+]{0,1}(\\d+)$|^[+]{0,1}(\\d+\\.\\d+)$',
      patternMsg: '请填写大于零的数字',
      value: 2
    },
    {
      col: 12,
      type: 'number',
      text: '下跌(%)',
      description: '基于买入价下跌多个点再买入',
      name: 'downRatio',
      required: true,
      pattern: '^[+]{0,1}(\\d+)$|^[+]{0,1}(\\d+\\.\\d+)$',
      patternMsg: '请填写大于零的数字',
      value: 2
    }
  ]
}
]

// 计息工具配置
const interestFormData = [{
  title: '参数设置',
  col: 24,
  // cats: ['基础配置', '高级配置'],
  form: [
    {
      type: 'select',
      text: '复利模式',
      name: 'interesetType',
      options: [
        {label: '是', value: '1'},
        {label: '否', value: '2'}
      ],
      required: true,
      value: '1'
    },
    {
      col: 12,
      type: 'number',
      text: '本金',
      name: 'interestCapital',
      required: true,
      pattern: '^[+]{0,1}(\\d+)$|^[+]{0,1}(\\d+\\.\\d+)$',
      patternMsg: '请填写大于零的数字',
      value: 100000
    },
    {
      col: 12,
      type: 'number',
      text: '年化利率(%)',
      name: 'interesetRate',
      required: true,
      pattern: '^[+]{0,1}(\\d+)$|^[+]{0,1}(\\d+\\.\\d+)$',
      patternMsg: '请填写大于零的数字',
      value: 5
    },
    {
      col: 12,
      type: 'number',
      text: '期限(年)',
      name: 'interesetPeriod',
      required: true,
      pattern: '^[1-9]\\d*$',
      patternMsg: '请填写大于零的整数',
      value: 5
    }
  ]
}]

// 我的借贷显示配置
const myInterestFormData = [{
  title: '显示设置',
  col: 24,
  // cats: ['基础配置', '高级配置'],
  form: [
    {
      type: 'radio',
      text: '状态',
      name: 'myInterestShowType',
      description: null,
      value: 1,
      options: [
        {label: '全部', value: 1},
        {label: '已还', value: 2},
        {label: '未还', value: 3}
      ]
    },
    {
      type: 'radio',
      text: '来源',
      name: 'myInterestOrigin',
      description: null,
      value: 1,
      options: [
        {label: 'all', value: 1},
        {label: 'zfb', value: 2},
        {label: 'yh', value: 3}
      ]
    }
  ]
}]

// 我的借贷列表
const myInterestList = [
  {
    origin: 'zfb',
    startTime: '2019-4-26',
    endTime: '2019-5-16',
    ratio: 9,
    capital: 30000
  },
  {
    origin: 'zfb',
    startTime: '2019-4-26',
    endTime: '2019-5-16',
    ratio: 9,
    capital: 40000
  },
  {
    origin: 'yh',
    startTime: '2019-5-15',
    endTime: null,
    ratio: 4.5,
    capital: 63754.26
  },
  {
    origin: 'yh',
    startTime: '2019-5-20',
    endTime: null,
    ratio: 4.5,
    capital: 71450.61
  },
  {
    origin: 'yh',
    startTime: '2020-3-19',
    endTime: null,
    ratio: 4.5,
    capital: 93406.98
  },
  {
    origin: 'zfb',
    startTime: '2020-3-19',
    endTime: '2020-3-26',
    ratio: 9,
    capital: 92000
  }
]
export {gridFromData, gridData, stockFromData, interestFormData, myInterestFormData, myInterestList};