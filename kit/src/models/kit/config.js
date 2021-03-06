// 我的持仓列表
const gridData = {
  stockCodesList: 'sh000001,sh600559,sh600867,sh603087,sz300058,sz300113,sz300347', // sz000002,sh600048,sh512150,sh601318,sz000333,sh512000,sz000568,sh600009,sh600048,sh600887,sh600036,
  closeCodeList: 'sz002955,sh600741,sz000069,sz002751,sh512880,sh512000,sz002027,sh601069',
  strategyList: [
    {
      strategyName: '小白', // 策略名
      isOpen: true, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sh600559', // 股票代码 
      dealList: [
        {
          b_price: 14.21,
          s_price: null,
          amount: 1000,
          b_time: '2020-07-16',
          s_time: null
        },
        {
          b_price: 14.07,
          s_price: null,
          amount: 500,
          b_time: '2020-07-16',
          s_time: null
        },
        {
          b_price: 13.74,
          s_price: null,
          amount: 500,
          b_time: '2020-07-16',
          s_time: null
        },
        {
          b_price: 13.65,
          s_price: null,
          amount: 500,
          b_time: '2020-07-16',
          s_time: null
        },
        {
          b_price: 13.61,
          s_price: null,
          amount: 500,
          b_time: '2020-07-16',
          s_time: null
        },
        {
          b_price: 13.45,
          s_price: null,
          amount: 1000,
          b_time: '2020-07-16',
          s_time: null
        },
        {
          b_price: 13.4,
          s_price: null,
          amount: 1000,
          b_time: '2020-07-16',
          s_time: null
        },
        {
          b_price: 12.87,
          s_price: null,
          amount: 2000,
          b_time: '2020-07-24',
          s_time: null
        },
        {
          b_price: 12.72,
          s_price: null,
          amount: 1000,
          b_time: '2020-07-24',
          s_time: null
        },
        {
          b_price: 12.42,
          s_price: null,
          amount: 2000,
          b_time: '2020-07-24',
          s_time: null
        },
        {
          b_price: 12.97,
          s_price: 13.44,
          amount: 2000,
          b_time: '2020-07-17',
          s_time: '2020-07-17'
        },
        {
          b_price: 12.91,
          s_price: 13.34,
          amount: 1000,
          b_time: '2020-07-17',
          s_time: '2020-07-17'
        },
        {
          b_price: 12.87,
          s_price: 13.35,
          amount: 1000,
          b_time: '2020-07-17',
          s_time: '2020-07-17'
        },
        {
          b_price: 12.71,
          s_price: 13.39,
          amount: 1000,
          b_time: '2020-07-17',
          s_time: '2020-07-17'
        },
        {
          b_price: 12.45,
          s_price: 12.98,
          amount: 1000,
          b_time: '2020-07-20',
          s_time: '2020-07-20'
        },
        {
          b_price: 12.41,
          s_price: 12.98,
          amount: 1000,
          b_time: '2020-07-20',
          s_time: '2020-07-20'
        },
        {
          b_price: 12.86,
          s_price: 13.1,
          amount: 1000,
          b_time: '2020-07-23',
          s_time: '2020-07-23'
        },
        {
          b_price: 12.7,
          s_price: 13.1,
          amount: 1000,
          b_time: '2020-07-23',
          s_time: '2020-07-23'
        }
      ]
    },
    {
      strategyName: '东宝', // 策略名
      isOpen: true, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sh600867', // 股票代码 
      dealList: [
        {
          b_price: 14.47,
          s_price: null,
          amount: 1000,
          b_time: '2020-07-21',
          s_time: null
        },
        {
          b_price: 13.68,
          s_price: null,
          amount: 1000,
          b_time: '2020-07-24',
          s_time: null
        },
        {
          b_price: 13.51,
          s_price: null,
          amount: 1000,
          b_time: '2020-07-24',
          s_time: null
        },
        {
          b_price: 13.4,
          s_price: null,
          amount: 1000,
          b_time: '2020-07-24',
          s_time: null
        },
        {
          b_price: 12.9,
          s_price: null,
          amount: 2000,
          b_time: '2020-07-24',
          s_time: null
        },
        {
          b_price: 14.06,
          s_price: 14.32,
          amount: 1000,
          b_time: '2020-07-21',
          s_time: '2020-07-22'
        },
        {
          b_price: 13.9,
          s_price: 14.01,
          amount: 1000,
          b_time: '2020-07-23',
          s_time: '2020-07-23'
        }
      ]
    },

    {
      strategyName: 'tiger', // 策略名
      isOpen: true, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sz300347', // 股票代码 
      dealList: [
        {
          b_price: 106,
          s_price: null,
          amount: 100,
          b_time: '2020-07-24',
          s_time: null
        },
        {
          b_price: 104.53,
          s_price: null,
          amount: 100,
          b_time: '2020-07-24',
          s_time: null
        }
      ]
    },

    {
      strategyName: '甘李', // 策略名
      isOpen: false, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sh603087', // 股票代码 
      dealList: [
        {
          b_price: 209.99,
          s_price: 217.5,
          amount: 100,
          b_time: '2020-07-21',
          s_time: '2020-07-22'
        },
        {
          b_price: 207,
          s_price: 223.88,
          amount: 100,
          b_time: '2020-07-22',
          s_time: '2020-07-23'
        },
        {
          b_price: 205.91,
          s_price: 221.99,
          amount: 100,
          b_time: '2020-07-22',
          s_time: '2020-07-23'
        }
      ]
    },
    {
      strategyName: '苏宁', // 策略名
      isOpen: false, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sz002024', // 股票代码 
      dealList: [
        {
          b_price: 11.75,
          s_price: 11.53,
          amount: 1000,
          b_time: '2020-07-15',
          s_time: '2020-07-20'
        },
        {
          b_price: 11.52,
          s_price: 11.51,
          amount: 1000,
          b_time: '2020-07-15',
          s_time: '2020-07-17'
        },
        {
          b_price: 11.33,
          s_price: 11.53,
          amount: 1000,
          b_time: '2020-07-15',
          s_time: '2020-07-17'
        },
        {
          b_price: 11.31,
          s_price: 11.58,
          amount: 1000,
          b_time: '2020-07-15',
          s_time: '2020-07-16'
        },
        {
          b_price: 11.01,
          s_price: 11.55,
          amount: 1000,
          b_time: '2020-07-16',
          s_time: '2020-07-16'
        },
        {
          b_price: 11.06,
          s_price: 11.47,
          amount: 1000,
          b_time: '2020-07-16',
          s_time: '2020-07-16'
        }
      ]
    },
    {
      strategyName: '盛天', // 策略名
      isOpen: false, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sz300494', // 股票代码 
      dealList: [
        {
          b_price: 21.86,
          s_price: 21.27,
          amount: 500,
          b_time: '2020-07-16',
          s_time: '2020-07-21'
        },
        {
          b_price: 20.66,
          s_price: 21.21,
          amount: 500,
          b_time: '2020-07-16',
          s_time: '2020-07-20'
        },
        {
          b_price: 20.56,
          s_price: 21.08,
          amount: 500,
          b_time: '2020-07-20',
          s_time: '2020-07-20'
        }
      ]
    },
    {
      strategyName: '英特', // 策略名
      isOpen: false, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sz000411', // 股票代码 
      dealList: [
        {
          b_price: 12.3,
          s_price: 12.19,
          amount: 500,
          b_time: '2020-07-16',
          s_time: '2020-07-20'
        },
        {
          b_price: 11.94,
          s_price: 12.19,
          amount: 500,
          b_time: '2020-07-16',
          s_time: '2020-07-20'
        }
      ]
    },
    {
      strategyName: '平安', // 策略名
      isOpen: false, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sz000001', // 股票代码 
      dealList: [
        {
          b_price: 14.41,
          s_price: 14.68,
          amount: 1000,
          b_time: '2020-07-16',
          s_time: '2020-07-20'
        },
        {
          b_price: 14.1,
          s_price: 14.68,
          amount: 1000,
          b_time: '2020-07-17',
          s_time: '2020-07-20'
        }
      ]
    },

    {
      strategyName: '小白1', // 策略名
      isOpen: false, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sh600559', // 股票代码 
      dealList: [
        {
          b_price: 14.23,
          s_price: 14.83,
          amount: 1000,
          b_time: '2020-07-08',
          s_time: '2020-07-15'
        },
        {
          b_price: 14.52,
          s_price: 14.83,
          amount: 1000,
          b_time: '2020-07-10',
          s_time: '2020-07-15'
        },
        {
          b_price: 15.29,
          s_price: 14.83,
          amount: 1000,
          b_time: '2020-07-10',
          s_time: '2020-07-15'
        },
        {
          b_price: 15.14,
          s_price: 15.44,
          amount: 1000,
          b_time: '2020-07-10',
          s_time: '2020-07-13'
        },
        {
          b_price: 14.44,
          s_price: 14.93,
          amount: 1000,
          b_time: '2020-07-13',
          s_time: '2020-07-13'
        },
        {
          b_price: 14.21,
          s_price: 14.74,
          amount: 1000,
          b_time: '2020-07-13',
          s_time: '2020-07-13'
        },
        {
          b_price: 15.01,
          s_price: 14.83,
          amount: 1000,
          b_time: '2020-07-14',
          s_time: '2020-07-15'
        }, {
          b_price: 14.75,
          s_price: 15,
          amount: 1000,
          b_time: '2020-07-14',
          s_time: '2020-07-14'
        }
      ]
    },
    {
      strategyName: '苏宁1', // 策略名
      isOpen: false, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sz002024', // 股票代码 
      dealList: [
        {
          b_price: 10.67,
          s_price: 12.14,
          amount: 1000,
          b_time: '2020-07-10',
          s_time: '2020-07-13'
        },
        {
          b_price: 10.74,
          s_price: 11.83,
          amount: 1000,
          b_time: '2020-07-10',
          s_time: '2020-07-13'
        }
      ]
    },
    {
      strategyName: '黄金', // 策略名
      isOpen: false, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sh601069', // 股票代码 
      dealList: [
        {
          b_price: 15.05,
          s_price: 15.1,
          amount: 1000,
          b_time: '2020-07-10',
          s_time: '2020-07-13'
        },
        {
          b_price: 14.88,
          s_price: 15.03,
          amount: 1000,
          b_time: '2020-07-10',
          s_time: '2020-07-13'
        }
      ]
    },

    {
      strategyName: '九阳', // 策略名
      isOpen: false, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sz002242', // 股票代码 
      dealList: [
        {
          b_price: 35.66,
          s_price: 35.8,
          amount: 300,
          b_time: '2020-07-10',
          s_time: '2020-07-13'
        },
        {
          b_price: 35.07,
          s_price: 35.66,
          amount: 300,
          b_time: '2020-07-10',
          s_time: '2020-07-13'
        }
      ]
    },
    
    {
      strategyName: '恒瑞', // 策略名
      isOpen: false, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sh600276', // 股票代码 
      dealList: [
        {
          b_price: 91.03,
          s_price: 100.01,
          amount: 100,
          b_time: '2020-07-02',
          s_time: '2020-07-13'
        },
        {
          b_price: 91.03,
          s_price: 98.2,
          amount: 100,
          b_time: '2020-07-02',
          s_time: '2020-07-09'
        },
        {
          b_price: 90.21,
          s_price: 91.57,
          amount: 200,
          b_time: '2020-07-02',
          s_time: '2020-07-03'
        }
      ]
    },
    

    {
      strategyName: '爱尔眼科', // 策略名
      isOpen: false, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sz300015', // 股票代码 
      dealList: [
        {
          b_price: 41.92,
          s_price: 47.18,
          amount: 300,
          b_time: '2020-07-03',
          s_time: '2020-07-15'
        },
        {
          b_price: 46.03,
          s_price: 46.65,
          amount: 300,
          b_time: '2020-07-10',
          s_time: '2020-07-13'
        },
        {
          b_price: 41.53,
          s_price: 44.95,
          amount: 300,
          b_time: '2020-07-03',
          s_time: '2020-07-09'
        },
        {
          b_price: 42.29,
          s_price: 43.26,
          amount: 600,
          b_time: '2020-07-06',
          s_time: '2020-07-06'
        },
        {
          b_price: 42.84,
          s_price: 44.24,
          amount: 600,
          b_time: '2020-07-07',
          s_time: '2020-07-07'
        },
        {
          b_price: 45.81,
          s_price: 46.66,
          amount: 300,
          b_time: '2020-07-13',
          s_time: '2020-07-13'
        },
        {
          b_price: 46.02,
          s_price: 47.46,
          amount: 300,
          b_time: '2020-07-14',
          s_time: '2020-07-15'
        },
        {
          b_price: 45.41,
          s_price: 46.15,
          amount: 300,
          b_time: '2020-07-14',
          s_time: '2020-07-14'
        }
      ]
    },

    {
      strategyName: '小汤', // 策略名
      isOpen: false, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sz300146', // 股票代码 
      dealList: [
        {
          b_price: 20.18,
          s_price: 22.34,
          amount: 500,
          b_time: '2020-07-06',
          s_time: '2020-07-15'
        },
        {
          b_price: 21.54,
          s_price: 21.77,
          amount: 500,
          b_time: '2020-07-10',
          s_time: '2020-07-13'
        },
        {
          b_price: 21.25,
          s_price: 21.44,
          amount: 500,
          b_time: '2020-07-10',
          s_time: '2020-07-13'
        },
        {
          b_price: 21.46,
          s_price: 21.74,
          amount: 500,
          b_time: '2020-07-14',
          s_time: '2020-07-14'
        }
      ]
    },

    {
      strategyName: '一夜情', // 策略名
      isOpen: true, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sz300113', // 股票代码 
      dealList: [
        { // 盛天
          b_price: 24.77,
          s_price: 25.53,
          amount: 1600,
          b_time: '2020-07-08',
          s_time: '2020-07-09',
          mark: '盛天'
        },
        { // 600515海航基础
          b_price: 7.29,
          s_price: 8.53,
          amount: 1000,
          b_time: '2020-07-10',
          s_time: '2020-07-13',
          mark: '海航基础'
        },
        { // 华天科技
          b_price: 17.7,
          s_price: 18.62,
          amount: 600,
          b_time: '2020-07-13',
          s_time: '2020-07-15',
          mark: '华天科技'
        },
        { // 华天科技
          b_price: 19.19,
          s_price: 18.62,
          amount: 600,
          b_time: '2020-07-14',
          s_time: '2020-07-15',
          mark: '华天科技'
        },
        { // 华天科技
          b_price: 18.27,
          s_price: 19.1,
          amount: 600,
          b_time: '2020-07-14',
          s_time: '2020-07-14',
          mark: '华天科技'
        },
        { // 中欣氟材
          b_price: 21.27,
          s_price: 23.37,
          amount: 500,
          b_time: '2020-07-13',
          s_time: '2020-07-14',
          mark: '中欣氟材'
        },
        { 
          b_price: 6.79,
          s_price: 6.9,
          amount: 2000,
          b_time: '2020-07-22',
          s_time: '2020-07-23',
          mark: '英洛华'
        },
        { 
          b_price: 25.99,
          s_price: null,
          amount: 800,
          b_time: '2020-07-24',
          s_time: null,
          mark: '顺网科技'
        }
      ]
    },

    {
      strategyName: '奥联电子', // 策略名
      isOpen: false, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sz300585', // 股票代码 
      dealList: [
        {
          b_price: 14.3,
          s_price: 14.99,
          amount: 400,
          b_time: '2020-07-03',
          s_time: '2020-07-08'
        },
        {
          b_price: 14.3,
          s_price: 14.61,
          amount: 300,
          b_time: '2020-07-03',
          s_time: '2020-07-06'
        },
        {
          b_price: 14.91,
          s_price: 15.03,
          amount: 400,
          b_time: '2020-07-07',
          s_time: '2020-07-08'
        },
        
        {
          b_price: 14.82,
          s_price: 15.24,
          amount: 400,
          b_time: '2020-07-08',
          s_time: '2020-07-08'
        }
      ]
    },

    {
      strategyName: '中元股份', // 策略名
      isOpen: false, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sz300018', // 股票代码 
      dealList: [
        {
          b_price: 5.87,
          s_price: 6.21,
          amount: 1000,
          b_time: '2020-07-03',
          s_time: '2020-07-08'
        },
        {
          b_price: 5.87,
          s_price: 6.09,
          amount: 1000,
          b_time: '2020-07-03',
          s_time: '2020-07-06'
        }
      ]
    },
    {
      strategyName: '蓝色光标', // 策略名
      isOpen: true, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sz300058', // 股票代码 
      dealList: [
        {
          b_price: 7.92,
          s_price: 8.07,
          amount: 1000,
          b_time: '2020-07-02',
          s_time: '2020-07-06'
        },
        {
          b_price: 7.92,
          s_price: 8.01,
          amount: 1000,
          b_time: '2020-07-02',
          s_time: '2020-07-03'
        },
        {
          b_price: 7.37,
          s_price: null,
          amount: 1000,
          b_time: '2020-07-23',
          s_time: null
        },
        {
          b_price: 7.23,
          s_price: null,
          amount: 1000,
          b_time: '2020-07-24',
          s_time: null
        }
      ]
    },
    
    // 分界线
    {
      strategyName: '招商', // 策略名
      isOpen: false, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sh600036', // 股票代码 
      dealList: [
        {
          b_price: 33.89,
          s_price: 34.22,
          amount: 600,
          b_time: '2020-06-24',
          s_time: '2020-06-29'
        }
      ]
    },
    {
      strategyName: '上机', // 策略名
      isOpen: false, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sh600009', // 股票代码 
      dealList: [
        {
          b_price: 71.6,
          s_price: 72.05,
          amount: 200,
          b_time: '2020-06-15',
          s_time: '2020-06-16'
        },
        {
          b_price: 70.1,
          s_price: 71.36,
          amount: 200,
          b_time: '2020-06-17',
          s_time: '2020-06-18'
        }
      ]
    },
    {
      strategyName: '伊利', // 策略名
      isOpen: false, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sh600887', // 股票代码 
      dealList: [
        {
          b_price: 28.72,
          s_price: 28.8,
          amount: 1000,
          b_time: '2020-06-02',
          s_time: '2020-06-03'
        }
      ]
    },
    {
      strategyName: '南大光电', // 策略名
      isOpen: false, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sz300346', // 股票代码 
      dealList: [
        {
          b_price: 41.72,
          s_price: 41.9,
          amount: 200,
          b_time: '2020-06-10',
          s_time: '2020-06-11'
        },
        {
          b_price: 41.37,
          s_price: 41.9,
          amount: 200,
          b_time: '2020-06-10',
          s_time: '2020-06-11'
        }
      ]
    },
    {
      strategyName: '券商etf', // 策略名
      isOpen: false, // 是否当前持仓
      needstampFree: false, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sh512000', // 股票代码 
      // dividend: 10451.02, // 分红
      dealList: [
        {
          b_price: 0.878,
          s_price: 0.897,
          amount: 25000,
          b_time: '2020-05-22',
          s_time: '2020-06-01'
        },
        {
          b_price: 0.876,
          s_price: 0.889,
          amount: 25000,
          b_time: '2020-05-22',
          s_time: '2020-06-01'
        },
        {
          b_price: 0.87,
          s_price: 0.885,
          amount: 25000,
          b_time: '2020-05-22',
          s_time: '2020-06-01'
        },
        {
          b_price: 0.864,
          s_price: 0.885,
          amount: 25000,
          b_time: '2020-05-22',
          s_time: '2020-06-01'
        },
        {
          b_price: 0.862,
          s_price: 0.876,
          amount: 1400,
          b_time: '2020-05-22',
          s_time: '2020-05-28'
        },
        {
          b_price: 0.857,
          s_price: 0.876,
          amount: 23600,
          b_time: '2020-05-25',
          s_time: '2020-05-28'
        },
        {
          b_price: 0.856,
          s_price: 0.87,
          amount: 25000,
          b_time: '2020-05-27',
          s_time: '2020-05-28'
        }
      ]
    },
    {
      strategyName: '上机', // 策略名
      isOpen: false, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sh600009', // 股票代码 
      dealList: [
        {
          b_price: 65.93,
          s_price: 66.43,
          amount: 300,
          b_time: '2020-05-22',
          s_time: '2020-05-25'
        },
        {
          b_price: 65.76,
          s_price: 66.43,
          amount: 300,
          b_time: '2020-05-22',
          s_time: '2020-05-25'
        },
        {
          b_price: 65.51,
          s_price: 66.4,
          amount: 200,
          b_time: '2020-05-22',
          s_time: '2020-05-25'
        },
        {
          b_price: 65.03,
          s_price: 65.89,
          amount: 200,
          b_time: '2020-05-22',
          s_time: '2020-05-25'
        }
      ]
    },
    {
      strategyName: '中软', // 策略名
      isOpen: false, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sh600536', // 股票代码 
      dealList: [
        {
          b_price: 80.85,
          s_price: 79.58,
          amount: 200,
          b_time: '2020-05-21',
          s_time: '2020-06-01'
        },
        {
          b_price: 80.19,
          s_price: 79.58,
          amount: 200,
          b_time: '2020-05-22',
          s_time: '2020-06-01'
        },
        {
          b_price: 79.71,
          s_price: 79.38,
          amount: 200,
          b_time: '2020-05-22',
          s_time: '2020-06-01'
        },
        {
          b_price: 79.3,
          s_price: 79.38,
          amount: 200,
          b_time: '2020-05-22',
          s_time: '2020-06-01'
        },
        {
          b_price: 79.02,
          s_price: 79,
          amount: 200,
          b_time: '2020-05-22',
          s_time: '2020-05-29'
        },
        {
          b_price: 77.82,
          s_price: 79.24,
          amount: 200,
          b_time: '2020-05-25',
          s_time: '2020-05-26'
        },
        {
          b_price: 77.66,
          s_price: 78.08,
          amount: 200,
          b_time: '2020-05-25',
          s_time: '2020-05-25'
        },
        {
          b_price: 78.15,
          s_price: 80,
          amount: 200,
          b_time: '2020-05-27',
          s_time: '2020-05-28'
        },
        {
          b_price: 77.65,
          s_price: 78.16,
          amount: 200,
          b_time: '2020-05-27',
          s_time: '2020-05-27'
        },
        {
          b_price: 77.50,
          s_price: 78.15,
          amount: 200,
          b_time: '2020-05-27',
          s_time: '2020-05-28'
        },
        {
          b_price: 77.36,
          s_price: 78.15,
          amount: 200,
          b_time: '2020-05-27',
          s_time: '2020-05-28'
        }
      ]
    },
    {
      strategyName: '恒瑞', // 策略名
      isOpen: false, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sh600276', // 股票代码 
      dealList: [
        {
          b_price: 78,
          s_price: 79.74,
          amount: 200,
          b_time: '2020-05-28',
          s_time: '2020-06-01'
        },
        {
          b_price: 78,
          s_price: 80.12,
          amount: 200,
          b_time: '2020-05-28',
          s_time: '2020-06-01'
        }
      ]
    },
    {
      strategyName: '保利', // 策略名
      isOpen: false, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sh600048', // 股票代码 
      dealList: [
        {
          b_price: 14.33,
          s_price: 14.5,
          amount: 1000,
          b_time: '2020-05-29',
          s_time: '2020-06-01'
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
      isOpen: false, // 是否当前持仓
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
          s_price: 0.902,
          amount: 25000,
          b_time: '2020-04-21',
          s_time: '2020-05-18'
        },
        {
          b_price: 0.882,
          s_price: 0.917,
          amount: 25000,
          b_time: '2020-04-24',
          s_time: '2020-05-11'
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
    },
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
      isOpen: false, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sz000002', // 股票代码 
      dealList: [
        {
          b_price: 26.95,
          s_price: 27.74,
          amount: 400,
          b_time: '2020-04-15',
          s_time: '2020-07-01'
        },
        {
          b_price: 26.95,
          s_price: 27.53,
          amount: 400,
          b_time: '2020-04-15',
          s_time: '2020-07-01'
        },
        {
          b_price: 26.85,
          s_price: 27.58,
          amount: 800,
          b_time: '2020-04-15',
          s_time: '2020-06-03'
        },
        {
          b_price: 26.59,
          s_price: 27,
          amount: 800,
          b_time: '2020-04-15',
          s_time: '2020-06-02'
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
          s_price: 26.37,
          amount: 800,
          b_time: '2020-05-06',
          s_time: '2020-06-01'
        },
        {
          b_price: 25.96,
          s_price: 26.49,
          amount: 800,
          b_time: '2020-05-06',
          s_time: '2020-05-28'
        },
        {
          b_price: 25.88,
          s_price: 26.24,
          amount: 800,
          b_time: '2020-05-12',
          s_time: '2020-05-18'
        },
        {
          b_price: 25.71,
          s_price: 26.24,
          amount: 2400,
          b_time: '2020-05-13',
          s_time: '2020-05-18'
        },
        {
          b_price: 25.71,
          s_price: 26.36,
          amount: 800,
          b_time: '2020-05-13',
          s_time: '2020-05-18'
        },
        {
          b_price: 25.68,
          s_price: 26.28,
          amount: 1600,
          b_time: '2020-05-13',
          s_time: '2020-05-18'
        },
        {
          b_price: 25.51,
          s_price: 26.35,
          amount: 800,
          b_time: '2020-05-14',
          s_time: '2020-05-18'
        },
        {
          b_price: 25.98,
          s_price: 26.38,
          amount: 800,
          b_time: '2020-05-06',
          s_time: '2020-05-11'
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
        },
        {
          b_price: 25.71,
          s_price: 26.22,
          amount: 800,
          b_time: '2020-05-20',
          s_time: '2020-05-28'
        },
        {
          b_price: 25.58,
          s_price: 26.12,
          amount: 800,
          b_time: '2020-05-20',
          s_time: '2020-05-28'
        },
        {
          b_price: 25.51,
          s_price: 26.07,
          amount: 800,
          b_time: '2020-05-21',
          s_time: '2020-05-27'
        },
        {
          b_price: 25.36,
          s_price: 25.95,
          amount: 800,
          b_time: '2020-05-22',
          s_time: '2020-05-27'
        },
        {
          b_price: 25.34,
          s_price: 25.68,
          amount: 800,
          b_time: '2020-05-22',
          s_time: '2020-05-27'
        },
        {
          b_price: 25.19,
          s_price: 25.48,
          amount: 1100,
          b_time: '2020-05-22',
          s_time: '2020-05-25'
        },
        {
          b_price: 27.12,
          s_price: 27.39,
          amount: 800,
          b_time: '2020-06-03',
          s_time: '2020-07-01'
        },
        {
          b_price: 26.34,
          s_price: 27.27,
          amount: 800,
          b_time: '2020-06-05',
          s_time: '2020-07-01'
        },
        {
          b_price: 26.27,
          s_price: 26.77,
          amount: 800,
          b_time: '2020-06-05',
          s_time: '2020-06-08'
        },
        {
          b_price: 26.21,
          s_price: 26.77,
          amount: 800,
          b_time: '2020-06-05',
          s_time: '2020-06-08'
        },
        {
          b_price: 26.16,
          s_price: 27.06,
          amount: 800,
          b_time: '2020-06-10',
          s_time: '2020-07-01'
        },
        {
          b_price: 26.01,
          s_price: 26.83,
          amount: 800,
          b_time: '2020-06-10',
          s_time: '2020-07-01'
        },
        {
          b_price: 26.01,
          s_price: 26.75,
          amount: 800,
          b_time: '2020-06-11',
          s_time: '2020-07-01'
        },
        {
          b_price: 25.87,
          s_price: 26.41,
          amount: 800,
          b_time: '2020-06-11',
          s_time: '2020-06-24'
        },
        {
          b_price: 25.77,
          s_price: 26.59,
          amount: 800,
          b_time: '2020-06-29',
          s_time: '2020-07-01'
        }
      ]
    },
    {
      strategyName: '宝钢', // 策略名
      isOpen: false, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sh600019', // 股票代码 
      dealList: [
        {
          b_price: 4.61,
          s_price: 4.56,
          amount: 5000,
          b_time: '2020-06-04',
          s_time: '2020-06-29'
        },
        {
          b_price: 4.61,
          s_price: 4.8,
          amount: 5000,
          b_time: '2020-06-04',
          s_time: '2020-06-18'
        },
        {
          b_price: 4.56,
          s_price: 4.7,
          amount: 5000,
          b_time: '2020-06-11',
          s_time: '2020-06-17'
        },
        {
          b_price: 4.55,
          s_price: 4.61,
          amount: 5000,
          b_time: '2020-06-11',
          s_time: '2020-06-16'
        },
        {
          b_price: 4.53,
          s_price: 4.6,
          amount: 5000,
          b_time: '2020-06-11',
          s_time: '2020-06-16'
        }
      ]
    },
    {
      strategyName: '保利', // 策略名
      isOpen: false, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sh600048', // 股票代码 
      dealList: [
        {
          b_price: 14.33,
          s_price: 14.49,
          amount: 2000,
          b_time: '2020-06-11',
          s_time: '2020-06-15'
        }
      ]
    },
    {
      strategyName: '宁泸高速', // 策略名
      isOpen: false, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sh600377', // 股票代码 
      dealList: [
        {
          b_price: 9.97,
          s_price: 10.08,
          amount: 2000,
          b_time: '2020-06-09',
          s_time: '2020-06-15'
        }
      ]
    },
    {
      strategyName: '京泸高铁', // 策略名
      isOpen: false, // 是否当前持仓
      needstampFree: true, // 是否需要印花税
      freeRatio: 0.00025, // 交易手续费比率
      stockCode: 'sh601816', // 股票代码 
      dealList: [
        {
          b_price: 6.55,
          s_price: 6.52,
          amount: 2000,
          b_time: '2020-06-09',
          s_time: '2020-07-03'
        },
        {
          b_price: 6.5,
          s_price: 6.52,
          amount: 2000,
          b_time: '2020-06-11',
          s_time: '2020-07-03'
        },
        {
          b_price: 6.35,
          s_price: 6.41,
          amount: 2000,
          b_time: '2020-06-15',
          s_time: '2020-07-02'
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
        {label: 'yh', value: 3},
        {label: '婷', value: 4},
        {label: '忠', value: 5},
        {label: '烽', value: 6},
        {label: '健', value: 7},
        {label: '娟', value: 8},
        {label: '莲', value: 9}
      ]
    }
  ]
}]

// 我的借贷列表
const myInterestList = [
  {
    origin: 'zfb',
    originValue: 2,
    startTime: '2019-4-26',
    endTime: '2019-5-16',
    ratio: 9,
    capital: 30000
  },
  {
    origin: 'zfb',
    originValue: 2,
    startTime: '2019-4-26',
    endTime: '2019-5-16',
    ratio: 9,
    capital: 40000
  },
  {
    origin: 'yh',
    originValue: 3,
    startTime: '2019-5-15',
    endTime: null,
    ratio: 5,
    capital: 63754.26
  },
  {
    origin: 'yh',
    originValue: 3,
    startTime: '2019-5-20',
    endTime: null,
    ratio: 5,
    capital: 71450.61
  },
  {
    origin: 'yh',
    originValue: 3,
    startTime: '2020-3-19',
    endTime: null,
    ratio: 5,
    capital: 93406.98
  },
  {
    origin: 'zfb',
    originValue: 2,
    startTime: '2020-3-19',
    endTime: '2020-3-26',
    ratio: 9,
    capital: 92000
  },

  {
    origin: '婷',
    originValue: 4,
    startTime: '2020-8-22',
    endTime: null,
    ratio: 5,
    capital: 100000
  },
  {
    origin: '忠',
    originValue: 5,
    startTime: '2020-8-22',
    endTime: null,
    ratio: 5,
    capital: 10000
  },
  {
    origin: '烽',
    originValue: 6,
    startTime: '2020-8-22',
    endTime: '2020-10-27',
    ratio: 5,
    capital: 10000
  },
  {
    origin: '健',
    originValue: 7,
    startTime: '2020-8-22',
    endTime: null,
    ratio: 5,
    capital: 60000
  },
  {
    origin: '娟',
    originValue: 8,
    startTime: '2020-8-22',
    endTime: null,
    ratio: 5,
    capital: 20000
  },
  {
    origin: '莲',
    originValue: 9,
    startTime: '2020-9-30',
    endTime: null,
    ratio: 5,
    capital: 10000
  }
]
export {gridFromData, gridData, stockFromData, interestFormData, myInterestFormData, myInterestList};