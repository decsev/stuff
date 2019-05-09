import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux} from 'dva/router';
import {Link} from 'react-router-dom';
import {changeTitle, queryURL} from 'utils';
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
    }
    this.dispatch = this.props.dispatch;
  }
  componentDidMount() {
  }
  componentWillUnmount() {

  }
  calcData(arr) {
    const {kit} = this.props;
    const {current_myInterestShowType, current_myInterestOrigin} = kit;
    let result = {
      list: [],
      allInterest: null
    };
    if (current_myInterestShowType === 2) {
      // 已还
      arr = arr.filter((item) => {
        return !!item.endTime;
      })
    }
    if (current_myInterestShowType === 3) {
      // 未还
      arr = arr.filter((item) => {
        return !item.endTime;
      })
    }
    if (current_myInterestOrigin === 2) {
      // zfb
      arr = arr.filter((item) => {
        return item.origin === 'zfb';
      })
    }
    if (current_myInterestOrigin === 3) {
      // yh
      arr = arr.filter((item) => {
        return item.origin === 'yh';
      })
    }
    let t = new Date();
    let aDay = 24 * 60 * 60 * 1000;
    let allInterest = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].endTime) {
        arr[i].status = true;
        arr[i].day = Math.floor((new Date(arr[i].endTime) - new Date(arr[i].startTime)) / aDay);
        arr[i].payInterest = arr[i].capital * arr[i].day * arr[i].ratio / 100 / 360;
      } else {
        arr[i].status = false;
        arr[i].day = Math.floor((t - new Date(arr[i].startTime)) / aDay);
        arr[i].payInterest = arr[i].capital * arr[i].day * arr[i].ratio / 100 / 360;
      }
      allInterest = allInterest + arr[i].payInterest;
    }
    result.list = arr;
    result.allInterest = allInterest;
    return result;
  }
  render() {
    const {form, dispatch, kit} = this.props;
    const {myInterestFormData, myInterestList} = kit;
    const isEdit = false;
    let list = this.calcData(myInterestList).list;
    let allInterest = this.calcData(myInterestList).allInterest;
    const columns = [
      {
        title: '金额',
        dataIndex: 'capital',
        key: 'capital'
      },
      {
        title: '利息',
        dataIndex: 'payInterest',
        key: 'payInterest',
        render: (param, o) => {
          return `${param} 元`
        }
      },
      {
        title: '计息天数',
        dataIndex: 'day',
        key: 'day',
        render: (param, o) => {
          return `${param}天`
        }
      },
      {
        title: '年化',
        dataIndex: 'ratio',
        key: 'ratio',
        render: (param, o) => {
          return `${param}%`;
        }
      },
      {
        title: '源',
        dataIndex: 'origin',
        key: 'origin'
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: (param, o) => {
          if (param) {
            return '已还';
          }
          return '未还';
        }
      },
      {
        title: '时间',
        dataIndex: 'startTime',
        key: 'startTime',
        render: (param, o) => {
          if (o.endTime) {
            return `${param} ~ ${o.endTime}`;
          }
          return `${param} ~ `;
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
    return (
      <div id="mainContent" className={styles.mainContent}>
        <nav className={styles.my_nav}>
          <ul>
            <li><Link to="/kit">我的持仓</Link></li>
            <li className={styles.active}><Link to="/kit/myInterest">我的利息</Link></li>
            <li><Link to="/kit/grid">网格工具</Link></li>
            <li><Link to="/kit/interest">计息工具</Link></li>
          </ul>
        </nav>
        <Form style={{marginBottom: '30px'}}>
          <Row gutter={12}>
            {
              (myInterestFormData || []).map((item, index) => {
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
          key={'table_jd'}
          columns={columns}
          dataSource={list}
          bordered
          scroll={{x: true}}
          footer={() => {return `累计：${allInterest} 元`}}
        />
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
