import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {changeTitle} from 'utils';
import {Row, Col, Button, Modal, Form, Card, Select, Tabs, Spin, message, Tag, Table, Breadcrumb} from 'antd';
import {MyInput, MyTable, MyBreadcrumb} from 'components';
import styles from './index.less';

const ButtonGroup = Button.Group;
const confirm = Modal.confirm;
const Option = Select.Option;
const namespace = 'account';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;
const CheckableTag = Tag.CheckableTag;

function AccountTable(props) {
  const {columns, mytitle = null, mydata} = props;
  let temp = {};
  if (mytitle) {
    temp.title = () => {return <b>{mytitle}</b>};
  }
  return <Table
    columns={columns}
    dataSource={mydata}
    bordered
    {...temp}
    scroll={{x: true}}
  />
}

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentExchange: null,
      currentAccount: null,
      allAccount: [],
      selectIndex: 0
    }
    this.dispatch = this.props.dispatch;
  }
  componentDidMount() {
    this.dispatch({
      type: `${namespace}/tradingAccountList`,
      payload: {}
    }).then((data) => {
      if (data.success && data.code === 0) {
        const accountList = data.payload.data;
        let allAccount = [];
        for (let i in accountList) {
          allAccount = allAccount.concat(accountList[i]);
        }
        this.setState({
          allAccount,
          selectIndex: 0
        })
        if (allAccount.length > 0) {
          const accountData = allAccount[0];
          const param = [accountData.access_id, accountData.secret_key, accountData.exchange, accountData.passphrase, accountData.account];
          this.doQuery(param);
        }
      } else {
        Modal.error({
          title: '消息',
          content: data.msg
        });
      }
    })
  }
  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch({
      type: `${namespace}/resetState`
    })
  }
  setTitle(isEdit, title) {
    changeTitle('帐户信息');
  }
  doQuery(params) {
    this.dispatch({
      type: `${namespace}/query`,
      payload: {
        key: params[0],
        secret: params[1],
        passphrase: params[3],
        exchange: params[2]
      }
    })
    this.setState({
      currentExchange: params[2],
      currentAccount: params[4]
    })
  }
  changeExchangeAccount(i) {
    this.setState({
      selectIndex: i
    })
    const accountData = this.state.allAccount[i];
    const param = [accountData.access_id, accountData.secret_key, accountData.exchange, accountData.passphrase, accountData.account];
    this.doQuery(param);
  }
  render() {
    const {account, dispatch, loading} = this.props;
    const {spotAccount, futureAccount, futurePositionList, futureOrderList, spotOrderList, marginAccount} = account;
    const {balance: spotAccountBalance} = spotAccount;
    const {balance: futureAccountBalance} = futureAccount;
    const {balance: marginAccountBalance} = marginAccount;
    let spotAccountBalanceData = [];
    if (spotAccountBalance) {
      let index = 0;
      for (let i in spotAccountBalance) {
        spotAccountBalanceData[index] = spotAccountBalance[i];
        index++
      }
    }

    let marginAccountBalanceData = [];
    if (marginAccountBalance) {
      let index = 0;
      for (let i in marginAccountBalance) {
        marginAccountBalanceData[index] = marginAccountBalance[i];
        index++
      }
    }

    let futureAccountBalanceData = [];
    if (futureAccountBalance) {
      let index2 = 0;
      for (let i in futureAccountBalance) {
        futureAccountBalanceData[index2] = futureAccountBalance[i];
        index2++
      }
    }
    // 配置table的操作列
    const columns0 = [
      {
        title: '币种',
        dataIndex: 'symbol',
        key: 'symbol'
        // render: (tradingDate) => {
        //   return new Date(tradingDate).format('yyyy-MM-dd') || '--';
        // }
      },
      {
        title: '账户权益',
        dataIndex: 'balance',
        key: 'balance'
      },
      {
        title: '可用保证金',
        dataIndex: 'available',
        key: 'available'
      },
      {
        title: '已用保证金',
        dataIndex: 'frozen',
        key: 'frozen'
      }
    ];
    const columns01 = [
      {
        title: '币种',
        dataIndex: 'symbol',
        key: 'symbol'
        // render: (tradingDate) => {
        //   return new Date(tradingDate).format('yyyy-MM-dd') || '--';
        // }
      },
      {
        title: '账户权益',
        dataIndex: 'balance',
        key: 'balance'
      },
      {
        title: '可用保证金',
        dataIndex: 'available',
        key: 'available'
      },
      {
        title: '已用保证金',
        dataIndex: 'frozen',
        key: 'frozen'
      },
      {
        title: '已实现盈亏',
        dataIndex: 'realisedPNL',
        key: 'realisedPNL'
      },
      {
        title: '未实现盈亏',
        dataIndex: 'unrealisedPNL',
        key: 'unrealisedPNL'
      },
      {
        title: '杠杆倍数',
        dataIndex: 'leverRate',
        key: 'leverRate'
      },
      {
        title: '保证金率',
        dataIndex: 'riskRate',
        key: 'riskRate'
      }
    ];
    const columns1 = [
      {
        title: '代码',
        dataIndex: 'symbol',
        key: 'symbol'
      },
      {
        title: '持仓量',
        dataIndex: 'volume',
        key: 'volume'
      },
      {
        title: '可平仓数量',
        dataIndex: 'available',
        key: 'available'
      },
      {
        title: '冻结数量',
        dataIndex: 'frozen',
        key: 'frozen'
      },
      {
        title: '开仓均价',
        dataIndex: 'openAvgPrice',
        key: 'openAvgPrice'
      },
      {
        title: '持仓均价',
        dataIndex: 'holdingAvgPrice',
        key: 'holdingAvgPrice'
      },
      {
        title: '未实现盈亏',
        dataIndex: 'profitUnreal',
        key: 'profitUnreal'
      },
      {
        title: '收益率',
        dataIndex: 'profitRate',
        key: 'profitRate'
      },
      {
        title: '收益',
        dataIndex: 'profitReal',
        key: 'profitReal'
      },
      {
        title: '持仓保证金',
        dataIndex: 'holdingMargin',
        key: 'holdingMargin'
      },
      {
        title: '杠杠倍数',
        dataIndex: 'leverage',
        key: 'leverage'
      },
      {
        title: '方向',
        dataIndex: 'direction',
        key: 'direction',
        render: (direction) => {
          if (direction === 1) {
            return <span className={styles.green}>买</span>;
          }
          if (direction === 2) {
            return <span className={styles.red}>卖</span>;
          }
          return '--'
        }
      },
      {
        title: '预估爆仓价',
        dataIndex: 'marginCallPrice',
        key: 'marginCallPrice'
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (createTime) => {
          return new Date(createTime).format('yyyy-MM-dd hh:mm:ss') || '--';
        }
      }
    ];

    const columns2 = [
      {
        title: '订单编号',
        dataIndex: 'orderId',
        key: 'orderId'
      },
      {
        title: '代码',
        dataIndex: 'symbol',
        key: 'symbol'
      },
      {
        title: '币种',
        dataIndex: 'currency',
        key: 'currency'
      },
      {
        title: '订单创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        render: (createTime) => {
          return new Date(createTime).format('yyyy-MM-dd') || '--';
        }
      },
      {
        title: '订单更新时间',
        dataIndex: 'editTime',
        key: 'editTime',
        render: (editTime) => {
          return new Date(editTime).format('yyyy-MM-dd') || '--';
        }
      },
      {
        title: '委托价',
        dataIndex: 'lmtPrice',
        key: 'lmtPrice'
      },
      {
        title: '平均成交价',
        dataIndex: 'avgPrice',
        key: 'avgPrice'
      },
      {
        title: '已成交数量',
        dataIndex: 'filled',
        key: 'filled'
      },
      {
        title: '委托量',
        dataIndex: 'totalQuantity',
        key: 'totalQuantity'
      },
      {
        title: '订单类型',
        dataIndex: 'orderType',
        key: 'orderType',
        render: (param) => {
          //BUY-买入；SELL-卖出
          if (param === 'BUY') {return '买入'}
          if (param === 'SELL') {return '卖出'}
          return '--'
        }
      },
      {
        title: '订单方向',
        dataIndex: 'orderAction',
        key: 'orderAction',
        render: (param) => {
          //订单类型:限价-LMT；市价-MKT;止损单：STOP
          if (param === 'LMT') {return '限价'}
          if (param === 'MKT') {return '市价'}
          if (param === 'STOP') {return '止损单'}
          return '--'
        }
      },
      {
        title: '订单状态',
        dataIndex: 'orderStatus',
        key: 'orderStatus',
        render: (param) => {
          //订单状态：PendingSubmit-已发出未确认;PendingCancel-已发出未确认；Submitted-已发出正在处理；
          // Filled-已执行；"PartFilled-部分成交；Inactive-非活跃状态；Cancelled-取消；
          if (param === 'PendingSubmit') {return '已发出未确认'}
          if (param === 'PendingCancel') {return '已发出未确认'}
          if (param === 'Submitted') {return '已发出正在处理'}
          if (param === 'Filled') {return '已执行；'}
          if (param === 'PartFilled') {return '部分成交'}
          if (param === 'Inactive') {return '非活跃状态'}
          if (param === 'Cancelled') {return '取消'}
          return '--'
        }
      },
      {
        title: '佣金',
        dataIndex: 'fee',
        key: 'fee'
      },
      {
        title: 'openclose',
        dataIndex: 'openclose',
        key: 'openclose'
      }
    ];

    // 请求下方table数据
    const handleTabChange = (key) => {
    }

    let myhost = 'kit.imbin.cn';
    const allAccountallAccountHtml = (this.state.allAccount || []).map((item, index) => {
      if (this.state.selectIndex === index) {
        return <span key={index} className={styles.spanSelected}>{item.account}【{item.exchange}】</span>
      }
      return <span key={index} onClick={() => {
        this.changeExchangeAccount(index)
      }}>{item.account}【{item.exchange}】</span>
    })
    return (
      <div id="mainContent" className={styles.mainContent}>
        <Spin spinning={!!loading.effects[`${namespace}/getStrategy`]}>

          <div className={styles.header}>
            <div className={styles.myBreadcrumb}>
              <Breadcrumb separator=">">
                <Breadcrumb.Item><a href="javascript:void(0);" onClick={() => {this.props.dispatch(routerRedux.push('/strategyList'));}}>我的策略</a></Breadcrumb.Item>
                <Breadcrumb.Item>{this.state.currentAccount} 帐户信息</Breadcrumb.Item>
              </Breadcrumb>
            </div>
          </div>
        </Spin>
        <div className={styles.mainHeader}>
          <div className={styles.hang}><span className={styles.accountTitle}>帐号：</span><p>{allAccountallAccountHtml}</p></div>
        </div>
        <Row>
          <Spin spinning={!!loading.effects[`${namespace}/query`]}>
            <Tabs onChange={handleTabChange}>
              <TabPane tab="账户资金" key="0">

                <AccountTable key="1" mydata={futureAccountBalanceData} columns={columns01} mytitle={this.state.currentExchange + '交易所期货资产'}></AccountTable>
                <div style={{paddingTop: '15px'}}>
                  <AccountTable key="0" mydata={spotAccountBalanceData} columns={columns0} mytitle={this.state.currentExchange + '交易所现货资产'}></AccountTable>
                </div>
                <div style={{paddingTop: '15px'}}>
                  <AccountTable key="0" mydata={marginAccountBalanceData} columns={columns0} mytitle={this.state.currentExchange + '交易所现货杠杆资产'}></AccountTable>
                </div>
              </TabPane>
              <TabPane tab="持仓信息" key="1">
                <AccountTable key="2" mydata={futurePositionList} columns={columns1} mytitle={this.state.currentExchange + '交易所持仓'}></AccountTable>
              </TabPane>
              <TabPane tab="订单列表" key="2">
                <AccountTable key="0" mydata={spotOrderList} columns={columns2} mytitle={this.state.currentExchange + '交易所现货订单'}></AccountTable>
                <div style={{paddingTop: '15px'}}>
                  <AccountTable key="1" mydata={futureOrderList} columns={columns2} mytitle={this.state.currentExchange + '交易所期货订单'}></AccountTable>
                </div>
              </TabPane>
            </Tabs>
          </Spin>
        </Row>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    account: state.account,
    loading: state.loading
  }
}
export default connect(mapStateToProps)(Index);
