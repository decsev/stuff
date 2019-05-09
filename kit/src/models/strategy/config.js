const strategyListColumns = [
  {
    title: '编号',
    dataIndex: 'myIndex',
    key: 'myIndex'
  },
  {
    title: '策略名',
    dataIndex: 'magicma',
    key: 'magicma',
    render: (magicma, record) => {
      return <a onClick={() => {window.open(window.location.href.replace(window.location.hash, '') + '#/strategyDetail/' + record.id, '_blank')}}>{magicma}</a>
    }
  },
  {
    title: '状态',
    dataIndex: 'param',
    key: 'status',
    render: (param, record) => {
      if (record.status === 0) {
        return <span style={{color: 'red'}}>已停止</span>;
      }
      return <span style={{color: 'green'}}>运行中</span>;
    }
  }
]

const strategyFormData = [

  {
    title: '帐户A',
    col: 12,
    form: [
      {
        type: 'select',
        unrewriteable: true,
        text: '交易所',
        name: 'QHJYS',
        options: [
          {label: 'OKEXFUTURE', value: 'OKEXFUTURE'},
          {label: 'HUOBIFUTURE', value: 'HUOBIFUTURE'}
          //{label: 'BIEX', value: 'BIEX'}
        ],
        required: true
      },
      {
        type: 'select',
        // unrewriteable: true,
        text: '帐户名',
        name: 'QHJYS_userName',
        options: [],
        forceRender: false,
        required: true
      },
      {
        type: 'select',
        unrewriteable: true,
        text: '品种',
        name: 'QHJYS_category',
        options: [],
        forceRender: false,
        required: true
      },
      {
        col: 12,
        type: 'number',
        text: '交易费率',
        description: '每个订单的费率',
        name: 'feeA',
        value: -0.0003,
        defaultValue: -0.0003
      },
      {
        type: 'switch',
        text: '市价开仓',
        name: 'openMktA',
        forceRender: false,
        value: false,
        checked: '是',
        unchecked: '否'
      },
      {
        type: 'switch',
        text: '市价平仓',
        name: 'closeMktA',
        forceRender: false,
        value: false,
        checked: '是',
        unchecked: '否'
      },
      {
        col: 12,
        type: 'number',
        text: '无效涨幅',
        description: '最近10秒行情振幅超过该数值忽略开平仓信号',
        name: 'changeIgnoreA',
        value: 0.0009,
        defaultValue: 0.0009
      }
    ]
  },
  {
    title: '帐户B',
    col: 12,
    form: [
      {
        type: 'select',
        unrewriteable: true,
        text: '交易所',
        name: 'XHJYS',
        options: [
          {label: 'OKEXSPOT', value: 'OKEXSPOT'},
          // {label: 'BIEX', value: 'BIEX'},
          {label: 'OKEXFUTURE', value: 'OKEXFUTURE'},
          {label: 'HUOBISPOT', value: 'HUOBISPOT'},
          {label: 'HUOBIFUTURE', value: 'HUOBIFUTURE'},
          {label: 'OKEXMARGIN', value: 'OKEXMARGIN'}
        ],
        required: true
      },
      {
        type: 'select',
        // unrewriteable: true,
        text: '帐户名',
        name: 'XHJYS_userName',
        options: [],
        forceRender: false,
        required: true
      },
      {
        type: 'select',
        unrewriteable: true,
        text: '品种',
        name: 'XHJYS_category',
        options: [],
        forceRender: false,
        required: true
      },
      {
        col: 12,
        type: 'number',
        text: '交易费率',
        description: '每个订单的费率',
        name: 'feeB',
        value: -0.0003,
        defaultValue: -0.0003
      },
      {
        type: 'switch',
        text: '市价开仓',
        name: 'openMktB',
        forceRender: false,
        value: true,
        checked: '是',
        unchecked: '否'
      },
      {
        type: 'switch',
        text: '市价平仓',
        name: 'closeMktB',
        forceRender: false,
        value: true,
        checked: '是',
        unchecked: '否'
      },
      {
        col: 12,
        type: 'number',
        text: '无效涨幅',
        description: '最近10秒行情振幅超过该数值忽略开平仓信号',
        name: 'changeIgnoreB',
        value: 0.0009,
        defaultValue: 0.0009
      }
    ]
  },
  {
    title: '策略',
    col: 24,
    // cats: ['基础配置', '高级配置'],
    form: [
      {
        col: 12,
        type: 'text',
        // unrewriteable: true,
        text: '策略名',
        name: 'magicma',
        required: true
      },
      {
        col: 12,
        type: 'number',
        text: '每一层开仓量(张数)',
        name: 'openVolOneSpread',
        value: 1,
        required: true,
        pattern: '^[1-9]\\d*$',
        patternMsg: '请填写大于零的整数'
      },
      {
        col: 12,
        type: 'number',
        text: '最小开仓价差比率',
        name: 'openSpreadRatio',
        value: 0.003,
        required: true
      },
      {
        col: 12,
        type: 'number',
        text: '最大开仓价差比率',
        name: 'openSpreadRatioMax',
        description: '为空表示不设置最大开仓价差比率上限',
        value: 0.02,
        required: true
      },
      {
        col: 12,
        type: 'number',
        text: '平仓价差比率',
        name: 'closeSpreadRatio',
        description: '当前价差比率-开仓价差比率',
        value: 0.0028,
        required: true
      },
      {
        col: 12,
        type: 'number',
        text: '开仓价差比率间隔',
        name: 'openSpreadRatioInterval',
        value: 0.001,
        required: true,
        pattern: '^[+]{0,1}(\\d+)$|^[+]{0,1}(\\d+\\.\\d+)$',
        patternMsg: '请填写大于零的数字'
      },
      {
        col: 12,
        type: 'number',
        text: '最大开仓量(张数)',
        name: 'openBuyVolLimit',
        value: 10,
        required: true,
        pattern: '^[1-9]\\d*$',
        patternMsg: '请填写大于零的整数'
      },
      {
        col: 12,
        type: 'number',
        text: '最大吃单比例',
        description: '每次盘口价触及价差比例时，实际订单量占总买卖队列中的委托量百分比，填写0时为不限制',
        name: 'orderVolOfAskbidVolRatio',
        value: 0.5,
        defaultValue: 0.5,
        required: true,
        pattern: '^[01]$|^0\\.\\d+$',
        patternMsg: '请填写0-1的数字'
      },
      {
        col: 12,
        type: 'number',
        text: '单笔下单量最大（张数）',
        description: '每个价差机会的最大开仓量(张数)，填写0时为不限制',
        name: 'futureNumOneOrderMax',
        value: 0,
        defaultValue: 0,
        required: true,
        pattern: '^0$|^[1-9]\\d*$',
        patternMsg: '请填写正整数'
      },
      {
        col: 12,
        type: 'number',
        text: '单笔下单量最小（张数）',
        description: '每个价差机会的最小开仓量(张数)，填写0时为不限制',
        name: 'futureNumOneOrderMin',
        value: 0,
        defaultValue: 0,
        required: true,
        pattern: '^0$|^[1-9]\\d*$',
        patternMsg: '请填写正整数'
      },
      {
        type: 'switch',
        text: '负溢价开仓',
        name: 'openBuy',
        description: '在价差为负溢价行情下开仓(即期货买入现货卖出)',
        forceRender: false,
        value: true,
        checked: '是',
        unchecked: '否'
      },
      {
        type: 'switch',
        text: '正溢价开仓',
        name: 'openSell',
        description: '在价差为正溢价行情下开仓(即期货卖出现货买入)',
        forceRender: false,
        value: true,
        checked: '是',
        unchecked: '否'
      },
      {
        col: 12,
        type: 'number',
        text: '废单止损比例',
        formatter: (value) => {
          return `-${String(value).replace('-', '')}`
        },
        parser: (value) => {
          return '-' + value.replace('-', '')
        },
        name: 'singleOrderStopLossRatio',
        value: -0.01,
        defaultValue: -0.01,
        required: true,
        pattern: '^[-](\\d+)$|^[-](\\d+\\.\\d+)$|^0$',
        patternMsg: '请填写小于等于零的数字'
      },
      {
        col: 12,
        type: 'text',
        text: '钉钉消息地址',
        name: 'dingTalkUrl',
        value: '',
        required: false
      },
      {
        type: 'switch',
        text: '价差平仓线是否生效',
        name: 'isSetCloseSpreadThreshhold',
        forceRender: false,
        value: false,
        checked: '是',
        unchecked: '否',
        hideInAdd: true
      },
      {
        col: 12,
        type: 'number',
        text: '价差平仓线',
        name: 'closeSpreadThreshhold',
        value: 0.03,
        defaultValue: 0.03,
        hideInAdd: true
      }
      // {
      //   col: 12,
      //   category: '高级配置',
      //   type: 'text',
      //   text: '测试高级配置',
      //   name: 'hightLevel',
      //   value: '',
      //   required: false
      // }
    ]
  }
]

