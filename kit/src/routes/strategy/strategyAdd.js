import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {changeTitle, queryURL} from 'utils';
import {Row, Col, Button, Modal, Form, Card, Select, Tabs, Spin, message, Tag} from 'antd';
import {MyInput, MyTable, MyBreadcrumb, DynamicArrayInput} from 'components';
import styles from './strategy.less';

// 引入 echarts 主模块。
import * as echarts from 'echarts/lib/echarts';
// 引入折线图。
import 'echarts/lib/chart/line';
// 引入提示框组件、标题组件、工具箱组件。
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/graphic';

const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
const Option = Select.Option;
const namespace = 'strategy';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const CheckableTag = Tag.CheckableTag;
class StrategyAdd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showForm: false,
      type: queryURL('type', this.props.location.search) || '1',
      chartTime: '1',
      chartData: []
    }
    this.dispatch = this.props.dispatch;
  }
  componentDidMount() {
    const {strategy} = this.props;
    const {isEdit} = strategy;
    this.setState({
      showForm: !isEdit
    })
    // 初始化资产图表
    if (this.props.match.params.id) {
      if (this.state.type === '5' || this.state.type === '6') {
        this.myChart = echarts.init(document.getElementById('strategyDailyBalanceContainer'));
        setTimeout(() => {
          this.getStrategyDailyBalance(this.state.chartTime);
        }, 300)
      }
    }
  }
  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch({
      type: `${namespace}/resetState`
    })
  }
  draw() {
    // 基于准备好的dom，初始化 echarts 实例并绘制图表。
    let chartData = this.state.chartData;
    let ydata = [];
    let xdata = [];
    let ydata2 = [];
    for (let i = 0; i < chartData.length; i++) {
      if (chartData[i].holding) {

        xdata.push(new Date(Number(chartData[i].tradingDate)).format('yyyy-MM-dd'));
        ydata.push(chartData[i].holding);
        ydata2.push(chartData[i].holding);
      }
    }
    const ydataPercent = [];
    for (let i = 0; i < ydata.length; i++) {
      ydataPercent.push(ydata[i] / ydata[0] - 1);
    }
    let option = {
      title: {
        text: '净值曲线',
        subtext: '',
        x: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#1DAEEC',
            type: 'solid'
          }
        },
        formatter: function(params, ticket, callback) {
          let value = params[0].data;
          let oneDayProfit = params[0].dataIndex === 0 ? '0%' : ((value / ydata[params[0].dataIndex - 1] - 1) * 100).toFixed(3) + '%'
          var res = `账户权益：${value} <br/>
                    当日盈利：${oneDayProfit}<br/>
                    累计盈利：${((value / ydata[0] - 1) * 100).toFixed(3)}% <br/>
                    日&emsp;&emsp;期：${params[0].name}`;

          return res;
        }
      },

      xAxis: {
        type: 'category',
        data: xdata,
        axisLabel: {
          // formatter: function(data) {
          //   return new Date(Number(data)).format('yyyy-MM-dd');
          // }
        }
      },
      yAxis: [
        {
          type: 'value',
          splitNumber: 4,
          name: '净值',
          axisLabel: {
            formatter: function(data) {
              return data.toFixed(3);
            }
          },
          min: function(d) {
            let min = null;
            const minBase = d.min - ydata[0];
            const maxBase = d.max - ydata[0];
            if (d.min === d.max) {
              min = d.min * 1.5;
            }
            if (Math.abs(minBase) > Math.abs(maxBase)) {
              min = Number(ydata[0] - Math.abs(minBase));
            }
            if (Math.abs(minBase) < Math.abs(maxBase)) {
              min = Number(ydata[0] - Math.abs(maxBase));
            }
            return min;
          },
          max: function(d) {
            const minBase = d.min - ydata[0];
            const maxBase = d.max - ydata[0];
            if (d.min === d.max) {
              return d.min * 0.5;
            }
            if (Math.abs(minBase) > Math.abs(maxBase)) {
              return ydata[0] + Math.abs(minBase);
            }
            if (Math.abs(minBase) < Math.abs(maxBase)) {
              return ydata[0] + Math.abs(maxBase);
            }
          }
          //interval:3002,
        },
        {
          type: 'value',
          splitNumber: 4,
          name: '盈利比率',
          splitLine: {
            show: false
          },
          axisLine: {
            onZero: false
          },
          axisLabel: {
            formatter: function(d) {
              return (d * 100).toFixed(3) + '%';
            }
          },
          min: function(d) {
            let min = null;
            const minBase = d.min - ydata[0];
            const maxBase = d.max - ydata[0];
            if (d.min === d.max) {
              min = -0.5;
            }
            if (Math.abs(minBase) > Math.abs(maxBase)) {
              min = -Math.abs(minBase) / ydata[0];
            }
            if (Math.abs(minBase) < Math.abs(maxBase)) {
              min = -Math.abs(maxBase) / ydata[0];
            }
            return min;
          },
          max: function(d) {
            const minBase = d.min - ydata[0];
            const maxBase = d.max - ydata[0];
            if (d.min === d.max) {
              return 0.5;
            }
            if (Math.abs(minBase) > Math.abs(maxBase)) {
              return Math.abs(minBase) / ydata[0];
            }
            if (Math.abs(minBase) < Math.abs(maxBase)) {
              return Math.abs(maxBase) / ydata[0];
            }
          }
        }
      ],
      series: [
        {
          data: ydata,
          type: 'line',
          yAxisIndex: 0
        },
        {
          data: ydata,
          type: 'line',
          yAxisIndex: 1,
          showSymbol: false,
          itemStyle: {
            normal: {
              opacity: 0
            }
          },
          lineStyle: {
            normal: {
              opacity: 0
            }
          }
        }
      ]
    };

    if (xdata.length === 0 || ydata.length === 0) {
      option = {
        title: {
          text: '总资产净值曲线',
          subtext: '',
          x: 'center'
        },
        graphic: [
          {
            type: 'group',
            left: 'center',
            top: 'center',
            children: [
              {
                type: 'text',
                z: 100,
                left: 'middle',
                top: 'middle',
                style: {
                  fill: '#333',
                  text: '暂无数据',
                  font: '16px Microsoft YaHei'
                }
              }
            ]
          }
        ],
        xAxis: {
          show: true
        },
        yAxis: {
          show: true,
          name: '净值(USDT)'
        },
        series: []
      }
    }
    this.myChart.setOption(option, true);
  }
  changeShowForm() {
    this.setState({
      showForm: !this.state.showForm
    })
  }
  refreshStrategyDetail() {
    const {dispatch} = this.props;
    dispatch({
      type: `${namespace}/strategyDetail`,
      payload: {
      }
    })
  }
  handleTagsChange(tag, checked, id) {
    const {dispatch} = this.props;
    dispatch({
      type: `${namespace}/updateTagsSelect`,
      payload: {
        tag,
        checked,
        id
      }
    })
    setTimeout(() => {
      dispatch({
        type: `${namespace}/query`,
        payload: {
          pageNum: 1,
          pageSize: 10,
          tableId: `table${id}`
        }
      })
    }, 300);
  }
  setTitle(isEdit, title) {
    if (isEdit) {
      changeTitle(`${title} - 云端策略`);
    } else {
      changeTitle('新增策略 - 云端策略');
    }
  }
  goKLinePage() {
    const {strategy} = this.props;
    let currentHost = window.location.host;
    const {spreadSymbol} = strategy;
    if (phixSit === 'dev') {
      currentHost = 'kit.blockex.ai';
    }
    if (spreadSymbol) {
      window.open('//' + currentHost + '/home/data/fk?symbol=' + spreadSymbol + '#tv_chart_container', '_blank');
    } else {
      Modal.error({
        title: '消息',
        content: '期现价差k线链接初始化失败，请刷新页面重试'
      });
    }
  }
  getStrategyDailyBalance(e) { // 获取资产数据 
    const {match} = this.props;
    let psize = 30;
    if (e === '1') {psize = 30}
    if (e === '2') {psize = 90}
    if (e === '3') {psize = 180}
    if (e === '4') {psize = -1}
    this.dispatch({
      type: `${namespace}/strategyDailyBalance`,
      payload: {
        pageSize: psize,
        pageNum: 1,
        strategyId: Number(match.params.id)
      }
    }).then((data) => {
      if (data.success && data.code === 0) {
        this.setState({chartData: data.payload.data.data.reverse()}, () => {
          // console.log('回调')
          this.draw();
        });
      }
    })
  }
  render() {
    const {strategy, dispatch, form, match, loading} = this.props;
    const {strategyFormData, isEdit, tablesData, selectedRowKeys, currentStrategyStatus, tagsData1, tagsData2, strategyDetail, currentStrategyName, isStopClose, isStopOpen, isCloseAll, openVolMax} = strategy;
    this.setTitle(isEdit, currentStrategyName);
    const handleSubmit = () => {
      form.validateFields((err, values) => {
        if (!err) {
          if (this.state.type === '1') {
            if (values.openSpreadRatio > values.openSpreadRatioMax) {
              Modal.error({
                title: '消息',
                content: '最小开仓价差比率不能大于最大开仓价差比率'
              });
              return;
            }
            if (isEdit) {
              if (values.isSetCloseSpreadThreshhold && values.closeSpreadThreshhold === undefined) {
                Modal.error({
                  title: '消息',
                  content: '价差平仓线已生效，价差平仓线不能为空'
                });
                return;
              }
              // 编辑
              dispatch({
                type: `${namespace}/strategyAdd`, //strategyAdd , editStrategy
                payload: {
                  strategyId: match.params.id,
                  ...values
                }
              }).then((data) => {
                if (data.success) {
                  message.success('策略修改成功')
                }
              })
              return;
            }
            // 新增
            dispatch({
              type: `${namespace}/strategyAdd`,
              payload: values
            })
          } else if (this.state.type === '5') {
            if (isEdit) {
              // 编辑
              dispatch({
                type: `${namespace}/strategyAdd5`, //strategyAdd , editStrategy
                payload: {
                  strategyId: match.params.id,
                  ...values
                }
              }).then((data) => {
                if (data.success) {
                  message.success('策略修改成功')
                }
              })
              return;
            }
            // 新增
            dispatch({
              type: `${namespace}/strategyAdd5`,
              payload: values
            })
          } else if (this.state.type === '6') {
            let allOrderVol = 0;
            for (let i = 0; i < values.orderVol.length; i++) {
              allOrderVol += values.orderVol[i];
            }
            if (allOrderVol > openVolMax) {
              Modal.error({
                title: '消息',
                content: '网格订单量总和不能大于最大开仓量' + openVolMax
              });
              return;
            }
            if (isEdit) {
              // 编辑
              dispatch({
                type: `${namespace}/strategyAdd6`, //strategyAdd , editStrategy
                payload: {
                  strategyId: match.params.id,
                  ...values
                }
              }).then((data) => {
                if (data.success) {
                  message.success('策略修改成功')
                }
              })
              return;
            }
            // 新增
            dispatch({
              type: `${namespace}/strategyAdd6`,
              payload: values
            })
          }
        }
      });
    }
    const goBack = () => {
      // this.props.history.goBack();
      dispatch(routerRedux.push('/strategyList'));
    }
    const {data: data0, pagination: pagination0} = tablesData.table0 || tablesData.default;
    const {data: data1, pagination: pagination1} = tablesData.table1 || tablesData.default;
    const {data: data2, pagination: pagination2} = tablesData.table2 || tablesData.default;

    // 请求下方table数据
    const handleTabChange = (key, myTableId) => {
      let tableId = myTableId || null;
      switch (key) {
        case '0':
          tableId = data0.length === 0 ? 'table0' : null;
          break;
        case '1':
          tableId = data1.length === 0 ? 'table1' : null;
          break;
        case '2':
          tableId = data2.length === 0 ? 'table2' : null;
          break;
        case '3':
          //画图
          this.getStrategyDailyBalance(this.state.chartTime);
          break;
        default:
          break;
      }
      if (tableId !== null) {
        dispatch({
          type: `${namespace}/query`,
          payload: {
            pageNum: 1,
            pageSize: 10,
            tableId: tableId
          }
        })
        // if (tableId === 'table1') {
        //   if (this.state.type === '1') {
        //     dispatch({
        //       type: `${namespace}/getStrategy`,
        //       payload: {
        //       }
        //     })
        //   } else if (this.state.type === '5') {
        //     dispatch({
        //       type: `${namespace}/getStrategy5`,
        //       payload: {
        //       }
        //     })
        //   }
        // }
      }
    }

    const formatPrice = (val, g, r, e) => {
      if (/^-[^-].*/.test(val)) {
        return <span style={{color: r}}>{val}</span>
      } else if ('--' === val) {
        return <span style={{color: e || '#999'}}>{val}</span>
      }
      return <span style={{color: g}}>{val}</span>

    }
    const handleOperate = (record, type) => {
      if (type === 'close') {
        confirm({
          title: '消息提示',
          content: '确定要执行该操作？',
          onOk() {
            dispatch({
              type: `${namespace}/handleOpenInfo`,
              payload: {
                record,
                type
              }
            }).then((res) => {
              if (res.success) {
                if (res.code === 0) {
                  if (record.id === -1 || record.id === -2) {
                    dispatch({
                      type: `${namespace}/updateState`,
                      payload: {
                        isCloseAll: record.id === -1 ? 1 : null
                      }
                    })
                  }
                  dispatch({
                    type: `${namespace}/query`,
                    payload: {
                      pageNum: pagination1.current,
                      pageSize: pagination1.pageSize,
                      tableId: 'table1'
                    }
                  })
                }
                else {
                  Modal.error({
                    title: '消息',
                    content: res.msg
                  });
                }
              }
            })
          },
          onCancel() {

          }
        });

      }
    }
    // 配置table的操作列
    const columns0 = [
      {
        title: '交易日',
        dataIndex: 'tradingDate',
        key: 'tradingDate',
        render: (tradingDate) => {
          return new Date(tradingDate).format('yyyy-MM-dd') || '--';
        }
      },
      {
        title: '本币盈利',
        dataIndex: 'closeProfitCoin',
        key: 'closeProfitCoin'
      },
      {
        title: '美元盈利',
        dataIndex: 'closeProfitMoney',
        key: 'closeProfitMoney'
      }
    ];
    let columns1 = [
      {
        title: '记录id',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: '订单状态',
        dataIndex: 'status',
        key: 'status',
        render: (status) => {
          let statusMsg = '';
          switch (status) {
            case 1:
              statusMsg = '开仓已发出';
              break;
            case 2:
              statusMsg = '开仓部分成交';
              break;
            case 3:
              statusMsg = '开仓部成部撤';
              break;
            case 4:
              statusMsg = '开仓全撤';
              break;
            case 5:
              statusMsg = '开仓全成';
              break;
            case 6:
              statusMsg = '开仓失败';
              break;
            case 7:
              statusMsg = '平仓已发出';
              break;
            case 8:
              statusMsg = '平仓部成';
              break;
            case 9:
              statusMsg = '平仓部成部撤';
              break;
            case 10:
              statusMsg = '平仓已撤';
              break;
            case 11:
              statusMsg = '平仓已成';
              break;
            case 12:
              statusMsg = '平仓失败';
              break;
            case 13:
              statusMsg = '手工平仓';
              break;
            default:
              break;
          }
          return statusMsg === '' ? '已发出' : statusMsg;
        }
      },
      {
        title: '实际价差比率',
        dataIndex: 'spreadRatio',
        key: 'spreadRatio'
      },
      {
        title: '价差比率级别',
        dataIndex: 'spreadRatioLevel',
        key: 'spreadRatioLevel'
      },
      {
        title: '可平量',
        dataIndex: 'futureNum',
        key: 'futureNum'
      },
      {
        title: '开仓量',
        dataIndex: 'futureNumSrc',
        key: 'futureNumSrc'
      },

      {
        title: '订单号A',
        dataIndex: 'orderIdA',
        key: 'orderIdA',
        render: (orderIdA) => {
          if (orderIdA) {
            return '***' + String(orderIdA).substr(-5);
          }
          return '--';
        }
      },
      {
        title: '订单号B',
        dataIndex: 'orderIdB',
        key: 'orderIdB',
        render: (orderIdB) => {
          if (orderIdB) {
            return '***' + String(orderIdB).substr(-5);
          }
          return '--';
        }
      },
      {
        title: '买卖方向',
        dataIndex: 'orderAction',
        key: 'orderAction',
        render: (orderAction) => {
          if (orderAction === 1) {
            return <span style={{color: 'red'}}>买</span>
          }
          return <span style={{color: 'green'}}>卖</span>

        }
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (createTime) => {
          return new Date(createTime).format('yyyy-MM-dd hh:mm:ss') || '--';
        }
      },
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (operate, record) => {
          const arr = [1, 2, 5, 7, 8];
          if (arr.indexOf(record.status) > -1) {
            return <ButtonGroup>
              <Button onClick={() => {
                handleOperate(record, 'close');
              }}>平仓</Button>
            </ButtonGroup>
          }
          return null;

        }
      }

    ];
    if (this.state.type === '5') {
      columns1 = [
        {
          title: '记录id',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: '订单状态',
          dataIndex: 'status',
          key: 'status',
          render: (status) => {
            let statusMsg = '';
            switch (status) {
              case 1:
                statusMsg = '开仓已发出';
                break;
              case 2:
                statusMsg = '开仓部分成交';
                break;
              case 3:
                statusMsg = '开仓部成部撤';
                break;
              case 4:
                statusMsg = '开仓全撤';
                break;
              case 5:
                statusMsg = '开仓全成';
                break;
              case 6:
                statusMsg = '开仓失败';
                break;
              case 7:
                statusMsg = '平仓已发出';
                break;
              case 8:
                statusMsg = '平仓部成';
                break;
              case 9:
                statusMsg = '平仓部成部撤';
                break;
              case 10:
                statusMsg = '平仓已撤';
                break;
              case 11:
                statusMsg = '平仓已成';
                break;
              case 12:
                statusMsg = '平仓失败';
                break;
              case 13:
                statusMsg = '手工平仓';
                break;
              default:
                break;
            }
            return statusMsg === '' ? '已发出' : statusMsg;
          }
        },
        {
          title: '盈利',
          dataIndex: 'profit',
          key: 'profit'
        },
        {
          title: '可平量',
          dataIndex: 'futureNum',
          key: 'futureNum'
        },
        {
          title: '开仓量',
          dataIndex: 'futureNumSrc',
          key: 'futureNumSrc'
        },

        {
          title: '订单号',
          dataIndex: 'orderIdA',
          key: 'orderIdA',
          render: (orderIdA) => {
            if (orderIdA) {
              return '***' + String(orderIdA).substr(-5);
            }
            return '--';
          }
        },
        {
          title: '买卖方向',
          dataIndex: 'orderAction',
          key: 'orderAction',
          render: (orderAction) => {
            if (orderAction === 1) {
              return <span style={{color: 'red'}}>买</span>
            }
            return <span style={{color: 'green'}}>卖</span>

          }
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
          render: (createTime) => {
            return new Date(createTime).format('yyyy-MM-dd hh:mm:ss') || '--';
          }
        },
        {
          title: '操作',
          dataIndex: 'operate',
          key: 'operate',
          render: (operate, record) => {
            const arr = [1, 2, 5, 7, 8];
            if (arr.indexOf(record.status) > -1) {
              return <ButtonGroup>
                <Button onClick={() => {
                  handleOperate(record, 'close');
                }}>平仓</Button>
              </ButtonGroup>
            }
            return null;

          }
        }

      ];
    }

    if (this.state.type === '6') {
      columns1 = [
        {
          title: '记录id',
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: '订单状态',
          dataIndex: 'status',
          key: 'status',
          render: (status) => {
            let statusMsg = '';
            switch (status) {
              case 1:
                statusMsg = '开仓已发出';
                break;
              case 2:
                statusMsg = '开仓部分成交';
                break;
              case 3:
                statusMsg = '开仓部成部撤';
                break;
              case 4:
                statusMsg = '开仓全撤';
                break;
              case 5:
                statusMsg = '开仓全成';
                break;
              case 6:
                statusMsg = '开仓失败';
                break;
              case 7:
                statusMsg = '平仓已发出';
                break;
              case 8:
                statusMsg = '平仓部成';
                break;
              case 9:
                statusMsg = '平仓部成部撤';
                break;
              case 10:
                statusMsg = '平仓已撤';
                break;
              case 11:
                statusMsg = '平仓已成';
                break;
              case 12:
                statusMsg = '平仓失败';
                break;
              case 13:
                statusMsg = '手工平仓';
                break;
              default:
                break;
            }
            return statusMsg === '' ? '已发出' : statusMsg;
          }
        },
        {
          title: '收益',
          dataIndex: 'profit',
          key: 'profit'
        },
        {
          title: '收益率',
          dataIndex: 'profitRatio',
          key: 'profitRatio'
        },
        {
          title: '价格比例',
          dataIndex: 'spreadRatioLevel',
          key: 'spreadRatioLevel'
        },
        {
          title: '可平量',
          dataIndex: 'futureNum',
          key: 'futureNum'
        },
        {
          title: '开仓量',
          dataIndex: 'futureNumSrc',
          key: 'futureNumSrc'
        },

        {
          title: '订单号',
          dataIndex: 'orderIdA',
          key: 'orderIdA',
          render: (orderIdA) => {
            if (orderIdA) {
              return '***' + String(orderIdA).substr(-5);
            }
            return '--';
          }
        },
        {
          title: '买卖方向',
          dataIndex: 'orderAction',
          key: 'orderAction',
          render: (orderAction) => {
            if (orderAction === 1) {
              return <span style={{color: 'red'}}>买</span>
            }
            return <span style={{color: 'green'}}>卖</span>

          }
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
          render: (createTime) => {
            return new Date(createTime).format('yyyy-MM-dd hh:mm:ss') || '--';
          }
        },
        {
          title: '操作',
          dataIndex: 'operate',
          key: 'operate',
          render: (operate, record) => {
            const arr = [1, 2, 5, 7, 8];
            if (arr.indexOf(record.status) > -1) {
              return <ButtonGroup>
                <Button onClick={() => {
                  handleOperate(record, 'close');
                }}>平仓</Button>
              </ButtonGroup>
            }
            return null;

          }
        }

      ];
    }

    const columns2 = [
      {
        title: '订单id',
        dataIndex: 'orderId',
        key: 'orderId',
        render: (orderId) => {
          if (orderId) {
            return '***' + String(orderId).substr(-5);
          }
          return '--';
        }
      },
      {
        title: '相关订单id',
        dataIndex: 'refOrderId',
        key: 'refOrderId',
        render: (refOrderId) => {
          if (refOrderId) {
            return '***' + String(refOrderId).substr(-5);
          }
          return '--';
        }
      },
      {
        title: '代码',
        dataIndex: 'symbol',
        key: 'symbol'
      },
      {
        title: '交易所',
        dataIndex: 'exchange',
        key: 'exchange'
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (status) => {
          let statusMsg = '';
          switch (status) {
            case 1:
              statusMsg = '';
              break;
            case 2:
              statusMsg = '';
              break;
            case 3:
              statusMsg = '';
              break;
            case 4:
              statusMsg = '已发出';
              break;
            case 5:
              statusMsg = '部分成交';
              break;
            case 6:
              statusMsg = '已成交';
              break;
            case 7:
              statusMsg = '部分成交部分撤单';
              break;
            case 8:
              statusMsg = '';
              break;
            case 9:
              statusMsg = '已撤销';
              break;
            case 10:
              statusMsg = '失败';
              break;
            default:
              break;
          }
          return statusMsg === '' ? '已发出' : statusMsg;
        }
      },
      {
        title: '限定价格',
        dataIndex: 'lmtPrice',
        key: 'lmtPrice'
      },
      {
        title: '买卖',
        dataIndex: 'orderAction',
        key: 'orderAction',
        render: (orderAction) => {
          if (orderAction === 1) {
            return '买';
          }
          return '卖';
        }
      },
      {
        title: '订单类型',
        dataIndex: 'orderType',
        key: 'orderType',
        render: (orderType) => {
          if (orderType === 1) {
            return '限价';
          }
          return '市价';
        }
      },
      {
        title: '开平仓',
        dataIndex: 'openClose',
        key: 'openClose',
        render: (openClose) => {
          if (openClose === 1) {
            return '开';
          }
          return '平'
        }
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (createTime) => {
          return new Date(createTime).format('yyyy-MM-dd hh:mm:ss') || '--';
        }
      },
      {
        title: '订单量',
        dataIndex: 'totalquantity',
        key: 'totalquantity'
      },
      {
        title: '已成交量',
        dataIndex: 'filled',
        key: 'filled'
      },
      {
        title: '平均成交价',
        dataIndex: 'avgPrice',
        key: 'avgPrice'
      },
      {
        title: '手续费',
        dataIndex: 'fee',
        key: 'fee'
      }
    ]
    const commonProps = {
      loading,
      location,
      dispatch,
      namespace,
      // modalType,
      // isMotion,
      selectedRowKeys
      // visible: modalVisible
    };
    const tableProps0 = {
      ...commonProps,
      tableId: 'table0',
      dataSource: data0,
      pagination: pagination0,
      columnsConfig: columns0
    }
    const tableProps1 = {
      ...commonProps,
      tableId: 'table1',
      dataSource: data1,
      pagination: pagination1,
      columnsConfig: columns1
    };

    const tableProps2 = {
      ...commonProps,
      tableId: 'table2',
      dataSource: data2,
      pagination: pagination2,
      columnsConfig: columns2
    };
    const myrecord = {
      id: this.props.match.params.id
    }
    const startOrStopStategy = (record, type) => {
      confirm({
        title: '消息提示',
        content: '确定要执行该操作？',
        onOk() {
          dispatch({
            type: `${namespace}/handleOperate`,
            payload: {
              record,
              type
            }
          }).then((res) => {
            if (res.success) {
              dispatch({
                type: `${namespace}/updateState`,
                payload: {
                  currentStrategyStatus: res.status
                }
              })
            }
          });
        },
        onCancel() {

        }
      });

    }
    const showFormValue = this.state.showForm ? 'block' : 'none';
    const editParam = (values) => {
      confirm({
        title: '消息提示',
        content: '确定要执行该操作？',
        onOk() {
          dispatch({
            type: `${namespace}/editStrategy`,
            payload: {
              strategyId: match.params.id,
              ...values
            }
          }).then((data) => {
            if (data.success) {
              dispatch({
                type: `${namespace}/updateState`,
                payload: values
              })
            }
          })
        },
        onCancel() {

        }
      });

    }

    const resetData = (arr) => {
      if (!arr) {return;}
      if (arr.length === 0) {return;}
      arr = arr || [];
      let targetData = [];
      let tempData = [];
      let ii = 0;
      for (let i = 0, len = arr.length; i < len; i++) {
        if (arr[i].title !== '') {
          if (tempData.length > 0) {
            targetData[ii] = {title: '', contentList: tempData};
            ++ii;
            tempData = [];
          }
          targetData[ii] = arr[i];
          ++ii;
        } else {
          tempData = tempData.concat(arr[i].contentList);
        }
      }
      if (tempData.length > 0) {
        targetData[ii] = {title: '', contentList: tempData};
        ++ii;
        tempData = [];
      }
      return targetData;
    }

    return (
      <div id="mainContent" className={styles.mainContent}>
        <Spin spinning={!!loading.effects[`${namespace}/getStrategy`]}>

          <div className={styles.header}>
            <MyBreadcrumb></MyBreadcrumb>
            {isEdit &&
              <Row gutter={12} style={{paddingTop: '10px'}}>
                <Col sm={24} md={8}>
                  {
                    currentStrategyStatus === 0 ?
                      <div className={styles.statusStop} onClick={() => {startOrStopStategy(myrecord, 'start')}}>策略已停止, 点击开启策略</div>
                      :
                      <div className={styles.statusStart} onClick={() => {startOrStopStategy(myrecord, 'stop')}}>策略运行中, 点击停止策略</div>
                  }
                </Col>
                <Col sm={24} md={8}>
                  {
                    isStopOpen === true ?
                      <div className={styles.statusStop} onClick={() => {editParam({isStopOpen: false})}}>已停止开仓，点击开始开仓</div>
                      :
                      <div className={styles.statusStart} onClick={() => {editParam({isStopOpen: true})}}>正在开仓，点击停止开仓</div>
                  }
                </Col>
                <Col sm={24} md={8}>
                  {
                    isStopClose === true ?
                      <div className={styles.statusStop} onClick={() => {editParam({isStopClose: false})}}>已停止平仓，点击开始平仓</div>
                      :
                      <div className={styles.statusStart} onClick={() => {editParam({isStopClose: true})}}>正在平仓，点击停止平仓</div>
                  }
                </Col>
              </Row>
            }
          </div>
          {/* {!isEdit && <div className={styles.chartContain}><div className={styles.breadTitle}>新增策略</div></div>} */}
          {isEdit && <div className={styles.chartContain}>
            <div className={styles.breadTitle}>{!!currentStrategyName && <span>策略名：{currentStrategyName}</span>}</div>
            {(strategyDetail.closeProfit || strategyDetail.totalProfit || strategyDetail.accountInfo || strategyDetail.quoteInfo) && <div className={styles.priceWp}>
              {this.state.type === '1' && <Row key={0} gutter={24} style={{marginTop: '20px'}}>
                <Col span={12} key={0}><Button type="dashed" onClick={() => {this.refreshStrategyDetail()}} block>刷新收益数据</Button></Col>
                <Col span={12} key={1}><Button type="dashed" onClick={() => {this.goKLinePage()}} block>期现价差k线</Button></Col>
              </Row>}
              {this.state.type !== '1' && <Row key={0} gutter={24} style={{marginTop: '20px'}}>
                <Col span={24} key={0}><Button type="dashed" onClick={() => {this.refreshStrategyDetail()}} block>刷新收益数据</Button></Col>
              </Row>}
              <Row key={1} gutter={24}>
                <Spin spinning={!!loading.effects[`${namespace}/strategyDetail`]}>
                  <Col>
                    <Card style={{marginTop: '15px'}} bodyStyle={{padding: '15px'}}>
                      <Row gutter={12}>
                        {strategyDetail.closeProfit && <Col key={1} sm={24} md={12}>
                          <p className={styles.topOne}>未实现盈亏：<span>{formatPrice(strategyDetail.closeProfit || '--', 'green', 'red', '#666')}</span></p>
                        </Col>}
                        {strategyDetail.totalProfit && <Col key={2} sm={24} md={12}>
                          <p className={styles.topOne}>已实现盈亏：<span>{formatPrice(strategyDetail.totalProfit || '--', 'green', 'red', '#666')}</span></p>
                        </Col>}
                      </Row>
                      {
                        (resetData(strategyDetail.accountInfo) || []).map((x, y) => {
                          if (x.title !== '') {
                            const atitle = <Col key={x.title + y} sm={24} md={24}>
                              <p><b>{x.title}</b></p>
                            </Col>;
                            const acontent = (x.contentList || []).map((item, index) => {
                              return <Col key={index} sm={24} md={12}>
                                <p>{item}</p>
                              </Col>
                            })
                            return <Row key={y} gutter={24} style={{padding: '5px 0'}}>{[].concat(atitle, acontent)}</Row>;
                          }
                          const acontent = (x.contentList || []).map((item, index) => {
                            return <Col key={index} sm={24} md={12}>
                              <p>{item}</p>
                            </Col>
                          })
                          return <Row key={y} style={{padding: '5px 0'}} gutter={24}>{acontent}</Row>;

                        })
                      }

                      {
                        (resetData(strategyDetail.quoteInfo) || []).map((x, y) => {
                          if (x.title !== '') {
                            const atitle = <Col key={x.title + y} sm={24} md={24}>
                              <p><b>{x.title}</b></p>
                            </Col>;
                            const acontent = (x.contentList || []).map((item, index) => {
                              return <Col key={item + index} sm={24} md={12}>
                                <p>{item}</p>
                              </Col>
                            })
                            return <Row key={y} style={{padding: '5px 0'}} gutter={24}>{[].concat(atitle, acontent)}</Row>;
                          }
                          const acontent = (x.contentList || []).map((item, index) => {
                            return <Col key={item + index} sm={24} md={12}>
                              <p>{item}</p>
                            </Col>
                          })
                          return <Row key={y} style={{padding: '5px 0'}} gutter={12}>{acontent}</Row>;

                        })
                      }
                    </Card>
                  </Col>
                </Spin>
              </Row>
            </div>}
          </div>}
          <Form style={{marginBottom: '30px'}}>
            {isEdit && <Row gutter={12}>
              <Col span={24}>
                <Button type="dashed" block icon={this.state.showForm ? 'minus' : 'plus'} onClick={() => {this.changeShowForm()}}>参数配置</Button>
              </Col>
            </Row>}
            <div style={{display: showFormValue}}>
              <Row gutter={12}>
                {
                  (strategyFormData || []).map((item, index) => {
                    let inputDom = [];
                    if (item.cats) {
                      // 以tab分类显示
                      const TabDom = (item.cats || []).map((cat, catIndex) => {
                        let formDataInCat = item.form.filter((a, b) => {
                          if (catIndex === 0) {
                            return a.category === undefined;
                          }
                          return a.category === cat;
                        })
                        const tabPaneDom = (formDataInCat || []).map((x, y) => {
                          if (x.type === 'array') {
                            return <DynamicArrayInput key={x.name + '_' + x.value.length} data={x} form={form} dispatch={dispatch} namespace={namespace}></DynamicArrayInput>
                          }
                          if (isEdit && x.unrewriteable) {
                            x.readOnly = true
                          }
                          if (!x.forceRender) {
                            if (!isEdit && !x.hideInAdd || !!isEdit) {
                              return (
                                <Col sm={24} md={12} key={y}>
                                  <MyInput data={x} form={form} dispatch={dispatch} namespace={namespace} />
                                </Col>
                              );
                            }
                          }
                          return null;
                        })
                        return <TabPane forceRender tab={cat} key={catIndex}>{tabPaneDom}</TabPane>
                      })
                      inputDom = <Tabs defaultActiveKey="0">{TabDom}</Tabs>
                    } else {
                      inputDom = (item.form || []).map((x, y) => {
                        if (x.type === 'array') {
                          return <DynamicArrayInput key={x.name + '_' + x.value.length} data={x} form={form} dispatch={dispatch} namespace={namespace}></DynamicArrayInput>
                        }
                        if (isEdit && !!x.unrewriteable) {
                          x.readOnly = true
                        } else {
                          x.readOnly = false
                        }
                        if (!x.forceRender) {
                          if (!isEdit && !x.hideInAdd || !!isEdit) {
                            return (
                              <Col sm={24} md={12} key={y}>
                                <MyInput data={x} form={form} dispatch={dispatch} namespace={namespace} />
                              </Col>
                            );
                          }
                        }
                        return null;
                      })
                    }

                    if (item.title) {
                      return <Col key={index} sm={24} md={item.col || 12} style={{marginTop: '14px'}}>
                        <Card title={item.title}><Row>
                          {inputDom}
                        </Row>
                        </Card></Col>
                    }
                    return <Col key={index} sm={24} md={item.col || 12} style={{marginTop: '14px'}}>
                      {inputDom}
                    </Col>
                  })
                }
              </Row>
              <Row style={{padding: '30px 0px 0'}}>
                <Col span={24}>
                  <Button type="primary" size="large" block loading={!!loading.effects[`${namespace}/editStrategy`] || !!loading.effects[`${namespace}/strategyAdd`]} onClick={() => {handleSubmit()}}>{isEdit ? '更新参数' : '提交'}</Button>
                  {/* <Button style={{marginLeft: '20px'}} onClick={() => {goBack()}}>返回</Button> */}
                </Col>
              </Row>
            </div>
          </Form >
        </Spin>
        {isEdit && <Row key={55}>
          <Tabs onChange={handleTabChange}>
            {this.state.type !== '1' && <TabPane forceRender={true} tab="帐户资产" key="3">
              <Spin spinning={!!loading.effects[`${namespace}/strategyDailyBalance`]}>
                <div className={styles.tableFilter}>
                  <Row>
                    <Col>
                      <span>时间：</span>
                      <Select defaultValue={this.state.chartTime} style={{width: 120}} onChange={(e) => {this.getStrategyDailyBalance(e)}}>
                        <Option value="1">最近一个月</Option>
                        <Option value="2">最近三个月</Option>
                        <Option value="3">最近半年</Option>
                        <Option value="4">全部</Option>
                      </Select>
                    </Col>
                  </Row>
                </div>
                <div id="strategyDailyBalanceContainer" style={{width: '100%', height: '400px'}}></div>
              </Spin>
            </TabPane>}
            {this.state.type === '1' && <TabPane tab="平仓盈亏" key="0">
              <Button type="dashed" onClick={() => {handleTabChange(-1, 'table0');}} block>刷新平仓盈亏</Button>
              <MyTable key={0} {...tableProps0} />
            </TabPane>}
            <TabPane tab="开仓信息" key="1">
              <Row key={0} gutter={12}>
                <Col span={12}>
                  <Button type="dashed" onClick={() => {handleTabChange(-1, 'table1');}} block>刷新开仓信息</Button>
                </Col>
                <Col span={12}>
                  {isCloseAll !== 1 && <Button type="dashed" onClick={() => {handleOperate({id: -1}, 'close');}} block>平所有仓位</Button>}
                  {isCloseAll === 1 && <Button type="dashed" onClick={() => {handleOperate({id: -2}, 'close');}} block>正在平仓，点击停止平仓</Button>}
                </Col>
              </Row>
              <Row key={1}>
                <Col sm={24} md={24}>
                  <div className={styles.tableFilter}>
                    <span>开仓状态：</span>
                    {tagsData1.tags.map(tag =>
                      <CheckableTag
                        key={tag}
                        checked={tagsData1.selectedTags.indexOf(tag) > -1}
                        onChange={checked => this.handleTagsChange(tag, checked, 1)}
                      >
                        {tag}
                      </CheckableTag>
                    )}
                  </div>
                </Col>
              </Row>
              <MyTable key={1} {...tableProps1} />
            </TabPane>
            <TabPane tab="订单信息" key="2">
              <Button type="dashed" onClick={() => {handleTabChange(-1, 'table2');}} block>刷新订单信息</Button>
              <div className={styles.tableFilter}>
                <span>订单状态：</span>
                {tagsData2.tags.map(tag =>
                  <CheckableTag
                    key={tag}
                    checked={tagsData2.selectedTags.indexOf(tag) > -1}
                    onChange={checked => this.handleTagsChange(tag, checked, 2)}
                  >
                    {tag}
                  </CheckableTag>
                )}
              </div>
              <MyTable key={2} {...tableProps2} />
            </TabPane>
          </Tabs>
        </Row>}

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    strategy: state.strategy,
    loading: state.loading
  }
}
export default connect(mapStateToProps)(Form.create({})(StrategyAdd));
