// 我的持仓列表
const gridData = {
  stockCodesList: 'sh000001,sz000002,sh502012,sz150172,sh601069',
  closeCodeList: 'sz002955,sh600741,sz000069,sz002751,sh512880,sh512000,sz002027',
  strategyList: [
    {
      strategyName: 'dec_wka', // 策略名
      isOpen: true, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sz000002', // 股票代码 
      // dividend: 10451.02, // 分红
      dealList: [
        {
          b_price: 30.36 - 1.045102,
          s_price: null,
          amount: 400,
          b_time: '2019-04-22',
          s_time: null
        },
        {
          b_price: 30.21 - 1.045102,
          s_price: null,
          amount: 400,
          b_time: '2019-04-22',
          s_time: null
        },
        {
          b_price: 30.09 - 1.045102,
          s_price: null,
          amount: 400,
          b_time: '2019-04-22',
          s_time: null
        },
        {
          b_price: 30.02 - 1.045102,
          s_price: null,
          amount: 700,
          b_time: '2019-04-22',
          s_time: null
        },
        {
          b_price: 30 - 1.045102,
          s_price: null,
          amount: 600,
          b_time: '2019-04-22',
          s_time: null
        },
        {
          b_price: 29.96 - 1.045102,
          s_price: null,
          amount: 500,
          b_time: '2019-04-22',
          s_time: null
        },
        {
          b_price: 29.91,
          s_price: 31.37,
          amount: 500,
          b_time: '2019-04-22',
          s_time: '2019-07-22'
        },
        {
          b_price: 29.6,
          s_price: 30.79,
          amount: 700,
          b_time: '2019-04-22',
          s_time: '2019-07-19'
        },
        {
          b_price: 29.44,
          s_price: 29.85,
          amount: 1000,
          b_time: '2019-04-22',
          s_time: '2019-04-25'
        },
        {
          b_price: 29.09,
          s_price: 29.54,
          amount: 700,
          b_time: '2019-04-24',
          s_time: '2019-04-24'
        },
        {
          b_price: 29.27,
          s_price: 29.44,
          amount: 1000,
          b_time: '2019-04-25',
          s_time: '2019-04-29'
        },
        {
          b_price: 29.06,
          s_price: 29.54,
          amount: 1000,
          b_time: '2019-04-26',
          s_time: '2019-04-29'
        },
        {
          b_price: 29.06,
          s_price: 29.7,
          amount: 300,
          b_time: '2019-04-26',
          s_time: '2019-07-15'
        },
        {
          b_price: 28.72,
          s_price: 30,
          amount: 2700,
          b_time: '2019-04-30',
          s_time: '2019-07-04'
        },
        {
          b_price: 27.81,
          s_price: 27.91,
          amount: 400,
          b_time: '2019-05-06',
          s_time: '2019-05-07'
        },
        {
          b_price: 28.72,
          s_price: 26.78,
          amount: 500,
          b_time: '2019-05-09',
          s_time: '2019-05-09'
        },
        {
          b_price: 27.83,
          s_price: 28.42,
          amount: 300,
          b_time: '2019-05-17',
          s_time: '2019-06-11'
        },
        {
          b_price: 26.91,
          s_price: 27.62,
          amount: 700,
          b_time: '2019-05-23',
          s_time: '2019-05-28'
        },
        {
          b_price: 26.81,
          s_price: 27.36,
          amount: 700,
          b_time: '2019-05-23',
          s_time: '2019-05-28'
        },
        {
          b_price: 26.80,
          s_price: 27.2,
          amount: 400,
          b_time: '2019-05-30',
          s_time: '2019-06-06'
        },
        {
          b_price: 26.31,
          s_price: 27,
          amount: 400,
          b_time: '2019-06-03',
          s_time: '2019-06-05'
        },
        {
          b_price: 26.26,
          s_price: 27,
          amount: 400,
          b_time: '2019-06-04',
          s_time: '2019-06-05'
        },
        {
          b_price: 27.86,
          s_price: 28.45,
          amount: 400,
          b_time: '2019-06-12',
          s_time: '2019-06-20'
        },
        {
          b_price: 27.66,
          s_price: 28.27,
          amount: 400,
          b_time: '2019-06-25',
          s_time: '2019-07-01'
        },
        {
          b_price: 29.01,
          s_price: 29.16,
          amount: 400,
          b_time: '2019-07-08',
          s_time: '2019-07-08'
        },
        {
          b_price: 28.77,
          s_price: 29.16,
          amount: 400,
          b_time: '2019-07-08',
          s_time: '2019-07-08'
        },
        {
          b_price: 28.68,
          s_price: 29.16,
          amount: 400,
          b_time: '2019-07-08',
          s_time: '2019-07-08'
        },
        {
          b_price: 30.59 - 1.045102,
          s_price: null,
          amount: 400,
          b_time: '2019-07-23',
          s_time: null
        },
        {
          b_price: 30.33 - 1.045102,
          s_price: null,
          amount: 400,
          b_time: '2019-07-23',
          s_time: null
        },
        {
          b_price: 30.15 - 1.045102,
          s_price: null,
          amount: 400,
          b_time: '2019-07-23',
          s_time: null
        },
        {
          b_price: 29.98 - 1.045102,
          s_price: null,
          amount: 400,
          b_time: '2019-07-23',
          s_time: null
        },
        {
          b_price: 29.81 - 1.045102,
          s_price: null,
          amount: 400,
          b_time: '2019-07-23',
          s_time: null
        },
        {
          b_price: 29.20 - 1.045102,
          s_price: null,
          amount: 800,
          b_time: '2019-07-31',
          s_time: null
        },
        {
          b_price: 28.96 - 1.045102,
          s_price: null,
          amount: 800,
          b_time: '2019-07-31',
          s_time: null
        },
        {
          b_price: 28.82 - 1.045102,
          s_price: null,
          amount: 800,
          b_time: '2019-07-31',
          s_time: null
        },
        {
          b_price: 28.72 - 1.045102,
          s_price: null,
          amount: 800,
          b_time: '2019-07-31',
          s_time: null
        },
        {
          b_price: 28.31 - 1.045102,
          s_price: null,
          amount: 800,
          b_time: '2019-08-01',
          s_time: null
        },
        {
          b_price: 27.73 - 1.045102,
          s_price: null,
          amount: 600,
          b_time: '2019-08-02',
          s_time: null
        },
        {
          b_price: 27.17,
          s_price: 27.83,
          amount: 400,
          b_time: '2019-08-05',
          s_time: '2019-08-12'
        },
        {
          b_price: 26.51,
          s_price: 26.8,
          amount: 1600,
          b_time: '2019-08-06',
          s_time: '2019-08-06'
        },
        {
          b_price: 27.09 - 1.045102,
          s_price: 27.3,
          amount: 400,
          b_time: '2019-08-14',
          s_time: '2019-08-20'
        }
      ]
    },
    {
      strategyName: 'dec_fzcm', // 策略名
      isOpen: false, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sz002027', // 股票代码
      dealList: [
        {
          b_price: 4.74,
          s_price: 4.82,
          amount: 1000,
          b_time: '2019-07-23',
          s_time: '2019-07-30'
        }
      ]
    },
    {
      strategyName: 'sara_wka',
      isOpen: true, // 是否当前持仓
      stockCode: 'sz000002', // 股票代码
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      // dividend: 1358.6326, // 分红
      dealList: [
        {
          b_price: 30.35 - 1.045102,
          s_price: null,
          amount: 300,
          b_time: '2019-04-22',
          s_time: null
        },
        {
          b_price: 30.11 - 1.045102,
          s_price: null,
          amount: 200,
          b_time: '2019-04-22',
          s_time: null
        },
        {
          b_price: 30.01,
          s_price: 31.42,
          amount: 300,
          b_time: '2019-04-22',
          s_time: '2019-07-22'
        },
        {
          b_price: 29.92,
          s_price: 30.67,
          amount: 200,
          b_time: '2019-04-22',
          s_time: '2019-07-19'
        },
        {
          b_price: 29.52,
          s_price: 30.24,
          amount: 200,
          b_time: '2019-04-22',
          s_time: '2019-07-16'
        },
        {
          b_price: 29.09,
          s_price: 29.49,
          amount: 500,
          b_time: '2019-04-24',
          s_time: '2019-04-24'
        },
        {
          b_price: 29.21,
          s_price: 29.39,
          amount: 500,
          b_time: '2019-04-25',
          s_time: '2019-04-25'
        },
        {
          b_price: 28.85,
          s_price: 29.86,
          amount: 500,
          b_time: '2019-04-30',
          s_time: '2019-07-04'
        },
        {
          b_price: 29.20 - 1.045102,
          s_price: null,
          amount: 200,
          b_time: '2019-07-31',
          s_time: null
        },
        {
          b_price: 28.4 - 1.045102,
          s_price: null,
          amount: 200,
          b_time: '2019-08-01',
          s_time: null
        },
        {
          b_price: 27.75 - 1.045102,
          s_price: null,
          amount: 200,
          b_time: '2019-08-02',
          s_time: null
        },
        {
          b_price: 27.09 - 1.045102,
          s_price: 27.3,
          amount: 200,
          b_time: '2019-08-14',
          s_time: '2019-08-20'
        }
      ]
    },
    {
      strategyName: 'dec_150172', // 策略名
      isOpen: false, // 是否当前持仓
      stockCode: 'sz150172', // 股票代码
      needstampFree: false, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      dealList: [
        {
          b_price: 1.401,
          s_price: 1.422,
          amount: 10000,
          b_time: '2019-07-08',
          s_time: '2019-07-15'
        },
        {
          b_price: 1.388,
          s_price: 1.398,
          amount: 10000,
          b_time: '2019-07-08',
          s_time: '2019-07-15'
        }
      ]
    },
    {
      strategyName: 'dec_xbhj', // 策略名
      isOpen: false, // 是否当前持仓
      stockCode: 'sh601069', // 股票代码
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      dealList: [
        {
          b_price: 13.88,
          s_price: 14.07,
          amount: 1000,
          b_time: '2019-07-08',
          s_time: '2019-07-09'
        }
      ]
    },
    {
      strategyName: 'dec_502012', // 策略名
      isOpen: false, // 是否当前持仓
      stockCode: 'sh502012', // 股票代码
      needstampFree: false, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      dealList: [
        {
          b_price: 1.143,
          s_price: 1.149,
          amount: 10000,
          b_time: '2019-07-08',
          s_time: '2019-07-15'
        },
        {
          b_price: 1.123,
          s_price: 1.133,
          amount: 10000,
          b_time: '2019-07-08',
          s_time: '2019-07-15'
        },
        {
          b_price: 1.101,
          s_price: 1.115,
          amount: 10000,
          b_time: '2019-07-08',
          s_time: '2019-07-15'
        },
        {
          b_price: 1.08,
          s_price: 1.09,
          amount: 10000,
          b_time: '2019-07-09',
          s_time: '2019-07-09'
        },
        {
          b_price: 1.076,
          s_price: 1.09,
          amount: 10000,
          b_time: '2019-07-09',
          s_time: '2019-07-09'
        }
      ]
    },
    {
      strategyName: 'dec_hqc', // 策略名
      isOpen: false, // 是否当前持仓
      stockCode: 'sz000069', // 股票代码
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      dividend: 1470, // 分红
      eachDividend: 0.24, // 除息后每股分红
      dividendInterest: 294, // 股息
      dealList: [
        {
          b_price: 7.45,
          s_price: 7.04,
          amount: 1600,
          b_time: '2019-05-08',
          s_time: '2019-06-11'
        },
        {
          b_price: 7.18,
          s_price: 7.01,
          amount: 1500,
          b_time: '2019-05-09',
          s_time: '2019-06-11'
        },
        {
          b_price: 7.18,
          s_price: 6.96,
          amount: 300,
          b_time: '2019-05-09',
          s_time: '2019-06-10'
        },
        {
          b_price: 7.3,
          s_price: 6.99,
          amount: 1500,
          b_time: '2019-05-17',
          s_time: '2019-06-11'
        },
        {
          b_price: 6.78,
          s_price: 7.02,
          amount: 1800,
          b_time: '2019-05-23',
          s_time: '2019-05-28'
        },
        {
          b_price: 6.8,
          s_price: 6.96,
          amount: 1900,
          b_time: '2019-06-06',
          s_time: '2019-06-10'
        }
      ]
    },
    {
      strategyName: 'dec_etf', // 策略名
      isOpen: false, // 是否当前持仓
      stockCode: 'sh512880', // 股票代码
      needstampFree: false, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      dealList: [
        {
          b_price: 0.918,
          s_price: 0.919,
          amount: 11200,
          b_time: '2019-05-16',
          s_time: '2019-05-27'
        },
        {
          b_price: 0.892,
          s_price: 0.919,
          amount: 1900,
          b_time: '2019-05-17',
          s_time: '2019-05-27'
        }
      ]
    },
    {
      strategyName: 'dec_hhkj', // 策略名
      isOpen: false, // 是否当前持仓
      stockCode: 'sz002955', // 股票代码
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      dealList: [
        {
          b_price: 62.22,
          s_price: 60.13,
          amount: 100,
          b_time: '2019-06-06',
          s_time: '2019-06-11'
        },
        {
          b_price: 61.02,
          s_price: 60.4,
          amount: 100,
          b_time: '2019-06-06',
          s_time: '2019-06-11'
        },
        {
          b_price: 60.12,
          s_price: 60.65,
          amount: 100,
          b_time: '2019-06-06',
          s_time: '2019-06-11'
        },
        {
          b_price: 60.02,
          s_price: 60.58,
          amount: 100,
          b_time: '2019-06-06',
          s_time: '2019-06-11'
        },
        {
          b_price: 58.91,
          s_price: 60.59,
          amount: 200,
          b_time: '2019-06-06',
          s_time: '2019-06-11'
        },
        {
          b_price: 58.01,
          s_price: 59.49,
          amount: 200,
          b_time: '2019-06-06',
          s_time: '2019-06-10'
        }
      ]
    },
    {
      strategyName: 'dec_hyqc', // 策略名
      isOpen: false, // 是否当前持仓
      stockCode: 'sh600741', // 股票代码
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      dealList: [
        {
          b_price: 22.733,
          s_price: 22.925,
          amount: 1400,
          b_time: '2019-04-26',
          s_time: '2019-04-29'
        }
      ]
    },
    {
      strategyName: 'dec_yszs', // 策略名
      isOpen: false, // 是否当前持仓
      stockCode: 'sz002751', // 股票代码
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      dealList: [
        {
          b_price: 21.88,
          s_price: 20.64,
          amount: 500,
          b_time: '2019-05-16',
          s_time: '2019-06-06'
        },
        {
          b_price: 20.9,
          s_price: 21.58,
          amount: 400,
          b_time: '2019-05-17',
          s_time: '2019-05-21'
        },
        {
          b_price: 20.6,
          s_price: 20.64,
          amount: 500,
          b_time: '2019-05-30',
          s_time: '2019-06-06'
        },
        {
          b_price: 20.16,
          s_price: 20.67,
          amount: 500,
          b_time: '2019-06-03',
          s_time: '2019-06-04'
        },
        {
          b_price: 20.01,
          s_price: 20.82,
          amount: 500,
          b_time: '2019-06-05',
          s_time: '2019-06-06'
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
  }
]
export {gridFromData, gridData, stockFromData, interestFormData, myInterestFormData, myInterestList};