const JYSCAT = {
  XHJYS: {
    OKEXSPOT: [
      {label: 'BTC_USDT', value: 'BTC_USDT'},
      {label: 'ETH_USDT', value: 'ETH_USDT'},
      {label: 'LTC_USDT', value: 'LTC_USDT'},
      {label: 'ETC_USDT', value: 'ETC_USDT'},
      {label: 'BCH_USDT', value: 'BCH_USDT'},
      {label: 'XRP_USDT', value: 'XRP_USDT'},
      {label: 'EOS_USDT', value: 'EOS_USDT'},
      {label: 'BTG_USDT', value: 'BTG_USDT'}
    ],
    BIEX: [{label: 'BTC_USDT', value: 'BTC_USDT'}],
    OKEXFUTURE: [
      {label: 'BTC_THIS_WEEK', value: 'BTC_THIS_WEEK'},
      {label: 'BTC_NEXT_WEEK', value: 'BTC_NEXT_WEEK'},
      {label: 'BTC_QUARTER', value: 'BTC_QUARTER'},
      {label: 'ETH_THIS_WEEK', value: 'ETH_THIS_WEEK'},
      {label: 'ETH_NEXT_WEEK', value: 'ETH_NEXT_WEEK'},
      {label: 'ETH_QUARTER', value: 'ETH_QUARTER'},
      {label: 'LTC_THIS_WEEK', value: 'LTC_THIS_WEEK'},
      {label: 'LTC_NEXT_WEEK', value: 'LTC_NEXT_WEEK'},
      {label: 'LTC_QUARTER', value: 'LTC_QUARTER'},
      {label: 'ETC_THIS_WEEK', value: 'ETC_THIS_WEEK'},
      {label: 'ETC_NEXT_WEEK', value: 'ETC_NEXT_WEEK'},
      {label: 'ETC_QUARTER', value: 'ETC_QUARTER'},
      {label: 'BCH_THIS_WEEK', value: 'BCH_THIS_WEEK'},
      {label: 'BCH_NEXT_WEEK', value: 'BCH_NEXT_WEEK'},
      {label: 'BCH_QUARTER', value: 'BCH_QUARTER'},
      {label: 'XRP_THIS_WEEK', value: 'XRP_THIS_WEEK'},
      {label: 'XRP_NEXT_WEEK', value: 'XRP_NEXT_WEEK'},
      {label: 'XRP_QUARTER', value: 'XRP_QUARTER'},
      {label: 'EOS_THIS_WEEK', value: 'EOS_THIS_WEEK'},
      {label: 'EOS_NEXT_WEEK', value: 'EOS_NEXT_WEEK'},
      {label: 'EOS_QUARTER', value: 'EOS_QUARTER'},
      {label: 'BTG_THIS_WEEK', value: 'BTG_THIS_WEEK'},
      {label: 'BTG_NEXT_WEEK', value: 'BTG_NEXT_WEEK'},
      {label: 'BTG_QUARTER', value: 'BTG_QUARTER'}
    ],
    HUOBISPOT: [
      {label: 'BTC_USDT', value: 'BTC_USDT'},
      {label: 'ETH_USDT', value: 'ETH_USDT'},
      {label: 'LTC_USDT', value: 'LTC_USDT'},
      {label: 'ETC_USDT', value: 'ETC_USDT'},
      {label: 'BCH_USDT', value: 'BCH_USDT'},
      {label: 'XRP_USDT', value: 'XRP_USDT'},
      {label: 'EOS_USDT', value: 'EOS_USDT'},
      {label: 'BTG_USDT', value: 'BTG_USDT'}
    ],
    HUOBIFUTURE: [
      {label: 'BTC_THIS_WEEK', value: 'BTC_THIS_WEEK'},
      {label: 'BTC_NEXT_WEEK', value: 'BTC_NEXT_WEEK'},
      {label: 'BTC_QUARTER', value: 'BTC_QUARTER'},
      {label: 'ETH_THIS_WEEK', value: 'ETH_THIS_WEEK'},
      {label: 'ETH_NEXT_WEEK', value: 'ETH_NEXT_WEEK'},
      {label: 'ETH_QUARTER', value: 'ETH_QUARTER'},
      {label: 'EOS_THIS_WEEK', value: 'EOS_THIS_WEEK'},
      {label: 'EOS_NEXT_WEEK', value: 'EOS_NEXT_WEEK'},
      {label: 'EOS_QUARTER', value: 'EOS_QUARTER'},
      {label: 'LTC_THIS_WEEK', value: 'LTC_THIS_WEEK'},
      {label: 'LTC_NEXT_WEEK', value: 'LTC_NEXT_WEEK'},
      {label: 'LTC_QUARTER', value: 'LTC_QUARTER'}
    ],
    OKEXMARGIN: [
      {label: 'BTC_USDT', value: 'BTC_USDT'},
      {label: 'ETH_USDT', value: 'ETH_USDT'},
      {label: 'LTC_USDT', value: 'LTC_USDT'},
      {label: 'ETC_USDT', value: 'ETC_USDT'},
      {label: 'BCH_USDT', value: 'BCH_USDT'},
      {label: 'XRP_USDT', value: 'XRP_USDT'},
      {label: 'EOS_USDT', value: 'EOS_USDT'},
      {label: 'BTG_USDT', value: 'BTG_USDT'}
    ]
  },
  QHJYS: {
    OKEXFUTURE: [
      {label: 'BTC_THIS_WEEK', value: 'BTC_THIS_WEEK'},
      {label: 'BTC_NEXT_WEEK', value: 'BTC_NEXT_WEEK'},
      {label: 'BTC_QUARTER', value: 'BTC_QUARTER'},
      {label: 'ETH_THIS_WEEK', value: 'ETH_THIS_WEEK'},
      {label: 'ETH_NEXT_WEEK', value: 'ETH_NEXT_WEEK'},
      {label: 'ETH_QUARTER', value: 'ETH_QUARTER'},
      {label: 'LTC_THIS_WEEK', value: 'LTC_THIS_WEEK'},
      {label: 'LTC_NEXT_WEEK', value: 'LTC_NEXT_WEEK'},
      {label: 'LTC_QUARTER', value: 'LTC_QUARTER'},
      {label: 'ETC_THIS_WEEK', value: 'ETC_THIS_WEEK'},
      {label: 'ETC_NEXT_WEEK', value: 'ETC_NEXT_WEEK'},
      {label: 'ETC_QUARTER', value: 'ETC_QUARTER'},
      {label: 'BCH_THIS_WEEK', value: 'BCH_THIS_WEEK'},
      {label: 'BCH_NEXT_WEEK', value: 'BCH_NEXT_WEEK'},
      {label: 'BCH_QUARTER', value: 'BCH_QUARTER'},
      {label: 'XRP_THIS_WEEK', value: 'XRP_THIS_WEEK'},
      {label: 'XRP_NEXT_WEEK', value: 'XRP_NEXT_WEEK'},
      {label: 'XRP_QUARTER', value: 'XRP_QUARTER'},
      {label: 'EOS_THIS_WEEK', value: 'EOS_THIS_WEEK'},
      {label: 'EOS_NEXT_WEEK', value: 'EOS_NEXT_WEEK'},
      {label: 'EOS_QUARTER', value: 'EOS_QUARTER'},
      {label: 'BTG_THIS_WEEK', value: 'BTG_THIS_WEEK'},
      {label: 'BTG_NEXT_WEEK', value: 'BTG_NEXT_WEEK'},
      {label: 'BTG_QUARTER', value: 'BTG_QUARTER'}
    ],
    BIEX: [{label: 'BTC_USDT', value: 'BTC_USDT'}],
    HUOBIFUTURE: [
      {label: 'BTC_THIS_WEEK', value: 'BTC_THIS_WEEK'},
      {label: 'BTC_NEXT_WEEK', value: 'BTC_NEXT_WEEK'},
      {label: 'BTC_QUARTER', value: 'BTC_QUARTER'},
      {label: 'ETH_THIS_WEEK', value: 'ETH_THIS_WEEK'},
      {label: 'ETH_NEXT_WEEK', value: 'ETH_NEXT_WEEK'},
      {label: 'ETH_QUARTER', value: 'ETH_QUARTER'},
      {label: 'EOS_THIS_WEEK', value: 'EOS_THIS_WEEK'},
      {label: 'EOS_NEXT_WEEK', value: 'EOS_NEXT_WEEK'},
      {label: 'EOS_QUARTER', value: 'EOS_QUARTER'},
      {label: 'LTC_THIS_WEEK', value: 'LTC_THIS_WEEK'},
      {label: 'LTC_NEXT_WEEK', value: 'LTC_NEXT_WEEK'},
      {label: 'LTC_QUARTER', value: 'LTC_QUARTER'}
    ]
  }
}

