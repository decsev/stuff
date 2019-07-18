import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Link} from 'react-router-dom';
import {changeTitle, queryURL, fNum} from 'utils';
import {Row, Col, Button, Modal, Form, Card, Select, Tabs, Spin, message, Tag, Table, Radio, Tooltip, Icon} from 'antd';
import {MyInput, MyTable, MyBreadcrumb, DynamicArrayInput} from 'components';
import styles from './index.less';
import Nav from './nav.js';

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
    }
    this.dispatch = this.props.dispatch;
  }
  componentDidMount() {
  }
  componentWillUnmount() {

  }
  calcData() {
    // debugger
    const {
      current_buyChange,
      current_sellChange,
      current_capital,
      current_type,
      current_firstPrice,
      current_firstAmount,
      current_firstAddAmount
    } = this.props.kit;

    if (!!current_buyChange && !!current_sellChange && !!current_capital && !!current_type && !!current_firstPrice && !!current_firstAmount && !!current_firstAddAmount) {
      let usedMoney = 0;
      let b_price = 0;
      let s_price = 0;
      let amount = 0;
      let result = [];
      let level = 1;
      let profit = 0;
      if (current_type === '1') {
        // 等量
        usedMoney = current_firstPrice * current_firstAmount;
        b_price = current_firstPrice;
        amount = current_firstAmount;
        while (usedMoney < current_capital) {
          if (level === 2) {
            amount = current_firstAddAmount;
          }
          s_price = fNum(b_price * (1 + current_sellChange / 100), 2);
          profit = fNum(b_price * current_sellChange / 100 * amount, 2);
          let param = {
            level: level,
            b_price: b_price,
            s_price: s_price,
            amount: amount,
            profit: profit,
            current_firstPrice
          };
          result.push(param);
          level++;
          b_price = fNum(b_price * (1 - current_buyChange / 100), 2);
          usedMoney = usedMoney + b_price * amount;
        }
        return result;
      } else if (current_type === '2') {
        // 倍量
        usedMoney = current_firstPrice * current_firstAmount;
        b_price = current_firstPrice;
        amount = current_firstAmount;
        while (usedMoney < current_capital) {
          if (level === 2) {
            amount = current_firstAddAmount;
          }
          s_price = fNum(b_price * (1 + current_sellChange / 100), 2);
          profit = fNum(b_price * current_sellChange / 100 * amount, 2);
          let param = {
            level: level,
            b_price: b_price,
            s_price: s_price,
            amount: amount,
            profit: profit,
            current_firstPrice
          };
          result.push(param);
          level++;
          b_price = fNum(b_price * (1 - current_buyChange / 100), 2);
          usedMoney = usedMoney + b_price * amount;
          amount = amount * 2;
        }
        return result;
      }
    }
    return [];
  }


  render() {
    const {form, dispatch, kit} = this.props;
    const {gridFromData, current_myGridName} = kit;

    const isEdit = false;
    const columns = [
      {
        title: '层级',
        dataIndex: 'level',
        key: 'level',
        render: (param, o) => {
          return param;
        }
      },
      {
        title: '买入价格',
        dataIndex: 'b_price',
        key: 'b_price'
      },
      {
        title: '数量',
        dataIndex: 'amount',
        key: 'amount'
      },
      {
        title: '卖出价格',
        dataIndex: 's_price',
        key: 's_price'
      },
      {
        title: '目标盈利',
        dataIndex: 'profit',
        key: 'profit'
      },
      // {
      //   title: '当前价格盈亏',
      //   dataIndex: 'realProfit',
      //   key: 'realProfit'
      // },
      {
        title: '同比底仓价格跌幅',
        dataIndex: 'current_firstPrice',
        key: 'current_firstPrice',
        render: (param, o) => {
          return fNum((o.b_price / param - 1) * 100, 2) + '%';
        }
      }
    ];
    const mydata = this.calcData();
    const paginationProps = {
      pageSize: 10,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '30', '40']
    }
    return (
      <div id="mainContent" className={styles.mainContent}>
        <Nav activeIndex={2}></Nav>
        <Form style={{marginBottom: '30px'}}>
          <Row gutter={12}>
            {
              (gridFromData || []).map((item, index) => {
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
          key={0}
          title={() => {return current_myGridName;}}
          columns={columns}
          dataSource={mydata}
          bordered
          scroll={{x: true}}
          pagination={{paginationProps}}
        />
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    kit: state.kit
  }
}
export default connect(mapStateToProps)(Form.create({})(Index));
