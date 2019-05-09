import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Link} from 'react-router-dom';
import {changeTitle, queryURL} from 'utils';
import {Row, Col, Button, Modal, Form, Card, Select, Tabs, Spin, message, Tag, Table, Radio, Tooltip, Icon} from 'antd';
import {MyInput, MyTable, MyBreadcrumb, DynamicArrayInput} from 'components';
import styles from './index.less';

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
      current_interesetType,
      current_interestCapital,
      current_interesetRate,
      current_interesetPeriod
    } = this.props.kit;

    if (!!current_interesetType && !!current_interestCapital && !!current_interesetRate && !!current_interesetPeriod) {
      let result = [];
      let myCapital = 0;
      let myInterest = 0;
      let myCapitalAndInterest = 0;
      if (current_interesetType === '1') {
        // 复利
        for (let i = 1; i <= current_interesetPeriod; i++) {
          myCapital = current_interestCapital + myInterest;
          myInterest = myCapital * current_interesetRate / 100 + myInterest;
          myCapitalAndInterest = current_interestCapital + myInterest;
          let param = {
            perio: i,
            myCapital,
            myInterest,
            myCapitalAndInterest
          };
          result.push(param);
        }
        return result;
      } else if (current_interesetType === '2') {
        // 非复利
        for (let i = 1; i <= current_interesetPeriod; i++) {
          myCapital = current_interestCapital;
          myInterest = myCapital * current_interesetRate / 100 + myInterest;
          myCapitalAndInterest = current_interestCapital + myInterest;
          let param = {
            perio: i,
            myCapital,
            myInterest,
            myCapitalAndInterest
          };
          result.push(param);
        }
        return result;
      }
    }
    return [];
  }


  render() {
    const {form, dispatch, kit} = this.props;
    const {interestFormData} = kit;

    const isEdit = false;
    const columns = [
      {
        title: '投资时长',
        dataIndex: 'perio',
        key: 'perio',
        render: (param, o) => {
          return param + '年';
        }
      },
      {
        title: '计息本金',
        dataIndex: 'myCapital',
        key: 'myCapital',
        render: (param, o) => {
          return Number(param).toFixed(2);
        }
      },
      {
        title: '到期利息',
        dataIndex: 'myInterest',
        key: 'myInterest',
        render: (param, o) => {
          return Number(param).toFixed(2);
        }
      },
      {
        title: '到期本息',
        dataIndex: 'myCapitalAndInterest',
        key: 'myCapitalAndInterest',
        render: (param, o) => {
          return Number(param).toFixed(2);
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
        <nav className={styles.my_nav}>
          <ul>
            <li><Link to="/kit">我的持仓</Link></li>
            <li><Link to="/kit/myInterest">我的利息</Link></li>
            <li><Link to="/kit/grid">网格工具</Link></li>
            <li className={styles.active}><Link to="/kit/interest">计息工具</Link></li>
          </ul>
        </nav>
        <Form style={{marginBottom: '30px'}}>
          <Row gutter={12}>
            {
              (interestFormData || []).map((item, index) => {
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