const strategyFormData5 = [

  {
    title: '帐户',
    col: 24,
    form: [
      {
        type: 'select',
        unrewriteable: true,
        text: '交易所',
        name: 'QHJYS',
        options: [
          {label: 'OKEXFUTURE', value: 'OKEXFUTURE'}
          //{label: 'HUOBIFUTURE', value: 'HUOBIFUTURE'}
          //{label: 'BIEX', value: 'BIEX'}
        ],
        required: true
      },
      {
        type: 'select',
        // unrewriteable: true,
        text: '帐户名',
        name: 'QHJYS_userName',
        options: [],
        forceRender: false,
        required: true,
        reporter: 'capital'
      },
      {
        type: 'select',
        unrewriteable: true,
        text: '品种',
        name: 'QHJYS_category',
        options: [],
        forceRender: false,
        required: true,
        reporter: 'capital'
      },
      {
        col: 12,
        type: 'number',
        text: '交易费率',
        description: '每个订单的费率',
        name: 'fee',
        value: -0.0003,
        defaultValue: -0.0003
      },
      {
        type: 'switch',
        text: '市价开仓',
        name: 'openMkt',
        forceRender: false,
        value: false,
        checked: '是',
        unchecked: '否'
      },
      {
        type: 'switch',
        text: '市价平仓',
        name: 'closeMkt',
        forceRender: false,
        value: false,
        checked: '是',
        unchecked: '否'
      },
      {
        col: 12,
        type: 'text',
        text: '初始帐户资产',
        name: 'capital',
        value: '0',
        hasFeedback: true,
        addonAfter: <span>BTC</span>
      }
    ]
  },
  {
    title: '策略',
    col: 24,
    // cats: ['基础配置', '高级配置'],
    form: [
      {
        col: 12,
        type: 'text',
        // unrewriteable: true,
        text: '策略名',
        name: 'magicma',
        required: true
      },
      {
        col: 12,
        type: 'number',
        text: '单边最大持仓量(张数)',
        name: 'openVolLimit',
        value: 10,
        required: true,
        pattern: '^[1-9]\\d*$',
        patternMsg: '请填写大于零的整数'
      },
      {
        col: 12,
        type: 'number',
        text: '每个开仓机会的最大开仓量(张数)',
        name: 'openVolInOneSignalMax',
        value: 1,
        required: true,
        pattern: '^[1-9]\\d*$',
        patternMsg: '请填写大于零的整数'
      },
      {
        col: 12,
        type: 'number',
        text: '每个开仓机会的最小开仓量(张数)',
        name: 'openVolInOneSignalMin',
        value: 1,
        required: true,
        pattern: '^[1-9]\\d*$',
        patternMsg: '请填写大于零的整数'
      },
      {
        col: 12,
        type: 'number',
        text: '最大吃单比例',
        name: 'orderVolOfAskbidVolRatio',
        value: 0.5,
        description: '每次开仓，实际订单量占总买卖队列中的委托量百分比',
        required: true
      },

      {
        col: 12,
        type: 'number',
        text: '止损比例',
        name: 'stopLostRatio',
        value: 0.01,
        required: true
      },
      {
        type: 'switch',
        text: '多头开仓',
        name: 'openBuy',
        description: '在价差为负溢价行情下开仓(即期货买入现货卖出)',
        forceRender: false,
        value: true,
        checked: '是',
        unchecked: '否'
      },
      {
        type: 'switch',
        text: '空头开仓',
        name: 'openSell',
        description: '在价差为正溢价行情下开仓(即期货卖出现货买入)',
        forceRender: false,
        value: true,
        checked: '是',
        unchecked: '否'
      },
      {
        col: 12,
        type: 'number',
        text: '最大停机回撤',
        name: 'stopOpenRetracement',
        value: 0.3,
        required: true,
        pattern: '^[+]{0,1}(\\d+)$|^[+]{0,1}(\\d+\\.\\d+)$',
        patternMsg: '请填写大于零的整数'
      },
      {
        col: 12,
        type: 'text',
        text: '钉钉消息地址',
        name: 'dingTalkUrl',
        value: '',
        required: false
      }
    ]
  }
]

