import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Link} from 'react-router-dom';
import {changeTitle, queryURL, fNum} from 'utils';
import {Row, Col, Button, Modal, Form, Card, Select, Tabs, Spin, message, Tag, Table, Radio, Tooltip, Icon} from 'antd';
import {MyInput, MyTable, MyBreadcrumb, DynamicArrayInput, MyEmpty} from 'components';
import styles from './index.less';
import {start} from 'pretty-error';

const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
const Option = Select.Option;
const namespace = 'kit';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const CheckableTag = Tag.CheckableTag;
class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hq: [],
      isReutrned: true
    }
    this.dispatch = this.props.dispatch;
  }
  componentDidMount() {
    this.hq();
    this.myInterval();
  }
  componentWillUnmount() {

  }
  myInterval() {
    let {current_span, current_isAuto} = this.props.kit;
    setTimeout(() => {
      let msg = '';
      if (this.isTradingTime()) {
        if (current_isAuto && this.state.isReutrned) {
          this.setState({
            isReutrned: false
          })
          this.hq();
          msg = '正在获取';
        } else {
          msg = '停止获取';
        }
        console.log('交易时间段', msg);
      } else {
        console.log('不是交易时间段');
      }
      this.myInterval();
    }, current_span * 1000);
  }
  isTradingTime() {
    let isTrading = false;
    if (this.time_rang('9:00:00', '11:30:00') || this.time_rang('13:00:00', '15:00:00')) {
      isTrading = true;
    }
    return isTrading;
  }
  time_rang(startTime, endTime, nowTime = undefined) {
    let flag = false;
    let sTime = new Date();
    let eTime = new Date();
    let nTime = new Date();
    let startTimeArr = startTime.split(':');
    sTime.setHours(Number(startTimeArr[0]), Number(startTimeArr[1]), Number(startTimeArr[2]));
    let endTimeArr = endTime.split(':');
    eTime.setHours(Number(endTimeArr[0]), Number(endTimeArr[1]), Number(endTimeArr[2]));
    if (nowTime !== undefined) {
      let nowTimeArr = nowTime.split(':');
      nTime.setHours(Number(endTimeArr[0]), Number(endTimeArr[1]), Number(endTimeArr[2]));
    }
    if (nTime.getTime() >= sTime.getTime() && nTime.getTime() <= eTime.getTime()) {
      flag = true;
    }
    return flag;
  }
  hq() {
    const {stockCodesList} = this.props.kit.gridData;
    this.dispatch({
      type: `${namespace}/hq`,
      payload: {
        code: stockCodesList
      }
    }).then((data) => {
      let hq = [];
      for (let key in data) {
        let arr = data[key].split(',');
        let param = {
          code: key,
          name: arr[0],
          o: arr[1],
          c: arr[2],
          last: arr[3],
          h: arr[4],
          l: arr[5],
          time: arr[31]
        };
        hq.push(param);
      }
      this.setState({
        hq,
        isReutrned: true
      })
    })
  }
  getCurrentPrice(stockCode, hq) {
    let currentPrice = null;
    for (let i = 0; i < hq.length; i++) {
      if (hq[i].code === stockCode) {
        currentPrice = hq[i].last;
      }
    }
    return Number(currentPrice);
  }
  calcHold(dealList, items) {
    if (!dealList) {return [];}
    let {current_realPrice, current_showType, current_isAuto, current_upRatio, current_downRatio} = this.props.kit;
    const {needstampFree, freeRatio, stockCode, isOpen} = items;
    if (current_isAuto) {
      current_realPrice = this.getCurrentPrice(stockCode, this.state.hq);
    }

    if (current_showType === 2 && isOpen) {
      dealList = dealList.filter((item) => {
        return item.s_price === null;
      })
    }
    if (current_showType === 3 && isOpen) {
      dealList = dealList.filter((item) => {
        return item.s_price !== null;
      })
    }
    let result = [];
    for (let i = 0; i < dealList.length; i++) {
      let data = dealList[i];
      let selloutProfit = null;
      let realProfit = null;
      let exFree = 0; // 交易手续费
      let exFreeIntro = ''; // 交易手续费构成
      let bfree = 0; // 买入手续费
      let exportCapital = 0; // 卖出后获得的资金
      let importCapital = 0; // 买入股票投入的资金
      if (data.s_price) {
        // 实现盈亏
        let exFreeObj = this.calcExFree(data.b_price, data.s_price, data.amount, freeRatio, needstampFree);
        exFree = exFreeObj.free;
        exFreeIntro = exFreeObj.intro;
        selloutProfit = fNum((data.s_price - data.b_price) * data.amount - exFree, 2);
        bfree = exFreeObj.bfree;
        importCapital = fNum(data.b_price * data.amount + bfree, 2);
        exportCapital = fNum(data.s_price * data.amount - exFreeObj.free + bfree, 2);
      } else {
        // 实时盈亏
        let exFreeObj = this.calcExFree(data.b_price, current_realPrice, data.amount, freeRatio, needstampFree);
        exFree = exFreeObj.free;
        exFreeIntro = exFreeObj.intro;
        realProfit = fNum((current_realPrice - data.b_price) * data.amount - exFree, 2);
        bfree = exFreeObj.bfree;
        importCapital = fNum(data.b_price * data.amount + bfree, 2);
        exportCapital = fNum(current_realPrice * data.amount - exFreeObj.free + bfree, 2);
      }
      let param = {
        level: i + 1,
        b_price: data.b_price,
        upRatioPrice: data.b_price * (current_upRatio / 100 + 1),
        downRatioPrice: data.b_price * (1 - current_downRatio / 100),
        current_realPrice: current_realPrice,
        amount: data.amount,
        s_price: data.s_price,
        selloutProfit,
        realProfit,
        b_time: data.b_time,
        s_time: data.s_time,
        exFree: exFree,
        exFreeIntro: exFreeIntro,
        bfree,
        importCapital,
        exportCapital
      }
      result.push(param);
    }
    return result;
  }
  calcExFree(bp, sp, am, fr, ns) {
    // bp买入价格，sp卖出价格，am量, fr费率, ns是否需要交印花税
    let intro = '';
    let free = 0;
    let bfree = fNum(bp * am * fr > 5 ? bp * am * fr : 5, 2);
    let sfree = fNum(sp * am * fr > 5 ? sp * am * fr : 5, 2);
    free = fNum(bfree + sfree, 2);
    intro = `买：${bfree} 卖：${sfree}`
    if (ns) {
      free = fNum(free + sp * am * 0.001, 2);
      intro = `${intro} 印：${fNum(sp * am * 0.001, 2)}`;
    }
    return {free, intro, bfree};
  }
  calcExFree2(bp, sp, am, fr, ns) {
    // bp买入价格，sp卖出价格，am量, fr费率, ns是否需要交印花税
    let intro = '';
    let free = 0;
    free = fNum(bp * am * fr > 5 ? bp * am * fr : 5, 2);
    intro = `买：${free}`;
    return {free, intro};
  }
  calcYK(o, flag) {
    const {current_showType} = this.props.kit;
    let result = {};
    let yk = 0;
    let buyAmount = 0;
    let allImportCapital = 0;
    for (let i = 0; i < o.length; i++) {
      // if (current_showType === 1 && flag) {
      //   if (!o[i].selloutProfit) {
      //     buyAmount += o[i].b_price * o[i].amount;
      //   }
      // }
      // if (current_showType === 1 && !flag) {
      //   if (o[i].selloutProfit) {
      //     buyAmount += o[i].b_price * o[i].amount;
      //   }
      // }
      // if (current_showType === 2 || current_showType === 3) {
      //   buyAmount += o[i].b_price * o[i].amount;
      // }
      if (current_showType === 1 || current_showType === 2) {
        if (!o[i].selloutProfit) {
          buyAmount += o[i].importCapital;
        }
      }
      if (current_showType === 1 && !flag) {
        if (o[i].selloutProfit) {
          buyAmount += o[i].b_price * o[i].amount;
        }
      }
      if (current_showType === 3) {
        buyAmount += o[i].importCapital;
      }

      yk += o[i].selloutProfit || o[i].realProfit;
    }
    result.yk = fNum(yk, 2);
    result.buyAmount = fNum(buyAmount, 2);
    return result;
  }
  render() {
    const {form, dispatch, kit} = this.props;
    const {gridData, stockFromData, current_upRatio, current_downRatio} = kit;
    const {strategyList} = gridData;
    const openList = (strategyList || []).filter((item) => {
      return item.isOpen;
    })
    const closeList = (strategyList || []).filter((item) => {
      return !item.isOpen;
    })
    const isEdit = false;
    const columns1 = [
      {
        title: null,
        dataIndex: 'level',
        key: 'level',
        render: (param) => {
          return <div style={{textAlign: 'center'}}>{param}</div>
        }
      },
      // {
      //   title: '投入资金',
      //   dataIndex: 'b_price',
      //   key: 'b_price',
      //   render: (param, o) => {
      //     return `${fNum(param * o.amount + o.bfree, 2)}(${fNum((param * o.amount + o.bfree) / o.amount, 2)})`
      //   }
      // },
      {
        title: '占用资金',
        dataIndex: 'importCapital',
        key: 'importCapital'
      },
      // {
      //   title: '产出资金',
      //   dataIndex: 'exportCapital',
      //   key: 'exportCapital'
      // },
      {
        title: '买入价格',
        dataIndex: 'b_price',
        key: 'b_price',
        render: (param, o) => {
          return <Tooltip title={`${fNum(o.upRatioPrice, 3)}(${current_upRatio}%) / ${fNum(o.downRatioPrice, 3)}(-${current_downRatio}%)`}>{param}</Tooltip>;
        }
      },
      {
        title: '数量',
        dataIndex: 'amount',
        key: 'amount'
      },
      {
        title: '卖出价格',
        dataIndex: 's_price',
        key: 's_price',
        render: (p) => {
          if (p) {
            return p;
          }
          return '--'
        }
      },
      {
        title: '实时盈亏',
        dataIndex: 'realProfit',
        key: 'realProfit',
        render: (p, o) => {
          if (o.s_price) {
            return '已获利了结'
          }
          let percent = fNum(Number(p) * 100 / (Number(o.b_price) * Number(o.amount)), 2) + '%';
          return p + '(' + percent + ')';

        }
      },
      {
        title: '实现盈亏',
        dataIndex: 'selloutProfit',
        key: 'selloutProfit',
        render: (p, o) => {
          if (!o.s_price) {
            return '末实现盈亏'
          }
          let percent = fNum(Number(p) * 100 / (Number(o.b_price) * Number(o.amount)), 2) + '%';
          return p + '(' + percent + ')';
        }
      },
      {
        title: '交易手续费',
        dataIndex: 'exFree',
        key: 'exFree',
        render: (param, o) => {
          return <Tooltip title={o.exFreeIntro}>{param}</Tooltip>
        }
      },
      {
        title: '买入时间',
        dataIndex: 'b_time',
        key: 'b_time'
      },
      {
        title: '卖出时间',
        dataIndex: 's_time',
        key: 's_time',
        render: (param) => {
          if (param) {
            return param;
          }
          return '--'
        }
      },
      {
        title: '卖出价格',
        dataIndex: 'upRatioPrice',
        key: 'upRatioPrice',
        render: (param, o) => {
          return `${fNum(param, 3)}(${current_upRatio}%)`
        }
      },
      {
        title: '买入价格',
        dataIndex: 'downRatioPrice',
        key: 'downRatioPrice',
        render: (param, o) => {
          return `${fNum(param, 3)}(-${current_downRatio}%)`
        }
      }
    ];
    const paginationProps = {
      pageSize: Number(localStorage.getItem('pageSize') || 10),
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '30', '40'],
      onShowSizeChange: (current, size) => {
        localStorage.setItem('pageSize', size);
      }
    }
    const columns2 = [
      {
        title: '股票',
        dataIndex: 'name',
        key: 'code',
        render: (param, o) => {
          return <p><a href={`https://xueqiu.com/S/${o.code}`} target="_blank">{param}({o.code})</a></p>
        }
      },
      {
        title: '当前价',
        dataIndex: 'last',
        key: 'last',
        render: (param) => {
          return fNum(param);
        }
      },
      {
        title: '涨跌幅',
        dataIndex: 'c',
        key: 'c',
        render: (param, o) => {
          let a = fNum(o.last - param);
          let b = fNum(a * 100 / param, 2) + '%';
          return <p>{a}({b})</p>
        }
      },
      {
        title: '最高',
        dataIndex: 'h',
        key: 'h',
        render: (param) => {
          return fNum(param);
        }
      },
      {
        title: '最低',
        dataIndex: 'l',
        key: 'l',
        render: (param) => {
          return fNum(param);
        }
      },
      {
        title: '更新时间',
        dataIndex: 'time',
        key: 'time'
      }
    ]
    const {match} = this.props;
    return (
      <div id="mainContent" className={styles.mainContent}>
        <nav className={styles.my_nav}>
          <ul>
            <li className={styles.active}><Link to="/kit">我的持仓</Link></li>
            <li><Link to="/kit/myInterest">我的借贷</Link></li>
            <li><Link to="/kit/grid">网格工具</Link></li>
            <li><Link to="/kit/interest">计息工具</Link></li>
          </ul>
        </nav>
        <Form style={{marginBottom: '30px'}}>
          <Row gutter={12}>
            {
              (stockFromData || []).map((item, index) => {
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
        </Form>
        <Table
          size="middle"
          pagination={{...paginationProps}}
          key={'table_hq'}
          columns={columns2}
          dataSource={this.state.hq}
          bordered
          scroll={{x: true}}
        />
        <Tabs>
          <TabPane tab="当前持仓" key="0">
            {(openList || []).length > 0 && <Tabs type="card">
              {
                openList.map((item, index) => {
                  return <TabPane tab={item.strategyName} key={index}>
                    <Table
                      size="middle"
                      pagination={{...paginationProps}}
                      key={'table_' + index}
                      columns={columns1}
                      dataSource={this.calcHold(item.dealList, item)}
                      bordered
                      scroll={{x: true}}
                      title={() => {return '当前股价:' + this.getCurrentPrice(item.stockCode, this.state.hq)}}
                      footer={() => {
                        let r = this.calcYK(this.calcHold(item.dealList, item), item.isOpen);
                        let temp = '';
                        if (item.dividend) {
                          temp = ` | 分红：${item.dividend} , 扣税：${item.dividendInterest}`;
                          r.yk = fNum(r.yk + item.dividend - item.dividendInterest, 2);
                        }
                        return r.yk && r.buyAmount ? '累计盈亏：' + r.yk + '(' + fNum(r.yk * 100 / r.buyAmount, 2) + '%)' + ' | 占用资金：' + r.buyAmount + temp : null
                      }}
                    />
                  </TabPane>
                })
              }
            </Tabs>}
            {(openList || []).length === 0 && <MyEmpty></MyEmpty>}
          </TabPane>
          <TabPane tab="历史持仓" key="1">
            {(closeList || []).length > 0 && <Tabs type="card">
              {
                closeList.map((item, index) => {
                  return <TabPane tab={item.strategyName} key={index}>
                    <Table
                      size="middle"
                      pagination={{...paginationProps}}
                      key={'table_' + index}
                      columns={columns1}
                      dataSource={this.calcHold(item.dealList, item)}
                      bordered
                      scroll={{x: true}}
                      footer={() => {
                        let temp = '';
                        let r = this.calcYK(this.calcHold(item.dealList, item), item.isOpen);
                        if (item.dividend) {
                          temp = `，分红：${item.dividend} , 扣税：${item.dividendInterest}`;
                          r.yk = fNum(r.yk + item.dividend - item.dividendInterest, 2);
                        }
                        return r.yk && r.buyAmount ? '盈亏：' + r.yk + '(' + fNum(r.yk * 100 / r.buyAmount, 2) + '%)' + temp : null;
                      }}
                    />
                  </TabPane>
                })
              }
            </Tabs>}
            {(closeList || []).length === 0 && <MyEmpty></MyEmpty>}
          </TabPane>
        </Tabs>
      </div >
    )
  }
}

function mapStateToProps(state) {
  return {
    kit: state.kit
  }
}
export default connect(mapStateToProps)(Form.create({})(Index));