const strategyListColumns5 = [
  {
    title: '编号',
    dataIndex: 'myIndex',
    key: 'myIndex'
  },
  {
    title: '策略名',
    dataIndex: 'magicma',
    key: 'magicma',
    render: (magicma, record) => {
      return <a onClick={() => {window.open(window.location.href.replace(window.location.hash, '') + '#/strategyDetail/' + record.id + '?type=5', '_blank')}}>{magicma}</a>
    }
  },
  {
    title: '状态',
    dataIndex: 'param',
    key: 'status',
    render: (param, record) => {
      if (record.status === 0) {
        return <span style={{color: 'red'}}>已停止</span>;
      }
      return <span style={{color: 'green'}}>运行中</span>;
    }
  }
]

const strategyFormData6 = [

  {
    title: '帐户',
    col: 24,
    form: [
      {
        type: 'select',
        unrewriteable: true,
        text: '交易所',
        name: 'QHJYS',
        options: [
          {label: 'OKEXFUTURE', value: 'OKEXFUTURE'},
          {label: 'HUOBIFUTURE', value: 'HUOBIFUTURE'}
          //{label: 'BIEX', value: 'BIEX'}
        ],
        required: true
      },
      {
        type: 'select',
        // unrewriteable: true,
        text: '帐户名',
        name: 'QHJYS_userName',
        options: [],
        forceRender: false,
        required: true,
        reporter: 'capital'
      },
      {
        type: 'select',
        unrewriteable: true,
        text: '品种',
        name: 'QHJYS_category',
        options: [],
        forceRender: false,
        required: true,
        reporter: 'capital'
      },
      {
        col: 12,
        type: 'number',
        text: '交易费率',
        description: '每个订单的费率',
        name: 'fee',
        value: -0.0003,
        defaultValue: -0.0003
      },
      {
        type: 'switch',
        text: '市价开仓',
        name: 'openMkt',
        forceRender: false,
        value: false,
        checked: '是',
        unchecked: '否'
      },
      {
        type: 'switch',
        text: '市价平仓',
        name: 'closeMkt',
        forceRender: false,
        value: false,
        checked: '是',
        unchecked: '否'
      },
      {
        col: 12,
        type: 'text',
        text: '初始帐户资产',
        name: 'capital',
        value: '0',
        hasFeedback: true,
        addonAfter: <span>BTC</span>
      }
    ]
  },
  {
    title: '策略',
    col: 24,
    // cats: ['基础配置', '高级配置'],
    form: [
      {
        col: 12,
        type: 'text',
        // unrewriteable: true,
        text: '策略名',
        name: 'magicma',
        required: true
      },
      {
        col: 12,
        type: 'number',
        text: '最大持仓量(张数)',
        name: 'openVolLimit',
        value: 10,
        required: true,
        pattern: '^[1-9]\\d*$',
        patternMsg: '请填写大于零的整数'
      },

      {
        col: 12,
        type: 'number',
        text: '止损比例',
        name: 'stopLostRatio',
        value: 0.01,
        required: true
      },
      {
        col: 12,
        type: 'number',
        text: '最大停机回撤',
        name: 'stopOpenRetracement',
        value: 0.3,
        required: true,
        pattern: '^[+]{0,1}(\\d+)$|^[+]{0,1}(\\d+\\.\\d+)$',
        patternMsg: '请填写大于零的整数'
      },
      {
        col: 12,
        type: 'number',
        text: 'K线周期（分钟）',
        name: 'candleDataQuoteMillisecond',
        value: 5,
        required: true,
        pattern: '^[+]{0,1}(\\d+)$|^[+]{0,1}(\\d+\\.\\d+)$',
        patternMsg: '请填写大于零的整数'
      },
      {
        col: 12,
        type: 'number',
        text: 'k线数量',
        name: 'candleDataNum',
        value: 13,
        required: true,
        pattern: '^[+]{0,1}(\\d+)$|^[+]{0,1}(\\d+\\.\\d+)$',
        patternMsg: '请填写大于零的整数'
      },
      {
        type: 'switch',
        text: '多头开仓',
        name: 'openBuy',
        description: '在价差为负溢价行情下开仓(即期货买入现货卖出)',
        forceRender: false,
        value: true,
        checked: '是',
        unchecked: '否'
      },
      {
        type: 'switch',
        text: '空头开仓',
        name: 'openSell',
        description: '在价差为正溢价行情下开仓(即期货卖出现货买入)',
        forceRender: false,
        value: true,
        checked: '是',
        unchecked: '否'
      },
      {
        type: 'radio',
        text: '交易模式',
        name: 'orderType',
        description: null,
        value: 1,
        options: [
          {label: '挂单模式', value: 1},
          {label: '吃单模式', value: 2}
        ]
      },
      {
        col: 12,
        type: 'text',
        text: '钉钉消息地址',
        name: 'dingTalkUrl',
        value: '',
        required: false
      },
      {
        type: 'array',
        title: '网格设置',
        form: [
          {
            col: 12,
            type: 'number',
            text: '价格波动比例',
            name: 'orderLmtPriceRatio',
            required: true
          },
          {
            col: 12,
            type: 'number',
            text: '订单量',
            name: 'orderVol',
            required: true
          }
        ],
        value: [
          {orderLmtPriceRatio: 0.006, orderVol: 10},
          {orderLmtPriceRatio: 0.008, orderVol: 50}
        ],
        name: 'movingGridList'
      },
      {
        type: 'array',
        title: '追踪止盈',
        form: [
          {
            col: 12,
            type: 'number',
            text: '盈利',
            name: 'profitMax',
            required: true
          },
          {
            col: 12,
            type: 'number',
            text: '盈利回撤比例',
            name: 'retracement',
            required: true
          }
        ],
        value: [
          {profitMax: 0.007, retracement: 0.25},
          {profitMax: 0.015, retracement: 0.28}
        ],
        name: 'movingProfitList'
      }
    ]
  }
]

const strategyListColumns6 = [
  {
    title: '编号',
    dataIndex: 'myIndex',
    key: 'myIndex'
  },
  {
    title: '策略名',
    dataIndex: 'magicma',
    key: 'magicma',
    render: (magicma, record) => {
      return <a onClick={() => {window.open(window.location.href.replace(window.location.hash, '') + '#/strategyDetail/' + record.id + '?type=6', '_blank')}}>{magicma}</a>
    }
  },
  {
    title: '状态',
    dataIndex: 'param',
    key: 'status',
    render: (param, record) => {
      if (record.status === 0) {
        return <span style={{color: 'red'}}>已停止</span>;
      }
      return <span style={{color: 'green'}}>运行中</span>;
    }
  }
]

export {
  strategyListColumns,
  strategyFormData,
  JYSCAT,
  strategyFormData5,
  strategyListColumns5,
  strategyFormData6,
  strategyListColumns6
}
